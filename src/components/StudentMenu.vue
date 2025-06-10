<template>
  <div class="menu">
    <div class="header">
      <h2>Bienvenido Estudiante</h2>
      <p>Selecciona una opción:</p>
    </div>
    
    <!-- Menú de navegación -->
    <div class="actions">
      <!-- Mostrar el botón "Crear" solo si tiene el permiso "create_post" -->
      <div v-if="hasPermission('create_post')" class="action-item">
        <button @click="actionCreate" class="btn create-btn">Crear</button>
      </div>
      <!-- Mostrar el botón "Editar" solo si tiene el permiso "edit_post" -->
      <div v-if="hasPermission('edit_post')" class="action-item">
        <button @click="actionEdit" class="btn edit-btn">Editar</button>
      </div>
    </div>

    <!-- Cerrar sesión -->
    <div v-if="isLoggedIn" class="logout-container">
      <button @click="logout" class="btn logout-btn">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'; 
import { useRouter } from 'vue-router';  
import { computed, onMounted } from 'vue';

export default {
  name: 'StudentMenu',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    // Verificar si el usuario está autenticado
    const isLoggedIn = computed(() => userStore.isAuthenticated);

    // Verificar si el usuario tiene un permiso específico
    const hasPermission = (permission) => {
      return userStore.permissions.includes(permission);
    };

    // Acción para Crear
    const actionCreate = () => {
      alert('Acción Crear para Estudiante');
    };

    // Acción para Editar
    const actionEdit = () => {
      alert('Acción Editar para Estudiante');
    };

    // Función para cerrar sesión
    const logout = () => {
      userStore.clearUserData();
      router.push('/'); // Redirigir al login después de cerrar sesión
    };

    // Verificar la autenticación y cargar permisos
    onMounted(() => {
      userStore.checkAuth();
      if (!userStore.isAuthenticated) {
        router.push('/'); // Redirigir al login si no está autenticado
      }
    });

    return { isLoggedIn, actionCreate, actionEdit, logout, hasPermission };
  }
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f4f7fc;
  min-height: 100vh;
  /* padding: 20px; */
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h2 {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.header p {
  font-size: 16px;
  color: #777;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-item {
  width: 100%;
  text-align: center;
}

.btn {
  width: 200px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.create-btn {
  background-color: #5b6ee1;
  color: white;
}

.create-btn:hover {
  background-color: #4a58c1;
  transform: translateY(-2px);
}

.edit-btn {
  background-color: #6c757d;
  color: white;
}

.edit-btn:hover {
  background-color: #565e64;
  transform: translateY(-2px);
}

.logout-container {
  margin-top: 40px;
}

.logout-btn {
  width: 200px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.logout-btn:hover {
  background-color: #ff4747;
  transform: translateY(-2px);
}
</style>

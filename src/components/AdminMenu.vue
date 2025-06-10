<template>
  <div class="menu">
    <div class="header">
      <h2>Bienvenido Administrador</h2>
      <p>Selecciona una opción:</p>
    </div>
    
    <!-- Menú de navegación -->
    <div class="actions">
      <!-- Mostrar el botón "Nuevo" solo si tiene el permiso "create_post" -->
      <div v-if="hasPermission('create_post')" class="action-item">
        <button @click="showAlert('Nuevo')" class="btn create-btn">Nuevo</button>
      </div>
      <!-- Mostrar el botón "Editar" solo si tiene el permiso "edit_post" -->
      <div v-if="hasPermission('edit_post')" class="action-item">
        <button @click="showAlert('Editar')" class="btn edit-btn">Editar</button>
      </div>
      <!-- Mostrar el botón "Eliminar" solo si tiene el permiso "delete_post" -->
      <div v-if="hasPermission('delete_post')" class="action-item">
        <button @click="showAlert('Eliminar')" class="btn delete-btn">Eliminar</button>
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
  name: 'AdminPage',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    // Verificar si el usuario está autenticado
    const isLoggedIn = computed(() => userStore.isAuthenticated);

    // Verificar si el usuario tiene un permiso específico
    const hasPermission = (permission) => {
      return userStore.permissions.includes(permission);
    };

    // Función para mostrar alertas cuando el usuario selecciona una opción
    const showAlert = (action) => {
      alert(`Has seleccionado: ${action}`);
    };

    // Función para cerrar sesión
    const logout = () => {
      userStore.clearUserData();
      router.push('/');
    };

    // Verificar la autenticación y cargar permisos
    onMounted(() => {
      userStore.checkAuth();
      if (!userStore.isAuthenticated) {
        router.push('/');
      }
    });

    return { isLoggedIn, logout, hasPermission, showAlert };
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

.delete-btn {
  background-color: #ff5c5c;
  color: white;
}

.delete-btn:hover {
  background-color: #ff4747;
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

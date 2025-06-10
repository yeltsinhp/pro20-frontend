<template>
  <div class="admin-container">
    <h2>Bienvenido Administrador</h2>
    <p>Selecciona una opción:</p>

    <div>
      <button>Administrar Usuarios</button>
      <button>Ver Estadísticas</button>
    </div>

    <div v-if="isLoggedIn">
      <button @click="logout">Cerrar sesión</button>
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

    const isLoggedIn = computed(() => userStore.isAuthenticated);

    const logout = () => {
      userStore.clearUserData();
      router.push('/');
    };

    onMounted(() => {
      userStore.checkAuth(); 
      if (!userStore.isAuthenticated) {
        router.push('/');
      }
    });

    return { isLoggedIn, logout };
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

button {
  margin: 10px;
}
</style>

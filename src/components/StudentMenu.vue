<template>
  <div class="menu">
    <h2>Bienvenido Estudiante</h2>
    <p>Selecciona una opción:</p>
    
    <button @click="action1">Acción 1</button>
    <button @click="action2">Acción 2</button>

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
  name: 'StudentMenu',
  setup() {
    const userStore = useUserStore();
    const router = useRouter(); 

    const isLoggedIn = computed(() => userStore.isAuthenticated);

    const action1 = () => {
      alert('Acción 1 para Estudiante');
    };

    const action2 = () => {
      alert('Acción 2 para Estudiante');
    };

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

    return { isLoggedIn, action1, action2, logout };
  }
};
</script>

<style scoped>
.menu {
  padding: 20px;
  text-align: center;
}

button {
  display: block;
  margin: 10px;
  padding: 10px;
}
</style>

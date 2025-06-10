<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>

    <form @submit.prevent="login" v-if="!isLoggedIn">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>

    <div v-if="isLoggedIn">
      <p>Bienvenido, {{ userStore.user.name }}</p>
      <button @click="logout">Cerrar sesión</button>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';
import axios from '../axios';
import Cookies from 'js-cookie';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      isLoggedIn: false, 
    };
  },
  computed: {
    userStore() {
      return useUserStore(); 
    }
  },
  created() {
    this.checkAuth();
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          email: this.email,
          password: this.password
        });

        this.userStore.setUserData(response.data.user, response.data.token);

        Cookies.set('token', response.data.token);

        console.log('Token guardado en cookies:', Cookies.get('token'));

        this.isLoggedIn = true;

        const role = response.data.user.role_id;
        if (role === 2) {
          this.$router.push('/student-menu');
        } else if (role === 1) {
          this.$router.push('/admin-menu');
        }
      } catch (error) {
        this.errorMessage = 'Credenciales incorrectas';
      }
    },
    logout() {
      Cookies.remove('token');
      this.userStore.setUserData(null, null);

      console.log('Token después de logout:', Cookies.get('token'));

      this.isLoggedIn = false;

      this.$router.push('/login');
    },
    checkAuth() {
      const token = Cookies.get('token');
      console.log('Token al iniciar sesión:', token); 

      if (token) {
        this.isLoggedIn = true;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>

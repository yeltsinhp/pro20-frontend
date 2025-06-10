<template>
  <div class="auth-container">
    <div class="form-container">
      <h2 v-if="isLogin" class="form-title">Iniciar sesión</h2>
      <h2 v-if="!isLogin" class="form-title">Registrar</h2>
      
      <!-- Formulario de Login -->
      <form v-if="isLogin" @submit.prevent="login" class="form">
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required class="input" />
        </div>
        <div class="input-group">
          <label for="password">Contraseña:</label>
          <input type="password" v-model="password" id="password" required class="input" />
        </div>
        <div class="action">
          <button type="submit" class="btn submit-btn">Iniciar sesión</button>
        </div>
      </form>
      
      <!-- Formulario de Registro -->
      <form v-if="!isLogin" @submit.prevent="register" class="form">
        <div class="input-group">
          <label for="name">Nombre:</label>
          <input type="text" v-model="newName" id="name" required class="input" />
        </div>
        <div class="input-group">
          <label for="newEmail">Email:</label>
          <input type="email" v-model="newEmail" id="newEmail" required class="input" />
        </div>
        <div class="input-group">
          <label for="newPassword">Contraseña:</label>
          <input type="password" v-model="newPassword" id="newPassword" required class="input" />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required class="input" />
        </div>

        <!-- Selección de Rol -->
        <div class="input-group">
          <label for="role">Selecciona un Rol:</label>
          <select v-model="selectedRole" id="role" required class="input">
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>

        <div class="action">
          <button type="submit" class="btn submit-btn">Registrar</button>
        </div>
      </form>

      <!-- Botón para cambiar entre Login y Register -->
      <button @click="toggleForm" class="toggle-btn">
        {{ isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión' }}
      </button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import { useUserStore } from '../stores/userStore';
// import { useRouter } from 'vue-router'; 

export default {
  data() {
    return {
      isLogin: true, // Controla el formulario activo (login o register)
      email: '',
      password: '',
      newName: '', // Nombre del usuario
      newEmail: '',
      newPassword: '',
      confirmPassword: '',
      selectedRole: '', // Almacena el rol seleccionado
      roles: [], // Lista de roles
      errorMessage: '',
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin; // Alterna entre Login y Register
      this.errorMessage = ''; // Limpiar errores al alternar
    },
    async login() {
      try {
        const response = await axios.post('/login', {
          email: this.email,
          password: this.password,
        });

        // Guardamos el token y los datos del usuario en Pinia
        const userStore = useUserStore();
        userStore.setUserData(response.data.user, response.data.token);

        // Obtener los permisos del usuario después de iniciar sesión
        await this.fetchPermissions();

        // Redirigimos según el rol
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
    async register() {
      // Validar que las contraseñas coinciden
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      try {
        await axios.post('/register', {
          name: this.newName,  // Enviar nombre del usuario
          email: this.newEmail,
          password: this.newPassword,
          role_id: this.selectedRole, // Enviar el rol seleccionado (ID)
        });

        // Registro exitoso
        this.errorMessage = '';
        this.isLogin = true; // Cambiar a Login después del registro
      } catch (error) {
        this.errorMessage = 'Hubo un error al registrar la cuenta';
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('/roles'); // Asegúrate de tener esta ruta en tu API
        this.roles = response.data; // Guardar los roles recibidos
      } catch (error) {
        this.errorMessage = 'No se pudieron cargar los roles';
      }
    },
    async fetchPermissions() {
      try {
        const response = await axios.get('/user/permissions', {
          headers: {
            Authorization: `Bearer ${useUserStore().token}`,
          },
        });
        const userStore = useUserStore();
        userStore.setUserPermissions(response.data.permissions); // Guardar permisos en el store
      } catch (error) {
        this.errorMessage = 'No se pudieron cargar los permisos';
      }
    },
  },
  mounted() {
    this.fetchRoles(); // Obtener los roles cuando el componente se monte
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7; /* Fondo blanco */
  margin: 0; /* Elimina el margen */
  padding: 0; /* Elimina el padding */
  overflow: hidden; /* Elimina cualquier scroll no deseado */
}

.form-container {
  background: #fff; /* Fondo blanco para el formulario */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* Sombra suave */
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #5b6ee1;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #4a58c1;
}

.toggle-btn {
  background: none;
  border: none;
  color: #5b6ee1;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 15px;
}
</style>

import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: Cookies.get('token') || null, // Recuperar el token de las cookies
    permissions: JSON.parse(Cookies.get('permissions') || '[]'), // Recuperar permisos de las cookies
  }),
  actions: {
    setUserData(user, token) {
      this.user = user;
      this.token = token;
      // Guardar el token y los permisos en las cookies
      Cookies.set('token', token);
    },
    setUserPermissions(permissions) {
      this.permissions = permissions;
      // Guardar los permisos en las cookies
      Cookies.set('permissions', JSON.stringify(permissions));
    },
    clearUserData() {
      this.user = null;
      this.token = null;
      this.permissions = [];
      // Eliminar el token y los permisos de las cookies
      Cookies.remove('token');
      Cookies.remove('permissions');
    },
    checkAuth() {
      const token = Cookies.get('token');
      if (token) {
        this.token = token;
      } else {
        this.clearUserData();
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  }
});

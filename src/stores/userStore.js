import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    setUserData(user, token) {
      this.user = user;
      this.token = token;
      Cookies.set('token', token);
    },
    clearUserData() {
      this.user = null;
      this.token = null;
      Cookies.remove('token');
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
    getUser: (state) => state.user
  }
});

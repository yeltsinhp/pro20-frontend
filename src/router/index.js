import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import StudentMenu from '../components/StudentMenu.vue';
import AdminMenu from '../components/AdminMenu.vue';
import { useUserStore } from '@/stores/userStore';

const routes = [
  { path: '/', component: UserLogin },
  { path: '/student-menu', component: StudentMenu },
  { path: '/admin-menu', component: AdminMenu }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.checkAuth(); 

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;

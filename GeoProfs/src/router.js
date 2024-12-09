import { createRouter, createWebHistory } from 'vue-router';
import AdminPage from './components/AdminPage.vue';
import HomePage from './components/HomePage.vue';

const routes = [
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

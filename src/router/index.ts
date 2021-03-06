import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import ViewHome from '@/views/home/index.vue';
import ViewMy from '@/views/my/index.vue';
import DemoRoutes from './modules/demo';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/home/index',
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: ViewHome,
      },
      {
        path: 'my',
        name: 'HomeMy',
        component: ViewMy,
      },
    ],
  },
  ...DemoRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

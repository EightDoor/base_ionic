import { RouteRecordRaw } from 'vue-router';
import PllUpRefresh from '@/views/demo/pll_up_refresh.vue';
import DemoTopTabs from '@/views/demo/top_tabs.vue';

const demoRoutes: Array<RouteRecordRaw> = [
  {
    path: '/pll_up_refresh',
    name: 'pllUpRefresh',
    component: PllUpRefresh,
  },
  {
    path: '/top_tabs',
    name: 'TopTabs',
    component: DemoTopTabs,
  },
];

export default demoRoutes;

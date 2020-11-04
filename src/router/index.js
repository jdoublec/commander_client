import { createRouter, createWebHistory } from "vue-router";
import CommandList from '../pages/CommandList.vue';
import CommandNew from '../pages/CommandNew.vue';

const routes = [
  { path: "/", redirect: '/commands' },
  { path: "/commands", component: CommandList },    
  { path: '/new', component: CommandNew }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

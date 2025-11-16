import { createRouter, createWebHistory } from 'vue-router'
import SubastaListView from '../views/SubastaListView.vue';
import SubastaDetailView from '../views/SubastaDetailView.vue';
import Home from '../views/HomeView.vue';
import SubastaCreateView from '../views/SubastaCreateView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/subastas',
    name: 'subastas-list',
    component: SubastaListView
  },
  {
    path: '/subastas/:id',
    name: 'subasta-detalle',
    component: SubastaDetailView
  },
  {
    path: '/subastas/crear',
    name: 'subasta-crear',
    component: SubastaCreateView
  }

  ],
})

export default router

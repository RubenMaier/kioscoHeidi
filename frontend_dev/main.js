import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import Axios from 'axios';

import App from './App.vue';
import CrearProducto from './components/CrearProducto.vue';
import MostrarProducto from './components/MostrarProducto.vue';
import EditarProducto from './components/EditarProducto.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, Axios); 

const routes = [
    {
      name: 'MostrarProducto',
      path: '/',
      component: MostrarProducto
    },
    {
      name: 'CrearProducto',
      path: '/crear/producto',
      component: CrearProducto
    },
    {
      name: 'EditarProducto',
      path: '/editar/:id',
      component: EditarProducto
    }
];

 const router = new VueRouter({ mode: 'history', routes: routes });
 new Vue(Vue.util.extend({router}, App)).$mount('#app');
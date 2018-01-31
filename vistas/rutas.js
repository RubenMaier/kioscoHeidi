import VueRouter from 'vue-router'

import CrearProducto from './componentes/CrearProducto.vue'
import MostrarProducto from './componentes/MostrarProducto.vue'
import EditarProducto from './componentes/EditarProducto.vue'
import RegistrarUsuario from './componentes/RegistrarUsuario.vue'
import ConectarUsuario from './componentes/ConectarUsuario.vue'
import DesconectarUsuario from './componentes/DesconectarUsuario.vue'

const routes = [
    {
      name: 'MostrarProducto',
      path: '/productos/ver',
      component: MostrarProducto
    },
    {
      name: 'CrearProducto',
      path: '/producto/crear',
      component: CrearProducto
    },
    {
      name: 'EditarProducto',
      path: '/producto/editar/:id',
      component: EditarProducto
    },
    {
      name: 'RegistrarUsuario',
      path: '/usuario/registrar',
      component: RegistrarUsuario
    },
    {
      name: 'ConectarUsuario',
      path: '/',
      component: ConectarUsuario
    },
    {
      name: 'DesconectarUsuario',
      path: '/usuario/desconectar',
      component: DesconectarUsuario
    },
    {
      path: '*',
      redirect: 'MostrarProducto'
    }
];

 export default new VueRouter({ mode: 'history', routes: routes });
import VueRouter from "vue-router";

import CrearProducto from "./componentes/rutas/CrearProducto.vue";
import MostrarProducto from "./componentes/rutas/MostrarProducto.vue";
import EditarProducto from "./componentes/rutas/EditarProducto.vue";
import RegistrarUsuario from "./componentes/rutas/RegistrarUsuario.vue";
import ConectarUsuario from "./componentes/rutas/ConectarUsuario.vue";
import DesconectarUsuario from "./componentes/rutas/DesconectarUsuario.vue";

const routes = [
  {
    name: "MostrarProducto",
    path: "/productos/ver",
    component: MostrarProducto
  },
  {
    name: "CrearProducto",
    path: "/producto/crear",
    component: CrearProducto
  },
  {
    name: "EditarProducto",
    path: "/producto/editar/:id",
    component: EditarProducto
  },
  {
    name: "RegistrarUsuario",
    path: "/usuario/registrar",
    component: RegistrarUsuario
  },
  {
    name: "ConectarUsuario",
    path: "/",
    component: ConectarUsuario
  },
  {
    name: "DesconectarUsuario",
    path: "/usuario/desconectar",
    component: DesconectarUsuario
  },
  {
    path: "*",
    component: ConectarUsuario
  }
];

export default new VueRouter({ mode: "history", routes: routes });
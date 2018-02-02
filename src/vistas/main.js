import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueSession from 'vue-session'

import App from './App.vue'
import router from './rutas'

Vue.use(VueRouter);
Vue.use(VueAxios, Axios); 
Vue.use(VueSession);

 new Vue(Vue.util.extend({router}, App)).$mount('#app');
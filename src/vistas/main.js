import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import Axios from 'axios'
import VueSession from 'vue-session'

import App from './App.vue'
import router from './rutas'
import EventBus from './plugins/event-bus'

Vue.use(VueRouter);
Vue.use(VueAxios, Axios); 
Vue.use(VueSession);
Vue.use(EventBus)

 new Vue(Vue.util.extend({router}, App)).$mount('#app');
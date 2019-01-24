// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import stores from './stores/status'
import Utils from './providers/utils/utils'
import Global from './data/global'
import httpServer from './providers/http-server/http-server'
import api from './providers/http-server/api'
import './assets/css/api.css'
import './assets/css/aui-flex.css'
import './assets/css/aui.css'
import './assets/css/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(vuex)
Vue.use(ElementUI)

let store = new vuex.Store(stores)
Vue.prototype.httpServer = httpServer;
Vue.prototype.api = api;
Vue.prototype.Global =Global;
Vue.prototype.Utils =Utils;
Vue.prototype.axios =axios;
Vue.prototype.API1 ='/api';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

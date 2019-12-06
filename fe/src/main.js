// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment';
import swal from 'sweetalert2';
import Icon from 'vue-awesome/components/Icon';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import cfg from '../../cfg/cfg';
Vue.prototype.$axios = axios
Vue.prototype.$swal = swal
Vue.prototype.$cfg = cfg;
// Vue.use(swal2)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import '@/assets/style/theme/index.css'
import '@/assets/css/font-awesome.css'
import axios from "axios";
Vue.config.productionTip = false
axios.interceptors.response.use(response => {
  if (response.data.data === '用户未登陆'){
    toLogin()
  }
  return response
})
 function toLogin() {
  window.location.href='/userLogin'
}
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import '@/assets/style/theme/index.css'
import '@/assets/css/font-awesome.css'
import VueCropper from 'vue-cropper'
import axios from "axios";
import ElementUI from "element-ui";

Vue.config.productionTip = false
Vue.use(VueCropper)
axios.interceptors.response.use(response => {
  if (response.data.data === '用户未登陆') {
    toLogin()
  }
  if (response.data.data === '没有权限') {
    return ElementUI.Message.warning('没有权限')
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

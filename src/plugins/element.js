import Vue from 'vue'
import Element from 'element-ui'

Vue.use(Element)
Vue.prototype.$message = Element.Message
Vue.prototype.$confirm = Element.MessageBox.confirm

import "vue-toastification/dist/index.css";
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Toast from "vue-toastification";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(Toast);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

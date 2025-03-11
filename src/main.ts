import "vue-toastification/dist/index.css";
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Toast from "vue-toastification";
import "./plugins/axios"
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { worker } from "./mocks/browser";

Vue.config.productionTip = false
Vue.use(Toast);


async function initApp() {
  if (process.env.NODE_ENV === 'development') {
    await worker.start({ onUnhandledRequest: 'warn' });
  }

  new Vue({
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

initApp();
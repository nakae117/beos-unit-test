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

// Inicia MSW solo en desarrollo
console.log('NODE ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  console.log('[MSW] Mocking enabled. Starting worker...');
  worker.start({ onUnhandledRequest: 'warn' });
}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

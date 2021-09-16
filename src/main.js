import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  createProvider
} from './vue-apollo';
import {
  notification
} from "ant-design-vue";

//CSS
import './assets/main.css';
import './assets/antd.css';
import './assets/fabric.css';

//LAYOUT COMPONENTS
import DashboardLayout from './components/DashboardLayout.vue';
import EmptyLayout from './components/EmptyLayout.vue';

Vue.component('default-layout', DashboardLayout);
Vue.component('empty-layout', EmptyLayout);

Vue.config.productionTip = false;
Vue.config.performance = true;
//SETTEAR PARA QUE SALGAN LAS NOTIFICACIONES
Vue.prototype.$notification = notification;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
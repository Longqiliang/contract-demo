import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import Datemat from "./until/format";
//import 'amfe-flexible';
import Vant from 'vant';

import './assets/styles/index.scss';

Vue.use(Vant);

Vue.config.productionTip = false;
Vue.prototype.Datemat=Datemat
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

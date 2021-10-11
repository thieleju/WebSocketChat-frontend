import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

const socket = io(process.env.VUE_APP_BASE_URL, {
  reconnectionDelayMax: 10000,
});

Vue.use(axios);
Vue.use(VueSocketIOExt, socket, { store });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

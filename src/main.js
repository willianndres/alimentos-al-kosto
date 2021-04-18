import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import PrimeVue from "primevue/config";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(VueSweetalert2)
  .use(PrimeVue)
  .mount("#app");

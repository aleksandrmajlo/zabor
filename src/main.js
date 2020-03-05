import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import VTooltip from "v-tooltip";
Vue.use(VTooltip);



import numFormat from 'vue-filter-number-format';
Vue.filter('numFormat', numFormat);

Vue.config.productionTip = false;
import CalcOne from './components/CalcOne.vue';
new Vue({
  el: "#calc",
  store,
  components: {CalcOne},

});

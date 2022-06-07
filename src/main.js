import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './utils/api.js' // 导入api接口
import plug from './plug/app.js'
import utils from './utils/utils.js'
import $ from 'jquery'
import './assets/main.css'
import './assets/fonts/font.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// swiper 
import vueSwiper from 'vue-awesome-swiper'
//引入样式
import 'swiper/css/swiper.css'

// AOS 
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  easing: 'ease-out-back',
  duration: 1000,
  mirror: true,
})
// VueClipboard
import VueClipboard from 'vue-clipboard2'

Vue.use(ElementUI)
Vue.use(vueSwiper)
Vue.use(AOS)
Vue.use(VueClipboard)

Vue.config.productionTip = false;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
Vue.prototype.$api = api;
Vue.prototype.$plug = plug;
Vue.prototype.$utils = utils;


new Vue({
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(require('v-validate'));

new Vue({
  render: h => h(App),
}).$mount('#app')

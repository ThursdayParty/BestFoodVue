import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Notifications from 'vue-notification'
import GAuth from 'vue-google-oauth2'

Vue.use(BootstrapVue)
Vue.use(Notifications)

const gauthOption = {
  clientId: '912754414578-f4e09cd5sr1qu5pu80g2ge16votscel3.apps.googleusercontent.com',
  scope: 'profile email https://www.googleapis.com/auth/plus.login'
}
Vue.use(GAuth,gauthOption)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

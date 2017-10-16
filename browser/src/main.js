import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Router from './routes/Routes';
import VueMaterial from '../node_modules/vue-material'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'blue-grey',
      hue: 700,
    },
    accent: {
      color: 'yellow',
      hue: 200,
      textColor: 'black'
    }
  }
});

const dictionary = {
  pt: {
      custom: {
        email:{
          email: 'Insira um e-mail válido'
        },
        password: {
          min: 'A senha deve ter de 6 a 12 dígitos',
          max: 'A senha deve ter de 6 a 12 dígitos'
        }
      }
  }
};

VeeValidate.Validator.updateDictionary(dictionary);
VeeValidate.Validator.setLocale('pt');

let router = Router.router;
const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#container');
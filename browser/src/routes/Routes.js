import VueRouter from 'vue-router';
import Login from '../views/login/Login.vue';
import Home from '../views/home/Home.vue';
import HomeCommon from '../views/homeCommon/HomeCommon.vue';
import AdminScreen from '../views/adminScreen/AdminScreen.vue';
import CacheValues from '../utils/CacheValues';
const configs = require('../configs/RouterConfig.json');
const initial_routes = [
  { path: '/', component: Login}
];
const loged_routes = [
  {path: '/home', component: Home},
  {path: '/AdminScreen', component: AdminScreen},
  {path: '/homeCommon', component: HomeCommon, user_type: 'common'},
];
import SIOM from '../events/SIOM';

class Routes {
  constructor(configs) {
    configs.routes = Routes.add_init_routes(configs.routes);
    this._vueRouter = new VueRouter(configs);
    this._listeners = {
      'change_route': this.change_route.bind(this),
      'user_loged': this.user_loged.bind(this),
    };
    this.wiring();
  }

  get listeners() {
    return this._listeners;
  }

  static add_init_routes(routes) {
    return routes.concat(initial_routes);
  }

  get router() {
    return this._vueRouter;
  }

  add_routes(routes) {
    this.router.addRoutes(routes);
    this.change_route_no_historic(routes[0].path);
  }

  change_route_no_historic(route) {
    this.router.replace({path: route});
  }

  user_loged(user) {
    if (user.type === 'admin') {
      this.add_routes(loged_routes);
    } else {
      this.add_routes(Routes.get_routes_by_type(user.type));
    }
    CacheValues.updateData('user', user);
  }

  static get_routes_by_type(type) {
    let ret = [];
    for (let i = 0; i < loged_routes.length; i++) {
      if (loged_routes[i].user_type === type) {
        ret.push(loged_routes[i]);
      }
    }
    return ret;
  }

  change_route(route) {
    this.router.push({path: route});
  }

  wiring() {
    for (let event in this.listeners) {
      if (this.listeners.hasOwnProperty(event)) {
        SIOM.on(event, this.listeners[event]);
      }
    }
  }
}

export default new Routes(configs);
import CacheValues from './utils/CacheValues';
import Basic from './utils/BasicComponents';
import Sidenav from './componentes/navigation/Sidenav.vue';
class App extends Basic{
  constructor(){
    super('app');
    this.components = {
      'Sidenav': Sidenav,
    };
    this.data = {
      user: CacheValues.getData('user'),
    };
    this.wiring();
  }
}
export default new App().$vue;
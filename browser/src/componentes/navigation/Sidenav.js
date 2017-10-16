import Basic from '../../utils/BasicComponents';
import CacheValues from '../../utils/CacheValues';
class Sidenav extends Basic{
  constructor(){
    super('Sidenav');
    this.methods = {
      'toggleLeftSidenav': this.toggleLeftSidenav.bind(this),
      'go': this.go.bind(this),
    };
    this.data = {
      user: CacheValues.getData('user'),
    };
    this.wiring();
  }
  go(route){
    this.$instance.$router.push({path: route});
    this.toggleLeftSidenav();
  }
  toggleLeftSidenav(event) {
    this.$instance.$refs.leftSidenav.toggle();
  }
}
export default new Sidenav().$vue;
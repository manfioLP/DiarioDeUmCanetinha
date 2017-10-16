import Basic from '../../utils/BasicComponents';
import BasicAlert from "../../componentes/utilsComponents/BasicAlert.vue";
class Login extends Basic{
  constructor(){
    super('Login');
    this.components = {
      BasicAlert: BasicAlert
    };
    this.listeners = {
      'retorno_login': this.retorno_login.bind(this),
    };
    this.methods = {
      'logar': this.logar.bind(this),
    };
    this.data = {
      user: {
        email: '',
        password: '',
      },
    };
    this.wiring();
  }
  retorno_login(msg){
    if(msg.source !== this) return;
    if(!msg.datas.success){
      return this.components_controller.BasicAlert.open(msg.datas.data);
    }
    this.send_to_browser('user_loged', msg.datas.data)
  }
  logar(){
    this.send_to_server('logar', this.data.user, 'retorno_login');
  }
}
export default new Login().$vue;
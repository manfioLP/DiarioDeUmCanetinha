import Basic from '../../utils/BasicComponents';
class Home extends Basic{
  constructor(){
    super('HomeCommon');
    this.data = {
      home_text: "Esse cara não pode fazer nada, pois ele é um usuario comum, ou seja, um lixo."
    };
    this.wiring();
  }
}
export default new Home().$vue;
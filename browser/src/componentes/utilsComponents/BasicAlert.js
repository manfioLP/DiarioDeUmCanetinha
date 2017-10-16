import Basic from '../../utils/BasicComponents';
class BasicAlert extends Basic {
  constructor(){
    super('Basic');
    this.methods = {
      callMethod: this.callMethod.bind(this)
    };
    this.data = {
      modal: {
        title: '',
        description: '',
        buttons: [],
      }
    };
    this.wiring();
  }
  open(data) {
    this.data.modal = data;
    this.$instance.$refs['basicAlert'].open();
  }
  closeDialog() {
    this.$instance.$refs['basicAlert'].close();
  }
  teste(){
    console.log('deu boa aqui, babaca');
  }
  teste_outro(){
    console.log('caralho esse metho existe');
  }
  callMethod(method){
    console.log('o metodo', method);
    if(!method){
      this.closeDialog();
    } else {
      this[method]();
    }
  }
}
export default new BasicAlert().$vue;
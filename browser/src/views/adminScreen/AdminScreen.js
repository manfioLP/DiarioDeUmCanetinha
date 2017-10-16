import Basic from '../../utils/BasicComponents';
class AdminScreen extends Basic {
  constructor() {
    super('AdminScreen');
    this.methods = {};

    this.wiring();
  }
}

export default new AdminScreen().$vue;
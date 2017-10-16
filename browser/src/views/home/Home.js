import Basic from '../../utils/BasicComponents';
const text = require('../../utils/HomeText.json').text;
class Home extends Basic{
  constructor(text){
    super('Home');
    this.data = {
      home_text: text
    };
    this.wiring();
  }
}
export default new Home(text).$vue;
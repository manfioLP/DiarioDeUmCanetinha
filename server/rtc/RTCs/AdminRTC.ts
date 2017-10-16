import {BasicRTC} from '../BasicRTC';
import {AdminHandler} from '../../handlers/AdminHandler';

export class AdminRTC extends BasicRTC {

  /**
   * Recebe o socketId passado pelo client.
   *
   * @param conf
   */
  constructor(conf, msg, openRTC) {
    super('admin', new AdminHandler(), conf);

    openRTC.destroy();

    this.interfaceListeners = {
      'logout': this.logout.bind(this),
    };

    this.emit_to_browser(msg);
    this.wiring();
  }

  set handler(handler: AdminHandler) {
    this._handler = handler;
  }

  get handler(): AdminHandler {
    return this._handler;
  }

  set interfaceListeners(interfaceListeners: object) {
    this._interfaceListeners = interfaceListeners;
  }

  get interfaceListeners(): object {
    return this._interfaceListeners;
  }

  async logout(msg) {

    msg.datas = await this.handler.logout();

    this.emit_to_browser(msg);

    this.destroy();
  }
}

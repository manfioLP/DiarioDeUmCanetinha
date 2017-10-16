import * as path from "path";

const messages = require(path.resolve("util/messages.json")).rtc;

export abstract class BasicRTC {
  protected _handler;
  private _config: any;
  private _socket: any;
  protected _active_user: object;
  protected _interfaceListeners: object;
  protected _interval: any;
  protected _forecast: any;

  constructor(rtcNome, handler, config) {
    this.handler = handler;
    this.config = config;
    this.socket = this.config.socket;

    // Todo, temporario...
    console.log('conectado no rtc', rtcNome);
  }

  abstract set interfaceListeners(interfaceListeners);

  abstract get interfaceListeners();

  abstract set handler(handler);

  abstract get handler();


  get config(): any {
    return this._config;
  }

  set config(value: any) {
    this._config = value;
  }

  get socket(): any {
    return this._socket;
  }

  set socket(value: any) {
    this._socket = value;
  }

  get interval(): any {
    return this._interval;
  }

  set interval(value: any) {
    this._interval = value;
  }

  get forecast(): any {
    return this._forecast;
  }

  set forecast(value: any) {
    this._forecast = value;
  }

  set active_user(active_user: any) {
    this._active_user = active_user;
  }

  get active_user(): any {
    return this._active_user;
  }

  basic_verification(msg, data) {
    if (this.active_user.tipo === 0) {
      return this.first_verification_failed(msg, messages.type_of_agent.ROOT_AGENT);
    } else if (data._id !== this.active_user.id) {
      return this.first_verification_failed(msg, messages.incorrect_info.ID);
    }
    return true;
  }

  first_verification_failed(msg, error) {
    msg.datas = {
      success: false,
      data: error
    };
    this.emit_to_browser(msg);
  }

  start_counter(forecast) {
    this.forecast = forecast;
    this.interval = setInterval(this.counter(), 60000);
  }

  stop_counter() {
    clearInterval(this.interval);
  }

  protected counter() {
    let timer = new Date().getTime();
    if (timer >= (this.forecast - 600000)) {
      // TODO: SEND WARNING
      this.stop_counter();
    }
  }

  async rtc_set_previsao(msg) {
    let data = msg.datas;
    if (this.basic_verification(msg, data) === true) {
      this.stop_counter();
      let instant_time = new Date().getTime();
      if (data.hour <= instant_time) {
        return this.first_verification_failed(msg, messages.previsao.TOO_LOW_VALUE);
      } else if (data.hour >= this.active_user.mes_atual.day.hora_entrada + 172800000) {
        return this.first_verification_failed(msg, messages.previsao.TOO_HIGH_VALUE);
      }
      data.month_id = this.active_user.mes_atual.id;
      msg.datas = await this.handler.set_previsao(data);
      if (msg.datas.success) {
        this.active_user.mes_atual.day.hora_previsao =
          msg.datas.data.hora_previsao;
        //TODO: arrumar contador
        // this.start_counter(msg.datas.data.hora_previsao);
      }
      this.emit_to_browser(msg);
    }
  }

  async rtc_set_exit_time(msg) {
    let data = msg.datas;
    if (this.basic_verification(msg, data) === true) {
      let instant_time = new Date().getTime();
      if (data.hour <= instant_time) {
        return this.first_verification_failed(msg, messages.exit_time.TOO_LOW_VALUE);
      } else if (data.hour >= this.active_user.mes_atual.day.hora_entrada + 172800000) {
        return this.first_verification_failed(msg, messages.exit_time.TOO_HIGH_VALUE);
      }
      data.month_id = this.active_user.mes_atual.id;
      let monthly_hours = this.active_user.mes_atual.monthly_hours;
      let entry_hour = this.active_user.mes_atual.day.hora_entrada;
      msg.datas = await this.handler.set_exit_time(data, monthly_hours, entry_hour);
      if (msg.datas.success) {
        if (data.type === 0) {
          this.emit_to_browser(msg);
          return this.destroy();
        }
        this.active_user.mes_atual.monthly_hours = msg.datas.data.horas_mensais;
        this.active_user.mes_atual.day = null;
      }
      this.emit_to_browser(msg);
    }
  }

  async rtc_set_new_entry(msg) {
    let data = msg.datas;
    if (this.basic_verification(msg, data) === true) {
      if (this.active_user.mes_atual.day) {
        return this.first_verification_failed(msg, messages.new_entry.ACTIVE_DAY);
      }
      msg.datas = await this.handler.set_new_entry(data);
      if (msg.datas.success) {
        msg.datas.data.mes_atual.id = msg.datas.data.mes_atual.id.id;
        this.active_user.mes_atual = msg.datas.data.mes_atual;
      }
      this.emit_to_browser(msg);
    }
  }

  async rtc_update_basic_info(msg) {
    let data = msg.datas;
    if (this.basic_verification(msg, data) === true) {
      msg.datas = await this.handler.update_basic_info(data);
    }
    if (msg.datas.success) {
      let updated_data = msg.datas.data;
      this.active_user.nome = updated_data.nome;
      this.active_user.sobrenome = updated_data.sobrenome;
      this.active_user.numero_celular = updated_data.numero_celular;
      this.active_user.email = updated_data.email;
    }
    this.emit_to_browser(msg);
  }

  async rtc_update_password(msg) {
    let data = msg.datas;
    if (this.basic_verification(msg, data) === true) {
      msg.datas = await this.handler.update_password(data);
    }
    this.emit_to_browser(msg);
  }

  /**
   * Funcao responsavel por passar para o client o retorno dos pedidos dele.
   * @param dado
   */
  emit_to_browser(dado) {
    this.socket.emit('retorno', dado);
  }

  /**
   * Destroy o objeto, desconectando ele de todos os eventos.
   */
  destroy() {
    for (let event in this.interfaceListeners) {
      if (this.interfaceListeners.hasOwnProperty(event)) {
        this.socket.removeListener(event, this.interfaceListeners[event]);
      }
    }
  }

  /**
   * Liga os eventos do interfaceListeners no socket.
   */
  wiring() {
    this.interfaceListeners['disconnect'] = this.destroy.bind(this);

    for (let name in this.interfaceListeners) {
      if (this.interfaceListeners.hasOwnProperty(name)) {
        this.socket.on(name, this.interfaceListeners[name]);
      }
    }
  }
}
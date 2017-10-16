import {BasicHandler} from "./BasicHandler";
import {QueryObject} from "./util_handler/QueryObject";

export class BarrierHandler extends BasicHandler {
    async verifica_user_e_logado(id_user) {
        let query = {_id: id_user};
        let pesquisa_user = new QueryObject(query);
        let ret = await this.emit_to_server('db.cliente.read', pesquisa_user);
        let usuario_retorno = this.retorno(ret.data);

        if (!usuario_retorno.success) {
            usuario_retorno.success = false;
            return usuario_retorno;
        } else if (usuario_retorno.data.length < 1 || usuario_retorno.data[0].desativado) {
            usuario_retorno.success = false;
            usuario_retorno.data = "Authentication-key é invalida.";
            } else if (!usuario_retorno.data[0].logado) {
              usuario_retorno.success = false;
              usuario_retorno.data = "Efetue o login para continuar.";
        }

        return usuario_retorno;
    }
}
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Source_1 = require("../events/Source");
var mongoose_1 = require("mongoose");
var BasicManager = (function (_super) {
    __extends(BasicManager, _super);
    function BasicManager() {
        var _this = _super.call(this) || this;
        _this.wiring();
        return _this;
    }
    //noinspection JSMethodCanBeStatic
    /**
     * Método chamado antes do create para fazer as operações necessárias com o(s)
     * dado(s) do(s) objeto(s) que será(ão) criado(s)
     *
     * @param data
     */
    BasicManager.prototype.beforeCreate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                if (Array.isArray(data)) {
                    for (i = 0; i < data.length; ++i) {
                        data[i]._id = data[i]._id ? new mongoose_1.Types.ObjectId(data[i]._id) : new mongoose_1.Types.ObjectId();
                        data[i].id = data[i]._id.toString();
                    }
                }
                else {
                    data._id = data._id ? new mongoose_1.Types.ObjectId(data._id) : new mongoose_1.Types.ObjectId();
                    data.id = data._id.toString();
                }
                return [2 /*return*/, data];
            });
        });
    };
    //noinspection JSMethodCanBeStatic
    /**
     * Realiza operações necessárias
     *
     * @param data
     */
    BasicManager.prototype.afterCreate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                for (i = 0; i < data.length; i++) {
                    data[i] = data[i].toJSON();
                }
                return [2 /*return*/, data];
            });
        });
    };
    /**
     * Cria um novo documento no banco.
     *
     * @param data
     */
    BasicManager.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var dados, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.beforeCreate(data)];
                    case 1:
                        dados = _a.sent();
                        return [4 /*yield*/, this.model.create(dados)];
                    case 2:
                        ret = _a.sent();
                        return [4 /*yield*/, this.afterCreate(Array.isArray(ret) ? ret : [ret])];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BasicManager.prototype.handleCreate = function (msg) {
        var _this = this;
        if (msg.source_id === this.id)
            return;
        this.create(msg.data.success).then(function (ret) {
            _this.answer(msg.id, "create", ret, null);
        })["catch"](function (error) {
            console.error(error);
            _this.answer(msg.id, "create", null, error);
        });
    };
    //noinspection JSMethodCanBeStatic
    /**
     * Faz tratamentos necesários nos dados antes de executar o read
     *
     * @param data
     */
    BasicManager.prototype.beforeRead = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    //noinspection JSMethodCanBeStatic
    /**
     * Faz as modificações/operações necessárias no retorno do read
     *
     * @param data
     */
    BasicManager.prototype.afterRead = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                if (Array.isArray(data)) {
                    for (i = 0; i < data.length; ++i) {
                        delete data[i]._id;
                    }
                }
                else {
                    delete data._id;
                }
                return [2 /*return*/, data];
            });
        });
    };
    /**
     * Le um ou todos os documentos de uma determinada colecao no banco.
     *
     * @param data
     */
    BasicManager.prototype.read = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result, limit, page, select, populate, ret, read_query, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        limit = data.limit || 25;
                        page = data.page || 1;
                        select = data.select ? 'id ' + data.select : '';
                        populate = data.populate || '';
                        if (!(data.id && !data.query)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model
                                .findById(data._id)
                                .select(select)
                                .populate(populate)
                                .lean()
                                .exec()];
                    case 1:
                        ret = _a.sent();
                        if (ret)
                            return [2 /*return*/, ret];
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.beforeRead(data.query)];
                    case 3:
                        read_query = _a.sent();
                        query = this.model
                            .find(read_query)
                            .limit(limit)
                            .select(select)
                            .populate(populate)
                            .skip(limit * (page - 1))
                            .lean();
                        return [4 /*yield*/, query.exec()];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.afterRead(result)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BasicManager.prototype.handleRead = function (msg) {
        var _this = this;
        if (msg.source_id === this.id)
            return;
        this.read(msg.data.success).then(function (ret) {
            _this.answer(msg.id, "read", ret, null);
        })["catch"](function (error) {
            _this.answer(msg.id, "read", null, error);
        });
    };
    //noinspection JSMethodCanBeStatic
    /**
     * Faz verificações e/ou operações necessárias com os dados recebidos para
     * update
     *
     * @param data
     */
    BasicManager.prototype.beforeUpdate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    //noinspection JSMethodCanBeStatic
    BasicManager.prototype.afterUpdate = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                for (i = 0; i < data.length; i++) {
                    data[i] = data[i].toJSON();
                }
                return [2 /*return*/, data];
            });
        });
    };
    /**
     * Modifica um documento em uma determinada colecao.
     *
     * @param data
     */
    BasicManager.prototype.update = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result, options, dados;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        options = { "new": true, "runValidators": true };
                        return [4 /*yield*/, this.beforeUpdate(data)];
                    case 1:
                        dados = _a.sent();
                        if (!(data._id && !dados.hasOwnProperty("query"))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.model.findByIdAndUpdate(dados._id, dados.update, options)];
                    case 2:
                        result = [_a.sent()];
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.model.update(dados.query, dados.update, options)];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.afterUpdate(result)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BasicManager.prototype.handleUpdate = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (msg.source_id === this.id)
                    return [2 /*return*/];
                this.update(msg.data.success).then(function (ret) {
                    _this.answer(msg.id, "update", ret, null);
                })["catch"](function (error) {
                    _this.answer(msg.id, "update", null, error);
                });
                return [2 /*return*/];
            });
        });
    };
    //noinspection JSMethodCanBeStatic
    BasicManager.prototype.beforeDelete = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, data];
            });
        });
    };
    //noinspection JSMethodCanBeStatic
    BasicManager.prototype.afterDelete = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, result];
            });
        });
    };
    //noinspection ReservedWordAsName
    /**
     * Destroi um documento em uma determinada colecao.
     *
     * @param data
     */
    BasicManager.prototype["delete"] = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result, dados;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        if (!data._id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model.findByIdAndRemove(data._id)];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.beforeDelete(data)];
                    case 3:
                        dados = _a.sent();
                        return [4 /*yield*/, this.model.remove(dados)];
                    case 4:
                        result = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.afterDelete(result)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BasicManager.prototype.handleDelete = function (msg) {
        var _this = this;
        if (msg.source_id === this.id)
            return;
        this["delete"](msg.data.success).then(function (ret) {
            _this.answer(msg.id, "delete", ret, null);
        })["catch"](function (error) {
            _this.answer(msg.id, "delete", null, error);
        });
    };
    BasicManager.prototype.handleExists = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var query, exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (msg.source_id === this.id)
                            return [2 /*return*/];
                        query = msg.getData().success;
                        return [4 /*yield*/, this.exists(query)];
                    case 1:
                        exists = _a.sent();
                        this.answer(msg.id, "exists", exists, null);
                        return [2 /*return*/];
                }
            });
        });
    };
    BasicManager.prototype.exists = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.count(query)];
                    case 1:
                        count = _a.sent();
                        return [2 /*return*/, count > 0];
                }
            });
        });
    };
    BasicManager.prototype.handleCount = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var data, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (msg.source_id === this.id)
                            return [2 /*return*/];
                        data = msg.data.success;
                        return [4 /*yield*/, this.model.count(data)];
                    case 1:
                        count = _a.sent();
                        this.answer(msg.id, "count", count, null);
                        return [2 /*return*/];
                }
            });
        });
    };
    BasicManager.prototype.count = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.count(query).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // handleAggregate(msg) {
    //     // if (msg.source_id === this.id) return;
    //     //
    //     // this.answer(msg.id, "aggregate", ret, null);
    // }
    /**
     * Função para responder a mensagem
     *
     * @param id_mensagem
     * @param evento
     * @param success
     * @param error
     */
    BasicManager.prototype.answer = function (id_mensagem, evento, success, error) {
        var dados = {
            success: success,
            error: error
        };
        this.hub.send(this, "db." + this.event_name + "." + evento, dados, id_mensagem);
    };
    /**
     * Funcao responsavel por ligar os eventos escutados por esse documento.
     */
    BasicManager.prototype.wiring = function () {
        this.hub.on("db." + this.event_name + ".create", this.handleCreate.bind(this));
        this.hub.on("db." + this.event_name + ".read", this.handleRead.bind(this));
        this.hub.on("db." + this.event_name + ".update", this.handleUpdate.bind(this));
        this.hub.on("db." + this.event_name + ".delete", this.handleDelete.bind(this));
        this.hub.on("db." + this.event_name + ".exists", this.handleExists.bind(this));
        this.hub.on("db." + this.event_name + ".count", this.handleCount.bind(this));
        // this.hub.on("db." + this.event_name + ".aggregate", this.handleAggregate.bind(this));
        this.wire_custom_listeners();
    };
    return BasicManager;
}(Source_1.Source));
exports.BasicManager = BasicManager;

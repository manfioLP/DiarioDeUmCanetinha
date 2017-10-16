"use strict";
exports.__esModule = true;
var BBPromise = require("bluebird");
var node_uuid_1 = require("node-uuid");
var Hub_1 = require("./Hub");
var Message = (function () {
    function Message(source_id, event, data, previous_message) {
        this.id = node_uuid_1.v4();
        this.data = data; // {error: error, success: success}
        this.source_id = source_id;
        this.previous_message = previous_message;
        this.event = event;
    }
    Object.defineProperty(Message.prototype, "source_id", {
        get: function () {
            return this._source_id;
        },
        set: function (source_id) {
            this._source_id = source_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "previous_message", {
        get: function () {
            return this._previous_message;
        },
        set: function (previous_message) {
            this._previous_message = previous_message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            if (!data || !data.hasOwnProperty('success') || !data.hasOwnProperty('error'))
                throw new Error("Mensagem no formato incorreto. \n\t\t\t\t\t\t\t\t\t\t\t Esperado: {success: any, error: any}. \n\t\t\t\t\t\t\t\t\t\t\t Recebido " + JSON.stringify(data));
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "event", {
        get: function () {
            return this._event;
        },
        set: function (event) {
            this._event = event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "promise", {
        get: function () {
            var _this = this;
            if (this._promise)
                return this._promise;
            var hub = Hub_1.Hub.getInstance();
            var promiseHandler = null;
            this.promise = new BBPromise(function (resolve) {
                promiseHandler = function (message) {
                    if (_this.id === message.previous_message) {
                        hub.un(_this.event, promiseHandler);
                        return resolve(message);
                    }
                };
            });
            hub.on(this.event, promiseHandler);
            this.promise.timeout(30000)["catch"](function (e) {
                console.log("error", e);
                hub.un(_this.event, promiseHandler);
            });
            return this._promise;
        },
        set: function (promise) {
            this._promise = promise;
        },
        enumerable: true,
        configurable: true
    });
    return Message;
}());
exports.Message = Message;

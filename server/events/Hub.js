"use strict";
exports.__esModule = true;
var eventemitter2_1 = require("eventemitter2");
var Message_1 = require("./Message");
var BBPromise = require("bluebird");
var Source_1 = require("./Source");
var fs = require("fs");
var Hub = (function () {
    function Hub() {
        var config = fs.readFileSync("config.json");
        this.eventemitter = new eventemitter2_1.EventEmitter2(config);
    }
    /**
     * Adds a listener to the end of the listeners array for the specified event.
     * @param event
     * @param listener
     */
    Hub.prototype.on = function (event, listener) {
        this.eventemitter.on(event, listener);
        return this;
    };
    /**
     * Adds a one time listener for the event.
     * The listener is invoked only the first time the event is fired, after which it is removed.
     * @param event
     * @param listener
     */
    Hub.prototype.once = function (event, listener) {
        this.eventemitter.once(event, listener);
        return this;
    };
    /**
     * Remove a listener from the listener array for the specified event.
     * Caution: changes array indices in the listener array behind the listener.
     * @param event
     * @param listener
     */
    Hub.prototype.un = function (event, listener) {
        this.eventemitter.off(event, listener);
        return this;
    };
    /**
     * Send a message into the HUB.
     *
     * @param source
     * @param event
     * @param data
     * @param previous
     * @return {Message}
     */
    Hub.prototype.send = function (source, event, data, previous) {
        var _this = this;
        if (!source || (typeof source !== "object" && !(source instanceof Source_1.Source))) {
            throw new Error("To send message through Hub, the source is required " +
                "and must extend Source");
        }
        var msg = new Message_1.Message(source.id, event, data, previous);
        process.nextTick(function () {
            try {
                _this.eventemitter.emit(event, msg);
            }
            catch (e) {
                console.error("Tentando enviar dados para um HUB Destruido", event, source, e);
            }
        });
        return msg;
    };
    Hub.prototype.destroy = function () {
        var _this = this;
        return new BBPromise(function (resolve) {
            Hub.instance = null;
            _this.eventemitter.removeAllListeners();
            _this.eventemitter = null;
            resolve(true);
        });
    };
    Hub.getInstance = function () {
        if (!Hub.instance) {
            Hub.instance = new Hub();
        }
        return Hub.instance;
    };
    return Hub;
}());
exports.Hub = Hub;

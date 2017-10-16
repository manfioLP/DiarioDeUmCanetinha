"use strict";
exports.__esModule = true;
var Hub_1 = require("./Hub");
var node_uuid_1 = require("node-uuid");
var Source = (function () {
    function Source() {
        this.id = node_uuid_1.v4();
        this.hub = Hub_1.Hub.getInstance();
    }
    Object.defineProperty(Source.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (uuid) {
            this._id = uuid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Source.prototype, "hub", {
        get: function () {
            return this._hub;
        },
        set: function (hub) {
            this._hub = hub;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Call this method everytime, to avoid leak on the HUB. if you like
     * to override this,
     * call super.destroy after your code.
     */
    Source.prototype.destroy = function () {
        this.hub.send(this, "hub.core.source.destroyed", {
            error: null,
            success: this.id
        });
        this.id = null;
    };
    return Source;
}());
exports.Source = Source;

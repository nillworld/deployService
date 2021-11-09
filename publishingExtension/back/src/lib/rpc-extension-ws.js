"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcExtensionWebSockets = void 0;
var rpc_common_1 = require("./rpc-common");
var noop_logger_1 = require("./noop-logger");
var RpcExtensionWebSockets = /** @class */ (function (_super) {
    __extends(RpcExtensionWebSockets, _super);
    function RpcExtensionWebSockets(ws, logger) {
        if (logger === void 0) { logger = noop_logger_1.noopLogger; }
        var _this = _super.call(this, logger.getChildLogger({ label: RpcExtensionWebSockets.className })) || this;
        _this.logger = logger.getChildLogger({ label: RpcExtensionWebSockets.className });
        _this.ws = ws;
        _this.ws.on('message', function (message) {
            // assuming message is a stringified JSON
            var messageObject = JSON.parse(message);
            _this.logger.debug("Event Listener: Received event: " + message);
            switch (messageObject.command) {
                case 'rpc-response':
                    _this.handleResponse(messageObject);
                    break;
                case 'rpc-request':
                    _this.handleRequest(messageObject);
                    break;
            }
        });
        return _this;
    }
    RpcExtensionWebSockets.prototype.sendRequest = function (id, method, params) {
        var _this = this;
        // consider cancelling the timer if the promise if fulfilled before timeout is reached
        setTimeout(function () {
            var promiseCallbacks = _this.promiseCallbacks.get(id);
            if (promiseCallbacks) {
                _this.logger.warn("sendRequest: Request " + id + " method " + method + " has timed out");
                promiseCallbacks.reject('Request timed out');
                _this.promiseCallbacks.delete(id);
            }
        }, this.timeout);
        var requestObject = {
            command: 'rpc-request',
            id: id,
            method: method,
            params: params,
        };
        this.ws.send(JSON.stringify(requestObject));
    };
    RpcExtensionWebSockets.prototype.sendResponse = function (id, response, success) {
        if (success === void 0) { success = true; }
        var responseObject = {
            command: 'rpc-response',
            id: id,
            response: response,
            success: success,
        };
        this.ws.send(JSON.stringify(responseObject));
    };
    RpcExtensionWebSockets.className = 'RpcExtensionWebSockets';
    return RpcExtensionWebSockets;
}(rpc_common_1.RpcCommon));
exports.RpcExtensionWebSockets = RpcExtensionWebSockets;

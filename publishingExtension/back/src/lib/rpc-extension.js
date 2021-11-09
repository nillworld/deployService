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
exports.RpcExtension = void 0;
var rpc_common_1 = require("./rpc-common");
var noop_logger_1 = require("./noop-logger");
var RpcExtension = /** @class */ (function (_super) {
    __extends(RpcExtension, _super);
    function RpcExtension(webview, logger) {
        if (logger === void 0) { logger = noop_logger_1.noopLogger; }
        var _this = _super.call(this, logger.getChildLogger({ label: RpcExtension.className })) || this;
        _this.logger = logger.getChildLogger({ label: RpcExtension.className });
        _this.webview = webview;
        _this.webview.onDidReceiveMessage(function (message) {
            _this.logger.debug("Event Listener: Received event: " + JSON.stringify(message));
            switch (message.command) {
                case "rpc-response":
                    _this.handleResponse(message);
                    break;
                case "rpc-request":
                    _this.handleRequest(message);
                    break;
            }
        });
        return _this;
    }
    RpcExtension.prototype.sendRequest = function (id, method, params) {
        var _this = this;
        // consider cancelling the timer if the promise if fulfilled before timeout is reached
        setTimeout(function () {
            var promiseCallbacks = _this.promiseCallbacks.get(id);
            if (promiseCallbacks) {
                _this.logger.warn("sendRequest: Request " + id + " method " + method + " has timed out");
                promiseCallbacks.reject("Request timed out");
                _this.promiseCallbacks.delete(id);
            }
        }, this.timeout);
        this.webview.postMessage({
            command: "rpc-request",
            id: id,
            method: method,
            params: params
        });
    };
    RpcExtension.prototype.sendResponse = function (id, response, success) {
        if (success === void 0) { success = true; }
        this.webview.postMessage({
            command: "rpc-response",
            id: id,
            response: response,
            success: success
        });
    };
    RpcExtension.className = "RpcExtension";
    return RpcExtension;
}(rpc_common_1.RpcCommon));
exports.RpcExtension = RpcExtension;

"use strict";
/* must specify ".js" for import in browser to locate rpc-common.js
 see: https://github.com/microsoft/TypeScript/issues/16577#issuecomment-343610106
*/
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
exports.RpcBrowser = void 0;
var rpc_common_js_1 = require("./rpc-common.js");
var noop_logger_1 = require("./noop-logger");
var RpcBrowser = /** @class */ (function (_super) {
    __extends(RpcBrowser, _super);
    function RpcBrowser(window, vscode, logger) {
        if (logger === void 0) { logger = noop_logger_1.noopLogger; }
        var _this = _super.call(this, logger.getChildLogger({ label: RpcBrowser.className })) || this;
        _this.logger = logger.getChildLogger({ label: RpcBrowser.className });
        _this.window = window;
        _this.vscode = vscode;
        _this.window.addEventListener("message", function (event) {
            var message = event.data;
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
    RpcBrowser.prototype.sendRequest = function (id, method, params) {
        var _this = this;
        // TODO: consider cancelling the timer if the promise if fulfilled before timeout is reached
        setTimeout(function () {
            var promiseCallbacks = _this.promiseCallbacks.get(id);
            if (promiseCallbacks) {
                promiseCallbacks.reject("Request timed out");
                _this.promiseCallbacks.delete(id);
            }
        }, this.timeout);
        // TODO: find an alternative to appending vscode to the global scope (perhaps providing vscode as parameter to constructor)
        this.vscode.postMessage({
            command: "rpc-request",
            id: id,
            method: method,
            params: params
        });
    };
    RpcBrowser.prototype.sendResponse = function (id, response, success) {
        if (success === void 0) { success = true; }
        this.vscode.postMessage({
            command: "rpc-response",
            id: id,
            response: response,
            success: success
        });
    };
    RpcBrowser.className = "RpcBrowser";
    return RpcBrowser;
}(rpc_common_js_1.RpcCommon));
exports.RpcBrowser = RpcBrowser;

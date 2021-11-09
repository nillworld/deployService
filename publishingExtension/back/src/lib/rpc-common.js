"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcCommon = void 0;
var RpcCommon = /** @class */ (function () {
    function RpcCommon(logger) {
        // TODO: timeouts do not make sense for user interactions. consider not using timeouts by default
        this.timeout = 3600000; // timeout for response from remote in milliseconds
        this.promiseCallbacks = new Map();
        this.methods = new Map();
        this.baseLogger = logger.getChildLogger({ label: 'RpcCommon' });
        this.registerMethod({ func: this.listLocalMethods, thisArg: this });
    }
    RpcCommon.prototype.setResponseTimeout = function (timeout) {
        this.timeout = timeout;
    };
    RpcCommon.prototype.registerMethod = function (method) {
        this.methods.set(method.name ? method.name : method.func.name, method);
    };
    RpcCommon.prototype.unregisterMethod = function (method) {
        this.methods.delete(method.name ? method.name : method.func.name);
    };
    RpcCommon.prototype.listLocalMethods = function () {
        return Array.from(this.methods.keys());
    };
    RpcCommon.prototype.listRemoteMethods = function () {
        return this.invoke('listLocalMethods');
    };
    RpcCommon.prototype.invoke = function (method, params) {
        var _this = this;
        // TODO: change to something more unique (or check to see if id doesn't already exist in this.promiseCallbacks)
        var id = Math.random();
        var promise = new Promise(function (resolve, reject) {
            _this.promiseCallbacks.set(id, { resolve: resolve, reject: reject });
        });
        this.sendRequest(id, method, params);
        return promise;
    };
    RpcCommon.prototype.handleResponse = function (message) {
        var promiseCallbacks = this.promiseCallbacks.get(message.id);
        if (promiseCallbacks) {
            this.baseLogger.trace("handleResponse: processing response for id: " + message.id + " message success flag is: " + message.success);
            if (message.success) {
                promiseCallbacks.resolve(message.response);
            }
            else {
                this.baseLogger.warn("handleResponse: Message id " + message.id + " rejected, response: " + message.response);
                promiseCallbacks.reject(message.response);
            }
            this.promiseCallbacks.delete(message.id);
        }
    };
    RpcCommon.prototype.handleRequest = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var method, func, thisArg, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = this.methods.get(message.method);
                        this.baseLogger.trace("handleRequest: processing request id: " + message.id + " method: " + message.method + " parameters: " + JSON.stringify(message.params));
                        if (!method) return [3 /*break*/, 5];
                        func = method.func;
                        thisArg = method.thisArg;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        response = func.apply(thisArg, message.params);
                        if (!(response && typeof response.then === 'function')) return [3 /*break*/, 3];
                        return [4 /*yield*/, response];
                    case 2:
                        response = _a.sent();
                        _a.label = 3;
                    case 3:
                        this.sendResponse(message.id, response);
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        this.baseLogger.error("handleRequest: Failed processing request " + message.command + " id: " + message.id, {
                            error: err_1,
                        });
                        this.sendResponse(message.id, err_1, false);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return RpcCommon;
}());
exports.RpcCommon = RpcCommon;

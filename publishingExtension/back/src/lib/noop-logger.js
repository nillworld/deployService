"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noopLogger = void 0;
var NO_OPERATION = function () { };
/**
 * Empty Implementation of the Logger in case none is provided via Dependency Injection.
 * An alternative implementation could log to the console or provide another (real) implementation.
 *
 * @type {IChildLogger}
 */
exports.noopLogger = {
    fatal: NO_OPERATION,
    error: NO_OPERATION,
    warn: NO_OPERATION,
    info: NO_OPERATION,
    debug: NO_OPERATION,
    trace: NO_OPERATION,
    getChildLogger: function () {
        return exports.noopLogger;
    }
};

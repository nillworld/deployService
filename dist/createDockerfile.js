"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var imgName = "testDockerImg";
var programVersion = "node:6.2.2";
var author = "tobesoft@tobesoft.com";
var workDir = "/app";
var setScripts = "npm start";
fs.writeFile('../workspace/Dockerfile', "\nFROM " + programVersion + "\nLABEL name=\"" + author + "\"\nRUN mkdir -p /app\nWORKDIR " + workDir + "\nADD . /app\nRUN npm install\nENV NODE_ENV development\nEXPOSE 3000 80\nCMD " + setScripts + "\n", function (err) {
    if (err === null) {
        console.log('success');
    }
    else {
        console.log('fail');
    }
});

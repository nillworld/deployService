import * as vscode from 'vscode';

interface IFunctions {
  [key: string]: any; //Object.keys(obj).forEach((key)=>{rpc.registerMethod({func:obj[key]})})
}

export const functions: IFunctions = {};

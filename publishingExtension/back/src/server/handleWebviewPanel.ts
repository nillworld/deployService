import * as vscode from 'vscode';
import * as path from 'path';
import { readFileSync } from 'fs';
import { RpcExtension } from '../lib/rpc-extension';
import { functions } from '../functions';

export class handleWebviewPanel {
	public webviewPanel: vscode.WebviewPanel | null;
	public rpc: RpcExtension | undefined;

	constructor() {
		this.webviewPanel = null;
	}

	public async setWebviewPanel(context: vscode.ExtensionContext) {
		// TODO
		// dispose 로직

		const panel = vscode.window.createWebviewPanel('test', 'Test', vscode.ViewColumn.One, {
		localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))], // 허가된 로컬리소스 경로(보안 문제, 익스텐션 경로에서만 허용)
		enableScripts: true, // 익스텐션상에서 자바스크립트 허용
		retainContextWhenHidden: true, // 익스텐션 창이 백그라운드로 넘어갔을 때 웹뷰의 state 유지
		});

		// init

		// media 경로
		const mediaPath = path.join(context.extensionPath, 'media');

		// read
		let htmlContent = readFileSync(path.join(mediaPath, 'index.html'), 'utf8');

		// Uri
		const webviewPath = panel.webview.asWebviewUri(vscode.Uri.file(mediaPath));

		// 변환
		if (htmlContent) {
		htmlContent = htmlContent
			.replace(/<link href=/g, `<link href=${webviewPath.toString()}`)
			.replace(/<script src=/g, `<script src=${webviewPath.toString()}`)
			.replace(/<img src=/g, `<img src=${webviewPath.toString()}`);
		}

		// set
		panel.webview.html = htmlContent;

		this.webviewPanel = panel;

		this.rpc = new RpcExtension(panel.webview);

		this.initRpc(this.rpc);
	}

	private initRpc(rpc: RpcExtension) {
		Object.keys(functions).forEach((key) => {
		rpc.registerMethod({ func: functions[key] });
		});
	}
}

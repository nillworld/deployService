import * as vscode from 'vscode';
import { handleWebviewPanel } from './handleWebviewPanel';

export function activate(context: vscode.ExtensionContext) {
  const handleWebviewPanelIns = new handleWebviewPanel();

  context.subscriptions.push(
    // 커맨드 등록
    vscode.commands.registerCommand('setDebuggerExtension.start', async () => {
      handleWebviewPanelIns.setWebviewPanel.bind(handleWebviewPanelIns);
      await handleWebviewPanelIns.setWebviewPanel(context);
    })
  );
}

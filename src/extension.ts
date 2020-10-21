// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CONFIG } from './config';
import { metadataService } from './services/metadata.service';
import { riasfs } from './riasfs/riasfs';
import { fsBuilder } from './services/fs-builder.service';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(vscode.workspace.registerFileSystemProvider('riasfs', riasfs, { isCaseSensitive: true }));
  let initialized = false;  

  context.subscriptions.push(vscode.commands.registerCommand('riasfs.init', () => {
    if (initialized) {
      return;
    }
    initialized = true;

    vscode.workspace.updateWorkspaceFolders(0, 0, { uri: vscode.Uri.parse('riasfs:/'), name: "RiasFS - Sample" });   
  }));

  context.subscriptions.push(vscode.commands.registerCommand('riasfs.generate', async () => {
      await metadataService.init()
      fsBuilder.build();
  }));

}

// this method is called when your extension is deactivated
export function deactivate() {}

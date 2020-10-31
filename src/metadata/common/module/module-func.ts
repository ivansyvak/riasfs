import * as vscode from 'vscode';
import { riasfs } from '../../../riasfs/riasfs';


import { ModuleItem } from "./module-item";

export class ModuleFunc extends ModuleItem {
  uid: string = '';
  paramsKind: string = '';
  code: string = '';

  build(structure: any) {
    super.build(structure);

    this.uid = structure.p.uid;
    this.paramsKind = structure.p.paramsKind;
    this.code = structure.p.code;
  }

  generateFiles() {
    riasfs.writeFile(vscode.Uri.parse(this.getPath() + '.js'), Buffer.from(this.code), { create: true, overwrite: true }, this);
  }
}

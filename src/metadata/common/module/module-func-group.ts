import * as vscode from 'vscode';
import { riasfs } from '../../../riasfs/riasfs';

import { ModuleFunc } from "./module-func";
import { ModuleItem } from "./module-item";

type ModuleType = 'ModuleFuncGroup' | 'ModuleFunc';

export class ModuleFuncGroup extends ModuleItem {
  children: ModuleItem[] = [];

  build(structure: any) {
    super.build(structure);

    if (!structure.n) {
      return;
    }

    for (let row of structure.n) {
      let moduleItem: (ModuleItem | null);
      switch (row.type as ModuleType) {
        case "ModuleFunc":
          moduleItem = new ModuleFunc(this);
          break;

        case "ModuleFuncGroup":
          moduleItem = new ModuleFuncGroup(this);
          break;
      }

      moduleItem.build(row);
      this.children.push(moduleItem);
    }
  }

  generateFiles() {
    riasfs.createDirectory(vscode.Uri.parse(this.getPath()), this);
    
    for (let ch of this.children) {
      ch.generateFiles();
    }
  }
}

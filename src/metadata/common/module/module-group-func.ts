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
          moduleItem = new ModuleFunc();
          break;

        case "ModuleFuncGroup":
          moduleItem = new ModuleFuncGroup();
          break;
      }

      moduleItem.build(row);
      this.children.push(moduleItem);
    }
  }
}

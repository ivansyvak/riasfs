import { FSItem } from "../../../common/fs";

export abstract class ModuleItem implements FSItem {
  name: string = '';

  constructor(public parent: FSItem) {}

  build(structure: any) {
    if (structure.p && structure.p.name) {
      this.name = structure.p.name; 
    }
  }

  getPath() {
    let path = '';
    if (this.parent !== null) {
      path = `${this.parent.getPath()}/${this.name}`;
    } else {
      path = this.name;
    }

    return path;
  }

  abstract generateFiles(): void;
}

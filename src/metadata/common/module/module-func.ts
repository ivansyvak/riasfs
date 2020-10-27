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
}

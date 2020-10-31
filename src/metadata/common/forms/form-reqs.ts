import { Uri } from "vscode";
import { FSItem } from "../../../common/fs";
import { riasfs } from "../../../riasfs/riasfs";
import { Form } from "./form";

export class FormReqs implements FSItem {
  name: string = 'reqs.json';

  private structure: any;

  constructor(public parent: Form) {}

  getPath() {
    return this.parent.getPath() + '/' + this.name;
  }

  generateFiles() {
    let data = JSON.stringify(this.structure);
    riasfs.writeFile(Uri.parse(this.getPath()), Buffer.from(data), {create: true, overwrite: true}, this);
  }

  build(structure: any) {
    this.structure = structure;
  }

}

import * as vscode from 'vscode';

import { FSDirectory, FSItem } from "../../common/fs";
import { riasfs } from "../../riasfs/riasfs";

export class Metadata implements FSDirectory {
  id: string = '';
  parent: (Metadata | null) = null;
  children: Metadata[] = [];
  owner: string = '';
  code: string = '';
  name: string = '';
  delMark: boolean = false;
  isGroup: boolean = false;
  sysName: string = '';
  order: number = 0;
  table: string = '';
  uid: string = '';
  shared: boolean = false;
  source: string = '';
  version: string = '';
  pr__ru: string = '';
  pr__uk: string = '';
  shortName:string = '';
  doNotUpdate: boolean = false;

  private structure: object = {};

  build(structure: any) {
    this.structure = structure;

    this.id = structure.id;
    this.parent = structure.parent;
    this.owner = structure.owner;
    this.code = structure.code;
    this.name = structure.name;
    this.delMark = !!(+structure.delMark);
    this.isGroup = !!(+structure.isGroup);
    this.sysName = structure.sysName;
    this.order = +structure.order;
    this.table = structure.table;
    this.uid = structure.uid;
    this.shared = !!(+structure.shared);
    this.source = structure.source;
    this.version = structure.version;
    this.pr__ru = structure.pr__ru;
    this.pr__uk = structure.pr__uk;
    this.shortName = structure.shortName;
    this.doNotUpdate = !!(+structure.doNotUpdate);
  }

  getPath() {
    let path = '';
    if (this.parent !== null) {
      path = this.parent.getPath();
    }

    path += `/${this.name}`;

    return path;
  }

  generateFiles() {
    riasfs.createDirectory(vscode.Uri.parse(this.getPath()), this);
    for (let ch of this.children) {
      ch.generateFiles();
    }
  }
}

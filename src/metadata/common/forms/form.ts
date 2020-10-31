import * as vscode from 'vscode';

import { FSDirectory, FSItem } from "../../../common/fs";
import { riasfs } from "../../../riasfs/riasfs";
import { MetadataModule } from '../module/metadata-module';
import { FormData } from './form-data';
import { FormReqs } from './form-reqs';
import { MetadataForms } from "./metadata-forms";

export class Form implements FSDirectory {
  private isBuilded: boolean = false;

  id: string = '0';
  owner: string = '0';
  // parent: string = '0';
  code: string = '';
  name: string = '';
  sysName: string = '';
  fullName: string = '';
  delMark: boolean = false;
  isGroup: boolean = false;
  version: string = '0';
  helpArticle: string = '0';

  children: FSItem[] = [];

  private module: MetadataModule;
  private reqs: FormReqs;
  private data: FormData;

  constructor(public parent: MetadataForms) {
    this.module = new MetadataModule(this);    
    this.reqs = new FormReqs(this);
    this.data = new FormData(this);
  }

  getPath() {
    return this.parent.getPath() + '/' + this.name;
  }

  build(structure: any) {
    this.isBuilded = true;

    this.id = structure.id;
    this.owner = structure.owner;
    this.code = structure.code;
    this.name = structure.name;
    this.sysName = structure.sysName;
    this.fullName = structure.fullName;
    this.delMark = !!(+structure.delMark);
    this.isGroup = !!(+structure.isGroup);
    this.version = structure.version;
    this.helpArticle = structure.helpArticle;

    this.module.build(structure.module);
    this.data.build(structure.data);
    this.reqs.build(structure.formReqs);
  }

  generateFiles() {
    if (!this.isBuilded) {
      throw 'Cant generate files before build';
    }

    riasfs.createDirectory(vscode.Uri.parse(this.getPath()));

    this.module.generateFiles();
    this.data.generateFiles();
    this.reqs.generateFiles();
  }
}

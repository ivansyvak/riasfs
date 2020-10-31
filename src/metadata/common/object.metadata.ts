import * as vscode from 'vscode';

import { riasfs } from "../../riasfs/riasfs";
import { MetadataForms } from './forms/metadata-forms';
import { Metadata } from "./metadata";
import { MetadataModule } from "./module/metadata-module";

export abstract class ObjectMetadata extends Metadata {  
  module: MetadataModule | null;
  forms: MetadataForms | null;

  constructor() {
    super();
    
    this.module = new MetadataModule(this);
    this.forms = new MetadataForms(this);
  }

  build(structure: any) {
    super.build(structure);

    this.module?.build(structure.module);
  }

  getPath() {
    let path = '';
    if (this.parent !== null) {
      path = this.parent.getPath();
    }

    path += `/${this.shortName}`;

    return path;
  }

  generateFiles() {
    super.generateFiles();

    this.module?.generateFiles();
    this.forms?.generateFiles();    
  }
}

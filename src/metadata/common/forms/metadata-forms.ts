import * as vscode from 'vscode';

import { riasfs } from "../../../riasfs/riasfs";
import { FSDirectory, FSItem } from '../../../common/fs';
import { ModuleItem } from '../module/module-item';
import { ObjectMetadata } from '../object.metadata';
import { formsService } from '../../../services/forms.service';
import { Form } from './form';

export class MetadataForms implements FSDirectory {
  children: FSItem[] = [];

  name = 'forms';

  constructor(public parent: ObjectMetadata) {}

  getPath() {
    return this.parent.getPath() + '/' + this.name;
  }

  generateFiles() {
    riasfs.createDirectory(vscode.Uri.parse(this.getPath()), this);
  }

  async loadForms() {
    let forms: any[] = await formsService.getForms(this.parent.id) as any[];
    for (let formStructure of forms) {
      let form = new Form(this);

      form.build(formStructure);
      form.generateFiles();
    }
  }
}

import * as path from 'path';
import * as vscode from 'vscode';
import { FSDirectory } from '../common/fs';
import { MetadataForms } from '../metadata/common/forms/metadata-forms';

import { File } from './file';

export class Directory implements vscode.FileStat {
    type: vscode.FileType;
    ctime: number;
    mtime: number;
    size: number;

    name: string;
    entries: Map<string, File | Directory>;

    constructor(name: string, private fsDirectory?: FSDirectory) {
        this.type = vscode.FileType.Directory;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
        this.entries = new Map();
    }

    async beforeRead() {
        if (this.fsDirectory instanceof MetadataForms) {
            await this.fsDirectory.loadForms();
        } else {

        }
    }
}

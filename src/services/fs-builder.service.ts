import * as vscode from 'vscode';
import { fetch } from '../common/fetch';

import { riasfs } from "../riasfs/riasfs";
import { metadataService } from '../services/metadata.service';

class RiasFSBuilder {
  private pathsCache: {[key: string]: string} = {};

  build() {
    metadataService
    
    for (let item of metadataService.metadata) {
      if (item.isGroup == '1') {
        riasfs.createDirectory(this.resolvePath(item));
      } else {
        this.addMetadataFiles(item)
      }
    }
  }

  resolvePath(item: any, ext?: string) {
    let parentPath = '';
    if (item.parent != '0') {
      parentPath = this.pathsCache[item.parent];
    }

    let path = `${parentPath}${item.shortName || item.name}/`;
    if (ext) {
      path += ext;
    }

    this.pathsCache[item.id] = path;
    
    return vscode.Uri.parse(`riasfs:/${path}`);
  }

  addMetadataFiles(item: any) {
    riasfs.createDirectory(this.resolvePath(item));

    this.addMetadataStructure(item);
    this.addMetadataModule(item);
    riasfs.createDirectory(this.resolvePath(item, 'forms'), item.id);
  }

  addMetadataStructure(item: any) {
    let data = JSON.stringify(item.data);
    riasfs.writeFile(this.resolvePath(item, 'metadata.json'), Buffer.from(data), { create: true, overwrite: true });
  }

  addMetadataModule(item: any) {
    if (!item.module) {
      return;
    }

    riasfs.createDirectory(this.resolvePath(item, '/module'));
    
    if (item.module.n) {
      for (let moduleItem of item.module.n) {
        switch (moduleItem.type) {
          case 'ModuleFunc': {
            riasfs.writeFile(this.resolvePath(item, `/module/${moduleItem.p.name}.js`), Buffer.from(moduleItem.p.code), { create: true, overwrite: true });
            break;
          }

          case 'ModuleFuncGroup': {
            riasfs.createDirectory(this.resolvePath(item, `/module/${moduleItem.p.name}`));

            if (moduleItem.n) {
              for (let moduleGroupItem of moduleItem.n) {
                const name = `/module/${moduleItem.p.name}/${moduleGroupItem.p.name}.js`;
                riasfs.writeFile(this.resolvePath(item, name), Buffer.from(moduleGroupItem.p.code), { create: true, overwrite: true });
              }
            }

            break;
          }
          
          default:
            throw `Don't know how to build ${moduleItem.type}`;
        }
      }
    }
  }

  async addMetadataForms(metadataId: (string | number | undefined)) {
    let metadata = metadataService.getOne(metadataId as (string | number));
    let forms = await fetch('getForms', {owner: metadataId}) as [];
    
    for (let form of forms) {
      const formModulePath = `/forms/${(form as any).name}`;
      riasfs.createDirectory(this.resolvePath(metadata, formModulePath));

      let f = form as any;
      if (f.module && f.module.n) {
        for (let func of f.module.n) {

          switch (func.type) {
            case 'ModuleFunc': {
              riasfs.writeFile(this.resolvePath(metadata, `${formModulePath}/${func.p.name}.js`), Buffer.from(func.p.code), { create: true, overwrite: true });
              break;
            }

            case 'ModuleFuncGroup': {
              const grpPath = `${formModulePath}/${func.p.name}`;
              riasfs.createDirectory(this.resolvePath(metadata, grpPath));

              if (func.n) {
                for (let moduleGroupItem of func.n) {
                  const name = `${grpPath}/${moduleGroupItem.p.name}.js`;
                  riasfs.writeFile(this.resolvePath(metadata, name), Buffer.from(moduleGroupItem.p.code), { create: true, overwrite: true });
                }
              }
              break;
            }
          }
        }
      }
    }

  }

  addMetadataTemplates(item: any) {

  }
}

export const fsBuilder = new RiasFSBuilder();

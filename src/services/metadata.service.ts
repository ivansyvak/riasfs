import { strict } from "assert";
import { fetch } from "../common/fetch";
import { AccumulationRegistersMetadata } from "../metadata/accumulation-registers.metadata";
import { ApplicationMetadata } from "../metadata/application.metadata";
import { BalancePlansMetadata } from "../metadata/balance-plans.metadata";
import { BalanceRegistersMetadata } from "../metadata/balance-registers.metadata";
import { CatalogsMetadata } from "../metadata/catalogs.metadata";
import { Metadata } from "../metadata/common/metadata";
import { DocumentsMetadata } from "../metadata/documents.metadata";
import { EnumeratesMetadata } from "../metadata/enumerates.metadata";
import { GlobalModulesMetadata } from "../metadata/global-modules.metadata";
import { InformationRegistersMetadata } from "../metadata/information-registers.metadata";
import { OperativeRegistersMetadata } from "../metadata/operative-registers.metadata";
import { ReportsMetadata } from "../metadata/reports.metadata";

type MetadataType = 
  'AccumulationRegistersMetadata' | 
  'ApplicationMetadata' | 
  'BalancePlansMetadata' | 
  'BalanceRegistersMetadata' | 
  'CatalogsMetadata' | 
  'DocumentsMetadata' | 
  'EnumeratesMetadata' | 
  'GlobalModulesMetadata' | 
  'InformationRegistersMetadata' | 
  'OperativeRegistersMetadata' | 
  'ReportsMetadata'; 


class MetadataService {

  private _structure: {[key: string]: any} = {};

  private _indexed: {[key: string]: Metadata} = {};

  private _tree: Metadata[] = [];
  public get tree() {
    return this._tree;
  }

  async init() {
    await this.getMetadata();
    this.build();
  }

  private async getMetadata() {
    return new Promise((resolve, reject) => {
      fetch('getMetadata', {application: 1000300000000002}).then((data: any) => {
        for (let row of data) {
          this._structure[row.id] = row;
        }

        resolve();
      });
    })
  }

  private build() {
    for (let id in this._structure) {
      this.findOrAdd(id);
    }

    let tree = Object.values(this._indexed)
      .filter(item => item.parent === null);

    this._tree = tree;
    
    for (let md of this._tree) {
      md.generateFiles();
    }
  }

  private findOrAdd(id: string): (Metadata | null) {
    if (+id === 0) {
      return null;
    }

    let structure = this._structure[id];

    if (this._indexed[structure.id]) {
      return this._indexed[structure.id];
    }

    let parent = this.findOrAdd(structure.parent);
    
    let md = this.getInstance(structure);
    if (md) {
      md.build(structure);
      md.parent = parent;
      if (parent) {
        parent.children.push(md);
      }

      this._indexed[md.id] = md;
      this._indexed[md.name] = md;
    }
    

    return null;
  }

  private getInstance(md: any): (Metadata | null) {
    let instance = null;

    if (+md.isGroup) {
      instance = new Metadata();
    } else {
      switch (md.data.type as MetadataType) {
        case "AccumulationRegistersMetadata":
          instance = new AccumulationRegistersMetadata();
          break;

        case "ApplicationMetadata":
          instance = new ApplicationMetadata();
          break;

        case "BalancePlansMetadata":
          instance = new BalancePlansMetadata();
          break;

        case "BalanceRegistersMetadata":
          instance = new BalanceRegistersMetadata();
          break;

        case "CatalogsMetadata":
          instance = new CatalogsMetadata();
          break;

        case "DocumentsMetadata":
          instance = new DocumentsMetadata();
          break;

        case "EnumeratesMetadata":
          instance = new EnumeratesMetadata();
          break;

        case "GlobalModulesMetadata":
          instance = new GlobalModulesMetadata();
          break;

        case "InformationRegistersMetadata":
          instance = new InformationRegistersMetadata();
          break;

        case "OperativeRegistersMetadata":
          instance = new OperativeRegistersMetadata();
          break;

        case "ReportsMetadata":
          instance = new ReportsMetadata();
          break;
      }
    }

    return instance;
  }

  public getOne(id: (string | number)) {
    return this._indexed[id];
  }

}

export const metadataService = new MetadataService();

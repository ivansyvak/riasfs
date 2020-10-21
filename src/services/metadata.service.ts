import { fetch } from "../common/fetch";

class MetadataService {
  private _metadata: any[] = [];
  private _indexed: {[key: string]: any} = {};

  public get metadata() {
    return this._metadata;
  }

  async init() {
    await this.getMetadata();
  }

  private async getMetadata() {
    return new Promise((resolve, reject) => {
      fetch('getMetadata', {application: 1000300000000002}).then((data: any) => {
        this._metadata = data;

        for (let i in data) {
          let row = data[i];
          this._indexed[row.id] = row;
          this._indexed[row.name] = row;
        }

        resolve();
      });
    })
  }

  public getOne(id: (string | number)) {
    return this._indexed[id];
  }

}

export const metadataService = new MetadataService();

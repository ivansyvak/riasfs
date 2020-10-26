import { workspace } from 'vscode';

class Config {
  private _test: boolean = true;
  public get test() {
    return this._test;
  }

  private _apiURL: string = '';
  public get apiURL() {
    return this._apiURL;
  }

  constructor() {
    const c = workspace.getConfiguration();
    this._test = c.get('riasfs.test') as boolean;

    this._apiURL = 'http://vm-dev/v1/metadataManager.php';
  }
}

export const CONFIG = new Config();

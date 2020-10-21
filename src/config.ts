import { workspace } from 'vscode';

class Config {
  private _test: boolean = true;
  public get test() {
    return this._test;
  }


  constructor() {
    const c = workspace.getConfiguration();

    this._test = c.get('riasfs.test') as boolean;
  }
}

export const CONFIG = new Config();

import * as vscode from 'vscode';

import { CONFIG } from "../config";

const axios = require('axios');

export async function fetch(action: string, params?: any) {
  return new Promise((resolve, reject) => {
    axios.post(CONFIG.apiURL, {action, params})
      .then(onSuccess)
      .catch(onError);

    function onSuccess(response: any) {
      let data = response.data;
      if (data.status == 'error') {
        onError(data.message);
      } else {
        resolve(data.data);
      }
    }

    function onError(e: any) {
      vscode.window.showErrorMessage(e.toString());
      reject(e.toString());
    }
  })
}

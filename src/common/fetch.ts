import { rejects } from "assert";
import { resolve } from "dns";

const axios = require('axios');

export async function fetch(action: string, params?: any) {
  return new Promise((resolve, reject) => {
    axios.post('http://vm-dev/v1/metadataManager.php', {action, params})
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
      reject(e.toString());
    }
  })
  
}

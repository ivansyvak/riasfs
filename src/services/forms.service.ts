import { fetch } from "../common/fetch";

class FormsService {
  async getForms(owner: (string | number)) {
    return fetch('getForms', {owner})
  }

  
}

export const formsService = new FormsService();

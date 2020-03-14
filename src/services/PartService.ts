import config from "./Config";

export default class PartService {

  getParts(name: string, date: Date) {
    let postParams = new FormData();
    postParams.append('name', name);
    postParams.append('date', date.toString());
    return fetch(config.apiHost + '/getParts', {
      method: 'POST',
      body: postParams,
    }).then((response) => response.json())
  }
}
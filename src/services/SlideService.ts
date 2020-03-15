import config from "./Config";

export default class SlideService {

  getSlides(parttitle: string) {
    let postParams = new FormData();
    postParams.append('partname', parttitle);
    return fetch(config.apiHost + '/getSlides', {
      method: 'POST',
      body: postParams,
    }).then((response) => response.json());
  }
}
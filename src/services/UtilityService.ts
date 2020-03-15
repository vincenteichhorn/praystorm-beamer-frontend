import config from './Config';

export default class UtilitiesService {

  getLocalIPAddress() {
    return fetch(config.apiHost + '/getLocalIpAddress')
      .then((response) => response.json())
  }

}

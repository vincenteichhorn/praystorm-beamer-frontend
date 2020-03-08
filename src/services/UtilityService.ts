import config from './Config';

export default class UtilitiesService {

  getLocalIpAdress() {
    return fetch(config.apiHost + '/getLocalIpAddress.php')
      .then((response) => response.json())
  }

}

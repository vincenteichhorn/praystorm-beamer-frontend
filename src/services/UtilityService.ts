import config from './Config';

export default class UtilitiesService {

  localIPAddress = '';

  getLocalIPAddress() {
    fetch(config.apiHost + '/getLocalIpAddress')
      .then((response) => response.json())
      .then((data) => {
        this.localIPAddress = data.localIpAddress;
      });
    return this.localIPAddress;
  }

}

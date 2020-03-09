import config from './Config';
import { decorate, observable, runInAction } from 'mobx';

export default class UtilitiesService {

  localIPAddress = '';

  getLocalIPAddress() {
    this.fetchLocalIPAddress();
    return this.localIPAddress;
  }

  private fetchLocalIPAddress() {
    fetch(config.apiHost + '/getLocalIpAddress')
    .then((response) => response.json())
    .then((data) => {
      runInAction(() => {
        this.localIPAddress = data.localIpAddress;
      })
    });
  }

}

decorate(UtilitiesService, {
  localIPAddress: observable,
});


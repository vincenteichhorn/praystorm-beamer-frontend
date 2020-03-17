import config from "./Config";
import { runInAction, decorate, observable } from 'mobx';

export default class HomeStore {

  IPAddress: string = '';

  getIPAddress() {
    return fetch(config.apiHost + '/getLocalIPAddress')
      .then((response) => response.json())
      .then((data) => {
        runInAction(() => {
          this.IPAddress = data.localIPAddress;
        });
      });
  }
}

decorate(HomeStore, {
  IPAddress: observable,
});



import { runInAction, decorate, observable } from 'mobx';

export default class HomeStore {

  IPAddress: string = '';

  getIPAddress() {
    return fetch(process.env.REACT_APP_API_HOST + '/getLocalIPAddress')
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



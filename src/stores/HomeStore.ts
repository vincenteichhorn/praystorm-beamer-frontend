import { runInAction, decorate, observable, action } from 'mobx';

export default class HomeStore {

  IPAddress: string = '';

  infoSnackBar: string = '';

  getIPAddress() {
    return fetch(process.env.REACT_APP_API_HOST + '/getLocalIPAddress')
      .then((response) => response.json())
      .then((data) => {
        runInAction(() => {
          this.IPAddress = data.localIPAddress;
        });
      });
  }

  openSnackBar(info: string) {
    this.infoSnackBar = info;
  }

  closeSnackBar() {
    this.infoSnackBar = '';
  }
}

decorate(HomeStore, {
  IPAddress: observable,
  infoSnackBar: observable,

  openSnackBar: action,
  closeSnackBar: action,
});



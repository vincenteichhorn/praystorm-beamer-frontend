import config from './Config';

export default class UtilitiesService {

  async getLocalIpAdress() {
    const data = await this.fetch(config.apiHost + '/getLocalIpAddress.php');
   //  console.log(data);
    return data;
  }
 
  async fetch(url: string) {
    const response = await fetch(url);
    return response.json();
  }


}

import Event from "../models/Event";
import config from './Config';

export default class EventService {

  events: Event[] = [];

  getEvents() {
    return fetch(config.apiHost + '/getEvents').then((response) => response.json());
  }
}
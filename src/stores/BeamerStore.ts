import socket from './SocketClient';
import { Slide } from '../models/DataModels';
import { decorate, observable } from 'mobx';

export default class BeamerStore {

  slide: Slide | undefined;
  hide: boolean = false;

  constructor() {
    socket.on('setSlide', (slide: Slide) => {
      this.slide = slide
    });
    socket.on('blackout', (hide: boolean) => {
      this.hide = hide;
    })
  }
}

decorate(BeamerStore, {
  slide: observable,
  hide: observable,
})
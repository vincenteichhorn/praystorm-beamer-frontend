import socket from './SocketClient';
import { Slide, Adjustment } from '../models/DataModels';
import { decorate, observable } from 'mobx';

export default class BeamerStore {

  slide: Slide | undefined;
  hide: boolean = false;
  adjustment: Adjustment = {
    rotateX: 0,
    rotateY: 0,
    scale: 0,
  };

  constructor() {
    socket.on('setSlide', (slide: Slide) => {
      this.slide = slide
    });
    socket.on('blackout', (hide: boolean) => {
      this.hide = hide;
    });
    socket.on('setAdjustment', (adjustment: Adjustment) => {
      console.log('rec');
      this.adjustment = adjustment;
    })
  }
}

decorate(BeamerStore, {
  slide: observable,
  hide: observable,
  adjustment: observable,
})
import { Event, Part, Slide } from '../models/DataModels';
import { decorate, observable, runInAction, action } from 'mobx';
import socket from './SocketClient';

export default class PresenterStore {

  events: Event[] = [];
  currentEvent: Event | undefined = undefined;
  parts: Part[] = [];
  currentPart: Part | undefined = undefined;
  slides: Slide[] = [];
  currentSlide: Slide | undefined = undefined;

  hide: boolean = false;
  hideForeground: boolean = false;
  rotateX: number = 0;
  rotateY: number = 0;
  scale: number = 1;

  constructor() {
    // fetch all data from backend
    if(this.events.length < 1) this.fetchEvents();
    if(this.parts.length < 1) this.fetchParts();
    if(this.slides.length < 1) this.fetchSlides();

    // set event listeners for the socket
    socket.on('setEvent', (event: Event) => {
      this.currentEvent = event;
      this.updateParts();
    });
    socket.on('setPart', (part: Part) => {
      this.currentPart = part;
      this.updateSlides();
    })
    socket.on('setSlide', (slide: Slide) => {
      this.currentSlide = slide;
    });
    socket.on('blackout', (hide: boolean) => {
      this.hide = hide;
    });
    socket.on('blackoutForeground', (hideForeground: boolean) => {
      this.hideForeground = hideForeground;
    })
    socket.on('setAdjustment', (adjustment: {rotateX: number, rotateY: number, scale: number}) => {
      this.rotateX = adjustment.rotateX;
      this.rotateY = adjustment.rotateY;
      this.scale = adjustment.scale;
    });
  }

  updateEvents() { 
    this.fetchEvents();
  }
  fetchEvents() {
    fetch(process.env.REACT_APP_API_HOST + '/getEvents')
    .then((response) => response.json())
    .then((data) => {
      runInAction(() =>{
        this.events = [...data];
        if(!this.currentEvent) {
          this.currentEvent = [...data][0];
          this.updateParts();
        }
      });
    });
  }

  updateParts() { 
    this.currentPart = undefined;
    this.fetchParts();
  }
  fetchParts() {
    if(this.currentEvent) {
      const postParams = new FormData();
      postParams.append('name', this.currentEvent.name);
      postParams.append('date', this.currentEvent.date.toString());
      fetch(process.env.REACT_APP_API_HOST + '/getPartsFromEvent', {
        method: 'POST',
        body: postParams,
      })
      .then((response) => response.json())
      .then((data) => {
        runInAction(() =>{
          this.parts = [...data];
          if(!this.currentPart) {
            this.currentPart = [...data][0];
            this.updateSlides();
          }
        });
      });
    }
  }

  updateSlides() { 
    this.currentSlide = undefined;
    this.fetchSlides();
  }
  fetchSlides() {
    if(this.currentPart) { 
      const postParams = new FormData();
      postParams.append('partTitle', this.currentPart.title);
      fetch(process.env.REACT_APP_API_HOST + '/getSlides', {
        method: 'POST',
        body: postParams,
      })
      .then((response) => response.json())
      .then((data) => {
        runInAction(() => {
          this.slides = [...data];
          this.slides = this.slides.map((slide: Slide) => {
            const copyright = {
              author: (this.currentPart) ? this.currentPart.author : "",
              album: (this.currentPart) ? this.currentPart.album : "",
              copyright: (this.currentPart) ? this.currentPart.copyright : "",
            }
            slide.copyright = copyright;
            return slide;
          });
        });
      });
    } else {
      this.slides = [];
    }
  }

  blackout() {
    this.hide = !this.hide;
    socket.emit('blackout', this.hide);
  }

  blackoutForeground() {
    this.hideForeground = !this.hideForeground;
    socket.emit('blackoutForeground', this.hideForeground);
  }

  sendEvent() {
    socket.emit('setEvent', this.currentEvent);
  }
  sendPart() {
    socket.emit('setPart', this.currentPart);
  }
  sendSlide() {
    socket.emit('setSlide', this.currentSlide);
  }

  sendAdjustment() {
    socket.emit('setAdjustment', {
      rotateX: this.rotateX,
      rotateY: this.rotateY,
      scale: this.scale,
    });
  }
}

decorate(PresenterStore, {
  events: observable,
  currentEvent: observable,
  parts: observable,
  currentPart: observable,
  slides: observable,
  currentSlide: observable,
  hide: observable,
  hideForeground: observable,
  rotateX: observable,
  rotateY: observable,
  scale: observable,

  updateEvents: action,
  updateParts: action,
  updateSlides: action,
  blackout: action,
  blackoutForeground: action,
});
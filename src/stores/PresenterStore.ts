import { Event, Part, Slide } from '../models/DataModels';
import config from './Config';
import { decorate, observable, runInAction, action } from 'mobx';

export default class PresenterStore {

  events: Event[] = [];
  currentEvent: Event | undefined = undefined;
  parts: Part[] = [];
  currentPart: Part | undefined = undefined;
  slides: Slide[] = [];
  currentSlide: Slide | undefined = undefined;

  hide: boolean = false;

  initState() {
    if(this.events.length < 1) this.fetchEvents();
    if(this.parts.length < 1) this.fetchParts();
    if(this.slides.length < 1) this.fetchSlides();
  }

  updateEvents() { 
    this.fetchEvents();
  }
  private fetchEvents() {
    fetch(config.apiHost + '/getEvents')
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
  private fetchParts() {
    if(this.currentEvent) {
      const postParams = new FormData();
      postParams.append('name', this.currentEvent.name);
      postParams.append('date', this.currentEvent.date.toString());
      fetch(config.apiHost + '/getParts', {
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
  private fetchSlides() {
    if(this.currentPart) { 
      const postParams = new FormData();
      postParams.append('partname', this.currentPart.title);
      fetch(config.apiHost + '/getSlides', {
        method: 'POST',
        body: postParams,
      })
      .then((response) => response.json())
      .then((data) => {
        runInAction(() =>{
          this.slides = [...data];
          if(!this.currentSlide) this.currentSlide = [...data][0];
        });
      });
    } else {
      console.log("test");
    }
  }

  blackout() {
    this.hide = !this.hide;
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

  updateEvents: action,
  updateParts: action,
  updateSlides: action,
  blackout: action,
});
import { BluetoothDisabled } from '@material-ui/icons';
import { decorate, observable, runInAction, action } from 'mobx';
import { Part, Event, Slide } from '../models/DataModels';

export default class EditorStore {

  events: Event[] = [];
  currentEvent: Event | undefined = undefined;
  parts: Part[] = [];
  currentPart: Part | undefined = undefined;
  slides: Slide[] = [];

  constructor() {
    // fetch all data from backend
    if(this.events.length < 1) this.fetchEvents();
    if(this.parts.length < 1) this.fetchParts();
    if(this.slides.length < 1) this.fetchSlides();
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
      fetch(process.env.REACT_APP_API_HOST + '/getParts', {
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
    this.fetchSlides();
  }
  fetchSlides() {
    if(this.currentPart) { 
      const postParams = new FormData();
      postParams.append('partname', this.currentPart.title);
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
          })
        });
      });
    }
  }

  createNewEventFromCurrent() {
    if(this.currentEvent) {
      const postParams = new FormData();
      postParams.append('name', this.currentEvent.name);
      postParams.append('date', this.currentEvent.date.toString());
      postParams.append('description', this.currentEvent.description)
      fetch(process.env.REACT_APP_API_HOST + '/addEvent', {
        method: 'POST',
        body: postParams,
      })
    }
  }

}

decorate(EditorStore, {
  events: observable,
  currentEvent: observable,
  parts: observable,
  currentPart: observable,
  slides: observable,

  updateEvents: action,
  updateParts: action,
  updateSlides: action,
  createNewEventFromCurrent: action,
});
import { decorate, observable, runInAction, action } from 'mobx';
import { Part, Event, Slide } from '../models/DataModels';

export default class EditorStore {
  events: Event[] = [];
  currentEvent: Event | undefined = undefined;
  parts: Part[] = [];
  currentPart: Part | undefined = undefined;
  currentPartIdentity: {title: string, author: string} = {title: "", author: ""};
  slides: Slide[] = [];
  changedSlideIdentity: string = "";
  
  allParts: Part[] = [];
  searchedParts: Part[] = [];

  unsaved: boolean = false;

  newSlide: boolean = false;

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
          if(this.currentPart) {
            this.currentPartIdentity = {title: this.currentPart?.title, author: this.currentPart?.author};
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

  fetchAllParts() {
    runInAction(() => {
      this.allParts = [];
    });
    fetch(process.env.REACT_APP_API_HOST + '/getParts', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      runInAction(() => {
        this.allParts = [...data];
        this.searchedParts = this.allParts;
      })
    })
  }

  searchAllParts(searchVal: string) {
    if(!searchVal){
      this.searchedParts = this.allParts;
    } else {
      this.searchedParts = this.allParts.filter((el) => el.title.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()));
    }
  }

  addPartToEvent(part: Part) {
    const postParams = new FormData();
    postParams.append('partTitle', part.title);
    postParams.append('partPosition', part.position.toString());
    postParams.append('partAuthor', part.author);
    postParams.append('eventName', (this.currentEvent) ? this.currentEvent?.name : '');
    postParams.append('eventDate', (this.currentEvent) ? this.currentEvent?.date.toString() : '');
    fetch(process.env.REACT_APP_API_HOST + '/addPartToEvent', {
      method: 'POST',
      body: postParams,
    })
    .then((resp) => console.log(resp));
  }


  async createNewEventFromCurrent() {
    if(this.currentEvent) {
      const postParams = new FormData();
      postParams.append('name', this.currentEvent.name);
      const offset = this.currentEvent.date.getTimezoneOffset()
      this.currentEvent.date = new Date(this.currentEvent.date.getTime() - (offset*60*1000))
      postParams.append('date', this.currentEvent.date.toISOString().split('T')[0]);
      postParams.append('description', this.currentEvent.description)
      const resp = await fetch(process.env.REACT_APP_API_HOST + '/addEvent', {
        method: 'POST',
        body: postParams,
      });
      this.updateEvents();
    }
  }

  async saveChanges() {
    if(this.currentPart) {
      const postParams = new FormData();
      postParams.append('oldPartTitle', this.currentPartIdentity.title);
      postParams.append('oldPartAuthor', this.currentPartIdentity.author);
      postParams.append('partTitle', this.currentPart.title);
      postParams.append('partType', this.currentPart.type);
      postParams.append('partAuthor', this.currentPart.author);
      postParams.append('partAlbum', this.currentPart.album);
      postParams.append('partCopyright', this.currentPart.copyright);
      postParams.append('partPosition', this.currentPart.position.toString());
      const resp = await fetch(process.env.REACT_APP_API_HOST + '/updatePart', {
        method: 'POST',
        body: postParams,
      });
      this.currentPartIdentity = {title: this.currentPart.title, author: this.currentPart.author};
      this.unsaved = false;
    }
  }

  async creatNewPartFromCurrent() {
    if(this.currentPart) {
      const postParams = new FormData();
      postParams.append('partTitle', this.currentPart.title);
      postParams.append('partPosition', this.currentPart.position.toString());
      postParams.append('partType', this.currentPart.type);
      postParams.append('partAuthor', this.currentPart.author);
      postParams.append('partAlbum', this.currentPart.album);
      postParams.append('partCopyright', this.currentPart.copyright);
      postParams.append('eventName', (this.currentEvent) ? this.currentEvent?.name : '');
      postParams.append('eventDate', (this.currentEvent) ? this.currentEvent?.date.toString() : '');
      const resp = await fetch(process.env.REACT_APP_API_HOST + '/addPart', {
        method: 'POST',
        body: postParams,
      });
      this.updateParts();
    }
  }

  async saveSlide(slide: Slide) {
    const postParams = new FormData();
    postParams.append('partTitle', this.currentPartIdentity.title);
    postParams.append('partAuthor', this.currentPartIdentity.author);
    postParams.append('oldSlideTitle', this.changedSlideIdentity);
    postParams.append('slideTitle', slide.title);
    postParams.append('slideType', slide.type);
    postParams.append('data', JSON.stringify({
      lyrics: slide.data.lyrics,
      video: slide.data.video,
      image: slide.data.image,
    }));
    const resp = await fetch(process.env.REACT_APP_API_HOST + '/updateSlide', {
      method: 'POST',
      body: postParams,
    });
  }

  openNewSlide() {
    this.newSlide = true;
  }

  async addSlide(newSlide: Slide) {
    if(this.currentPart) {
      const postParams = new FormData();
      postParams.append('newTitle', newSlide.title);
      postParams.append('newShorthand', newSlide.shorthand);
      postParams.append('newPositon', newSlide.position.toString());
      postParams.append('newType', newSlide.type);
      postParams.append('newContent', JSON.stringify(newSlide.data));
      postParams.append('partAuthor', this.currentPart.author);
      postParams.append('partTitle', this.currentPart.title);
      const resp = await fetch(process.env.REACT_APP_API_HOST + '/addSlide', {
        method: 'POST',
        body: postParams,
      });
      this.updateSlides();
      this.newSlide = false;
    }
  }


}

decorate(EditorStore, {
  events: observable,
  currentEvent: observable,
  parts: observable,
  currentPart: observable,
  slides: observable,
  allParts: observable,
  searchedParts: observable,
  unsaved: observable,
  newSlide: observable,

  updateEvents: action,
  updateParts: action,
  updateSlides: action,
  createNewEventFromCurrent: action,
  creatNewPartFromCurrent: action,
  searchAllParts: action,
  openNewSlide: action,
  addSlide: action,
});
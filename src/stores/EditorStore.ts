import { decorate, observable, runInAction, action } from 'mobx';
import { Part, Event, Slide, Style } from '../models/DataModels';

export default class EditorStore {
  events: Event[] = [];
  currentEvent: Event | undefined = undefined;
  parts: Part[] = [];
  currentPart: Part | undefined = undefined;
  currentPartIdentity: {title: string, author: string} = {title: "", author: ""};
  slides: Slide[] = [];
  slideStyles: Style[] = [];
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
    if(this.slideStyles.length < 1) this.fetchSlideStyles();
  }

  updateEvents() {
    this.currentEvent = undefined;
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

  fetchSlideStyles() {
    fetch(process.env.REACT_APP_API_HOST + '/getSlideStyles', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      runInAction(() => {
        this.slideStyles = [...data];
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

  async addPartToEvent(part: Part) {
    const postParams = new FormData();
    postParams.append('partTitle', part.title);
    postParams.append('partPosition', part.position.toString());
    postParams.append('partAuthor', part.author);
    postParams.append('eventName', (this.currentEvent) ? this.currentEvent?.name : '');
    postParams.append('eventDate', (this.currentEvent) ? this.currentEvent?.date.toString() : '');
    await fetch(process.env.REACT_APP_API_HOST + '/addPartToEvent', {
      method: 'POST',
      body: postParams,
    })
  }


  async createNewEvent(newEvent: Event) {
    const postParams = new FormData();
    postParams.append('name', newEvent.name);
    const offset = newEvent.date.getTimezoneOffset()
    newEvent.date = new Date(newEvent.date.getTime() - (offset*60*1000))
    postParams.append('date', newEvent.date.toISOString().split('T')[0]);
    postParams.append('description', newEvent.description)
    await fetch(process.env.REACT_APP_API_HOST + '/addEvent', {
      method: 'POST',
      body: postParams,
    });
    this.updateEvents();
  }

  async savePartChanges() {
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
      await fetch(process.env.REACT_APP_API_HOST + '/updatePart', {
        method: 'POST',
        body: postParams,
      });
      this.currentPartIdentity = {title: this.currentPart.title, author: this.currentPart.author};
      this.unsaved = false;
    }
  }

  async creatNewPart(newPart: Part) {
    const postParams = new FormData();
    postParams.append('partTitle', newPart.title);
    postParams.append('partPosition', newPart.position.toString());
    postParams.append('partType', newPart.type);
    postParams.append('partAuthor', newPart.author);
    postParams.append('partAlbum', newPart.album);
    postParams.append('partCopyright', newPart.copyright);
    postParams.append('eventName', (this.currentEvent) ? this.currentEvent?.name : '');
    postParams.append('eventDate', (this.currentEvent) ? this.currentEvent?.date.toString() : '');
    await fetch(process.env.REACT_APP_API_HOST + '/addPart', {
      method: 'POST',
      body: postParams,
    });
    this.updateParts();
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
    postParams.append('styleName', (slide.data.style.name) ? slide.data.style.name : '');
    await fetch(process.env.REACT_APP_API_HOST + '/updateSlide', {
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
      await fetch(process.env.REACT_APP_API_HOST + '/addSlide', {
        method: 'POST',
        body: postParams,
      });
      this.updateSlides();
      this.newSlide = false;
    }
  }

  async deleteSlide(title: string) {
    if(this.currentPart) {
      const postParams = new FormData();
      postParams.append('partTitle', this.currentPart.title);
      postParams.append('partAuthor', this.currentPart.author);
      postParams.append('slideTitle', title);
      await fetch(process.env.REACT_APP_API_HOST + '/deleteSlide', {
        method: 'POST',
        body: postParams,
      });
      this.updateSlides();
    }
  }

  async deleteCurrentEvent() {
    if(this.currentEvent) {
      const postParams = new FormData();
      postParams.append('eventName', this.currentEvent.name);
      postParams.append('eventDate', this.currentEvent.date.toString());
      await fetch(process.env.REACT_APP_API_HOST + '/deleteEvent', {
        method: 'POST',
        body: postParams,
      });
      this.currentEvent = undefined;
      this.updateEvents();
    }
  }
  async deleteCurrentPart(cascade: boolean) {
    if(this.currentPart && this.currentEvent) {
      const postParams = new FormData();
      postParams.append('eventName', this.currentEvent.name);
      postParams.append('eventDate', this.currentEvent.date.toString());
      postParams.append('partTitle', this.currentPart.title);
      postParams.append('partAuthor', this.currentPart.author);
      postParams.append('cascade', cascade.toString());
      await fetch(process.env.REACT_APP_API_HOST + '/deletePart', {
        method: 'POST',
        body: postParams,
      });
      this.currentPart = undefined;
      this.updateParts();
    }
  } 

  async updateEvent(event: Event, identity: string[]) {
    const [identityName, identityDate] = identity;
    if(this.currentEvent) {
      const offset = new Date(event.date).getTimezoneOffset()
      event.date = new Date(new Date(event.date).getTime() - (offset*60*1000))
      this.currentEvent.name = event.name;
      this.currentEvent.date = event.date;
      this.currentEvent.description = event.description;
      const postParams = new FormData();
      postParams.append('eventName', event.name);
      postParams.append('eventDate', event.date.toISOString().split('T')[0]);
      postParams.append('eventDesc', event.description);
      postParams.append('identityName', identityName);
      postParams.append('identityDate', identityDate);
      await fetch(process.env.REACT_APP_API_HOST + '/updateEvent', {
        method: 'POST',
        body: postParams,
      })
    }
    this.updateEvents();
  }

  async updateStyle(id: number, name: string) {
    if(name && id > -1) {
      let style = this.slideStyles[id]
      console.log(style);
      const postParams = new FormData();
      postParams.append('styleName', name);
      postParams.append('styleData', JSON.stringify(style));
      await fetch(process.env.REACT_APP_API_HOST + '/updateStyle', {
       method: 'POST',
       body: postParams,
      });
      this.updateSlides();
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
  slideStyles: observable,
  searchedParts: observable,
  unsaved: observable,
  newSlide: observable,

  updateEvents: action,
  updateParts: action,
  updateSlides: action,
  createNewEvent: action,
  creatNewPart: action,
  searchAllParts: action,
  openNewSlide: action,
  addSlide: action,
  deleteCurrentEvent: action,
  deleteCurrentPart: action,
  updateEvent: action,
});
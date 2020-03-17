export interface Event {
  name: string;
  description: string;
  date: Date;
}

export interface Part {
  title: string;
  position: number;
  type: PartTypes;
  author: string;
  album: string;
  copyright: string;
}

export enum PartTypes {
  SONG = 'SONG',
  INSERT = 'INSERT'
}

export enum SlideTypes {
  SONGPART = 'SONGPART',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  TEXT = 'TEXT'
}

export interface Slide {
  title: string;
  shorthand: string;
  position: number;
  type: SlideTypes;
  data: {
    lyrics: string[],
    image: string,
    text: string,
    video: string,
    style: {
      backgroundImage: string;
      backgroundColor: string;
      verseFontSize: number;
      verseSpacing: number;
      copyrightFontSize: number;
      verseColor: string;
      copyrightColor: string;
    };
  };
  copyright: {
    author: string;
    album: string;
    copyright: string;
  }
}

export interface Route {
  title: string;
  link: string;
  icon: string;
  img: string;
  caption: string;
  appbar: boolean;
  showInList: boolean,
  exact: boolean,
}

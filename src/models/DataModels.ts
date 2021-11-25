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
  VIDEO = 'VIDEO'
}

export interface Slide {
  title: string;
  shorthand: string;
  position: number;
  type: SlideTypes;
  data: {
    lyrics: string[],
    image: string,
    video: string,
    style: Style,
  };
  copyright: {
    author: string;
    album: string;
    copyright: string;
  }
}

export interface Style {
  name?: string,
  backgroundImage?: string;
  backgroundColor?: string;
  verseFontSize?: number;
  verseSpacing?: number;
  copyrightFontSize?: number;
  verseColor?: string;
  copyrightColor?: string;
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

export interface Adjustment {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export enum ViewTypes {
  LIST = 'LIST',
  CARDS = 'CARDS',
};
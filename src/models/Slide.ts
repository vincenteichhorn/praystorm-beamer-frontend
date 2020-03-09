import { SlideTypes } from "./SlideTypes";

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

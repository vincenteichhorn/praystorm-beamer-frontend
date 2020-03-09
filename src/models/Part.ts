export interface Part {
  title: string;
  position: number;
  type: typeEnum;
  author: string;
  album: string;
  copyright: string;
}

enum typeEnum {
  'SONG',
  'INSERT'
}
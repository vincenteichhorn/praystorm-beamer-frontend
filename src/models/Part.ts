import { PartTypes } from "./PartTypes";

export default interface Part {
  title: string;
  position: number;
  type: PartTypes;
  author: string;
  album: string;
  copyright: string;
}
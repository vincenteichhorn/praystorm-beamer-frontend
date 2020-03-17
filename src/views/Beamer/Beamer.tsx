import React, { FunctionComponent, useEffect } from 'react';
import { SlideTypes } from '../../models/DataModels';
import Songpart from './parts/Songpart';
import Imagepart from './parts/Imagepart';
import Textpart from './parts/Textpart';
import Videopart from './parts/Videopart';

const Beamer: FunctionComponent = (props) => {

  const slide = JSON.parse(JSON.stringify(require('../../stores/mock/slide.json')));
  console.log(slide.data.lyrics);
  const contentBox = document.getElementById('content');

  useEffect(() => {
    if(contentBox) {
      contentBox.className = '';
    }
  })

  return (
    (slide.type === SlideTypes.SONGPART) ? <Songpart slide={slide} /> : 
    (slide.type === SlideTypes.IMAGE) ? <Imagepart slide={slide} /> :
    (slide.type === SlideTypes.TEXT) ? <Textpart slide={slide} /> :
    (slide.type === SlideTypes.VIDEO) ? <Videopart slide={slide} /> : <Songpart slide={slide} />
  );
   
};

export default Beamer;

import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Slide } from '../../../models/DataModels';

interface Props {
  slide: Slide;
}

const Textpart: FunctionComponent<Props> = (props) => {

  const { slide } = props;

  const [backgroundImageExists, setBackgroundImageExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = slide.data.style.backgroundImage;
  })

  const getMarkup = () => {
    return { __html: slide.data.text };
  }

  return (
    <Box
      id="beamer"
      style={{
        backgroundImage: (backgroundImageExists) ? 'url(' + slide.data.style.backgroundImage + ')' : 'none',
        backgroundColor: (backgroundImageExists) ? 'none' : slide.data.style.backgroundColor,
        backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
        backgroundAttachment: (backgroundImageExists) ? 'fixed' : '',
        backgroundPosition: (backgroundImageExists) ? 'left top' : '',
        backgroundSize: (backgroundImageExists) ? 'cover' : '',

        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
      }}
    >
      <div 
        dangerouslySetInnerHTML={getMarkup()}
      />
    </Box>
  )
};

export default Textpart;
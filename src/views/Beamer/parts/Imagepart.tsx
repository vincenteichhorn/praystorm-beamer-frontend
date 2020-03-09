import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Slide } from '../../../models/Slide';

interface Props {
  slide: Slide;
}

const Imagepart: FunctionComponent<Props> = (props) => {

  const { slide } = props;

  const [imageExists, setImageExists] = useState(false);
  const [backgroundImageExists, setBackgroundImageExists] = useState(false);

  useEffect(() => {
    let img = new Image();
    img.onload = () => {
      setImageExists(true);
    }
    img.src = slide.data.image;
    img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = slide.data.style.backgroundImage;
  })

  return (
    <Box
      style={{
        backgroundImage: (backgroundImageExists) ? 'url(' + slide.data.style.backgroundImage + ')' : 'none',
        backgroundColor: (backgroundImageExists) ? 'none' : slide.data.style.backgroundColor,
        backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
        backgroundAttachment: (backgroundImageExists) ? 'fixed' : '',
        backgroundPosition: (backgroundImageExists) ? 'left top' : '',
        backgroundSize: (backgroundImageExists) ? 'cover' : '',

        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      {
        (imageExists) ? (
          <img 
            src={slide.data.image} 
            style={{
              height: '90%',
              display: 'block',
              margin: 'auto',
              marginTop: '2%',
              borderRadius: '10px',
              boxShadow: '10px 10px 200px 70px rgba(0,0,0,0.75)',
            }}
          />
        ) : (
          <Typography variant="h2">Leider kann das Bild nicht angezeigt werden.</Typography>
        )
      }
    </Box>
  )
};

export default Imagepart;

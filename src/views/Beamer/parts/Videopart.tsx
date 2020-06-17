import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Slide } from '../../../models/DataModels';

interface Props {
  slide: Slide;
  preview?: boolean;
}

const Videopart: FunctionComponent<Props> = (props) => {

  const { slide } = props;
  
  const [backgroundImageExists, setBackgroundImageExists] = useState(false);
  const [videoExists, setVideoExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = slide.data.style.backgroundImage;
    
    var http = new XMLHttpRequest();
    http.open('HEAD', slide.data.video, true);
    http.setRequestHeader('Content-Type', 'video/mp4');
    http.send();
    http.onload = () => {
      setVideoExists(true);
    }
  })

  return (
    <Box
      id="beamer"
      style={{
        backgroundImage: (backgroundImageExists) ? 'url(' + slide.data.style.backgroundImage + ')' : 'none',
        backgroundColor: (backgroundImageExists) ? 'none' : slide.data.style.backgroundColor,
        backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
        backgroundPosition: (backgroundImageExists) ? 'left top' : '',
        backgroundSize: (backgroundImageExists) ? 'cover' : '',

        textAlign: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
      }}
    >
      {
        (videoExists) ? (
          <video
          autoPlay
          style={{
            height: '90%',
            display: 'block',
            margin: 'auto',
            marginTop: '2%',
            borderRadius: '10px',
            boxShadow: '10px 10px 200px 70px rgba(0,0,0,0.75)',
          }}
          >
            <source src={slide.data.video}/>
          </video>
        ) : (
          <Typography variant="h2">Leider kann das Video nicht angezeigt werden</Typography>
        )
      }

    </Box>
  )
};

export default Videopart;

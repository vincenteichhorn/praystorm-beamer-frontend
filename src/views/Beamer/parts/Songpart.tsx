import React, { FunctionComponent, useState, useEffect, useContext, useRef } from 'react';
import { Slide } from '../../../models/DataModels';
import { Box, Typography } from '@material-ui/core';
import { StoreContext } from '../../../App';
import { observer } from 'mobx-react';

interface Props {
  slide: Slide;
  preview?: boolean;
}

const Songpart: FunctionComponent<Props> = (props) => {
  const { slide, preview } = props;
  const [backgroundImageExists, setBackgroundImageExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = slide.data.style.backgroundImage;
  })

  return (
    <Box
      style={{
        perspective: '1000px',
        height: (preview) ? '' : '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        id="beamer"
        style={{
          backgroundImage: (backgroundImageExists) ? 'url(' + slide.data.style.backgroundImage + ')' : 'none',
          backgroundColor: (backgroundImageExists) ? '' : slide.data.style.backgroundColor,
          backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
          backgroundPosition: (backgroundImageExists) ? 'left top' : '',
          backgroundSize: (backgroundImageExists) ? 'cover' : '',

          textAlign: 'center',
          width: '100%',
          height: (preview) ? '' : '100%',
        }}
      >
        <Box
          style={{
            display: 'flex',
            height: '95%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: (preview) ? '20%' : 'none'
          }}
        >
          {
            slide.data.lyrics.map((verse: string, index: number) => (
              <Box 
                key={index}
                style={{
                  marginBottom: (preview) ? slide.data.style.verseSpacing+'%' : slide.data.style.verseSpacing+'vh',
                  color: slide.data.style.verseColor,
                  textShadow: '1px 1px 2px black',
                  fontSize: (preview) ? slide.data.style.verseFontSize*9+'%' : slide.data.style.verseFontSize+'vh',
                  lineHeight: (preview) ? slide.data.style.verseFontSize*9+'%' : slide.data.style.verseFontSize+'vh',
                }}
              >
                {verse}
              </Box>
            ))
          }
        </Box>
        <Box
          style={{
            textAlign: 'left',
            color: slide.data.style.copyrightColor,
            position: 'absolute',
            bottom: 2+'vh',
            left: 1+'vw',
          }}
        >
          {
            (!preview) ? (
              <Typography style={{  fontSize: (preview) ? slide.data.style.copyrightFontSize*9+'%' : slide.data.style.copyrightFontSize+'vh'}}>
              {slide.copyright.author}<br/>
              {slide.copyright.album}<br/>
              {slide.copyright.copyright}
            </Typography>
            ) : null
          }
        </Box>
      </Box>
    </Box>
  );
}

export default observer(Songpart);
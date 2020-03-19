import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { Slide } from '../../../models/DataModels';
import { Box, Typography } from '@material-ui/core';
import { StoreContext } from '../../../App';
import { observer } from 'mobx-react';

interface Props {
  slide: Slide;
}

const Songpart: FunctionComponent<Props> = (props) => {

  const { slide } = props;
  const { beamerStore } = useContext(StoreContext);
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
        perspective: '1079px',
        height: '100vh',
      }}
    >
      <Box
        id="beamer"
        style={{
          transform: `rotateX(${beamerStore.adjustment.rotateX}deg) rotateY(${beamerStore.adjustment.rotateY}deg) scale(${beamerStore.adjustment.scale}, ${beamerStore.adjustment.scale})`,
          backgroundImage: (backgroundImageExists) ? 'url(' + slide.data.style.backgroundImage + ')' : 'none',
          backgroundColor: (backgroundImageExists) ? '' : slide.data.style.backgroundColor,
          backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
          backgroundAttachment: (backgroundImageExists) ? 'fixed' : '',
          backgroundPosition: (backgroundImageExists) ? 'left top' : '',
          backgroundSize: (backgroundImageExists) ? 'cover' : '',

          textAlign: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        <Box
          style={{
            display: 'flex',
            height: '95%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {
            slide.data.lyrics.map((verse: string, index: number) => (
              <Box 
                key={index}
                fontSize={slide.data.style.verseFontSize}
                style={{
                  marginBottom: slide.data.style.verseSpacing,
                  color: slide.data.style.verseColor,
                  textShadow: '1px 1px 2px black',
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
            fontSize: slide.data.style.copyrightFontSize,
            position: 'absolute',
            bottom: 15,
            left: 15,
          }}
        >
          <Typography>{slide.copyright.author}</Typography>
          <Typography>{slide.copyright.album}</Typography>
          <Typography>{slide.copyright.copyright}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(Songpart);
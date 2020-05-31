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
        perspective: '1000px',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        id="beamer"
        style={{
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
                style={{
                  marginBottom: slide.data.style.verseSpacing+'vh',
                  color: slide.data.style.verseColor,
                  textShadow: '1px 1px 2px black',
                  fontSize: slide.data.style.verseFontSize+'vh',
                  lineHeight: slide.data.style.verseFontSize+'vh',
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
          <Typography style={{ fontSize: slide.data.style.copyrightFontSize+'vh' }}>
            {slide.copyright.author}<br/>
            {slide.copyright.album}<br/>
            {slide.copyright.copyright}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(Songpart);
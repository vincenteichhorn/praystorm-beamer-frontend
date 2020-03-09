import React, { FunctionComponent, useState, useEffect } from 'react';
import { Slide } from '../../../models/Slide';
import { Box, Typography } from '@material-ui/core';

interface Props {
  slide: Slide;
}

const Songpart: FunctionComponent<Props> = (props) => {

  const { slide } = props;
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
        backgroundImage: (backgroundImageExists) ? 'url(' + slide.data.style.backgroundImage + ')' : 'none',
        backgroundColor: (backgroundImageExists) ? 'none' : slide.data.style.backgroundColor,
        backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
        backgroundAttachment: (backgroundImageExists) ? 'fixed' : '',
        backgroundPosition: (backgroundImageExists) ? 'left top' : '',
        backgroundSize: (backgroundImageExists) ? 'cover' : '',

        textAlign: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          height: '20%',
          margin: '-15% 0 0 -25%',
        }}
      >
        {
          slide.data.lyrics.map((verse: string) => (
            <Box 
              fontSize={slide.data.style.verseFontSize}
              style={{
                marginBottom: slide.data.style.verseSpacing,
                color: slide.data.style.verseColor,
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
  );
}

export default Songpart;
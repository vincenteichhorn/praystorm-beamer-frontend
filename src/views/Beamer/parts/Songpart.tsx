import React, { FunctionComponent, useState, useEffect } from 'react';
import { Slide } from '../../../models/DataModels';
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
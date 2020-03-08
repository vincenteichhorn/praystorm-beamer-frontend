import React, { FunctionComponent, useEffect } from 'react';
import { Typography, Box } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {

}

const Beamer: FunctionComponent<Props> = (props) => {

  const slide = JSON.parse(JSON.stringify(require('../../services/mock/lyrics.json')));
  const contentBox = document.getElementById('content');

  useEffect(() => {
    if(contentBox) {
      contentBox.className = '';
    }
  })

  return (
    <Box
      style={{
        backgroundImage: (slide.style.backgroundImage) ? 'url(' + slide.style.backgroundImage + ')' : 'none',
        backgroundColor: (slide.style.backgroundImage) ? 'none' : 'black',
        backgroundRepeat: (slide.style.backgroundImage) ? 'no-repeat' : '',
        backgroundAttachment: (slide.style.backgroundImage) ? 'fixed' : '',
        backgroundPosition: (slide.style.backgroundImage) ? 'left top' : '',
        backgroundSize: (slide.style.backgroundImage) ? 'cover' : '',

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
          padding: slide.style.padding,
          position: 'absolute',
          top: '50%',
          left: '50%',
          height: '20%',
          margin: '-15% 0 0 -25%',
        }}
      >
        {
          slide.lyrics.map((verse: string) => (
            <Box 
              fontSize={slide.style.verseFontSize}
              style={{
                marginBottom: slide.style.verseSpacing,
                color: slide.style.verseColor,
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
          color: slide.style.copyrightColor,
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
};

export default Beamer;

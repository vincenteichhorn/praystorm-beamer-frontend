import React, { FunctionComponent, useEffect, useState} from 'react';
import { Slide } from '../../../../models/DataModels';
import { Box } from '@material-ui/core';

interface Props {
  slide: Slide;
}

const BlackoutForeground: FunctionComponent<Props> = (props) => {

  const [backgroundImageExists, setBackgroundImageExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = props.slide.data.style.backgroundImage;
  })

  return(
    <Box
      style={{
        perspective: '100px',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
          id="beamer"
          style={{
            backgroundImage: (backgroundImageExists) ? 'url(' + props.slide.data.style.backgroundImage + ')' : 'none',
            backgroundColor: (backgroundImageExists) ? '' : props.slide.data.style.backgroundColor,
            backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
            backgroundPosition: (backgroundImageExists) ? 'left top' : '',
            backgroundSize: (backgroundImageExists) ? 'cover' : '',

            textAlign: 'center',
            width: '100%',
            height: '100%',
          }}
      ></Box>
    </Box>
  );
}

export default BlackoutForeground;
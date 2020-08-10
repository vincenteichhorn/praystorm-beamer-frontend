import React, { FunctionComponent, useEffect, useState} from 'react';
import { Slide } from '../../../../models/DataModels';
import { Box } from '@material-ui/core';

interface Props {
  slide: Slide;
  preview: boolean;
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
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <svg
        style={{
          width: (!props.preview) ? document.documentElement.clientWidth + 'px' : '100%',
          height: (!props.preview) ? document.documentElement.clientHeight + 'px': '100%',
          backgroundColor: (backgroundImageExists) ? `url(${props.slide.data.style.backgroundColor})` : '',
          backgroundImage: (backgroundImageExists) ? `url(${props.slide.data.style.backgroundImage})` : '',
          backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
          backgroundPosition: (backgroundImageExists) ? 'left top' : '',
          backgroundSize: (backgroundImageExists) ? 'cover' : '',
        }}
      >

      </svg>
    </Box>
  );
}

export default BlackoutForeground;
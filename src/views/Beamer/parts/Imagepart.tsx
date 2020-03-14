import React, { FunctionComponent, useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Slide } from '../../../models/Slide';

interface Props {
  slide: Slide;
}

const Imagepart: FunctionComponent<Props> = (props) => {

  const { slide } = props;

  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    let img = new Image();
    img.onload = () => {
      setImageExists(true);
    }
    img.src = slide.data.image;
  })

  return (
    <Box>
      <Box
        style={{
          backgroundImage: (imageExists) ? 'url(' + slide.data.image + ')' : 'none',
          backgroundRepeat: (imageExists) ? 'no-repeat' : '',
          backgroundPosition: (imageExists) ? 'top left' : '',
          backgroundSize: (imageExists) ? 'cover' : '',

          textAlign: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
      </Box>
      {
        (!imageExists) ? <Typography variant="h2">Das Bild kann leider nicht angezeigt werden.</Typography> : null
      }
    </Box>

  );
};

export default Imagepart;

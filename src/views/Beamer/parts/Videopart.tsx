import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Slide } from '../../../models/DataModels';
import { StoreContext } from '../../../App';

interface Props {
  slide: Slide;
  preview?: boolean;
  gridSize?: number;
}

const Videopart: FunctionComponent<Props> = (props) => {

  const { slide } = props;
  const { presenterStore } = useContext(StoreContext);
  const [videoExists, setVideoExists] = useState(false);

  useEffect(() => {
    
    var http = new XMLHttpRequest();
    http.open('HEAD', slide.data.video, true);
    http.setRequestHeader('Content-Type', 'video/mp4');
    http.send();
    http.onload = () => {
      setVideoExists(true);
    }
  })

  return (
    <Box>
      {
        (videoExists) ? (
          <video
          autoPlay
          style={{
            width: '100%',
            height: '100%',
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

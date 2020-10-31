import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';

interface Props {
  preview: boolean;
}

const Blackout: FunctionComponent<Props> = (props) => {

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
          backgroundColor: 'black',
        }}
      ></svg>
    </Box>
  );
}

export default Blackout;
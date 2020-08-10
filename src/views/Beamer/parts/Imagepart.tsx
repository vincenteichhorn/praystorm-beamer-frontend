import React, { FunctionComponent, useEffect, useState, useContext} from 'react';
import { Box } from '@material-ui/core';
import { Slide } from '../../../models/DataModels';
import { observer } from 'mobx-react';
import { StoreContext } from '../../../App';

interface Props {
  preview: boolean;
  slide: Slide;
  gridSize?: number;
  sizing?: number;
}

const Imagepart: FunctionComponent<Props> = (props) => {
  const { slide } = props;
  const { presenterStore } = useContext(StoreContext);
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageExists(true);
    };
    img.src = slide.data.image;
  }, [slide, props])

  return(
    <Box style={{height: '100%'}}>
      <svg
        viewBox={(!props.preview) ? `0 0 ${document.documentElement.clientWidth} ${document.documentElement.clientHeight}` : "0 0 1600 900"}
        style={{
          width: (!props.preview) ? document.documentElement.clientWidth + 'px' : '100%',
          height: (!props.preview) ? document.documentElement.clientHeight + 'px': '100%',
          backgroundColor: (imageExists) ? `url(${slide.data.style.backgroundColor})` : '',
          backgroundImage: (imageExists) ? `url(${slide.data.image})` : '',
          backgroundRepeat: (imageExists) ? 'no-repeat' : '',
          backgroundPosition: (imageExists) ? 'left top' : '',
          backgroundSize: (imageExists) ? 'cover' : '',
        }}
        id={(props.gridSize) ? 'beamerSvgPrevGrid' : 'beamerSvg'}
      >
        {(presenterStore.currentSlide?.title === slide.title && props.gridSize) ? (
          <g style={{transform: 'scale(3)',}}>
            <circle r="60" style={{fill: 'white'}}/>
            <g transform="translate(10, 10)">
              <path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </g>
          </g>
        ) : null}
      </svg>
    </Box>
  );
}

export default observer(Imagepart);
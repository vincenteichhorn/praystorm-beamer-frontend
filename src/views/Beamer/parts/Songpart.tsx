import React, { FunctionComponent, useEffect, useState, useContext, useCallback} from 'react';
import { Box } from '@material-ui/core';
import { Slide } from '../../../models/DataModels';
import { observer } from 'mobx-react';
import { StoreContext } from '../../../App';
import useEventListener from '@use-it/event-listener';

interface Props {
  preview: boolean;
  slide: Slide;
  gridSize?: number
}

const Songpart: FunctionComponent<Props> = (props) => {
  const { slide } = props;
  const { presenterStore } = useContext(StoreContext);
  const [clientSize, setClientSize] = useState({clientHeight: 100000, clientWidth: 100000});
  const [computedVerseOffsetTop, setComputedVerseOffsetTop] = useState(0);
  const [computedCopyrightOffsetTop, setComputedCopyrightOffsetTop] = useState(0);
  const [backgroundImageExists, setBackgroundImageExists] = useState(false);

  useEffect(() => {

    let verseContainerHeight = slide.data.lyrics.length * slide.data.style.verseSpacing * slide.data.style.verseFontSize;
    let copyrightContainerHeight = 3 * slide.data.style.copyrightFontSize - slide.data.style.copyrightFontSize/2;
    if(slide.data.style.verseSpacing > 1) {
      verseContainerHeight -= (slide.data.style.verseSpacing - 1) * slide.data.style.verseFontSize;
    }
    if(props.preview) {
      let el = document.getElementById((props.gridSize) ? 'beamerSvgPrevGrid' : 'beamerSvg');
      if(el) {
        setComputedVerseOffsetTop((900 - verseContainerHeight) / 2);
        setComputedCopyrightOffsetTop(900 - copyrightContainerHeight);
      }
    } else {  
      setComputedVerseOffsetTop((document.documentElement.clientHeight - verseContainerHeight) / 2);
      setComputedCopyrightOffsetTop(document.documentElement.clientHeight - copyrightContainerHeight);
    }

    const img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = window.document.location.pathname.slice(0, -1) + slide.data.style.backgroundImage;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    setClientSize({clientWidth, clientHeight});
  }, [props, slide]);

  useEventListener('resize', () => {
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    setClientSize({clientWidth, clientHeight});
    computeHeights();
  });

  return(
    <Box style={{height: '100%', overflow: 'hidden',}}>
      <svg
        viewBox={(!props.preview) ? `0 0 ${clientSize.clientWidth} ${clientSize.clientHeight}` : "0 0 1600 900"}
        style={{
          width: (!props.preview) ? clientSize.clientWidth + 'px' : '100%',
          height: (!props.preview) ? clientSize.clientHeight + 'px': '100%',
          backgroundColor: (backgroundImageExists) ? 'black' : slide.data.style.backgroundColor,
          backgroundImage: (backgroundImageExists) ? `url(${window.document.location.pathname.slice(0, -1).concat(slide.data.style.backgroundImage)})` : '',
          backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
          backgroundPosition: (backgroundImageExists) ? 'left top' : '',
          backgroundSize: (backgroundImageExists) ? 'cover' : '',
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
        {(props.preview && props.gridSize) ? (
          <text
            x="98%"
            y="5%"
            style={{
              fill: slide.data.style.verseColor,
              textAnchor: 'end',
              alignmentBaseline: 'hanging',
              fontSize: 80,
              fontFamily: 'Roboto, sans-serif',
              userSelect: 'none',
              backgroundColor: 'rgba(255,255,255,200)'
            }}
          >{slide.title}</text>
        ) : null}
        <text 
          y={`${computedVerseOffsetTop}px`}
          style={{
            fill: slide.data.style.verseColor,
            textAnchor: 'middle',
            alignmentBaseline: 'text-before-edge',
            fontSize: slide.data.style.verseFontSize,
            userSelect: 'none',
          }}  
        >
          {
            slide.data.lyrics.map((verse, index) => (
              <tspan key={index} x="50%" dy={(index > 0) ? `${slide.data.style.verseSpacing}em` : ''}>{verse}</tspan>
            ))
          }
        </text>
        <text
          x={".5%"}
          y={`${computedCopyrightOffsetTop}px`}
          style={{
            fill: slide.data.style.copyrightColor,
            textAnchor: 'start',
            alignmentBaseline: 'text-before-edge',
            fontSize: slide.data.style.copyrightFontSize,
            userSelect: 'none',
          }} 
        >
          <tspan x=".5%" >{slide.copyright.album}</tspan>
          <tspan x=".5%" dy="1em">{slide.copyright.author}</tspan>
          <tspan x=".5%" dy="1em">{slide.copyright.copyright}</tspan>
        </text>
      </svg>
    </Box>
  );
}

export default observer(Songpart);
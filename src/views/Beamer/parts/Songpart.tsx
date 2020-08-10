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

const Songpart: FunctionComponent<Props> = (props) => {
  const { slide } = props;
  const { presenterStore } = useContext(StoreContext);
  const [computedVerseOffsetTop, setComputedVerseOffsetTop] = useState(0);
  const [computedCopyrightOffsetTop, setComputedCopyrightOffsetTop] = useState(0);
  const [prevClientWidth, setPrevClientWidht] = useState(100);
  const [backgroundImageExists, setBackgroundImageExists] = useState(false);

  useEffect(() => {
    let verseFontSize = (props.preview) ?  prevClientWidth * slide.data.style.verseFontSize / document.documentElement.clientWidth : slide.data.style.verseFontSize;
    let copyrightFontSize =  (props.preview) ?  prevClientWidth * slide.data.style.copyrightFontSize / document.documentElement.clientWidth : slide.data.style.copyrightFontSize;
    let verseContainerHeight = slide.data.lyrics.length * slide.data.style.verseSpacing * verseFontSize;
    let copyrightContainerHeight = 3 * copyrightFontSize - copyrightFontSize/2;
    if(slide.data.style.verseSpacing > 1) {
      verseContainerHeight -= (slide.data.style.verseSpacing - 1) * verseFontSize;
    }
    if(props.preview) {
      let el = document.getElementById((props.gridSize) ? 'beamerSvgPrevGrid' : 'beamerSvg');
      if(el) {
        setComputedVerseOffsetTop((el.clientHeight - verseContainerHeight) / 2);
        setPrevClientWidht(el.clientWidth);
        setComputedCopyrightOffsetTop(el.clientHeight - copyrightContainerHeight);
      }
    } else {  
      setComputedVerseOffsetTop((document.documentElement.clientHeight - verseContainerHeight) / 2);
      setComputedCopyrightOffsetTop(document.documentElement.clientHeight - copyrightContainerHeight);
    }
    const img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = slide.data.style.backgroundImage;
  }, [setComputedVerseOffsetTop, prevClientWidth, slide, props])

  return(
    <Box style={{height: '100%', overflow: 'hidden'}}>
      <svg
        style={{
          width: (!props.preview) ? document.documentElement.clientWidth + 'px' : '100%',
          height: (!props.preview) ? document.documentElement.clientHeight + 'px': '100%',
          backgroundColor: (backgroundImageExists) ? `url(${slide.data.style.backgroundColor})` : 'black',
          backgroundImage: (backgroundImageExists) ? `url(${slide.data.style.backgroundImage})` : '',
          backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
          backgroundPosition: (backgroundImageExists) ? 'left top' : '',
          backgroundSize: (backgroundImageExists) ? 'cover' : '',
        }}
        id={(props.gridSize) ? 'beamerSvgPrevGrid' : 'beamerSvg'}
      >
        {(presenterStore.currentSlide?.title === slide.title && props.gridSize) ? (
          <g transform="translate(10, 10)">
            <path d="M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </g>
        ) : null}
        <text 
          x="50%"
          y={`${computedVerseOffsetTop}px`}
          style={{
            fill: slide.data.style.verseColor,
            textAnchor: 'middle',
            alignmentBaseline: 'text-before-edge',
            fontSize: (props.preview) ?  prevClientWidth * slide.data.style.verseFontSize / document.documentElement.clientWidth : slide.data.style.verseFontSize,
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
            fontSize: (props.preview) ?  prevClientWidth * slide.data.style.copyrightFontSize / document.documentElement.clientWidth : slide.data.style.copyrightFontSize,
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
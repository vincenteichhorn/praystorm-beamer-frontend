import React, { FunctionComponent, useEffect, useState} from 'react';
import { Box } from '@material-ui/core';
import { SlideTypes } from '../../../../models/DataModels';

const loadingSlide = {
  title: 'Vers 1',
  shorthand: 'V1',
  position: 0,
  type: SlideTypes.SONGPART,
  data: {
    lyrics: [
      "Es konnte noch keine Verbindung zu einem Presenter hergestellt werden!",
      "Öffene den Presenter und lade einige Slides.",
    ], 
    image: "",
    video: "",
    text: "",
    style: {
      backgroundImage: "", 
      backgroundColor: "black",
      verseFontSize: 36,
      verseSpacing: 2,
      copyrightFontSize: 24,
      copyrightColor: "orange",
      verseColor: "white"
    }
  },
  copyright: {
    author: "praystorm. Beamer",
    album: "Worship Presentation Software",
    copyright: "Julius Dachsel, Vincent Eichhorn © 2020"
  } 
}

interface Props {
  preview: boolean;
}

const Loading: FunctionComponent<Props> = (props) => {

  const [computedVerseOffsetTop, setComputedVerseOffsetTop] = useState(0);
  const [computedCopyrightOffsetTop, setComputedCopyrightOffsetTop] = useState(0);
  const [prevClientWidht, setPrevClientWidht] = useState(100);

  useEffect(() => {
    let verseFontSize = (props.preview) ?  prevClientWidht * loadingSlide.data.style.verseFontSize / document.documentElement.clientWidth : loadingSlide.data.style.verseFontSize;
    let copyrightFontSize =  (props.preview) ?  prevClientWidht * loadingSlide.data.style.copyrightFontSize / document.documentElement.clientWidth : loadingSlide.data.style.copyrightFontSize;
    let verseContainerHeight = loadingSlide.data.lyrics.length * loadingSlide.data.style.verseSpacing * verseFontSize;
    let copyrightContainerHeight = 3 * copyrightFontSize - copyrightFontSize;
    if(loadingSlide.data.style.verseSpacing > 1) {
      verseContainerHeight -= (loadingSlide.data.style.verseSpacing - 1) * verseFontSize;
    }
    if(props.preview) {
      let el = document.getElementById('beamersvg');
      if(el) {
        setComputedVerseOffsetTop((el.clientHeight - verseContainerHeight) / 2);
        setPrevClientWidht(el.clientWidth);
        setComputedCopyrightOffsetTop(el.clientHeight - copyrightContainerHeight);
      }
    } else {  
      setComputedVerseOffsetTop((document.documentElement.clientHeight - verseContainerHeight) / 2);
      setComputedCopyrightOffsetTop(document.documentElement.clientHeight - copyrightContainerHeight);
    }
  }, [setComputedVerseOffsetTop, props.preview, prevClientWidht])

  return(
    <Box style={{height: '100%'}}>
      <svg
        style={{
          width: (!props.preview) ? document.documentElement.clientWidth + 'px' : '100%',
          height: (!props.preview) ? document.documentElement.clientHeight + 'px': '100%',
          backgroundColor: loadingSlide.data.style.backgroundColor,
        }}
        id="beamersvg"
      >
        <text 
          x="50%"
          y={`${computedVerseOffsetTop}px`}
          style={{
            fill: loadingSlide.data.style.verseColor,
            textAnchor: 'middle',
            alignmentBaseline: 'text-before-edge',
            fontSize: (props.preview) ?  prevClientWidht * loadingSlide.data.style.verseFontSize / document.documentElement.clientWidth : loadingSlide.data.style.verseFontSize,
          }}  
        >
          {
            loadingSlide.data.lyrics.map((verse, index) => (
              <tspan x="50%" key={index} dy={(index > 0) ? `${loadingSlide.data.style.verseSpacing}em` : ''}>{verse}</tspan>
            ))
          }
        </text>
        <text
          x={".5%"}
          y={`${computedCopyrightOffsetTop}px`}
          style={{
            fill: loadingSlide.data.style.copyrightColor,
            textAnchor: 'start',
            alignmentBaseline: 'text-before-edge',
            fontSize: (props.preview) ?  prevClientWidht * loadingSlide.data.style.copyrightFontSize / document.documentElement.clientWidth : loadingSlide.data.style.copyrightFontSize,
          }} 
        >
          <tspan x=".5%" >{loadingSlide.copyright.album}</tspan>
          <tspan x=".5%" dy="1em">{loadingSlide.copyright.author}</tspan>
          <tspan x=".5%" dy="1em">{loadingSlide.copyright.copyright}</tspan>
        </text>
      </svg>
    </Box>
  );
}

export default Loading;
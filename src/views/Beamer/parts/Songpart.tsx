import React, { FunctionComponent, useState, useEffect } from 'react';
import { Slide } from '../../../models/DataModels';
import { Box, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';

interface Props {
  slide: Slide;
  preview?: boolean;
  gridSize?: number;
}

const Songpart: FunctionComponent<Props> = (props) => {
  const { slide, preview, gridSize } = props;
  const [backgroundImageExists, setBackgroundImageExists] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setBackgroundImageExists(true);
    };
    img.src = slide.data.style.backgroundImage;
    //const body = document.getElementsByTagName('body')[0];
    //body.style.backgroundColor = slide.data.style.backgroundColor
  })

  return (
    <Box
      style={{
        perspective: '100px',
        height: (preview) ? '100%' : '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        id="beamer"
        style={{
          backgroundImage: (backgroundImageExists) ? 'url(' + slide.data.style.backgroundImage + ')' : 'none',
          backgroundColor: (backgroundImageExists) ? '' : slide.data.style.backgroundColor,
          backgroundRepeat: (backgroundImageExists) ? 'no-repeat' : '',
          backgroundPosition: (backgroundImageExists) ? 'left top' : '',
          backgroundSize: (backgroundImageExists) ? 'cover' : '',

          textAlign: 'center',
          width: '100%',
          height: (preview) ? '100%' : '100%',
        }}
      >
        <Box
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: (preview) ? '' : 'none',
          }}
        >{
          // <svg viewbox="0 0 1600 900" style={{backgroundColor: 'black',}} width="800px"  preserveAspectRatio="xMidYMid meet">
          //   <text x="800" y="450" dy="1em" style={{fill: 'white', fontSize: '14pt',}} textAnchor="middle" alignmentBaseline="central">
                slide.data.lyrics.map((verse: string, index: number) => (
                  <Box 
                    key={index}
                    style={{
                      marginBottom: (preview) ? slide.data.style.verseSpacing+'%' : slide.data.style.verseSpacing+'vh',
                      color: slide.data.style.verseColor,
                      textShadow: '1px 1px 2px black',
                      fontSize: (preview) ? (gridSize === 4) ? (slide.data.style.verseFontSize*2*4+'%') : 
                                            ((gridSize === 2) ? (slide.data.style.verseFontSize*4*4+'%') :
                                                            (slide.data.style.verseFontSize*3*4+'%')) :
                                            slide.data.style.verseFontSize+'vh',
                      lineHeight: (preview) ? slide.data.style.verseFontSize*1+'%' : slide.data.style.verseFontSize+'vh',
                    }}
                  >
                    {verse}
                  </Box>
                  
                  //<tspan x="800" dy="1em">
                  //  {verse}
                  //</tspan>
                ))
           //   </text> 
           // </svg>
        }
        </Box>
        <Box
          style={{
            textAlign: 'left',
            color: slide.data.style.copyrightColor,
            position: 'absolute',
            bottom: 2+'vh',
            left: 1+'vw',
          }}
        >
          <Typography style={{  fontSize: (preview) ? slide.data.style.copyrightFontSize*9+'%' : slide.data.style.copyrightFontSize+'vh'}}>
            {slide.copyright.author}<br/>
            {slide.copyright.album}<br/>
            {slide.copyright.copyright}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default observer(Songpart);
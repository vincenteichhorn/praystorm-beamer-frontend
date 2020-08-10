import React, { FunctionComponent, useEffect, useContext, useState } from 'react';
import { SlideTypes } from '../../models/DataModels';
import Songpart from './parts/Songpart';
import Imagepart from './parts/Imagepart';
import Videopart from './parts/Videopart';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import Blackout from './parts/StaticPages/Blackout';
import BlackoutForeground from './parts/StaticPages/BlackoutForeground';
import Loading from './parts/StaticPages/Loading';

interface Props {
  preview: boolean
}

const Beamer: FunctionComponent<Props> = (props) => {

  const { beamerStore } = useContext(StoreContext);
  useEffect(() => {
    if(!props.preview) {
      //reset styles from content div in Routing.tsx
      const contentBox = document.getElementById('content');
      if(contentBox) contentBox.className = '';
    }
  });

  return (
    <div
      style={{perspective: '1000px', height: '100%', cursor: 'none', backgroundColor: 'black', overflow: 'hidden',}}
    >
      <Box
        style={{
          transform: `rotateX(${beamerStore.adjustment.rotateX}deg) rotateY(${beamerStore.adjustment.rotateY}deg) scale(${beamerStore.adjustment.scale}, ${beamerStore.adjustment.scale})`,
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
      >
        {(beamerStore.slide) ? (
          (!beamerStore.hide && !beamerStore.hideForeground) ? (
            (beamerStore.slide.type === SlideTypes.SONGPART) ? <Songpart slide={beamerStore.slide} preview={props.preview} /> : 
            (beamerStore.slide.type === SlideTypes.IMAGE) ? <Imagepart slide={beamerStore.slide} preview={props.preview} /> :
            (beamerStore.slide.type === SlideTypes.VIDEO) ? <Videopart slide={beamerStore.slide} preview={props.preview} /> : <Songpart slide={beamerStore.slide} preview={props.preview} />
          ) : (
            (beamerStore.hide) ? (
              <Blackout preview={props.preview} />
            ) : (
              <BlackoutForeground slide={beamerStore.slide} preview={props.preview}/>
            ))
        ) : (
          <Loading preview={props.preview} />
        )}
      </Box>
    </div>
  );
   
};

export default observer(Beamer);

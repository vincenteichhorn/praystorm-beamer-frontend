import React, { FunctionComponent, useEffect, useContext } from 'react';
import { SlideTypes } from '../../models/DataModels';
import Songpart from './parts/Songpart';
import Imagepart from './parts/Imagepart';
import Textpart from './parts/Textpart';
import Videopart from './parts/Videopart';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';
import Blackout from './parts/StaticPages/Blackout';
import BlackoutForeground from './parts/StaticPages/BlackoutForeground';
import Loading from './parts/StaticPages/Loading';


const Beamer: FunctionComponent = (props) => {

  const { beamerStore } = useContext(StoreContext);
  useEffect(() => {
    //reset styles from content div in Routing.tsx
    const contentBox = document.getElementById('content');
    if(contentBox) contentBox.className = '';
  });

  return (
    <div
      style={{perspective: '1000px'}}
    >
      <Box
        style={{
          transform: `rotateX(${beamerStore.adjustment.rotateX}deg) rotateY(${beamerStore.adjustment.rotateY}deg) scale(${beamerStore.adjustment.scale}, ${beamerStore.adjustment.scale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {(beamerStore.slide) ? (
          (!beamerStore.hide && !beamerStore.hideForeground) ? (
            (beamerStore.slide.type === SlideTypes.SONGPART) ? <Songpart slide={beamerStore.slide}/> : 
            (beamerStore.slide.type === SlideTypes.IMAGE) ? <Imagepart slide={beamerStore.slide}/> :
            (beamerStore.slide.type === SlideTypes.TEXT) ? <Textpart slide={beamerStore.slide}/> :
            (beamerStore.slide.type === SlideTypes.VIDEO) ? <Videopart slide={beamerStore.slide}/> : <Songpart slide={beamerStore.slide}/>
          ) : (
            (beamerStore.hide) ? (
              <Blackout />
            ) : (
              <BlackoutForeground slide={beamerStore.slide} />
            ))
        ) : (
          <Loading />
        )}
      </Box>
    </div>
  );
   
};

export default observer(Beamer);

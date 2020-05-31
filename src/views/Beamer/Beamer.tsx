import React, { FunctionComponent, useEffect, useContext } from 'react';
import { SlideTypes } from '../../models/DataModels';
import Songpart from './parts/Songpart';
import Imagepart from './parts/Imagepart';
import Textpart from './parts/Textpart';
import Videopart from './parts/Videopart';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';
import { Box } from '@material-ui/core';

const Beamer: FunctionComponent = (props) => {

  const { beamerStore } = useContext(StoreContext);
  useEffect(() => {
    //reset styles from content div in Routing.tsx
    const contentBox = document.getElementById('content');
    const body = document.getElementsByTagName('body')[0];
    if(contentBox) contentBox.className = '';
    if(body) body.style.backgroundColor = 'black';
  });

  return (
    <Box
      style={{
        transform: `rotateX(${beamerStore.adjustment.rotateX}deg) rotateY(${beamerStore.adjustment.rotateY}deg) scale(${beamerStore.adjustment.scale}, ${beamerStore.adjustment.scale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {(!beamerStore.hide) ? (
        (beamerStore.slide) ? (
          (beamerStore.slide.type === SlideTypes.SONGPART) ? <Songpart slide={beamerStore.slide} /> : 
          (beamerStore.slide.type === SlideTypes.IMAGE) ? <Imagepart slide={beamerStore.slide} /> :
          (beamerStore.slide.type === SlideTypes.TEXT) ? <Textpart slide={beamerStore.slide} /> :
          (beamerStore.slide.type === SlideTypes.VIDEO) ? <Videopart slide={beamerStore.slide} /> : <Songpart slide={beamerStore.slide} />
        ) : (
          <Songpart slide={{
            title: "Init",
            shorthand: "I",
            position: 0,
            type: SlideTypes.SONGPART,
            data: {
              lyrics: [
                "Das ist die Beameransicht.",
                "Leider konnte noch keine Verbindung zu einem Presenter hergestellt werden."
              ], 
              image: "",
              video: "",
              text: "",
        
              style: {
                backgroundImage: "", 
                backgroundColor: "black",
                verseFontSize: 10,
                verseSpacing: 20,
                copyrightFontSize: 12,
                copyrightColor: "orange",
                verseColor: "white",
                lineHeight: 10,
              }
            },
            copyright: {
              author: "Julius Dachsel & Vincent Eichhorn",
              album: "",
              copyright: "© 2020",
            } 
          }} />
        )
      ) : (
        <Textpart slide={{
          title: "blackscreen",
          shorthand: "black",
          position: 0,
          type: SlideTypes.TEXT,
          data: {
            lyrics: [], 
            image: "",
            video: "",
            text: "",
      
            style: {
              backgroundImage: "", 
              backgroundColor: "black",
              verseFontSize: 10,
              verseSpacing: 20,
              copyrightFontSize: 12,
              copyrightColor: "orange",
              verseColor: "white",
              lineHeight: 10,
            }
          },
          copyright: {
            author: "Julius Dachsel & Vincent Eichhorn",
            album: "",
            copyright: "© 2020",
          } 
        }} />
      )}
    </Box>
  );
   
};

export default observer(Beamer);

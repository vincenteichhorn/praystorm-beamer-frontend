import React, { FunctionComponent, useContext} from 'react';
import { Grid, } from '@material-ui/core';
import { Event, Part, Slide } from '../../models/DataModels';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';

const Presenter: FunctionComponent = (props) => {

  const { presenterStore } = useContext(StoreContext);

  const changeCurrentEvent = (newEvent: Event) => {
    presenterStore.currentEvent = newEvent;
    presenterStore.updateParts();
    presenterStore.sendEvent();
  }

  const changeCurrentPart = (newPart: Part) => {
    presenterStore.currentPart = newPart;
    presenterStore.updateSlides();
    presenterStore.sendPart();
  }

  const changeCurrentSlide = (newSlide: Slide) => {
    presenterStore.currentSlide = newSlide;
    presenterStore.sendSlide();
  }

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={3}>
        <Sidebar 
          events={presenterStore.events}
          currentEvent={presenterStore.currentEvent}
          onChangeEvent={changeCurrentEvent}
          parts={presenterStore.parts}
          currentPart={presenterStore.currentPart}
          onChangePart={changeCurrentPart}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <MainWindow 
          currentEvent={presenterStore.currentEvent}
          currentPart={presenterStore.currentPart}
          parts={presenterStore.parts}
          slides={presenterStore.slides}
          currentSlide={presenterStore.currentSlide}
          onChangeSlide={changeCurrentSlide}
        />
      </Grid>
    </Grid>
  );
};

export default observer(Presenter);

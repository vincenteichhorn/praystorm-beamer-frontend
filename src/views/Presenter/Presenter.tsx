import React, { FunctionComponent, useContext, useEffect} from 'react';
import { Grid, } from '@material-ui/core';
import { Event, Part, Slide } from '../../models/DataModels';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';


const Presenter: FunctionComponent = (props) => {

  const { presenterStore } = useContext(StoreContext);
  useEffect(() => {
    presenterStore.initState();
  });

  const changeCurrentEvent = (newEvent: Event) => {
    presenterStore.currentEvent = newEvent;
    presenterStore.updateParts();
  }

  const changeCurrentPart = (newPart: Part) => {
    presenterStore.currentPart = newPart;
    presenterStore.updateSlides();
  }

  const changeCurrenSlide = (newSlide: Slide) => {
    presenterStore.currentSlide = newSlide;
  }

  return (
    <Grid
      container
      direction="row"
      spacing={2}
    >
      <Grid item xs={3}>
        <Sidebar 
          events={presenterStore.events}
          currentEvent={presenterStore.currentEvent}
          onChangeEvent={changeCurrentEvent}
          parts={presenterStore.parts}
          currentPart={presenterStore.currentPart}
          onChangePart={changeCurrentPart}
        />
      </Grid>
      <Grid item xs>
        <MainWindow 
          currentEvent={presenterStore.currentEvent}
          currentPart={presenterStore.currentPart}
          parts={presenterStore.parts}
          slides={presenterStore.slides}
          currentSlide={presenterStore.currentSlide}
          onChangeSlide={changeCurrenSlide}
        />
      </Grid>
    </Grid>
  );
};

export default observer(Presenter);

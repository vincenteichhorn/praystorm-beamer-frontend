import React, { FunctionComponent, useContext } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
import { StoreContext } from '../../App';
import { Part, Event } from '../../models/DataModels';
import { observer } from 'mobx-react';

const Editor: FunctionComponent = (props) => {

  const { editorStore } = useContext(StoreContext);

  const changeCurrentEvent = (newEvent: Event) => {
    editorStore.currentEvent = newEvent;
    editorStore.updateParts();
  }

  const changeCurrentPart = (newPart: Part) => {
    editorStore.currentPart = newPart;
    editorStore.updateSlides();
  }

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={3}>
        <Sidebar
          events={editorStore.events}
          currentEvent={editorStore.currentEvent}
          onChangeEvent={changeCurrentEvent}
          parts={editorStore.parts}
          currentPart={editorStore.currentPart}
          onChangePart={changeCurrentPart}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <MainWindow
          currentEvent={editorStore.currentEvent}
          currentPart={editorStore.currentPart}
          parts={editorStore.parts}
          slides={editorStore.slides}
        />
      </Grid>
    </Grid>
  );
};

export default observer(Editor);

import React, { FunctionComponent, useContext } from 'react';
import { Typography, Box, Paper, Grid } from '@material-ui/core';
import Beamer from '../Beamer/Beamer';
import Songpart from '../Beamer/parts/Songpart';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';

const Stage: FunctionComponent = (props) => {

  const { beamerStore } = useContext(StoreContext);
  return (
    <Grid container>
      <Grid item xs={3}>
        {(beamerStore.slide) ? <Songpart preview={true} slide={beamerStore.slide}/> : null}
      </Grid>
    </Grid>
  );
};

export default observer(Stage);

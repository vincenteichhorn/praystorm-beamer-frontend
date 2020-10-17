import React, { FunctionComponent, useContext } from 'react';
import { Typography, Grid } from '@material-ui/core';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
import { StoreContext } from '../../App';
import { Part, Event } from '../../models/DataModels';
import { observer } from 'mobx-react';

const Editor: FunctionComponent = (props) => {

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9}>
        <MainWindow />
      </Grid>
    </Grid>
  );
};

export default observer(Editor);

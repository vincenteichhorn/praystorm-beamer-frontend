import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
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

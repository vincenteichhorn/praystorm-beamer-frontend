import React, { FunctionComponent, useContext} from 'react';
import { Grid, } from '@material-ui/core';
import { Event, Part, Slide } from '../../models/DataModels';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';

const Presenter: FunctionComponent = (props) => {

  const { presenterStore } = useContext(StoreContext);



  return (
    <Grid
      container
      spacing={2}
    >
      <Grid item xs={12} md={3}>
        <Sidebar/>
      </Grid>
      <Grid item xs={12} md={9}>
        <MainWindow />
      </Grid>
    </Grid>
  );
};

export default observer(Presenter);

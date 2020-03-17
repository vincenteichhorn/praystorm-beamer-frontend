import React, { FunctionComponent, useContext } from 'react';
import { Paper, Icon, Grid, IconButton } from '@material-ui/core';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';

const ActionBar: FunctionComponent = (props) => {

  const { presenterStore } = useContext(StoreContext);

  return (
    <Paper
      style={{
        width: '60%',
        marginTop: '20%',
        padding: '5%',
      }}
    >
      <Grid 
        container 
        direction="column"
        alignItems="center"
      >
        <IconButton
          onClick={() => presenterStore.blackout()}
        >
          {
            (presenterStore.hide) ? (
              <Icon>visibility</Icon>
            ) : (
              <Icon>visibility_off</Icon>
            )
          }
        </IconButton>
        <IconButton>
          <Icon>settings_overscan</Icon>
        </IconButton>
      </Grid>
    </Paper>
  );
};

export default observer(ActionBar);

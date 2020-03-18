import React, { FunctionComponent, useContext, useState } from 'react';
import { Paper, Icon, Grid, IconButton, Box } from '@material-ui/core';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';
import AdjustmentDialog from './AdjustmentDialog';

const ActionBar: FunctionComponent = (props) => {

  const { presenterStore } = useContext(StoreContext);
  const [adjustmentDialogOpen, setAdjustmentDialogOpen] = useState(false);

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
          {(presenterStore.hide) ? (
            <Icon>visibility</Icon>
          ) : (
            <Icon>visibility_off</Icon>
          )}
        </IconButton>
        <IconButton
          onClick={() => setAdjustmentDialogOpen(true)}
        >
          <Icon>settings_overscan</Icon>
        </IconButton>
      </Grid>
      <AdjustmentDialog 
        open={adjustmentDialogOpen}
        onClose={() => setAdjustmentDialogOpen(false)}
      />
    </Paper>
  );
};

export default observer(ActionBar);

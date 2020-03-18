import React, { FunctionComponent, useState, useContext, useEffect } from 'react';
import { Dialog, Divider, DialogContent, Typography, DialogActions, Slider, IconButton, Grid, Icon } from '@material-ui/core';
import StyledDialogTitle from '../../components/Styled/StyledDialogTitle';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AdjustmentDialog: FunctionComponent<Props> = (props) => {

  const { presenterStore } = useContext(StoreContext);

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={props.onClose}
    >
        <StyledDialogTitle onClose={props.onClose}>
          Trapezausgleich
        </StyledDialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="overline">
            Horizontale Rotation
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <IconButton 
                onClick={() => {
                  presenterStore.rotateX -= 1;
                  presenterStore.sendAdjustment();
                }}
              ><Icon>remove</Icon></IconButton>
            </Grid>
            <Grid item xs style={{marginTop: '4px'}}>
              <Slider 
                value={presenterStore.rotateX}
                onChange={(event, val) => presenterStore.rotateX = val as number}
                onChangeCommitted={() => presenterStore.sendAdjustment()}
                min={0}
                max={360}
              />
            </Grid>
            <Grid item>
              <IconButton 
                onClick={() => {
                  presenterStore.rotateX += 1;
                  presenterStore.sendAdjustment();
                }}
              ><Icon>add</Icon></IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ width: '35px'}}>{presenterStore.rotateX}°</Typography>
            </Grid>
          </Grid>

          <Typography variant="overline">
            Vertikale Rotation
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <IconButton 
                onClick={() => {
                  presenterStore.rotateY -= 1;
                  presenterStore.sendAdjustment();
                }}
              ><Icon>remove</Icon></IconButton>
            </Grid>
            <Grid item xs style={{marginTop: '4px'}}>
              <Slider 
                value={presenterStore.rotateY}
                onChange={(event, val) => presenterStore.rotateY = val as number}
                onChangeCommitted={() => presenterStore.sendAdjustment()}
                min={0}
                max={360}
              />
            </Grid>
            <Grid item>
              <IconButton 
                onClick={() => {
                  presenterStore.rotateY += 1;
                  presenterStore.sendAdjustment();
                }}
              ><Icon>add</Icon></IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ width: '35px'}}>{presenterStore.rotateY}°</Typography>
            </Grid>
          </Grid>

          <Typography variant="overline">
            Zoom
          </Typography>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <IconButton 
                onClick={() => {
                  presenterStore.scale -= 0.001;
                  presenterStore.sendAdjustment();
                }}
              ><Icon>remove</Icon></IconButton>
            </Grid>
            <Grid item xs style={{marginTop: '4px'}}>
              <Slider 
                value={presenterStore.scale}
                onChange={(event, val) => presenterStore.scale = val as number}
                onChangeCommitted={() => presenterStore.sendAdjustment()}
                min={0}
                max={2}
                step={0.001}
              />
            </Grid>
            <Grid item>
              <IconButton 
                onClick={() => {
                  presenterStore.scale += 0.001;
                  presenterStore.sendAdjustment();
                }}
              ><Icon>add</Icon></IconButton>
            </Grid>
            <Grid item>
              <Typography style={{ width: '35px'}}>{Math.round((presenterStore.scale - 1) * 100 * Math.pow(10, 2)) / Math.pow(10, 2)}%</Typography>
            </Grid>
          </Grid>
        </DialogContent> 
    </Dialog>
  )
}

export default observer(AdjustmentDialog);

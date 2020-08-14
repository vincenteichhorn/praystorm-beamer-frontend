import React, { FunctionComponent, useContext, useState } from 'react';
import { Dialog, Divider, TextField, DialogContent, DialogActions } from '@material-ui/core';
import StyledDialogTitle from '../../../components/Styled/StyledDialogTitle';
import StyledButton from '../../../components/StyledButton';
import { Event } from '../../../models/DataModels';
import { StoreContext } from '../../../App';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddNewEventDialog: FunctionComponent<Props> = (props) => {

  const { editorStore } = useContext(StoreContext);

  const [eventName, setEventName] = useState('');
  const [eventDesription, setEventDesription] = useState('');

  return (
    <Dialog
      fullWidth
      onClose={props.onClose}
      open={props.open}
    >
      <StyledDialogTitle onClose={props.onClose}>
          Add new Event
      </StyledDialogTitle>
      <Divider />
      <DialogContent>
        <TextField 
          label="Name"
          fullWidth
          variant="outlined"
          value={eventName}
          onChange={(changeEvent) => {setEventName(changeEvent.target.value)}}
          error={eventName.length < 1 || eventName.length > 250}
        />
        <TextField 
          style={{marginTop: '10px', marginBottom: '8px'}}
          label="Description"
          fullWidth
          variant="outlined"
          value={eventDesription}
          onChange={(changeEvent) => {setEventDesription(changeEvent.target.value)}}
          error={eventName.length > 250}
        />
      </DialogContent>
      <Divider />
      <DialogActions style={{ padding: '10px' }}>
        <StyledButton
          variant="outlined"
          size="large"
          onClick={() => props.onClose()}
        >
          Zurück
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            const newEvent: Event = {
              name: eventName,
              description: eventDesription,
              date: new Date(),
            }
            editorStore.events.push(newEvent);
            editorStore.currentEvent = newEvent;
            //TODO: fetch
            editorStore.updateParts();
            setEventName('');
            setEventDesription('');
            props.onClose();
          }}
        >
          Speichern
        </StyledButton>
      </DialogActions> 
    </Dialog>
  );
}

export default AddNewEventDialog;
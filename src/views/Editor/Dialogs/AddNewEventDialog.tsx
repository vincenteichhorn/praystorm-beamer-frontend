import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { Dialog, Divider, TextField, DialogContent, DialogActions } from '@material-ui/core';
import StyledDialogTitle from '../../../components/Styled/StyledDialogTitle';
import StyledButton from '../../../components/StyledButton';
import { Event } from '../../../models/DataModels';
import { StoreContext } from '../../../App';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Alert from '@material-ui/lab/Alert';
import { observer } from 'mobx-react';
import useEventListener from '@use-it/event-listener';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddNewEventDialog: FunctionComponent<Props> = (props) => {

  const { editorStore } = useContext(StoreContext);

  const [eventName, setEventName] = useState('');
  const [eventDesription, setEventDesription] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");

  const saveEvent = () => {
    setError("");
    if(eventName !== '') {
      const newEvent: Event = {
        name: eventName,
        description: eventDesription,
        date: date,
      }
      if(editorStore.events.filter((event) => event.name + new Date(event.date).toLocaleDateString('en-GB').replace(/\//g, '.') === eventName + date.toLocaleDateString('en-GB').replace(/\//g, '.')).length !== 0) {
        setError("Das Event konnte nicht hinzugefügt werden, da es bereits existiert.");
      } else {
        setError("");
        editorStore.createNewEvent(newEvent);
        props.onClose();
      }
    } else {
      setError("Der Titel darf nicht leer sein.")
    }
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if(['13', 'Enter'].includes(String(event.key))) {
      if(editorStore.unsaved) saveEvent();
    }
  });

  return (
    <Dialog
      fullWidth
      onClose={props.onClose}
      open={props.open}
    >
      <StyledDialogTitle onClose={props.onClose}>
          Neues Event erstellen
      </StyledDialogTitle>
      <Divider />
      <DialogContent>
        <TextField 
          label="Name"
          fullWidth
          autoFocus
          variant="outlined"
          value={eventName}
          onChange={(changeEvent) => {setEventName(changeEvent.target.value)}}
          error={eventName.length < 1 || eventName.length > 250}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="Datum"
            fullWidth
            style={{marginTop: '12px'}}
            format="dd.MM.yyyy"
            allowKeyboardControl
            inputVariant="outlined"
            animateYearScrolling
            value={date}
            onChange={(date) => {
              if(date) {
                setDate(new Date(date?.toDateString()));
              }
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField 
          style={{marginTop: '10px', marginBottom: '8px'}}
          label="Beschreibung"
          fullWidth
          variant="outlined"
          value={eventDesription}
          onChange={(changeEvent) => {setEventDesription(changeEvent.target.value)}}
          error={eventName.length > 250}
        />
        {
          (error) ? (<Alert severity="error">{error}</Alert>) : null
        }
      </DialogContent>
      <Divider />
      <DialogActions style={{ padding: '10px' }}>
        <StyledButton
          variant="outlined"
          size="large"
          onClick={() => {
            props.onClose();
          }}
        >
          Abbrechen
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          size="large"
          onClick={() => saveEvent()}
        >
          Speichern
        </StyledButton>
      </DialogActions> 
    </Dialog>
  );
}

export default observer(AddNewEventDialog);
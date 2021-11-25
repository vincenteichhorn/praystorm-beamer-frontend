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

const EditEventDialog: FunctionComponent<Props> = (props) => {

  const { editorStore } = useContext(StoreContext);

  const [eventIdentity, setEventIdentity] = useState((editorStore.currentEvent) ? [editorStore.currentEvent.name, editorStore.currentEvent.date.toString()] : ['', '']);
  const [eventName, setEventName] = useState((editorStore.currentEvent) ? editorStore.currentEvent.name : '');
  const [eventDesription, setEventDesription] = useState((editorStore.currentEvent) ? editorStore.currentEvent.description : '');
  const [date, setDate] = useState((editorStore.currentEvent) ? new Date(editorStore.currentEvent.date.toString()) : new Date(0));
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const updateEvent = () => {
    setError("");
    if(eventName !== '') {
      const event: Event = {
        name: eventName,
        description: eventDesription,
        date: date,
      }
      if(editorStore.events.filter((event) => event.name + new Date(event.date).toLocaleDateString('en-GB').replace(/\//g, '.') === eventName + new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')).length !== 0) {
        props.onClose();
      } else {
        setError("");
        console.log(event, eventIdentity);
        editorStore.updateEvent(event, eventIdentity);
        props.onClose();
      }
      setLoaded(false);
      setEventName('');
      setDate(new Date(0));
      setEventDesription('');
      setEventIdentity(['','']);
    } else {
      setError("Der Titel darf nicht leer sein.")
    }
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if(['13', 'Enter'].includes(String(event.key))) {
      updateEvent();
    }
  });

  useEffect(() => {
    if(editorStore.currentEvent && props.open) {
        if(!loaded) {
            if(!eventName) setEventName(editorStore.currentEvent.name);
            if(new Date(date).getTime() === new Date(0).getTime()) setDate(editorStore.currentEvent.date);
            if(!eventDesription) setEventDesription(editorStore.currentEvent.description);
            if(JSON.stringify(eventIdentity) === JSON.stringify(['', ''])) {
                const offset = date.getTimezoneOffset();
                const d =  new Date(new Date(editorStore.currentEvent.date.toString()).getTime() - (offset*60*1000))
                setEventIdentity([editorStore.currentEvent.name, d.toISOString().split('T')[0]]);
            }
            setLoaded(true);
        }
    }
  }, [editorStore.currentEvent, eventName, date, eventDesription, eventIdentity, loaded, props.open])

  return (
    <Dialog
      fullWidth
      onClose={props.onClose}
      open={props.open}
    >
      <StyledDialogTitle onClose={props.onClose}>
          Event bearbeiten
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
                setDate(new Date(date.toDateString()));
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
          onClick={() => updateEvent()}
        >
          Speichern
        </StyledButton>
      </DialogActions> 
    </Dialog>
  );
}

export default observer(EditEventDialog);
import React, { FunctionComponent, ChangeEvent, useContext, useEffect, useState } from 'react';
import { Box, Grid, FormControl, Select, MenuItem, Paper, List, ListItem, ListItemIcon, Icon, ListItemText, makeStyles, Divider } from '@material-ui/core';
import { Part, PartTypes, Event } from '../../models/DataModels';
import { observer } from 'mobx-react';
import { StoreContext } from '../../App';
import AddNewEventDialog from './Dialogs/AddNewEventDialog';

const useStyles = makeStyles(theme => ({
  select: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    [theme.breakpoints.up('md')]: {
      height: '75.6vh'
    },
  },
}));

const Sidebar: FunctionComponent = (props) => {
  const classes = useStyles();
  const { editorStore } = useContext(StoreContext);

  const [addNewEventDialog, setAddNewEventDialogOpen] = useState(false);

  const findAndChangeEvent = (changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    if(changeEvent.target.value === 'newEventKey') {
      setAddNewEventDialogOpen(true);
      editorStore.preFetch();
      return;
    }
    const newEvent = editorStore.events.find((event) => event.name === changeEvent.target.value);
    if(newEvent) changeCurrentEvent(newEvent);
  }

  const changeCurrentEvent = (newEvent: Event) => {
    editorStore.currentEvent = newEvent;
    editorStore.updateParts();
  }

  const changeCurrentPart = (newPart: Part) => {
    editorStore.currentPart = newPart;
    editorStore.updateSlides();
  }

  useEffect(() => {
    editorStore.currentPart = editorStore.parts.find((part) => part.title === editorStore.currentPart?.title);
    editorStore.updateSlides();
  })


  return (
    <Box>
      <Grid container direction="column">
        <Box className={classes.select}>
          <FormControl
            variant="outlined"
            fullWidth
          >
            <Select
              value={(editorStore.currentEvent) ? editorStore.currentEvent.name : ''}
              onChange={findAndChangeEvent}
            >
              <MenuItem value={"newEventKey"}>
                {"Neues Event erstellen"}
              </MenuItem>
              {
                editorStore.events.map((event: Event, index: number) => (
                  <MenuItem key={index} value={event.name}>
                    {event.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl> 
        </Box>
        
        <Paper  className={classes.paper}>
          <List>
            <ListItem 
              key={-1} 
              button
              onClick={() => {/*TODO open Dialog*/}}
            >
              <ListItemIcon>
                <Icon>add</Icon>
              </ListItemIcon>
              <ListItemText>Part hinzufügen</ListItemText>
            </ListItem>
            <ListItem 
              key={-2} 
              button
              onClick={() => {/*TODO open Dialog*/}}
            >
              <ListItemIcon>
                <Icon>edit</Icon>
              </ListItemIcon>
              <ListItemText>Reihenfolge bearbeiten</ListItemText>
            </ListItem>
            <Divider />
            <Divider />
            {
              editorStore.parts.map((part: Part, index: number) => (
                <ListItem 
                  key={index} 
                  button
                  selected={(part.title === editorStore.currentPart?.title)}
                  onClick={() => changeCurrentPart(part)}
                >
                  <ListItemIcon>
                    { (part.type === PartTypes.SONG) ? <Icon>music_note</Icon> : <Icon>class</Icon>}
                  </ListItemIcon>
                  <ListItemText>{part.title}</ListItemText>
                </ListItem>
              ))
            }
          </List>
        </Paper>  
      </Grid>
      <AddNewEventDialog 
        open={addNewEventDialog}
        onClose={() => setAddNewEventDialogOpen(false)}
      />
    </Box>
  );
}

export default observer(Sidebar);
import React, { FunctionComponent, ChangeEvent, useContext, useEffect, useState } from 'react';
import { Box, Grid, FormControl, Select, MenuItem, Paper, List, ListItem, ListItemIcon, Icon, ListItemText, makeStyles, Divider, TextField } from '@material-ui/core';
import { Part, PartTypes, Event } from '../../models/DataModels';
import { observer } from 'mobx-react';
import { StoreContext } from '../../App';
import AddNewEventDialog from './Dialogs/AddNewEventDialog';
import AddNewPartDialog from './Dialogs/AddNewPartDialog';
import SearchPartDialog from './Dialogs/SearchPartDialog';
import EditEventDialog from './Dialogs/EditEventDialog';

const useStyles = makeStyles(theme => ({
  select: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    [theme.breakpoints.up('md')]: {
      height: '75.6vh'
    },
    overflow: 'auto',
  },
}));

const Sidebar: FunctionComponent = (props) => {
  const classes = useStyles();
  const { editorStore } = useContext(StoreContext);

  const [addNewEventDialog, setAddNewEventDialogOpen] = useState(false);
  const [addNewPartDialog, setAddNewPartDialog] = useState(false);
  const [searchPartDialog, setSearchPartDialog] = useState(false);
  const [editEventDialog, setEditEventDialog] = useState(false);

  const findAndChangeEvent = (changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    if(changeEvent.target.value === 'newEventKey') {
      setAddNewEventDialogOpen(true);
      return;
    }
    const val = String(changeEvent.target.value);
    const newEvent = editorStore.events.find((event) => event.name + new Date(event.date).toLocaleDateString('en-GB').replace(/\//g, '.') === val);
    if(newEvent) changeCurrentEvent(newEvent);
  }

  const changeCurrentEvent = (newEvent: Event) => {
    if(editorStore.unsaved) editorStore.savePartChanges();
    editorStore.currentEvent = newEvent;
    editorStore.updateParts();
  }

  const changeCurrentPart = (newPart: Part) => {
    if(editorStore.unsaved) editorStore.savePartChanges();
    editorStore.currentPart = newPart;
    editorStore.currentPartIdentity = {title: editorStore.currentPart.title, author: editorStore.currentPart.author};
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
              value={(editorStore.currentEvent) ? editorStore.currentEvent.name + new Date(editorStore.currentEvent.date).toLocaleDateString('en-GB').replace(/\//g, '.') : ''}
              onChange={findAndChangeEvent}
              margin="dense"
            >
              <MenuItem value={"newEventKey"}>
                <ListItemIcon>
                  <Icon>add</Icon>
                </ListItemIcon>
                <ListItemText style={{margin: '4px'}} >
                  neues Event erstellen
                </ListItemText>
              </MenuItem>
              {
                editorStore.events.map((event: Event, index: number) => (
                  <MenuItem key={index} value={event.name + new Date(event.date).toLocaleDateString('en-GB').replace(/\//g, '.')}>
                    <ListItemText>{event.name} ({new Date(event.date).toLocaleDateString('en-GB').replace(/\//g, '.')})</ListItemText>
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl> 
        </Box>
        
        <Paper className={classes.paper}>
          <List dense style={{paddingBottom: '0'}}>
            <ListItem 
              key={-0} 
              button
              onClick={() => {
                setEditEventDialog(true);
              }}
            >
              <ListItemIcon>
                <Icon>edit</Icon>
              </ListItemIcon>
              <ListItemText>Event bearbeiten</ListItemText>
            </ListItem>
            <ListItem 
              key={-1} 
              button
              onClick={() => {
                setAddNewPartDialog(true); 
                editorStore.fetchAllParts();
              }}
            >
              <ListItemIcon>
                <Icon>add</Icon>
              </ListItemIcon>
              <ListItemText>Part erstellen</ListItemText>
            </ListItem>
            <ListItem 
              key={-2} 
              button
              onClick={() => {
                setSearchPartDialog(true);
                editorStore.fetchAllParts();
              }}
            >
              <ListItemIcon>
                <Icon>search</Icon>
              </ListItemIcon>
              <ListItemText>Partbibliothek durchsuchen</ListItemText>
            </ListItem>
          </List>
          <List>
            <Divider/>
            {
              editorStore.parts.map((part: Part, index: number) => (
                <ListItem 
                  key={index} 
                  button
                  selected={(part.title === editorStore.currentPart?.title)}
                  onClick={() => {
                    changeCurrentPart(part)
                  }}
                >
                  <ListItemIcon>
                    {(part.type === PartTypes.SONG) ? <Icon>music_note</Icon> : <Icon>class</Icon>}
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
      <AddNewPartDialog
        open={addNewPartDialog}
        onClose={() => setAddNewPartDialog(false)}
      />
      <SearchPartDialog 
        open={searchPartDialog}
        onClose={() => setSearchPartDialog(false)}
      />
      <EditEventDialog
        open={editEventDialog}
        onClose={() => setEditEventDialog(false)}
      />
    </Box>

  );
}

export default observer(Sidebar);
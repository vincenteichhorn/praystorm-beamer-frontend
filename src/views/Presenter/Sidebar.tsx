import React, { FunctionComponent, ChangeEvent, useEffect } from 'react';
import { Paper, Grid, FormControl, Select, MenuItem, List, ListItem, ListItemText, makeStyles, Box, ListItemIcon, Icon } from '@material-ui/core';
import { Event, Part, PartTypes } from '../../models/DataModels';
import Beamer from '../Beamer/Beamer';
import { StoreContext } from '../../App';
import { useContext } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

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

const Sidebar: FunctionComponent = () => {
  const classes = useStyles();

  const history = useHistory();
  const { presenterStore, editorStore } = useContext(StoreContext);

  const changeCurrentPart = (newPart: Part) => {
    presenterStore.currentPart = newPart;
    presenterStore.updateSlides();
    presenterStore.sendPart();
  }

  const findAndChangeEvent = (changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    const newEvent = presenterStore.events.find((event) => event.name === changeEvent.target.value);
    if(newEvent) {
      presenterStore.currentEvent = newEvent;
      presenterStore.updateParts();
      presenterStore.sendEvent();
    }
  }

  useEffect(() => {
    const keyUpEventListener = (event: KeyboardEvent) => {
      if(event.keyCode === 38) { // ^ up 
        let id = presenterStore.parts?.findIndex((element) => element.title === presenterStore.currentPart?.title);
        if(id) {
          if(id < 1 || id > presenterStore.parts?.length - 1) {
            id = presenterStore.parts?.length - 1;
          } else {
            id = id - 1;
          }
        }
        changeCurrentPart(presenterStore.parts[id]);
      }
      if(event.keyCode === 40) { // V down
        let id = presenterStore.parts?.findIndex((element) => element.title === presenterStore.currentPart?.title);
        if(id) {
          if(id < 0 || id > presenterStore.parts?.length - 2) {
            id = 0;
          } else {
            id = id + 1;
          }
        }
        changeCurrentPart(presenterStore.parts[id]);
      }
    }
    document.addEventListener('keyup', keyUpEventListener);
  }, []);

  return (
    <Box>
      <Grid container direction="column">
        <Box className={classes.select}>
          <FormControl
            variant="outlined"
            fullWidth
          >
            <Select
              value={(presenterStore.currentEvent) ? presenterStore.currentEvent.name : ''}
              onChange={findAndChangeEvent}
            >
              {
                (presenterStore.events) ? presenterStore.events.map((event: Event, index: number) => (
                  <MenuItem key={index} value={event.name}>
                    {event.name} ({event.date})
                  </MenuItem>
                )) : null
              }
            </Select>
          </FormControl> 
        </Box>
        
        <Paper  className={classes.paper}>
          <Grid style={{maxHeight: '100%'}} container direction="column">
            <Grid item>
              <List>
                {
                  (presenterStore.parts.length > 0) ? presenterStore.parts.map((part: Part, index: number) => (
                    <ListItem 
                      key={index} 
                      button
                      selected={(part.title === presenterStore.currentPart?.title)}
                      onClick={() => {
                        changeCurrentPart(part);
                        console.log((part.title === presenterStore.currentPart?.title), part.title, presenterStore.currentPart?.title);
                      }}
                    >
                      <ListItemIcon>
                        { (part.type === PartTypes.SONG) ? <Icon>music_note</Icon> : <Icon>class</Icon>}
                      </ListItemIcon>
                      <ListItemText>{part.title}</ListItemText>
                    </ListItem>
                  )) : (
                    <ListItem  
                      button
                      selected={true}
                      onClick={() => {
                        editorStore.currentEvent = presenterStore.currentEvent;
                        editorStore.updateParts();
                        history.push('/editor');
                      }}
                    >
                      <ListItemIcon>
                        { <Icon>info</Icon> }
                      </ListItemIcon>
                      <ListItemText>In diesem Event gibt es noch keine Parts. Du kannst diese im Editor erstellen.</ListItemText>
                    </ListItem>
                  )
                }
              </List>
            </Grid>
            <Grid item>
              <div
                style={{
                  width: '100%',
                  paddingTop: '56.25%',
                  position: 'relative', 
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: 0,
                    top: 0
                  }}
                >
                  <Beamer preview={true}/>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>  
      </Grid>
    </Box>
  );
}

export default observer(Sidebar);

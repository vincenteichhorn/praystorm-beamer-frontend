import React, { FunctionComponent, ChangeEvent, useEffect } from 'react';
import { Paper, Grid, FormControl, Select, MenuItem, List, ListItem, ListItemText, makeStyles, Box, ListItemIcon, Icon } from '@material-ui/core';
import { Event, Part, PartTypes } from '../../models/DataModels';

const useStyles = makeStyles(theme => ({
  select: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    [theme.breakpoints.up('md')]: {
      height: '75vh'
    },
  },
}));

interface Props {
  events: Event[];
  currentEvent: Event | undefined;
  onChangeEvent: (newEvent: Event) => void;
  parts: Part[]; 
  currentPart: Part | undefined 
  onChangePart: (newPart: Part) => void;
}

const Sidebar: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const findAndChangeEvent = (changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    const newEvent = props.events.find((event) => event.name === changeEvent.target.value);
    if(newEvent) props.onChangeEvent(newEvent);
  }

  useEffect(() => {
    const keyUpEventListener = (event: KeyboardEvent) => {
      if(event.keyCode === 38) { // ^
        let id = props.parts?.findIndex((element) => element.title === props.currentPart?.title);
        if(id < 1 || id > props.parts?.length - 1) {
          id = 0;
        } else {
          id = id - 1;
        }
        props.onChangePart(props.parts[id]);
      }
      if(event.keyCode === 40) { // V
        let id = props.parts?.findIndex((element) => element.title === props.currentPart?.title);
        if(id < 0 || id > props.parts?.length - 2) {
          id = 0;
        } else {
          id = id + 1;
        }
        props.onChangePart(props.parts[id]);
      }
    }
    document.addEventListener('keyup', keyUpEventListener);
    return () => {
      document.removeEventListener('keyup', keyUpEventListener);
    };
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
              value={(props.currentEvent) ? props.currentEvent.name : ''}
              onChange={findAndChangeEvent}
            >
              {
                (props.events) ? props.events.map((event: Event, index: number) => (
                  <MenuItem key={index} value={event.name}>
                    {event.name}
                  </MenuItem>
                )) : null
              }
            </Select>
          </FormControl> 
        </Box>
        
        <Paper  className={classes.paper}>
          <Grid style={{height: '100%'}} container direction="column" justify="space-between">
            <Grid item>
              <List>
                {
                  (props.parts) ? props.parts.map((part: Part, index: number) => (
                    <ListItem 
                      key={index} 
                      button
                      selected={(part.title === props.currentPart?.title)}
                      onClick={() => props.onChangePart(part)}
                    >
                      <ListItemIcon>
                        { (part.type === PartTypes.SONG) ? <Icon>music_note</Icon> : <Icon>class</Icon>}
                      </ListItemIcon>
                      <ListItemText>{part.title}</ListItemText>
                    </ListItem>
                  )) : null
                }
              </List>
            </Grid>
            <Grid item>
              <iframe 
                src={`${document.location.origin}/beamer`} 
                style={{
                  border: 'none',
                  width: '100%',
                  height: '100%',
                }}
                title='LivePreview'
              />
            </Grid>
          </Grid>
        </Paper>  
      </Grid>
    </Box>
    
  );
}

export default Sidebar;

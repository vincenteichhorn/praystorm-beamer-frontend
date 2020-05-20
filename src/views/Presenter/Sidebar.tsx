import React, { FunctionComponent, ChangeEvent } from 'react';
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
        </Paper>  
      </Grid>
    </Box>
    
  );
}

export default Sidebar;

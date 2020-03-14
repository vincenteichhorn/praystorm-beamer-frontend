import React, { FunctionComponent, ChangeEvent } from 'react';
import { Paper, Grid, FormControl, Select, MenuItem, List, ListItem, ListItemText, makeStyles, Box, ListItemIcon, Icon } from '@material-ui/core';
import Part from '../../models/Part';
import Event from '../../models/Event';
import { PartTypes } from '../../models/PartTypes';

const useStyles = makeStyles(theme => ({
  box: {
    marginBottom: theme.spacing(1),
  },
  list: {
    minHeight: '75vh',
  }
}));

interface Props {
  events: Event[] | undefined;
  currentEvent: Event | undefined;
  onChange: (changeEvent: ChangeEvent<{ name?: string; value: unknown; }>) => void;
  parts: Part[] | undefined;  
}

const Sidebar: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Box className={classes.box}>
        <FormControl
          variant="outlined"
          fullWidth
        >
          <Select
            value={(props.currentEvent) ? props.currentEvent.name : ''}
            onChange={props.onChange}
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
      
      <Paper className={classes.list}>
        <List>
          {
            (props.parts) ? props.parts.map((part: Part, index: number) => (
              <ListItem key={index} button>
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
  );
}

export default Sidebar;

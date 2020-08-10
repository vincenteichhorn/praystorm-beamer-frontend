import React, { FunctionComponent, ChangeEvent, useState } from 'react';
import { Part, Slide, Event } from '../../models/DataModels';
import { Box, Paper, Toolbar, Divider, makeStyles, Tabs, Tab, IconButton, Grid, Icon } from '@material-ui/core';
import General from './SlideTables/General';
import Body from './SlideTables/Body';
import Style from './SlideTables/Style';

interface Props {
  currentEvent: Event | undefined;
  currentPart: Part | undefined;
  parts: Part[] | undefined;
  slides: Slide[] | undefined;
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.87)',
    padding: 0,
    paddingTop: theme.spacing(0.4),
  },
  inner: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      height: '76.2vh'
    },
  }
}));

const MainWindow: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const [tab, setTab] = useState(0);


  return (
    <Paper>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Grid container direction="row" justify="space-between">
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event: ChangeEvent<{}>, number: any) => setTab(number)}
            centered
          >
            <Tab label="General" value={0}/>
            <Tab label="Body" value={1}/>
            <Tab label="Style" value={2}/>
          </Tabs>
          <IconButton>
            <Icon>add</Icon>
          </IconButton>
        </Grid>
      </Toolbar> 
     
      <Divider />
      <Box className={classes.inner}>
         {
            (tab === 0) ? (
              <General 
                slides={props.slides}
                currentPart={props.currentPart}
              />
            ) : (tab === 1) ? (
              <Body />
            ) : (tab === 2) ? (
              <Style />
            ) : null
         }
      </Box>
    </Paper>
  );
}

export default MainWindow;
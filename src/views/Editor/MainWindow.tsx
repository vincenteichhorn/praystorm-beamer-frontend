import React, { FunctionComponent, ChangeEvent, useState } from 'react';
import { Part, Slide, Event } from '../../models/DataModels';
import { Box, Paper, Toolbar, Divider, makeStyles, Tabs, Tab, IconButton, Grid, Icon } from '@material-ui/core';
import General from './SlideTables/General';
import Body from './SlideTables/Body';
import Style from './SlideTables/Style';
import { observer } from 'mobx-react';

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
      height: '72.8vh'
    },
    overflow: 'auto',
  }
}));

const MainWindow: FunctionComponent = (props) => {
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
          {
            (tab === 1) ? (
              <IconButton>
                <Icon>add</Icon>
              </IconButton>
            ) : null
          }
        </Grid>
      </Toolbar> 
     
      <Divider />
      <Box className={classes.inner}>
         {
            (tab === 0) ? (
              <General/>
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

export default observer(MainWindow);
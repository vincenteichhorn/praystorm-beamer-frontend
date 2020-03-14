import React, { FunctionComponent } from 'react';
import Part from '../../models/Part';
import Event from '../../models/Event';
import { Paper, Toolbar, Typography, makeStyles, Divider, Breadcrumbs } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '83.7vh',
  },
  toolbar: {
    paddingBottom: theme.spacing(0.4),
    paddingTop: theme.spacing(0.4),
  }
}));

interface Props {
  currentEvent: Event | undefined;
  currentPart: Part | undefined;
  parts: Part[] | undefined;
}

const MainWindow: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Breadcrumbs>
          <Typography>
            { props.currentEvent?.name }
          </Typography>
          <Typography color="textPrimary">
            { props.currentPart?.title }
          </Typography>
        </Breadcrumbs>
      </Toolbar>
      <Divider />
    </Paper>
  );
}

export default MainWindow;

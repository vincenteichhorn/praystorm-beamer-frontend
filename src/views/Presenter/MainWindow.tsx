import React, { FunctionComponent, useState } from 'react';
import Part from '../../models/Part';
import Event from '../../models/Event';
import { Paper, Toolbar, Box, Typography, makeStyles, Divider, Breadcrumbs, Button, Grid, IconButton, Icon, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { ViewTypes } from '../../models/ViewTypes';
import { Slide } from '../../models/Slide';
import { SlideTypes } from '../../models/SlideTypes';

const useStyles = makeStyles(theme => ({
  paper: {
    minHeight: '83.7vh',
  },
  toolbar: {
    paddingBottom: theme.spacing(0.4),
    paddingTop: theme.spacing(0.4),
  },
  tableContainer: {
    textAlign: 'center',
    maxHeight: '76vh',
  }
}));

interface Props {
  currentEvent: Event | undefined;
  currentPart: Part | undefined;
  parts: Part[] | undefined;
  slides: Slide[] | undefined;
  currentSlide: Slide | undefined;
}

const MainWindow: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [view, setView] = useState(ViewTypes.LIST);

  return (
    <Paper className={classes.paper}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Grid container justify="space-between" direction="row" alignItems="center">
          <Breadcrumbs>
            <Typography>
              { props.currentEvent?.name }
            </Typography>
            <Typography color="textPrimary">
              { props.currentPart?.title }
            </Typography>
          </Breadcrumbs>
          <Grid item>
            <Grid container direction="row">
              <IconButton 
                style={{ color: (view === ViewTypes.LIST) ? '' : 'rgba(0, 0, 0, 0.2)', marginRight: '4px' }}
                disableRipple
                onClick={() => setView(ViewTypes.LIST)}
              >
                <Icon>view_headline</Icon>
              </IconButton>
              <IconButton 
                style={{ color: (view === ViewTypes.CARDS) ? '' : 'rgba(0, 0, 0, 0.2)' }}
                disableRipple
                onClick={() => setView(ViewTypes.CARDS)}
              >
                <Icon>view_module</Icon>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
      <Divider />
      <Grid container direction="row" justify="space-between" style={{ width: '100%'}}>
        <Grid item xs>
          <Grid container direction="column" alignItems="center">
            <Icon>start</Icon>
            <Icon>start</Icon>
            <Icon>start</Icon>
            <Icon>start</Icon>
          </Grid>
        </Grid>
        <Grid item xs={11}>
          {
            (view === ViewTypes.CARDS) ? (
              <Typography>Grid</Typography>
            ) : (
              <TableContainer className={classes.tableContainer}>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>Short</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Typ</TableCell>
                      <TableCell>Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      props.slides?.map((slide: Slide) => (
                        <TableRow key={slide.position}>
                          <TableCell>{slide.shorthand}</TableCell>
                          <TableCell>{slide.title}</TableCell>
                          <TableCell>{slide.type}</TableCell>
                          <TableCell>
                            {
                              (slide.type === SlideTypes.SONGPART) ? (
                                slide.data.lyrics.map(verse => (
                                  <Typography>{verse}</Typography>
                                ))
                              ) : (slide.type === SlideTypes.IMAGE) ? (
                                slide.data.image
                              ) : (slide.type === SlideTypes.VIDEO) ? (
                                slide.data.video
                              ) : (slide.type === SlideTypes.TEXT) ? (
                                slide.data.text
                              ) : null
                            }
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            )
          }
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MainWindow;

import React, { FunctionComponent, useState } from 'react';
import { Paper, Toolbar, Typography, makeStyles, Divider, Breadcrumbs, Grid, IconButton, Icon, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import ViewTypes from '../../models/ViewTypes';
import { Part, Event, Slide, SlideTypes } from '../../models/DataModels';
import ActionBar from './ActionBar';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '83.69vh'
  },
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.87)',
    paddingBottom: theme.spacing(0.4),
    paddingTop: theme.spacing(0.4),
  },
  tableContainer: {
    textAlign: 'center',
    maxHeight: '76.3vh'
  }
}));

interface Props {
  currentEvent: Event | undefined;
  currentPart: Part | undefined;
  parts: Part[] | undefined;
  slides: Slide[] | undefined;
  currentSlide: Slide | undefined;
  onChangeSlide: (newSlide: Slide) => void;
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
            <Typography color="textPrimary">
              { props.currentSlide?.title }
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
            <ActionBar />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          {
            (view === ViewTypes.CARDS) ? (
              <Typography>Grid</Typography>
            ) : (
              <TableContainer className={classes.tableContainer}>
                <Table stickyHeader >
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
                      props.slides?.map((slide: Slide, index: number) => (
                        <TableRow 
                          key={index} 
                          onClick={() => props.onChangeSlide(slide)}
                          style={{ backgroundColor: (props.currentSlide?.title === slide.title) ? 'rgba(0, 0, 0, 0.08)' : '' }}
                        >
                          <TableCell>{slide.shorthand}</TableCell>
                          <TableCell>{slide.title}</TableCell>
                          <TableCell>{slide.type}</TableCell>
                          <TableCell>
                            {
                              (slide.type === SlideTypes.SONGPART) ? (
                                slide.data.lyrics.map((verse, index) => (
                                  <Typography key={index} >{verse}</Typography>
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

import React, { FunctionComponent, useState, useContext } from 'react';
import { Paper, Toolbar, Typography, makeStyles, Divider, Breadcrumbs, Grid, IconButton, Icon, TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Box, Card, Slider } from '@material-ui/core';
import ViewTypes from '../../models/ViewTypes';
import { Part, Event, Slide, SlideTypes } from '../../models/DataModels';
import { StoreContext } from '../../App';
import AdjustmentDialog from './AdjustmentDialog';
import { observer } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  actionBar: {
    '& hr': {
      margin: theme.spacing(0, 1),
    },
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
  },
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
  const { presenterStore } = useContext(StoreContext);
  const [adjustmentDialogOpen, setAdjustmentDialogOpen] = useState(false);

  return (
    <Box>
      <Paper>
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
              <Grid container direction="row" alignItems="center" className={classes.actionBar}>
                <IconButton
                  onClick={() => presenterStore.blackout()}
                >
                  {(presenterStore.hide) ? (
                    <Icon>visibility_off</Icon>
                  ) : (
                    <Icon>visibility</Icon>
                  )}
                </IconButton>
                <IconButton
                  onClick={() => setAdjustmentDialogOpen(true)}
                >
                  <Icon>transform</Icon>
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton 
                  style={{ color: (view === ViewTypes.LIST) ? '' : 'rgba(0, 0, 0, 0.2)' }}
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
                {(view === ViewTypes.CARDS)?(
                  <div style={{width: 120,}}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Icon>zoom_in</Icon>
                      </Grid>
                      <Grid item 
                        style={{
                          width: 60,
                        }} 
                      >
                        <Slider 
                          value={2}
                          step={1}
                          min={1}
                          max={3}
                        />
                      </Grid>
                      <Grid item xs>
                        <Icon>zoom_out</Icon>
                      </Grid>
                    </Grid>
                  </div>
                ):('')}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
            {
              (view === ViewTypes.CARDS) ? (
                <Grid container spacing={1} >
                  {
                    props.slides?.map((slide: Slide, index: number) => (
                      <Grid item xs={7} sm={6}
                        style={{
                          flexWrap: 'wrap',
                          alignItems: 'stretch',
                        }}
                      >
                        <Card 
                          key={index} 
                          onClick={() => props.onChangeSlide(slide)}
                          style={{ 
                            border: (props.currentSlide?.title === slide.title) ? 'solid 2px red' : 'solid 2px white',
                            cursor: 'Pointer',
                            userSelect: 'none',
                            height: '100%',
                            backgroundColor: 'black',
                          }}
                        >
                          <Typography component="h3" style={{fontSize: '12pt', backgroundColor: 'white',}} > {slide.title}</Typography>
                          <Box
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                            }}
                          >
                          <Box
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                          {
                            (slide.type === SlideTypes.SONGPART) ? (
                              slide.data.lyrics.map((verse, index) => (                                
                                <Box 
                                  key={index}
                                  fontSize={slide.data.style.verseFontSize}
                                  style={{
                                    marginBottom: slide.data.style.verseSpacing,
                                    color: slide.data.style.verseColor,
                                    textShadow: '1px 1px 2px black',
                                    fontSize: slide.data.style.verseFontSize*0.56*0.3+'vw',
                                    lineHeight: slide.data.style.verseFontSize*0.56*0.1+'vw',
                                    height: 1.56+'vw',
                                  }}
                                >
                                  {verse}
                                </Box>
                              ))
                            ) : (slide.type === SlideTypes.IMAGE) ? (
                              slide.data.image
                            ) : (slide.type === SlideTypes.VIDEO) ? (
                              slide.data.video
                            ) : (slide.type === SlideTypes.TEXT) ? (
                              slide.data.text
                            ) : null 
                          }
                          </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>
              ) : (
                <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader >
                    <TableHead>
                      <TableRow>
                        <TableCell>Short</TableCell>
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
                            <TableCell style={{ fontWeight: 'bold' }}>{slide.shorthand}</TableCell>
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
      </Paper>
      <AdjustmentDialog 
        open={adjustmentDialogOpen}
        onClose={() => setAdjustmentDialogOpen(false)}
      />
    </Box>
  );
}

export default observer(MainWindow);

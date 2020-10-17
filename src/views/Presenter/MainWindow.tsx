import React, { FunctionComponent, useState, useContext, useEffect } from 'react';
import { Paper, Toolbar, Typography, makeStyles, Divider, Breadcrumbs, Grid, IconButton, Icon, TableContainer, TableHead, Table, TableRow, TableCell, TableBody, Box, Slider } from '@material-ui/core';
import ViewTypes from '../../models/ViewTypes';
import { Part, Event, Slide, SlideTypes } from '../../models/DataModels';
import { StoreContext } from '../../App';
import AdjustmentDialog from './AdjustmentDialog';
import { observer } from 'mobx-react';
import Songpart from '../Beamer/parts/Songpart';
import './style.css';
import Imagepart from '../Beamer/parts/Imagepart';
import Videopart from '../Beamer/parts/Videopart';

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
    [theme.breakpoints.up('md')]: {
      height: '76.3vh'
    },
  },
  gridContainer: {
    [theme.breakpoints.up('md')]: {
      height: '76.3vh'
    },
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
  const [view, setView] = useState(ViewTypes.CARDS);
  const { presenterStore } = useContext(StoreContext);
  const [adjustmentDialogOpen, setAdjustmentDialogOpen] = useState(false);
  const [gridSize, setGridSize] = useState(3);

  useEffect(() => {
    const keyUpEventListener = (event: KeyboardEvent) => {
      if(event.keyCode === 66) {
        presenterStore.blackout();
      }
      if(event.keyCode === 72) {
        presenterStore.blackoutForeground();
      }
      if(event.keyCode === 39 && props.currentSlide && props.slides) { //->
        let id = props.slides?.findIndex((element) => element.title === props.currentSlide?.title);
        if(id < 0 || id > props.slides?.length - 2) {
          id = 0;
        } else {
          id = id + 1;
        }
        props.onChangeSlide(props.slides[id]);
      }
      if(event.keyCode === 37 && props.currentSlide && props.slides) { //<-
        let id = props.slides?.findIndex((element) => element.title === props.currentSlide?.title);
        if(id < 1 || id > props.slides?.length - 1) {
          id = props.slides?.length - 1;
        } else {
          id = id - 1;
        }
        props.onChangeSlide(props.slides[id]);
      }
      if(event.keyCode === 38) { // ^
        presenterStore.blackoutForeground();
      }
      if(event.keyCode === 40) { // V
        presenterStore.blackoutForeground();
      }
      if(event.keyCode === 13) {
        props.onChangeSlide(presenterStore.slides[0]);
      }
    }
    document.addEventListener('keyup', keyUpEventListener);
    return () => {
      document.removeEventListener('keyup', keyUpEventListener);
    };
  })

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
                  onClick={() => presenterStore.blackoutForeground()}
                >
                  {(presenterStore.hideForeground) ? (
                    <Icon>flip_to_back</Icon>
                  ) : (
                    <Icon>flip_to_front</Icon>
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
                {(view === ViewTypes.CARDS) ? (
                  <IconButton 
                    disableRipple
                    onClick={(event) => {(gridSize > 2) ? setGridSize(gridSize - 1) : setGridSize(gridSize)}}
                  >
                    <Icon>zoom_in</Icon>
                  </IconButton>
                ) : null}
                {(view === ViewTypes.CARDS) ? (
                  <Slider 
                    style={{
                      width: '100px',
                    }}
                    value={gridSize}
                    onChange={(event, val) => {setGridSize(val as number)}}
                    step={1}
                    min={2}
                    max={4} 
                  />
                ):('')}
                {(view === ViewTypes.CARDS) ? (
                  <IconButton 
                    disableRipple
                    onClick={(event) => {(gridSize < 4) ? setGridSize(gridSize + 1) : setGridSize(gridSize)}}
                  >
                    <Icon>zoom_out</Icon>
                  </IconButton>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
            {
              (view === ViewTypes.CARDS) ? (
                <Grid container className={classes.gridContainer} spacing={1} alignContent='flex-start'
                  style={{
                    overflow: 'auto',
                    padding: '4px',
                  }}
                >
                  {
                    props.slides?.map((slide: Slide, index: number) => (
                      <Grid 
                        id='test'
                        item
                        xs={12/gridSize as 3 | 4 | 6}
                        key={index} 
                        onClick={() => props.onChangeSlide(slide)}
                      >
                        <div
                          style={{
                            width: '100%',
                            paddingTop: '56.25%',
                            position: 'relative', 
                            overflow: 'hidden',
                            cursor: 'pointer',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'black',
                            }}
                          >
                            {
                              (slide.type === SlideTypes.SONGPART) ? <Songpart slide={slide} preview={true} gridSize={gridSize}/> : 
                              (slide.type === SlideTypes.IMAGE) ? <Imagepart slide={slide} preview={true} gridSize={gridSize}/> :
                              (slide.type === SlideTypes.VIDEO) ? <Videopart slide={slide} preview={true} gridSize={gridSize}/> : <Songpart gridSize={gridSize} slide={slide} preview={true}/>
                            }
                          </div>
                        </div>
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

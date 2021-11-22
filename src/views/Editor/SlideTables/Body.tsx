import React, { ChangeEvent, FunctionComponent, useContext, useEffect, useState } from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, TextField, ClickAwayListener, IconButton, Icon, Select, MenuItem, Link, Snackbar, Popover} from '@material-ui/core';
import { StoreContext } from '../../../App';
import { PartTypes, Slide, SlideTypes } from '../../../models/DataModels';
import { observer } from 'mobx-react';
import useEventListener from '@use-it/event-listener'

interface Props {

}

const Body: FunctionComponent<Props> = (props) => {

  const { editorStore, homeStore } = useContext(StoreContext);

  const [activeContentId, setActiveContentId] = useState<number>();
  const [activeContent, setActiveContent] = useState<string>();
  const [activeTitleId, setActiveTitleId] = useState<number>();
  const [activeTitle, setActiveTitle] = useState<string>();
  const [newSlideTitle, setNewSlideTitle] = useState<string>('Neuer Slide');
  const [newSlideContent, setNewSlideContent] = useState<string>('Inhalt');
  const [newSlideType, setNewSlideType] = useState(SlideTypes.IMAGE);

  const getSlideData = (slide: Slide) => {
    if(editorStore.currentPart?.type === PartTypes.INSERT && slide.type === SlideTypes.SONGPART) editorStore.updateSlides();
    if(editorStore.currentPart?.type === PartTypes.SONG) {
      return slide.data.lyrics.map((line, index) => (
        <Typography key={index} >{line}</Typography>
      ));
    } else {
      if(slide.type === SlideTypes.IMAGE) {
        return slide.data.image;
      } else {
        return slide.data.video;
      }
    }
  }

  const getActiveContentData = (slide: Slide) => {
    if(editorStore.currentPart?.type === PartTypes.SONG) {
      return slide.data.lyrics.join('\n');
    } else {
      if(slide.type === SlideTypes.IMAGE) {
        return slide.data.image;
      } else {
        return slide.data.video;
      }
    }
  }

  const saveNewSlide = () => {
    if(editorStore.currentPart) {
      const slides = [...editorStore.slides];
      let title = newSlideTitle;
      const res = slides.filter((slide) => slide.title === title);
      if(res.length !== 0) {
        homeStore.openSnackBar('Dieser Slide-Title ist schon vergeben.');
        title += '+';
      }
      const newSlide = {
        title: title,
        shorthand: 'S',
        position: 0,
        type: (editorStore.currentPart.type === PartTypes.SONG) ? SlideTypes.SONGPART : newSlideType,
        data: {
          lyrics: (editorStore.currentPart.type === PartTypes.SONG) ? newSlideContent.split('\n') : [],
          image: (editorStore.currentPart.type !== PartTypes.SONG && newSlideType === SlideTypes.IMAGE) ? newSlideContent : '',
          video: (editorStore.currentPart.type !== PartTypes.SONG && newSlideType === SlideTypes.VIDEO) ? newSlideContent : '',
          style: {
            backgroundImage: '',
            backgroundColor: 'black',
            verseFontSize: 52,
            verseSpacing: 2,
            copyrightFontSize: 20,
            copyrightColor: 'orange',
            verseColor: 'white',
          },
        },
        copyright: {
          author: '',
          album: '',
          copyright: '',
        }
      }
      editorStore.addSlide(newSlide);
      setNewSlideType(SlideTypes.IMAGE);
      setNewSlideTitle('Neuer Slide');
      setNewSlideContent('Inhalt');
    }
  }

  const saveTitle = (slide: Slide, index: number) => {
    console.log('saveSlide');
    editorStore.unsaved = false;
    editorStore.changedSlideIdentity = slide.title;
    if(activeTitle) {
      if(editorStore.slides[index].title !== activeTitle) {
        const slides = [...editorStore.slides];
        const res = slides.filter((slide) => slide.title === activeTitle);
        if(res.length === 0) {
          editorStore.slides[index].title = activeTitle;
        } else {
          editorStore.slides[index].title = activeTitle + '+';
        }
      }
    }
    setActiveTitleId(undefined);
    setActiveTitle(undefined);
    editorStore.saveSlide(editorStore.slides[index]);
  }

  const saveContent = (slide: Slide, index: number) => {
    console.log('saveCOntent');
    editorStore.unsaved = false;
    editorStore.changedSlideIdentity = slide.title;
    if(slide.type === SlideTypes.SONGPART) {
      editorStore.slides[index].data.lyrics = (activeContent) ? activeContent?.split('\n') : [];
    } else if(slide.type === SlideTypes.VIDEO) {
      editorStore.slides[index].data.video = (activeContent) ? activeContent : '';
    } else if(slide.type === SlideTypes.IMAGE) {
      editorStore.slides[index].data.image = (activeContent) ? activeContent : '';
    }
    setActiveContentId(undefined);
    setActiveContent(undefined);
    editorStore.saveSlide(editorStore.slides[index]);
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if(['13', 'Enter'].includes(String(event.key))) {
      if(editorStore.newSlide) saveNewSlide();
      if(activeTitleId !== undefined) saveTitle(editorStore.slides[activeTitleId], activeTitleId);
      if(activeContentId !== undefined) saveContent(editorStore.slides[activeContentId], activeContentId);
    }
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (editorStore.currentPart) ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Titel</TableCell>
          {(editorStore.currentPart?.type === PartTypes.INSERT) ? <TableCell>Typ</TableCell> : null}
          <TableCell>Inhalte</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(editorStore.newSlide) ? (
          <TableRow>
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                value={newSlideTitle}
                onChange={(changeEvent) => {
                  setNewSlideTitle(changeEvent.target.value);
                }}
              />
            </TableCell>
            {
              (editorStore.currentPart?.type === PartTypes.INSERT) ? 
                (
                  <TableCell>
                    <Select
                      variant="outlined"
                      value={newSlideType}
                      onChange={(changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
                        if (changeEvent.target.value === SlideTypes.IMAGE || changeEvent.target.value === SlideTypes.VIDEO ) {
                          setNewSlideType(changeEvent.target.value);
                        }
                      }}
                    >
                      {
                        Object.keys(SlideTypes).map((type, index) => {
                          return (type !== SlideTypes.SONGPART) ? (<MenuItem key={index} value={type}>{type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1)}</MenuItem>) : null
                        })
                      }
                    </Select>
                  </TableCell>
                ) : null
            }
            <TableCell>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                multiline
                value={newSlideContent}
                onChange={(changeEvent) => {
                  setNewSlideContent(changeEvent.target.value);
                }}
              />
            </TableCell>
            <TableCell
                align="right"
              >
                <IconButton
                  onClick={() => {
                    editorStore.newSlide = false;
                    setNewSlideType(SlideTypes.IMAGE);
                    setNewSlideTitle('Neuer Slide');
                    setNewSlideContent('Inhalt');
                  }}
                >
                  <Icon>close</Icon>
                </IconButton>
                <IconButton
                  onClick={() => saveNewSlide()}
                >
                  <Icon>done</Icon>
                </IconButton>
              </TableCell>
          </TableRow>
        ) : null}
        {
          editorStore.slides.map((slide: Slide, index) => (
            <TableRow key={index}>
              <TableCell
                onClick={() => {
                  setActiveTitleId(index);
                  editorStore.unsaved = true;
                  if(activeTitleId !== index) setActiveTitle(slide.title);
                }}
              >
                {
                  (activeTitleId === index) ? (
                    <ClickAwayListener
                      onClickAway={() => saveTitle(slide, index)}
                    >
                      <TextField
                        variant="outlined"
                        size="small"
                        value={activeTitle}
                        onChange={(changeEvent) => {
                          setActiveTitle(changeEvent.target.value);
                        }}
                      />
                    </ClickAwayListener>
                  ) : (slide.title)
                }
              </TableCell>
              {
                (editorStore.currentPart?.type === PartTypes.INSERT) ? (
                  <TableCell>
                    <Select
                      variant="outlined"
                      value={editorStore.slides[index].type}
                      onOpen={() => {
                        editorStore.unsaved = true;
                      }}
                      onChange={(changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
                        if (changeEvent.target.value === SlideTypes.IMAGE || changeEvent.target.value === SlideTypes.VIDEO ) {
                          editorStore.unsaved = false;
                          editorStore.changedSlideIdentity = slide.title;
                          editorStore.slides[index].type = changeEvent.target.value;
                          editorStore.saveSlide(editorStore.slides[index]);
                        }
                      }}
                    >
                    {
                        Object.keys(SlideTypes).map((type, index) => {
                          return (type !== SlideTypes.SONGPART) ? (<MenuItem key={index} value={type}>{type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1)}</MenuItem>) : null
                        })
                      }
                    </Select>
                  </TableCell>
                ) : null
              }
              <TableCell
                onClick={() => {
                  console.log('click')
                  setActiveContentId(index);
                  editorStore.unsaved = true;
                  if(activeContentId !== index) setActiveContent(getActiveContentData(slide));
                }}
              >
                {
                  (activeContentId === index) ? (
                    <ClickAwayListener
                      onClickAway={() => saveContent(slide, index)}
                    >
                      <TextField 
                        fullWidth
                        size="small"
                        multiline
                        variant="outlined"
                        value={activeContent}
                        onChange={(changeEvent) => {
                          setActiveContent(changeEvent.target.value);
                        }}
                      />
                    </ClickAwayListener>

                  ) : getSlideData(slide)
                }
              </TableCell>    
              <TableCell
                align="right"
              >
                <IconButton
                  disabled={!((activeContentId === index) || (activeTitleId === index))}
                >
                  <Icon>save</Icon>
                </IconButton>
                <IconButton
                  onClick={(event) => openPopover(event)}
                >
                  <Icon>delete</Icon>
                </IconButton>
                <Popover
                  id={popoverId}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={closePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                   <IconButton
                    onClick={closePopover}
                  >
                    <Icon>close</Icon>
                  </IconButton>
                  <IconButton
                    onClick={() => editorStore.deleteSlide(slide.title)}
                  >
                    <Icon>done</Icon>
                  </IconButton>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
    
  ) : (
    <Box>
      <Typography>Klicke links auf "neuen Part hinzufügen" um deinen Ablauf zu erstellen</Typography>
    </Box>
  );
}

export default observer(Body);
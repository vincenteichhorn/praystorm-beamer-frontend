import React, { ChangeEvent, FunctionComponent, useContext, useState } from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, TextField, ClickAwayListener, IconButton, Icon, Select, MenuItem, Link, Snackbar} from '@material-ui/core';
import { StoreContext } from '../../../App';
import { PartTypes, Slide, SlideTypes } from '../../../models/DataModels';
import { observer } from 'mobx-react';

interface Props {

}

const Body: FunctionComponent<Props> = (props) => {

  const { editorStore, homeStore } = useContext(StoreContext);

  const [activeContentId, setActiveContentId] = useState<number>();
  const [activeContent, setActiveContent] = useState<string>();
  const [activeTitleId, setActiveTitleId] = useState<number>();
  const [activeTitle, setActiveTitle] = useState<string>();

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
        {
          editorStore.slides.map((slide: Slide, index) => (
            <TableRow key={index}>
              <TableCell
                onClick={() => {
                  setActiveTitleId(index);
                  editorStore.unsavedPart = true;
                  editorStore.changedSlideIdentity = slide.title;
                  if(activeTitleId !== index) setActiveTitle(slide.title);
                }}
              >
                {
                  (activeTitleId === index) ? (
                    <ClickAwayListener
                      onClickAway={() => {
                        setActiveTitleId(undefined);
                        editorStore.unsavedPart = false;
                        if(activeTitle) {
                          if(editorStore.slides[index].title !== activeTitle) {
                            const slides = [...editorStore.slides];
                            const res = slides.filter((slide) => slide.title === activeTitle);
                            console.log(res);
                            if(res.length === 0) {
                              editorStore.slides[index].title = activeTitle;
                            } else {
                              homeStore.openSnackBar('Dieser Titel ist leider schon als Slidetitel vergeben.');
                            }
                          }
                        }
                        editorStore.saveSlide(editorStore.slides[index]);
                      }}
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
                        editorStore.unsavedPart = true;
                      }}
                      onChange={(changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
                        if (changeEvent.target.value === SlideTypes.IMAGE || changeEvent.target.value === SlideTypes.VIDEO ) {
                          editorStore.unsavedPart = false;
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
                  setActiveContentId(index);
                  editorStore.unsavedPart = true;
                  editorStore.changedSlideIdentity = slide.title;
                  if(activeContentId !== index) setActiveContent(getActiveContentData(slide));
                }}
              >
                {
                  (activeContentId === index) ? (
                    <ClickAwayListener
                      onClickAway={() => {
                        setActiveContentId(undefined);
                        editorStore.unsavedPart = false;
                        if(slide.type === SlideTypes.SONGPART) {
                          editorStore.slides[index].data.lyrics = (activeContent) ? activeContent?.split('\n') : [];
                        } else if(slide.type === SlideTypes.VIDEO) {
                          editorStore.slides[index].data.video = (activeContent) ? activeContent : '';
                        } else if(slide.type === SlideTypes.IMAGE) {
                          editorStore.slides[index].data.image = (activeContent) ? activeContent : '';
                          console.log(editorStore.slides[index].data.image);
                        }

                        editorStore.saveSlide(editorStore.slides[index]);
                      }}
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
                <IconButton>
                  <Icon>delete</Icon>
                </IconButton>
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
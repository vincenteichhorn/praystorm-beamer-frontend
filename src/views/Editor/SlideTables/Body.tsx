import React, { FunctionComponent, useContext, useState } from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, TextField, ClickAwayListener } from '@material-ui/core';
import { StoreContext } from '../../../App';
import { PartTypes, Slide, SlideTypes } from '../../../models/DataModels';
import { observer } from 'mobx-react';

interface Props {

}

const Body: FunctionComponent<Props> = (props) => {

  const {editorStore} = useContext(StoreContext);

  const [activeContentId, setActiveContentId] = useState<number>();
  const [activeContent, setActiveContent] = useState<string>();

  const getSlideData = (slide: Slide) => {
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

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Titel</TableCell>
          {(editorStore.currentPart?.type === PartTypes.INSERT) ? <TableCell>Typ</TableCell> : null}
          <TableCell>Inhalte</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          editorStore.slides.map((slide: Slide, index) => (
            <TableRow key={index}>
              <TableCell>{slide.title}</TableCell>
              <TableCell
                onClick={() => {
                  setActiveContentId(index);
                  if(activeContentId !== index) setActiveContent(getActiveContentData(slide));
                }}
              >
                {
                  (activeContentId === index) ? (
                    <ClickAwayListener
                      onClickAway={() => {
                        setActiveContentId(undefined);
                        editorStore.slides[index].data.lyrics = (activeContent) ? activeContent?.split('\n') : [];
                        editorStore.updateSlide(editorStore.slides[index]);
                      }}
                    >
                      <TextField 
                        fullWidth
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
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}

export default observer(Body);
import React, { FunctionComponent, useState, useEffect, ChangeEvent, SetStateAction, useContext, Dispatch } from 'react';
import { TextField, Box, Divider, ClickAwayListener, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';
import { PartTypes } from '../../../models/DataModels';
import { StoreContext } from '../../../App';
import { observer } from 'mobx-react';

const General: FunctionComponent = (props) => {

  const { editorStore } = useContext(StoreContext);

  const [partTitle, setPartTitle] = useState('');
  const [copyrightAlbum, setCopyrightAlbum] = useState('');
  const [copyrightAuthor, setCopyrightAuthor] = useState('');
  const [copyright, setCopyright] = useState('');
  const [position, setPosition]: [any, SetStateAction<any>] = useState();
  const [type, setType]: [PartTypes | undefined, Dispatch<SetStateAction<PartTypes | undefined>>] = useState();

  useEffect(() => {
    setPartTitle((editorStore.currentPart) ? editorStore.currentPart?.title : '');
    setPosition((editorStore.currentPart) ? editorStore.currentPart?.position : 0);
    setType((editorStore.currentPart) ? editorStore.currentPart?.type : PartTypes.INSERT);
    if (editorStore.slides[0]) {
      setCopyrightAlbum((editorStore.slides[0].copyright.album) ? editorStore.slides[0]?.copyright.album : '');
      setCopyrightAuthor((editorStore.slides[0].copyright.author) ? editorStore.slides[0]?.copyright.author : '');
      setCopyright((editorStore.slides[0].copyright.copyright) ? editorStore.slides[0]?.copyright.copyright : '');
    }
  }, [editorStore.currentPart, editorStore.slides]);

  const updatePartObj = () => {
    //TODO fetch
  }

  return (editorStore.currentPart) ? (
    <Box>
      <ClickAwayListener
        onClickAway={updatePartObj}
      >
        <TextField
          style={{ marginBottom: '8px' }}
          label="Titel"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? editorStore.currentPart?.title : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (editorStore.currentPart && event.target.value.length >= 0 &&event.target.value.length <= 250) {
              editorStore.currentPart.title = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart?.title.length < 1 || editorStore.currentPart?.title.length > 250) : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </ClickAwayListener>
      <Divider />
      <ClickAwayListener
        onClickAway={updatePartObj}
      >
        <TextField
          style={{ marginBottom: '8px', marginTop: '10px' }}
          label="Copyright Album"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? (editorStore.currentPart.album) ? editorStore.currentPart.album : '' : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (editorStore.currentPart && event.target.value.length < 251) {
              editorStore.currentPart.album = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart.album) ? editorStore.currentPart.album.length > 250 : false : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </ClickAwayListener>
      <ClickAwayListener
        onClickAway={updatePartObj}
      >
        <TextField
          style={{ marginBottom: '8px', marginTop: '10px' }}
          label="Copyright Autor"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? (editorStore.currentPart.author) ? editorStore.currentPart.author : '' : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (editorStore.currentPart && event.target.value.length <= 250) {
              editorStore.currentPart.author = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart.author) ? editorStore.currentPart.author.length > 250 : false : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </ClickAwayListener>
      <ClickAwayListener
        onClickAway={updatePartObj}
      >
        <TextField
          style={{ marginBottom: '8px', marginTop: '10px' }}
          label="Copyright"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? (editorStore.currentPart.copyright) ? editorStore.currentPart.copyright : '' : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (editorStore.currentPart && event.target.value.length <= 250) {
              editorStore.currentPart.copyright = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart.copyright) ? editorStore.currentPart.copyright.length > 250 : false : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </ClickAwayListener>
      <ClickAwayListener
        onClickAway={updatePartObj}
      >
        <Box
          style={{
            paddingTop: '10px',
          }}
        >
          <Select
            variant="outlined"
            fullWidth
            value={(editorStore.currentPart) ? editorStore.currentPart.type : ''}
            onChange={(changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
              if (editorStore.currentPart && (changeEvent.target.value === PartTypes.INSERT || changeEvent.target.value === PartTypes.SONG)) {
                editorStore.currentPart.type = changeEvent.target.value;
              }
            }}
            label='Art'
          >
           {
              Object.keys(PartTypes).map((type, index) => (
                <MenuItem key={index} value={type}>{type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1)}</MenuItem>
              ))
            }
          </Select>
        </Box>
      </ClickAwayListener>
    </Box>
  ) : (
    <Box>
      <Typography>Klicke links auf "Part hinzufügen" um deinen Ablauf zu erstellen</Typography>
    </Box>
  )
}

export default observer(General);
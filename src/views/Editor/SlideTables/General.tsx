import React, { FunctionComponent, useState, useEffect, ChangeEvent, SetStateAction, useContext, Dispatch } from 'react';
import { TextField, Box, Divider, ClickAwayListener, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { Slide, Part, PartTypes } from '../../../models/DataModels';
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
  });

  const updatePartObj = () => {
    //TODO fetch
  }

  return (
    <Box>
      <ClickAwayListener
        onClickAway={updatePartObj}
      >
        <TextField
          style={{ marginBottom: '8px' }}
          label="Part Title"
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
          value={(editorStore.currentPart) ? (editorStore.currentPart.album) : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (editorStore.currentPart && event.target.value.length < 251) {
              editorStore.currentPart.album = event.target.value;
            }
          }}
          error={(editorStore.slides.length > 0) ? ((editorStore.slides[0]?.copyright.album) ? editorStore.slides[0]?.copyright.album.length > 250 : false) : true}
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
          label="Copyright Author"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? (editorStore.currentPart.author) : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (editorStore.currentPart && event.target.value.length <= 250) {
              editorStore.currentPart.author = event.target.value;
            }
          }}
          error={(editorStore.slides.length > 0) ? ((editorStore.slides[0]?.copyright.author) ? editorStore.slides[0]?.copyright.author.length > 250 : false) : true}
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
          value={(editorStore.currentPart) ? (editorStore.currentPart.copyright) : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (editorStore.currentPart && event.target.value.length <= 250) {
              editorStore.currentPart.copyright = event.target.value;
            }
          }}
          error={(editorStore.slides.length > 0) ? ((editorStore.slides[0]?.copyright.copyright) ? editorStore.slides[0]?.copyright.copyright.length > 250 : false) : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </ClickAwayListener>
      TODO: Position: Slide || +- Buttons
      <ClickAwayListener
        onClickAway={updatePartObj}
      >
        <Box
          style={{
            paddingTop: '10px',
          }}
        >
          <FormControl
            variant="outlined"
            fullWidth
          >
            <InputLabel>Type</InputLabel>
            <Select
              value={(editorStore.currentPart) ? editorStore.currentPart.type : ''}
              onChange={(changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
                if (editorStore.currentPart && (changeEvent.target.value === PartTypes.INSERT || changeEvent.target.value === PartTypes.SONG)) {
                  editorStore.currentPart.type = changeEvent.target.value;
                }
              }}
              label='Type'
            >
              <MenuItem key={1} value={PartTypes.INSERT}>
                {"Insert"}
              </MenuItem>
              <MenuItem key={1} value={PartTypes.SONG}>
                {"Song"}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </ClickAwayListener>
    </Box>
  );
}

export default observer(General);
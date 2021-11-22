import React, { FunctionComponent, useState, useEffect, ChangeEvent, SetStateAction, useContext, Dispatch } from 'react';
import { TextField, Box, Divider, Select, MenuItem, FormControl, InputLabel, Typography, Button } from '@material-ui/core';
import { Part, PartTypes } from '../../../models/DataModels';
import { StoreContext } from '../../../App';
import { observer } from 'mobx-react';

const General: FunctionComponent = (props) => {

  const { editorStore } = useContext(StoreContext);

  return (editorStore.currentPart) ? (
    <Box>
      <Box>
        <TextField
          style={{ marginBottom: '8px' }}
          label="Titel"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? editorStore.currentPart?.title : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if(!editorStore.unsaved) editorStore.unsaved = true;
            if (editorStore.currentPart && event.target.value.length >= 0 &&event.target.value.length <= 250) {
              editorStore.currentPart.title = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart?.title.length < 1 || editorStore.currentPart?.title.length > 250) : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Divider />
      <Box>
        <TextField
          style={{ marginBottom: '8px', marginTop: '10px' }}
          label="Copyright Album"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? (editorStore.currentPart.album) ? editorStore.currentPart.album : '' : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if(!editorStore.unsaved) editorStore.unsaved = true;
            if (editorStore.currentPart && event.target.value.length < 251) {
              editorStore.currentPart.album = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart.album) ? editorStore.currentPart.album.length > 250 : false : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box>
        <TextField
          style={{ marginBottom: '8px', marginTop: '10px' }}
          label="Copyright Autor"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? (editorStore.currentPart.author) ? editorStore.currentPart.author : '' : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if(!editorStore.unsaved) editorStore.unsaved = true;
            if (editorStore.currentPart && event.target.value.length <= 250) {
              editorStore.currentPart.author = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart.author) ? editorStore.currentPart.author.length > 250 : false : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box>
        <TextField
          style={{ marginBottom: '8px', marginTop: '10px' }}
          label="Copyright"
          fullWidth
          variant="outlined"
          value={(editorStore.currentPart) ? (editorStore.currentPart.copyright) ? editorStore.currentPart.copyright : '' : ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if(!editorStore.unsaved) editorStore.unsaved = true;
            if (editorStore.currentPart && event.target.value.length <= 250) {
              editorStore.currentPart.copyright = event.target.value;
            }
          }}
          error={(editorStore.currentPart) ? (editorStore.currentPart.copyright) ? editorStore.currentPart.copyright.length > 250 : false : true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box
        style={{
          paddingTop: '8px',
        }}
      >
        <Select
          variant="outlined"
          fullWidth
          value={(editorStore.currentPart) ? editorStore.currentPart.type : ''}
          onChange={(changeEvent: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
            if(!editorStore.unsaved) editorStore.unsaved = true;
            if (editorStore.currentPart && (changeEvent.target.value === PartTypes.INSERT || changeEvent.target.value === PartTypes.SONG)) {
              editorStore.currentPart.type = changeEvent.target.value;
            }
          }}
        >
        {
            Object.keys(PartTypes).map((type, index) => (
              <MenuItem key={index} value={type}>{type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1)}</MenuItem>
            ))
          }
        </Select>
      </Box>
    </Box>
  ) : (
    <Box>
      <Typography>Klicke links auf "neuen Part hinzufügen" um deinen Ablauf zu erstellen</Typography>
    </Box>
  )
}

export default observer(General);
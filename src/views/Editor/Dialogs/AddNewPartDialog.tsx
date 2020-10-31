import { Dialog, DialogActions, DialogContent, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { observer } from 'mobx-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../../App';
import StyledDialogTitle from '../../../components/Styled/StyledDialogTitle';
import StyledButton from '../../../components/StyledButton';
import { Part, PartTypes } from '../../../models/DataModels';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddNewEventDialog: FunctionComponent<Props> = (props) => {

  const { editorStore } = useContext(StoreContext);

  const [partTitle, setPartTitle] = useState<string>('');
  const [partType, setPartType] = useState<PartTypes>();
  const [partAuthor, setPartAuthor] = useState<string>('');
  const [partAlbum, setPartAlbum] = useState<string>('');
  const [partCopyright, setPartCopyright] = useState<string>('');

  useEffect(() => {
    if(editorStore.error === false && props.open) {
      if(editorStore.currentPart) editorStore.parts.push(editorStore.currentPart);
      editorStore.fetchParts();
      editorStore.updateSlides();
      setPartTitle('');
      setPartAuthor('');
      setPartAlbum('');
      setPartCopyright('');
      props.onClose();
    } else if(editorStore.error === true){
      editorStore.currentPart = editorStore.parts[0];
    }
  }, [editorStore.error, props]);

  return (
    <Dialog
      fullWidth
      onClose={props.onClose}
      open={props.open}
    >
      <StyledDialogTitle onClose={props.onClose}>
          Neuen Part hinzufügen
      </StyledDialogTitle>
      <Divider />
      <DialogContent>
        <TextField 
          label="Titel"
          fullWidth
          autoFocus
          variant="outlined"
          value={partTitle}
          onChange={(changeEvent) => {setPartTitle(changeEvent.target.value)}}
          error={partTitle.length < 1 || partTitle.length > 250}
        />
        <Select
          fullWidth
          variant="outlined" 
          style={{marginTop: '10px', marginBottom: '8px'}}
          value={partType}
          onChange={(event) => {
            const type = event.target.name;
            console.log(type);
          }}
          label="Art"
        >
          {
            Object.keys(PartTypes).map((type, index) => (
              <MenuItem key={index} value={type}>{type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1)}</MenuItem>
            ))
          }
        </Select>
        <TextField 
          label="Autor"
          style={{marginTop: '10px', marginBottom: '8px'}}
          fullWidth
          autoFocus
          variant="outlined"
          value={partAuthor}
          onChange={(changeEvent) => {setPartAuthor(changeEvent.target.value)}}
          error={partAuthor.length < 1 || partAuthor.length > 250}
        />
        <TextField 
          label="Album"
          fullWidth
          style={{marginTop: '10px', marginBottom: '8px'}}
          autoFocus
          variant="outlined"
          value={partAlbum}
          onChange={(changeEvent) => {setPartAlbum(changeEvent.target.value)}}
          error={partAlbum.length < 1 || partAlbum.length > 250}
        />
        <TextField 
          label="Copyright"
          fullWidth
          style={{marginTop: '10px', marginBottom: '8px'}}
          autoFocus
          variant="outlined"
          value={partCopyright}
          onChange={(changeEvent) => {setPartCopyright(changeEvent.target.value)}}
          error={partCopyright.length < 1 || partCopyright.length > 250}
        />
      </DialogContent>
      <Divider />
      <DialogActions style={{ padding: '10px' }}>
        <StyledButton
          variant="outlined"
          size="large"
          onClick={() => {
            props.onClose();
          }}
        >
          Abbrechen
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            if(partTitle !== '') {
              const newPart: Part = {
                title: partTitle,
                position: -1,
                type: (partType) ? partType : PartTypes.SONG,
                author: partAuthor,
                album: partAlbum,
                copyright: partCopyright,
              }
              editorStore.currentPart = newPart;
              editorStore.creatNewPartFromCurrent();
            }
          }}
        >
          Speichern
        </StyledButton>
      </DialogActions> 
    </Dialog>
  );
}

export default observer(AddNewEventDialog);
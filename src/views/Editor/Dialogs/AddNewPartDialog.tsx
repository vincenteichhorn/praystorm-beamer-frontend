import { Dialog, DialogActions, DialogContent, Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useEventListener from '@use-it/event-listener';
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
  const [partType, setPartType] = useState<PartTypes>(PartTypes.SONG);
  const [partAuthor, setPartAuthor] = useState<string>('');
  const [partAlbum, setPartAlbum] = useState<string>('');
  const [partCopyright, setPartCopyright] = useState<string>('');
  const [error, setError] = useState('');

  const savePart = () => {
    setError("");
    if(partTitle !== '' && partAuthor !== '') {
      const newPart: Part = {
        title: partTitle,
        position: editorStore.parts.length,
        type: (partType) ? partType : PartTypes.SONG,
        author: partAuthor,
        album: partAlbum,
        copyright: partCopyright,
      }
      if(editorStore.allParts.filter((part) => part.title + part.author === partTitle + partAuthor).length !== 0) {
        setError("Der Part konnte nicht hinzugefügt werden, da er bereits existiert.");
      } else {
        setError("");
        editorStore.creatNewPart(newPart);
        props.onClose();
        setPartTitle('');
        setPartType(PartTypes.SONG);
        setPartAuthor('');
        setPartAlbum('');
        setPartCopyright('');

      }
    } else {
      setError("Titel und Autor dürfen nicht leer sein.")
    }
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if(['13', 'Enter'].includes(String(event.key))) {
      if(editorStore.unsaved) savePart();
    }
  });

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
          value={(partType) ? partType : PartTypes.SONG}
          onChange={(event) => {
            const type = event.target.value;
            if(type === PartTypes.INSERT) {
              setPartType(PartTypes.INSERT);
            } else {
              setPartType(PartTypes.SONG);
            }
            console.log(partType);
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
          variant="outlined"
          value={partAuthor}
          onChange={(changeEvent) => {setPartAuthor(changeEvent.target.value)}}
          error={partAuthor.length < 1 || partAuthor.length > 250}
        />
        <TextField 
          label="Album"
          fullWidth
          style={{marginTop: '10px', marginBottom: '8px'}}
          variant="outlined"
          value={partAlbum}
          onChange={(changeEvent) => {setPartAlbum(changeEvent.target.value)}}
        />
        <TextField 
          label="Copyright"
          fullWidth
          style={{marginTop: '10px', marginBottom: '8px'}}
          variant="outlined"
          value={partCopyright}
          onChange={(changeEvent) => {setPartCopyright(changeEvent.target.value)}}
        />
        {
          (error) ? (<Alert severity="error">{error}</Alert>) : null
        }
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
          onClick={() => savePart()}
        >
          Speichern
        </StyledButton>
      </DialogActions> 
    </Dialog>
  );
}

export default observer(AddNewEventDialog);
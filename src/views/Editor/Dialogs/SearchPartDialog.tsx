import { Dialog, DialogActions, DialogContent, Divider, Icon, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../../App';
import StyledDialogTitle from '../../../components/Styled/StyledDialogTitle';
import StyledButton from '../../../components/StyledButton';
import { Part, PartTypes } from '../../../models/DataModels';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SearchPartDialog: FunctionComponent<Props> = (props) => {

  const { editorStore } = useContext(StoreContext);
  const [searchVal, setSearchVal] = useState('');
  const [checked, setChecked] = useState([Infinity]);
  const [partsInList, setPartsInList] = useState<Part[]>(editorStore.searchedParts);

  useEffect(() => {
    setPartsInList(editorStore.searchedParts);
  });

  return (
    <Dialog
    fullWidth
    onClose={props.onClose}
    open={props.open}
  >
    <StyledDialogTitle onClose={props.onClose}>
        Part suchen und hinzufügen
    </StyledDialogTitle>
    <Divider />
    <DialogContent>
      <TextField 
        label="Suchen"
        fullWidth
        style={{marginTop: '10px', marginBottom: '8px'}}
        autoFocus
        variant="outlined"
        value={searchVal}
        onChange={(changeEvent) => {
          setSearchVal(changeEvent.target.value);
          editorStore.searchAllParts(changeEvent.target.value);
        }}
      />
      <List
        style={{
          height: '75%',
          overflowY: 'scroll',
        }}
      >
        {
          partsInList.map((part: Part, index) => (
            <ListItem
              style={{
                paddingLeft: '0px',
              }}
              key={index}
              onClick={() => {
                const len = editorStore.parts.length;
                part.position = len;
                editorStore.currentPart = part;
                editorStore.parts.push(part);
                editorStore.addPartToEvent({...part});
              }}
            >
              <ListItemIcon>
                <IconButton
                  style={{
                    marginRight: '4px',
                  }}
                >
                  <Icon>add</Icon>
                </IconButton>
              </ListItemIcon>
              <ListItemText id={index.toString()} primary={part.title} />
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  { (part.type === PartTypes.SONG) ? <Icon>music_note</Icon> : <Icon>class</Icon>}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
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
        Fertig
      </StyledButton>
    </DialogActions> 
  </Dialog>
  );
}

export default observer(SearchPartDialog);
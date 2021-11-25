import React, { FunctionComponent, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, ClickAwayListener, TextField } from '@material-ui/core';
import { useContext } from 'react';
import { StoreContext } from '../../../App';
import { Style as StyleModel} from '../../../models/DataModels';
import { observer } from 'mobx-react';
import useEventListener from '@use-it/event-listener';

interface Props {

}

const Style: FunctionComponent<Props> = (props) => {

  const { editorStore } = useContext(StoreContext);

  const [activeId, setActiveId] = useState(-1);
  const [activeField, setActiveField] = useState('');
  const [activeContent, setActiveContent] = useState('');
  const [unsaved, setUnsaved] = useState(false);
  const [styleIndentity, setStyleIdentity] = useState('');

  const saveStyle = () => {
    if(unsaved) {
      console.log("save");
      let prop: string | undefined = (activeField) ? activeField : '';
      editorStore.slideStyles[activeId][prop as keyof StyleModel] = activeContent;
      editorStore.updateStyle(activeId, (styleIndentity) ? styleIndentity : '');
      setUnsaved(false);
      setActiveId(-1);
      setActiveField('');
      setActiveContent('');
    }
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if(['13', 'Enter'].includes(String(event.key))) {
      if(unsaved) saveStyle();
    }
  });

  return (editorStore.currentPart) ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Hintergr.bild</TableCell>
          <TableCell>Hintergr.farbe</TableCell>
          <TableCell>Versgröße</TableCell>
          <TableCell>Versabstand</TableCell>
          <TableCell>Copyrightgröße</TableCell>
          <TableCell>Copyrightfarbe</TableCell>
          <TableCell>Versfarbe</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          editorStore.slideStyles.map((style: StyleModel, index: number) => (
            <TableRow>
              {
                Object.keys(style).map((prop) => (
                  <TableCell
                    onClick={() => {
                      if(unsaved) saveStyle();
                      setActiveId(index);
                      setActiveField(prop);
                      let content = style[prop as keyof StyleModel];
                      setActiveContent((content) ? content.toString() : '');
                      setUnsaved(true);
                      setStyleIdentity((style.name) ? style.name : '');
                    }}
                  >
                    {(activeId === index && activeField === prop) ? (
                      <ClickAwayListener
                        onClickAway={() => saveStyle()}
                      >
                        <TextField
                          variant="outlined"
                          size="small"
                          value={activeContent}
                          onChange={(changeEvent) => {
                            setActiveContent(changeEvent.target.value);
                          }}
                        />
                      </ClickAwayListener>
                      ) : style[prop as keyof StyleModel]
                    }
                  </TableCell>
                ))
              }
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

/* {
*/

export default observer(Style); 



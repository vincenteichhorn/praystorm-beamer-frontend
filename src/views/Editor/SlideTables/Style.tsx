import React, { FunctionComponent, useState } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, ClickAwayListener, TextField, Icon, IconButton, Popover } from '@material-ui/core';
import { useContext } from 'react';
import { StoreContext } from '../../../App';
import { Style as StyleModel} from '../../../models/DataModels';
import { observer } from 'mobx-react';
import useEventListener from '@use-it/event-listener';

interface Props {

}

const Style: FunctionComponent<Props> = (props) => {

  const { editorStore, homeStore } = useContext(StoreContext);

  const [activeId, setActiveId] = useState(-1);
  const [activeField, setActiveField] = useState('');
  const [activeContent, setActiveContent] = useState<string | number>('');
  const [unsaved, setUnsaved] = useState(false);
  const [styleIndentity, setStyleIdentity] = useState('');
  const [newStyle, setNewStyle] = useState({
    name: 'Neue Vorlage',
    backgroundImage: '',
    backgroundColor: 'black',
    verseFontSize: 50,
    verseSpacing: 2,
    copyrightFontSize: 20,
    verseColor: 'white',
    copyrightColor: 'orange',
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

  const saveStyle = () => {
    if(unsaved) {
      let prop: string | undefined = (activeField) ? activeField : '';
      editorStore.slideStyles[activeId][prop as keyof StyleModel] = activeContent;
      editorStore.updateStyle(activeId, (styleIndentity) ? styleIndentity : '');
      setUnsaved(false);
      setActiveId(-1);
      setActiveField('');
      setActiveContent('');
    }
  }

  const saveNewStyle = () => {
    let style = {...newStyle};
    let name = style.name;
    const res = [...editorStore.slideStyles].filter((style) => style.name === name);
    if(res.length !== 0) {
      homeStore.openSnackBar('Dieser Stylename ist schon vergeben.');
      style.name += '+';
    }
    editorStore.saveNewStyle(style);
    setNewStyle({
      name: 'Neue Vorlage',
      backgroundImage: '',
      backgroundColor: 'black',
      verseFontSize: 50,
      verseSpacing: 2,
      copyrightFontSize: 20,
      verseColor: 'white',
      copyrightColor: 'orange',
    });
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
          <TableCell>Versgr.</TableCell>
          <TableCell>Versabstd.</TableCell>
          <TableCell>Copyrightgr.</TableCell>
          <TableCell>Copyrightfarbe</TableCell>
          <TableCell>Versfarbe</TableCell>
          <TableCell>Hintergr.farbe</TableCell>
          <TableCell>Hintergr.bild</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          (editorStore.newStyle) ? (
            <TableRow key="-1" >
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newStyle.name}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.name = changeEvent.target.value;
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  style={{
                    width: '65px',
                  }}
                  type={'number'}
                  variant="outlined"
                  size="small"
                  value={newStyle.verseFontSize}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.verseFontSize = Number(changeEvent.target.value);
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type={'number'}
                  style={{
                    width: '65px',
                  }}
                  variant="outlined"
                  size="small"
                  value={newStyle.verseSpacing}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.verseSpacing = Number(changeEvent.target.value);
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type={'number'}
                  style={{
                    width: '65px',
                  }}
                  variant="outlined"
                  size="small"
                  value={newStyle.copyrightFontSize}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.copyrightFontSize = Number(changeEvent.target.value);
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newStyle.copyrightColor}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.copyrightColor = changeEvent.target.value;
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newStyle.verseColor}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.verseColor = changeEvent.target.value;
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newStyle.backgroundColor}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.backgroundColor = changeEvent.target.value;
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  variant="outlined"
                  size="small"
                  value={newStyle.backgroundImage}
                  onChange={(changeEvent) => {
                    let style = {...newStyle};
                    style.backgroundImage = changeEvent.target.value;
                    setNewStyle(style);
                  }}
                />
              </TableCell>
              <TableCell
                align="right"
              >
                <IconButton
                  onClick={() => {editorStore.newStyle = false}}
                ><Icon>close</Icon></IconButton>
                <IconButton
                  onClick={() => saveNewStyle()}
                ><Icon>done</Icon></IconButton>
              </TableCell>
            </TableRow>
          ) : null
        }
        {
          editorStore.slideStyles.map((style: StyleModel, index: number) => (
            <TableRow key={index}>
              {
                Object.keys(style).map((prop) => (
                  <TableCell
                    onClick={() => {
                      if(unsaved) saveStyle();
                      setActiveId(index);
                      setActiveField(prop);
                      let content = style[prop as keyof StyleModel];
                      console.log(content, typeof content);
                      setActiveContent((content) ? content : '');
                      setUnsaved(true);
                      editorStore.unsaved = true;
                      setStyleIdentity((style.name) ? style.name : '');
                    }}
                  >
                    {
                      (activeId === index && activeField === prop) ? (
                        <ClickAwayListener
                          onClickAway={() => saveStyle()}
                        >
                          <TextField
                            type={(prop.includes('Spacing') || prop.includes('Size')) ? 'number' : undefined}
                            variant="outlined"
                            size="small"
                            value={activeContent}
                            onChange={(changeEvent) => {
                              if(typeof activeContent === "number") {
                                setActiveContent(Number(changeEvent.target.value));
                              } else {
                                setActiveContent(changeEvent.target.value);
                              }
                            }}
                          />
                        </ClickAwayListener>
                      ) : style[prop as keyof StyleModel]
                    }
                  </TableCell>
                ))
              }
              <TableCell>
                <IconButton
                  disabled={!unsaved}
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
                    onClick={() => {
                      closePopover(); 
                      editorStore.deleteStyle(style.name)
                    }}
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

/* {
*/

export default observer(Style); 



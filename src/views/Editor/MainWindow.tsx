import React, { FunctionComponent, ChangeEvent, useState, useContext } from 'react';
import { Box, Paper, Toolbar, Divider, makeStyles, Tabs, Tab, IconButton, Grid, Icon, Popover, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import General from './SlideTables/General';
import Body from './SlideTables/Body';
import Style from './SlideTables/Style';
import { observer } from 'mobx-react';
import { StoreContext } from '../../App';
import { Part } from '../../models/DataModels';
import useEventListener from '@use-it/event-listener';

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    color: 'rgba(0, 0, 0, 0.87)',
    padding: 0,
    paddingTop: theme.spacing(0.4),
  },
  inner: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      height: '72.8vh'
    },
    overflow: 'auto',
  }
}));

const MainWindow: FunctionComponent = (props) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const { editorStore, homeStore } = useContext(StoreContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPopover = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const closePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const savePartChanges = () => {
    let count = 0;
    editorStore.parts.forEach((part: Part, index: number) => {
      if(editorStore.currentPart) {
        console.log(editorStore.currentPart.title + editorStore.currentPart.author, part.title + part.author);
        if(editorStore.currentPart.title + editorStore.currentPart.author === part.title + part.author) {
          count++;
        }
      }
    });

    if(count <= 1) {
      editorStore.savePartChanges();
    } else {
      homeStore.openSnackBar('Diese Kombination aus Titel und Autor des Parts ist leider schon vergeben. Den Part kannst du über ´Part suchen´ hinzufügen');
      if(editorStore.currentPart) {
        editorStore.currentPart.title = editorStore.currentPartIdentity.title;
        editorStore.currentPart.author = editorStore.currentPartIdentity.author;
      }
    }
  }

  useEventListener('keydown', (event: KeyboardEvent) => {
    if(['13', 'Enter'].includes(String(event.key))) {
      if(editorStore.unsaved) savePartChanges();
      if(window.document.activeElement) (window.document.activeElement as HTMLElement).blur();
    }
  });

  return (
    <Paper>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Grid container direction="row" justify="space-between">
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event: ChangeEvent<{}>, number: any) => setTab(number)}
            centered
          >
            <Tab label="Allgemein" value={0}/>
            <Tab label="Inhalte" value={1}/>
            <Tab label="Style" value={2}/>
          </Tabs>
          <Box
            style={{
              marginRight: '10px',
            }}
          >
            {
              (tab === 1) ? (
                <IconButton
                  onClick={() => {
                    editorStore.openNewSlide();
                  }}
                >
                  <Icon>add</Icon>
                </IconButton>
              ) : null  
            }
            <IconButton
              onClick={(event) => openPopover(event)}
            >
              <Icon>more_vert</Icon>
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
              <List>
                <ListItem 
                  key={1} 
                  button
                  onClick={() => {
                    editorStore.deleteCurrentEvent();
                    closePopover();
                  }}
                >
                  <ListItemIcon>
                    <Icon>delete</Icon>
                  </ListItemIcon>
                  <ListItemText>gewähltes Event löschen</ListItemText>
                </ListItem>
                <ListItem 
                  key={2} 
                  button
                  onClick={() => {
                    editorStore.deleteCurrentPart(false);
                    closePopover();
                  }}
                >
                  <ListItemIcon>
                    <Icon>delete</Icon>
                  </ListItemIcon>
                  <ListItemText>gewählten Part aus Event entfernen</ListItemText>
                </ListItem>
                <ListItem 
                  key={3} 
                  button
                  onClick={() => {
                    editorStore.deleteCurrentPart(true);
                    closePopover();
                  }}
                >
                  <ListItemIcon>
                    <Icon>delete</Icon>
                  </ListItemIcon>
                  <ListItemText>gewählten Part löschen</ListItemText>
                </ListItem>
              </List>
            </Popover>
            <IconButton
              disabled={!editorStore.unsaved}
              onClick={() => savePartChanges()}
            >
              <Icon>save</Icon>
            </IconButton>
          </Box>
        </Grid>
      </Toolbar> 
     
      <Divider />
      <Box className={classes.inner}>
         {
            (tab === 0) ? (
              <General/>
            ) : (tab === 1) ? (
              <Body />
            ) : (tab === 2) ? (
              <Style />
            ) : null
         }
      </Box>
    </Paper>
  );
}

export default observer(MainWindow);
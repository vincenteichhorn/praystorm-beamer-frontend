import React, { FunctionComponent } from 'react';
import { Typography, Box } from '@material-ui/core';
import { useContext } from 'react';
import { StoreContext } from '../../../App';

interface Props {

}

const Style: FunctionComponent<Props> = (props) => {

  const { editorStore } = useContext(StoreContext);

  return (editorStore.currentPart) ? (
    <Typography>sytle</Typography>
  ) : (
    <Box>
      <Typography>Klicke links auf "neuen Part hinzufügen" um deinen Ablauf zu erstellen</Typography>
    </Box>
  );
}

export default Style; 
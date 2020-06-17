import React, { FunctionComponent, useContext } from 'react';
import { Typography, Box, Paper } from '@material-ui/core';
import Beamer from '../Beamer/Beamer';
import Songpart from '../Beamer/parts/Songpart';
import { StoreContext } from '../../App';
import { observer } from 'mobx-react';

const Stage: FunctionComponent = (props) => {

  const { beamerStore } = useContext(StoreContext);
  return (
    <div style={{
      position: 'relative',
      width: '56.25%',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}>
         {(beamerStore.slide) ? <Songpart preview={true} slide={beamerStore.slide}/> : null}
      </div>
    </div>
  );
};

export default observer(Stage);

import React, { FunctionComponent } from 'react';
import { Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {
  
}

const Presenter: FunctionComponent<Props> = (props) => {

  return (
    <Typography>
      Presenter
    </Typography>
  );
};

export default Presenter;

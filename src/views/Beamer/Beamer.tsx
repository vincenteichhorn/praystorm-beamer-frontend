import React, { FunctionComponent } from 'react';
import { Typography } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {

}

const Beamer: FunctionComponent<Props> = (props) => {

  return (
    <Typography>
      Beamer
    </Typography>
  );
};

export default Beamer;

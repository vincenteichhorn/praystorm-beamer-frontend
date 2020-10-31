import React, { FunctionComponent } from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

interface Props {

}

const Body: FunctionComponent<Props> = (props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Titel</TableCell>
          <TableCell>Shorthand</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Body</TableCell>
          <TableCell align="right">Style</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
      </TableBody>
    </Table>
  );
}

export default Body;
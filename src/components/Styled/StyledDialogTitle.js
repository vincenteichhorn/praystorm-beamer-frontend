import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
    DialogTitle,
    Typography,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});


const StyledDialogTitle = withStyles(styles)(props => {
    return (
      <DialogTitle disableTypography className={props.classes.root}>
        <Typography variant="h6">{props.children}</Typography>
        {props.onClose ? (
          <IconButton className={props.classes.closeButton} onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
});

export default StyledDialogTitle;
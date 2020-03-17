import React, { FunctionComponent } from 'react';
import { Typography, Dialog, Divider, DialogContent, DialogActions } from '@material-ui/core';
import StyledDialogTitle from '../../components/Styled/StyledDialogTitle';
import StyledButton from '../../components/StyledButton';
import QRCode from 'qrcode.react';

interface Props {
  url: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

const QRCodeDialog: FunctionComponent<Props> = (props) => {

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={props.open}
      onClose={props.onClose}
    >
        <StyledDialogTitle onClose={props.onClose}>
          QR-Code für {props.title}
        </StyledDialogTitle>
        <Divider />
        <DialogContent style={{ textAlign: 'center'}}>
          <QRCode 
            value={props.url}
            style={{ 
              margin: 'auto', 
              height: 200, 
              width: 200, 
              marginBottom: '15px'
            }}
          />
          <Typography variant="h6">
            {props.url}
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions style={{ padding: '10px' }}>
          <StyledButton
            variant="outlined"
            size="large"
            onClick={() => props.onClose()}
          >
            Zurück
          </StyledButton>
        </DialogActions>  
    </Dialog>
  );
}

export default QRCodeDialog;

import React, { FunctionComponent, useContext, useState, useEffect } from 'react';
import { Typography, Dialog, Divider, DialogContent, DialogActions } from '@material-ui/core';
import StyledDialogTitle from '../../components/Styled/StyledDialogTitle';
import StyledButton from '../../components/StyledButton';
import QRCode from 'qrcode.react';
import { ServiceContext } from '../../App';

interface Props {
  link: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

const QRCodeDialog: FunctionComponent<Props> = (props) => {

  const services = useContext(ServiceContext);
  const host = services.utilityService.getLocalIPAddress();

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
            value={
              (window.document.location.port) ? 
              'https://' + host + ':' + window.document.location.port + props.link :
              'https://' + host + props.link
            } 
            style={{ 
              margin: 'auto', 
              height: 200, 
              width: 200, 
              marginBottom: '15px'
            }}
          />
          <Typography variant="h6">
            {
              (window.document.location.port) ? 
              'https://' + host + ':' + window.document.location.port + props.link :
              'https://' + host + props.link
            }
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

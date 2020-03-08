import React, { FunctionComponent, useContext, useState } from 'react';
import { Typography, Modal, Dialog, Divider, DialogContent, Icon, DialogActions } from '@material-ui/core';
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
  const urlDirect = window.document.location.host + props.link;
  const ip = services.utilitiesService.getLocalIpAdress();
  console.log(ip);
  const urlIp = require('ip').address() + props.link;

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
          <QRCode value={urlDirect} style={{ margin: 'auto', height: 200, width: 200  }} />
          <Typography variant="h6">{urlDirect}</Typography>
          <QRCode value={urlIp} style={{ margin: 'auto', height: 200, width: 200  }} />
          <Typography variant="h6">{urlIp}</Typography>
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

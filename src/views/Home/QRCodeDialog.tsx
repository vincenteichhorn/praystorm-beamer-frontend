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
  const [url, setUrl] = useState();

  useEffect(() => {
    services.utilityService.getLocalIpAdress().then((data) => {
      let url = ''
      if(window.document.location.port) {
        url = 'http://' + data.localIpAddress + ':' + window.document.location.port + props.link;
      } else {
        url = 'http://' + data.localIpAddress + props.link;
      }
      setUrl(url);
    });
  }, [props, services]);

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
          <QRCode value={url} style={{ margin: 'auto', height: 200, width: 200, marginBottom: '15px'  }} />
          <Typography variant="h6">{url}</Typography>
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

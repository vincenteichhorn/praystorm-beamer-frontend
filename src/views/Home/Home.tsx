import React, { FunctionComponent, useState, useContext, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  makeStyles, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Icon, 
  Snackbar, 
  IconButton, 
  Box,
  CardActionArea,
  CardMedia,
} from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router';
import mainRoutes from '../Routes';
import QRCodeDialog from './QRCodeDialog';
import { Link } from 'react-router-dom';
import { ServiceContext } from '../../App';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

interface Props extends RouteComponentProps {
  history: any;
}

const Home: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState('');
  const [modalOpen, setModalOpen] = useState('');

  const services = useContext(ServiceContext);
  const [host, setHost] = useState();
  
  useEffect(() => {
    services.utilityService.getLocalIPAddress().then((data) => {
      setHost(data.localIpAddress);
    })
  })

  const redirect = (link: string) => {
    props.history.push(link);
  }

  const copyLink = (link: string) => {
    const textField = document.createElement('textarea');
    let url = 'http://' + host;
    if(window.document.location.port) {
      url += ':' + window.document.location.port + link;
    } else {
      url += link;
    }
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      {mainRoutes.map((route) => (
        (route.showInList) ? (
          <Grid item style={{ marginBottom: '40px' }} key={route.title} className={classes.root}>
            <Card>
              <CardActionArea>
                <CardMedia
                  image={process.env.PUBLIC_URL + route.img}
                  style={{
                    height: 250,
                  }}
                />
                <CardContent 
                  onClick={() => redirect(route.link)}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <Grid 
                    container
                    direction="row"
                    justify="space-between"
                  >
                    <Grid item>
                      <Typography variant="overline">
                        praystorm. Beamer
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {route.title}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {route.caption}
                      </Typography>
                    </Grid>
                    <Icon>{route.icon}</Icon>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={() => redirect(route.link)}>Start</Button>
                <Button size="small" color="primary" onClick={() => {setSnackbarOpen(route.title); copyLink(route.link)}}>Link</Button>
                <Button size="small" color="primary" onClick={() => setModalOpen(route.title)}>QR-Code</Button>
              </CardActions>
            </Card>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={(snackbarOpen === route.title)}
              autoHideDuration={12000}
              onClose={() => setSnackbarOpen('')}
              message={
                <Box>
                  <Typography variant="caption" >Link kopiert:</Typography>
                  <Link to={route.link}>
                    <Typography variant="caption" style={{ color: 'white' }}>
                      {
                        (window.document.location.port) ? 
                        ' http://' + host + ':' + window.document.location.port + route.link :
                        ' http://' + host + route.link
                      } 
                    </Typography>
                  </Link>
                </Box>
              }
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen('')}>
                    <Icon>close</Icon>
                  </IconButton>
                </React.Fragment>
              }
            />
            <QRCodeDialog 
              link={route.link}
              title={route.title}
              open={(modalOpen === route.title)}
              onClose={() => setModalOpen('')}
            />
          </Grid>
        ) : null
      ))}
    </Grid>
  );
};

export default withRouter(Home);

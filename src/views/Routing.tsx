import React, { FunctionComponent, useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography,
  makeStyles,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Grid,
  Avatar,
} from '@material-ui/core';
import { BrowserRouter, Route, RouteComponentProps, withRouter } from 'react-router-dom';

import mainRoutes from './Routes';
import Editor from './Editor/Editor';
import Presenter from './Presenter/Presenter';
import Beamer from './Beamer/Beamer';
import Stage from './Stage/Stage';
import Home from './Home/Home';

const drawerWidth = 270;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Roboto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    padding: theme.spacing(1, 2, 2, 2),
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `calc(${drawerWidth}px)`,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

interface Props extends RouteComponentProps {
  history: any;
}

const Routing: FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [renderAppBar, setRenderAppBar] = useState(true);

  useEffect(() => {
    mainRoutes.filter((route) => {
      if(route.link === `/${window.document.location.pathname.split('/')[1]}` && route.appbar === false) {
        setRenderAppBar(false);
      } else if(route.appbar !== false) {
        setRenderAppBar(true);
      }
      return renderAppBar; // not necessary
    });
  });

  const redirect = (link: string) => {
    props.history.push(link);
  }

  return (
    <Box className={classes.root}>
      {
        (renderAppBar) ? (
          <Box> 
            <AppBar 
              position="static"
              color="transparent"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: drawerOpen,
              })}
            >
              <Toolbar>
                <IconButton 
                  edge="start" 
                  className={clsx(classes.menuButton, drawerOpen && classes.hide)}
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                >
                  <Icon>menu</Icon>
                </IconButton>
                <Typography 
                  variant="h6" 
                  className={classes.title}
                  onClick={() => redirect('/')}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  praystorm. Beamer
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={drawerOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Grid container direction="column" justify="space-between" className={classes.drawerHeader} >
                <Grid container direction="row" justify="space-between" alignItems="flex-start" style={{ marginBottom: '20px' }}>
                  <Avatar 
                    src={process.env.PUBLIC_URL + '/media/praystorm-logo.png'} 
                    className={classes.large} 
                    onClick={() => redirect('/')}
                    style={{
                      cursor: 'pointer'
                    }}
                  />
                  <IconButton onClick={() => setDrawerOpen(false)}>
                    <Icon>chevron_left</Icon>
                  </IconButton>
                </Grid>
                <Grid 
                  container 
                  direction="column" 
                  justify="space-between"
                  onClick={() => redirect('/')}
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  <Typography variant="h6">
                    praystorm. Beamer
                  </Typography>
                  <Typography variant="caption">
                    Worship Presentation Software
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <List>
                {mainRoutes.map((route) => (route.showInList) ? (
                  <ListItem button key={route.title} onClick={() => redirect(route.link)}>
                    <ListItemIcon><Icon>{route.icon}</Icon></ListItemIcon>
                    <ListItemText primary={route.title} />
                  </ListItem>
                ): null)}
              </List>
            </Drawer>
          </Box> 
        ) : null
      }
      <main
        id="content"
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        {mainRoutes.map((route) => (
          <Route 
            exact={route.exact}
            key={route.title} 
            path={route.link}
            component={
              (route.title === 'Editor') ? Editor : 
              (route.title === 'Presenter') ? Presenter :
              (route.title === 'Beamer') ? Beamer :
              (route.title === 'Stage') ? Stage : 
              (route.title === 'Home') ? Home : undefined
            }
          />
        ))}
      </main>
    </Box>
  );
};

export default withRouter(Routing);

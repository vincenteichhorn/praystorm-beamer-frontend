import React, { FunctionComponent } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import mainRoutes from '../Routes';
import Editor from './Editor/Editor';
import Presenter from './Presenter/Presenter';
import Beamer from './Beamer/Beamer';
import Stage from './Stage/Stage';
import Home from './Home/Home';

const Router: FunctionComponent = (props) => {

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default Router;

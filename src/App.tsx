import React, { FunctionComponent, createContext } from 'react';
import Routing from './views/Routing';
import { BrowserRouter } from 'react-router-dom';
import HomeStore from './stores/HomeStore';
import PresenterStore from './stores/PresenterStore';

const stores = {
  homeStore: new HomeStore(),
  presenterStore: new PresenterStore(),
};

export const StoreContext = createContext(stores);

const App: FunctionComponent = () => {
  return (
    <StoreContext.Provider value={stores}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </StoreContext.Provider>
  );
}

export default App;

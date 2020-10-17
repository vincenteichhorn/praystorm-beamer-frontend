import React, { FunctionComponent, createContext, useEffect } from 'react';
import Routing from './views/Routing';
import { BrowserRouter } from 'react-router-dom';
import HomeStore from './stores/HomeStore';
import PresenterStore from './stores/PresenterStore';
import BeamerStore from './stores/BeamerStore';
import EditorStore from './stores/EditorStore';

const stores = {
  homeStore: new HomeStore(),
  presenterStore: new PresenterStore(),
  beamerStore: new BeamerStore(),
  editorStore: new EditorStore(),
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

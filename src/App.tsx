import React, { FunctionComponent, createContext } from 'react';
import Routing from './views/Routing';
import UtilityService from './services/UtilityService';
import { BrowserRouter } from 'react-router-dom';
import EventService from './services/EventService';
import PartService from './services/PartService';

const services = {
  utilityService: new UtilityService(),
  eventService: new EventService(),
  partService: new PartService(),
}
export const ServiceContext = createContext(services);

const App: FunctionComponent = () => {
  return (
    <ServiceContext.Provider value={services}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ServiceContext.Provider>
  );
}

export default App;

import React, { FunctionComponent, useContext, useEffect, useState, ChangeEvent} from 'react';
import { Grid, } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
import { ServiceContext } from '../../App';
import Event from '../../models/Event';
import Part from '../../models/Part';

interface Props extends RouteComponentProps {
  
}

const Presenter: FunctionComponent<Props> = (props) => {

  const services = useContext(ServiceContext);
  const [events, setEvents] = useState<Event[]>();
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [parts, setParts] = useState<Part[]>();
  const [currentPart, setCurrentPart] = useState<Part>();

  useEffect(() => {
    if(!events) {
      services.eventService.getEvents().then((data) => {
        setEvents([...data]);
        setCurrentEvent(data[0]);
      });
    }
    if(currentEvent) {
      services.partService.getParts(currentEvent.name, currentEvent.date).then((data) => {
        setParts([...data]);
        setCurrentPart(data[0]);
      });
    }
  }, [services, events, currentEvent, parts]);

  const onChangeEvent = (changeEvent: ChangeEvent<any>) => {
    if(events && changeEvent.target.value) {
      const newCurrent = events.find((event) => (event.name === changeEvent.target.value));
      setCurrentEvent(newCurrent);
    }
  }

  return (
    <Grid
      container
      direction="row"
      spacing={2}
    >
      <Grid item xs={3}>
        <Sidebar 
          events={events}
          currentEvent={currentEvent}
          onChange={onChangeEvent}
          parts={parts}
        />
      </Grid>
      <Grid item xs>
        <MainWindow 
          currentEvent={currentEvent}
          currentPart={currentPart}
          parts={parts}
        />
      </Grid>
    </Grid>
  );
};

export default Presenter;

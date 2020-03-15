import React, { FunctionComponent, useContext, useEffect, useState, ChangeEvent} from 'react';
import { Grid, } from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import Sidebar from './Sidebar';
import MainWindow from './MainWindow';
import { ServiceContext } from '../../App';
import Event from '../../models/Event';
import Part from '../../models/Part';
import { Slide } from '../../models/Slide';

interface Props extends RouteComponentProps {
  
}

const Presenter: FunctionComponent<Props> = (props) => {

  const services = useContext(ServiceContext);
  const [events, setEvents] = useState<Event[]>();
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [parts, setParts] = useState<Part[]>();
  const [currentPart, setCurrentPart] = useState<Part>();
  const [slides, setSlides] = useState<Slide[]>();
  const [currentSlide, setCurrentSlide] = useState<Slide>();

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
        if(data.length < 1) {
          setCurrentPart(undefined);
        }
      });
    }
    if(!currentPart && parts) {
      setCurrentPart(parts[0]);
    }
    if(currentPart) {
      services.slideService.getSlides(currentPart.title).then((data) => {
        setSlides([...data]);
      })
    }
    if(!currentSlide && slides) {
      setCurrentSlide(slides[0]);
    }
  }, [services, events, currentEvent, parts, currentPart]);

  const onChangeEvent = (changeEvent: ChangeEvent<any>) => {
    if(events && changeEvent.target.value) {
      const newCurrent = events.find((event) => (event.name === changeEvent.target.value));
      setCurrentEvent(newCurrent);
    }
  }

  const onChangePart = (newPart: Part) => {
    setCurrentPart(newPart);
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
          onChangeEvent={onChangeEvent}
          parts={parts}
          currentPart={currentPart}
          onChangePart={onChangePart}
        />
      </Grid>
      <Grid item xs>
        <MainWindow 
          currentEvent={currentEvent}
          currentPart={currentPart}
          parts={parts}
          slides={slides}
          currentSlide={currentSlide}
        />
      </Grid>
    </Grid>
  );
};

export default Presenter;

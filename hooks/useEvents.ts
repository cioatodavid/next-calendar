import { useState, useEffect } from 'react';
import { CalendarEventType } from '@/core/types/calendarTypes';
import { fetchEvents, addEvent, deleteEvent, updateEvent } from '@/services/eventService';

const useEvents = () => {
  const [events, setEvents] = useState<CalendarEventType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data);
      setLoading(false);
    };

    getEvents();
  }, []);

  const handleAddEvent = async (event: CalendarEventType) => {
    setLoading(true);
    await addEvent(event);
    const updatedEvents = await fetchEvents();
    setEvents(updatedEvents);
    setLoading(false);
  };

  const handleDeleteEvent = async (id: string) => {
    setLoading(true);
    await deleteEvent(id);
    const updatedEvents = await fetchEvents();
    setEvents(updatedEvents);
    setLoading(false);
  };

  const handleUpdateEvent = async (updatedEvent: CalendarEventType) => {
    setLoading(true);
    await updateEvent(updatedEvent);
    const updatedEvents = await fetchEvents();
    setEvents(updatedEvents);
    setLoading(false);
  };

  return { events, loading, addEvent: handleAddEvent, deleteEvent: handleDeleteEvent, updateEvent: handleUpdateEvent };
};

export { useEvents };

//const useEvents = () => {
//  const [events, setEvents] = useState<CalendarEventType[]>([]);

//  useEffect(() => {
//    Promise.resolve().then(() => {
//      if (typeof window !== 'undefined') {
//        const savedEvents = localStorage.getItem('events');
//        if (savedEvents && savedEvents !== '[]') {
//          let parsedEvents = JSON.parse(savedEvents);
//          parsedEvents.forEach((event: CalendarEventType) => {
//            event.startDate = new Date(event.startDate);
//            const endDate = new Date(event.startDate.getTime() + event.durationInMinutes * 60000);

//            const endOfDay = new Date(event.startDate);
//            endOfDay.setHours(23, 59, 59, 999);

//            if (endDate > endOfDay) {
//              event.durationInMinutes = Math.round((endOfDay.getTime() - event.startDate.getTime()) / 60000);
//            }
//          });

//          setEvents(parsedEvents);
//        } else {
//          setEvents(eventsMock || []);
//        }
//      }
//    });
//  }, []);


//  const addEvent = (newEvent: CalendarEventType) => {
//    setEvents(prevEvents => {
//      const updatedEvents = [...prevEvents, newEvent];
//      localStorage.setItem('events', JSON.stringify(updatedEvents));
//      return updatedEvents;
//    });
//  };

//  const deleteEvent = (id: string) => {
//    setEvents(prevEvents => {
//      const newEvents = prevEvents.filter(event => event.id !== id);
//      localStorage.setItem('events', JSON.stringify(newEvents));
//      return newEvents;
//    });
//  }

//  const updateEvent = (updatedEvent: CalendarEventType) => {
//    setEvents(prevEvents => {
//      const newEvents = prevEvents.map(event => {
//        if (event.id === updatedEvent.id) {
//          return updatedEvent;
//        }
//        return event;
//      });
//      localStorage.setItem('events', JSON.stringify(newEvents));
//      return newEvents;
//    });
//  }

//  return { events, addEvent, deleteEvent, updateEvent };
//};

//export { useEvents }
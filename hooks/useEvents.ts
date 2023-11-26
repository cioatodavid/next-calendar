import { useEffect, useState } from 'react';
import { CalendarEventType } from '@/core/types/calendarTypes';

const eventsMock: CalendarEventType[] = [
  {
    id: "1",
    title: "Event 1",
    startDate: new Date("2023-11-25T09:11:00"),
    durationInMinutes: 100,
    color: "blue",
  },
  {
    id: "3",
    title: "Event 3",
    startDate: new Date("2023-11-23T00:06:00"),
    durationInMinutes: 80,
    color: "purple",
  },
  {
    id: "5",
    title: "Planning meeting",
    startDate: new Date("2023-11-24T02:09:00"),
    durationInMinutes: 80,
    color: "purple",
  },
  {
    id: "8767",
    title: "Team sync",
    startDate: new Date("2023-11-24T02:49:00"),
    durationInMinutes: 120,
    color: "red",
  },
  {
    id: "12345",
    title: "QA testing",
    startDate: new Date("2023-11-24T01:49:00"),
    durationInMinutes: 150,
    color: "blue",
  },
];

const useEvents = () => {
  const [events, setEvents] = useState<CalendarEventType[]>([]);

  useEffect(() => {
    Promise.resolve().then(() => {
      if (typeof window !== 'undefined') {
        const savedEvents = localStorage.getItem('events');
        if (savedEvents && savedEvents !== '[]') {
          let parsedEvents = JSON.parse(savedEvents);
          parsedEvents.forEach((event: CalendarEventType) => {
            event.startDate = new Date(event.startDate);
            const endDate = new Date(event.startDate.getTime() + event.durationInMinutes * 60000);

            const endOfDay = new Date(event.startDate);
            endOfDay.setHours(23, 59, 59, 999);

            if (endDate > endOfDay) {
              event.durationInMinutes = Math.round((endOfDay.getTime() - event.startDate.getTime()) / 60000);
            }
          });

          setEvents(parsedEvents);
        } else {
          setEvents(eventsMock || []);
        }
      }
    });
  }, []);


  const addEvent = (newEvent: CalendarEventType) => {
    setEvents(prevEvents => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const deleteEvent = (id: string) => {
    setEvents(prevEvents => {
      const newEvents = prevEvents.filter(event => event.id !== id);
      localStorage.setItem('events', JSON.stringify(newEvents));
      return newEvents;
    });
  }

  const updateEvent = (updatedEvent: CalendarEventType) => {
    setEvents(prevEvents => {
      const newEvents = prevEvents.map(event => {
        if (event.id === updatedEvent.id) {
          return updatedEvent;
        }
        return event;
      });
      localStorage.setItem('events', JSON.stringify(newEvents));
      return newEvents;
    });
  }

  return { events, addEvent, deleteEvent, updateEvent };
};

export default useEvents;
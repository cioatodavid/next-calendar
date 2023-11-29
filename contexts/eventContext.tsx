import { createContext, useContext } from 'react';
import { CalendarEventType } from '@/core/types/calendarTypes';
import { useEvents } from '@/hooks/useEvents';

interface EventsContextProps {
  events: CalendarEventType[];
  addEvent: (event: CalendarEventType) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (updatedEvent: CalendarEventType) => void;
}

const EventsContext = createContext<EventsContextProps | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { events, addEvent, deleteEvent, updateEvent } = useEvents();

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEventsContext must be used within a EventsProvider');
  }
  return context;
};
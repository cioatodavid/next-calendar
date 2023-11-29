import { useState, useEffect, useCallback } from 'react';
import { CalendarEventType } from '@/core/types/calendarTypes';

const useEventForm = (initialEvent: CalendarEventType) => {
  const [eventData, setEventData] = useState<CalendarEventType>(initialEvent);

  useEffect(() => {
    setEventData(initialEvent);
  }, [initialEvent]);

  const handleEventChange = useCallback((name: string, value: any) => {
    setEventData(prevEventData => ({
      ...prevEventData,
      [name]: value
    }));
  }, []);

  return { eventData, handleEventChange };
};

export { useEventForm };

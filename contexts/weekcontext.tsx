import { createContext, useState, useContext } from 'react';
import { startOfWeek, endOfWeek, addWeeks, format, startOfDay } from 'date-fns';

const WeekContext = createContext({
  currentDay: new Date(),
  weekStart: new Date(),
  weekEnd: new Date(),
  goToNextWeek: () => { },
  goToPreviousWeek: () => { },
  formattedWeekRange: '',
});

export const useWeek = () => useContext(WeekContext);

export const WeekProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDay, setCurrentDay] = useState(startOfDay(new Date()));
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [weekEnd, setWeekEnd] = useState(endOfWeek(new Date(), { weekStartsOn: 1 }));

  const goToNextWeek = () => {
    setWeekStart(current => addWeeks(current, 1));
    setWeekEnd(current => addWeeks(current, 1));
  };

  const goToPreviousWeek = () => {
    setWeekStart(current => addWeeks(current, -1));
    setWeekEnd(current => addWeeks(current, -1));
  };

  const formattedWeekRange = `${format(weekStart, 'MMM dd')} - ${format(weekEnd, 'MMM dd, yyyy')}`;

  return (
    <WeekContext.Provider value={{ currentDay, weekStart, weekEnd, goToNextWeek, goToPreviousWeek, formattedWeekRange }}>
      {children}
    </WeekContext.Provider>
  );
};

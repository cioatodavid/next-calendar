import { createContext, useState, useContext } from 'react';
import { startOfWeek, endOfWeek, addWeeks, format, startOfDay } from 'date-fns';

const WeekContext = createContext({
  currentDay: new Date(),
  currentMonth: new Date(),
  weekStart: new Date(),
  weekEnd: new Date(),
  goToNextWeek: () => { },
  goToPreviousWeek: () => { },
  goToDefinedDay: (date: Date) => { },
  goToToday: () => { },
  formattedWeekRange: [] as string[],
});

export const useWeek = () => useContext(WeekContext);

export const WeekProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDay, setCurrentDay] = useState(startOfDay(new Date()));
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [weekEnd, setWeekEnd] = useState(endOfWeek(new Date(), { weekStartsOn: 1 }));
  const [currentMonth, setCurrentMonth] = useState(weekEnd);

  const goToNextWeek = () => {
    setWeekStart(current => addWeeks(current, 1));
    setWeekEnd(current => addWeeks(current, 1));
    setCurrentMonth(weekEnd);
  };

  const goToDefinedDay = (date: Date) => {
    setWeekStart(startOfWeek(date, { weekStartsOn: 1 }));
    setWeekEnd(endOfWeek(date, { weekStartsOn: 1 }));
    setCurrentDay(startOfDay(date));
    setCurrentMonth(weekEnd);
  };

  const goToPreviousWeek = () => {
    setWeekStart(current => addWeeks(current, -1));
    setWeekEnd(current => addWeeks(current, -1));
    setCurrentMonth(weekEnd);
  };

  const goToToday = () => {
    setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
    setWeekEnd(endOfWeek(new Date(), { weekStartsOn: 1 }));
    setCurrentDay(startOfDay(new Date()));
    setCurrentMonth(weekEnd);
  };

  const formattedWeekRange = [`${format(weekStart, 'dd')} - ${format(weekEnd, 'dd')}`, format(weekEnd, 'MMM yyyy')];


  return (
    <WeekContext.Provider value={{ currentDay, currentMonth, weekStart, weekEnd, goToNextWeek, goToPreviousWeek, goToToday, goToDefinedDay, formattedWeekRange }}>
      {children}
    </WeekContext.Provider>
  );
};

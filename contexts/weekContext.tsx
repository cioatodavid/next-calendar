import { createContext, useState, useContext, useEffect } from 'react';
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
    setWeekStart(current => {
      const newWeekStart = addWeeks(current, 1);
      setCurrentMonth(newWeekStart);
      return newWeekStart;
    });
    setWeekEnd(current => addWeeks(current, 1));
  };
  
  const goToDefinedDay = (date: Date) => {
    const newWeekStart = startOfWeek(date, { weekStartsOn: 1 });
    const newWeekEnd = endOfWeek(date, { weekStartsOn: 1 });

    if (newWeekStart.getTime() !== weekStart.getTime() || newWeekEnd.getTime() !== weekEnd.getTime()) {
      setWeekStart(newWeekStart);
      setWeekEnd(newWeekEnd);
    }

    if (startOfDay(date).getTime() !== currentDay.getTime()) {
      setCurrentDay(startOfDay(date));
    }

    if (newWeekEnd.getMonth() !== currentMonth.getMonth()) {
      setCurrentMonth(newWeekEnd);
    }
  };

  const goToPreviousWeek = () => {
    setWeekStart(current => {
      const newWeekStart = addWeeks(current, -1);
      setCurrentMonth(newWeekStart);
      return newWeekStart;
    });
    setWeekEnd(current => addWeeks(current, -1));
  };

  const goToToday = () => {
    setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
    setWeekEnd(endOfWeek(new Date(), { weekStartsOn: 1 }));
    setCurrentDay(startOfDay(new Date()));
    setCurrentMonth(weekEnd);
  };

  const [formattedWeekRange, setFormattedWeekRange] = useState(['', '']);

  useEffect(() => {
    if (weekStart instanceof Date && weekEnd instanceof Date) {
      setFormattedWeekRange([`${format(weekStart, 'dd')} - ${format(weekEnd, 'dd')}`, format(weekEnd, 'MMM yyyy')]);
    }
  }, [weekStart, weekEnd]);

  return (
    <WeekContext.Provider value={{ currentDay, currentMonth, weekStart, weekEnd, goToNextWeek, goToPreviousWeek, goToToday, goToDefinedDay, formattedWeekRange }}>
      {children}
    </WeekContext.Provider>
  );
};

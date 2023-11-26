
import React from 'react';
import { useWeek } from '@/contexts/weekcontext';

const CalendarHeader = () => {
  const { goToNextWeek, goToPreviousWeek, formattedWeekRange } = useWeek();

  return (
    <div className="flex items-center justify-between p-4">
      <button onClick={goToPreviousWeek} className="p-2">Previous</button>
      <span>{formattedWeekRange}</span>
      <button onClick={goToNextWeek} className="p-2">Next</button>
    </div>
  );
};

export default CalendarHeader;

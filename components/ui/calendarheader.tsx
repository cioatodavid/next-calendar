
import React from 'react';
import { useWeek } from '@/contexts/weekContext';
import { Button } from './button';
import { ChevronRight, ChevronLeft, CalendarDays } from "lucide-react"


const CalendarHeader = () => {
  const { goToNextWeek, goToPreviousWeek, goToToday, formattedWeekRange } = useWeek();

  return (
    <div className='p-8 bg-slate-50 flex justify-between'>
      <div className="flex content-end items-center gap-4 ">
        <span className='text-2xl font-medium '> {formattedWeekRange[0]}</span>
        <span className='text-xl text-muted-foreground'> {formattedWeekRange[1]}</span>
        <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={goToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div>
        <Button variant="ghost" size={'lg'} className='text-muted-foreground' onClick={goToToday}>
          <CalendarDays className="mr-2 h-4 w-4" />
          Today</Button>
      </div>
    </div>
  );
};

export default CalendarHeader;

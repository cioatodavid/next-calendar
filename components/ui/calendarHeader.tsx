import React from 'react';
import { useWeek } from '@/contexts/weekContext';
import { Button } from './button';
import { ChevronRight, ChevronLeft } from "lucide-react"


const CalendarHeader = () => {
  const { goToNextWeek, goToPreviousWeek, formattedWeekRange } = useWeek();

  return (
    <div className='p-8 bg-slate-50 flex flex-row-reverse'>
      <div className="flex content-end items-center gap-4 ">
        <span className='text-2xl font-medium text-primary'> {formattedWeekRange[0]}</span>
        <span className='text-xl text-muted-foreground'> {formattedWeekRange[1]}</span>
        <Button variant="ghost" size="icon" onClick={goToPreviousWeek}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={goToNextWeek}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;

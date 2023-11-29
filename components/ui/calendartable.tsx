import { CSSProperties, useCallback, useMemo } from 'react';
import { add, addMinutes, format, isSameDay, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarEventType, CalendarColorMap } from '@/core/types/calendarTypes';
import { useWeek } from '@/contexts/weekContext';
import CalendarEvent from '@/components/ui/calendarevent';
import { v4 as uuidv4 } from 'uuid';
import { useEventsContext } from '@/contexts/eventContext';

function CalendarTable() {
  const { weekStart, currentDay } = useWeek();
  const { events, addEvent } = useEventsContext();

  const daysOfWeek = useMemo(() => Array.from({ length: 7 }, (_, index) =>
    add(weekStart, { days: index })
  ), [weekStart]);

  const timesOfDay = useMemo(() => Array.from({ length: 24 }, (_, index) => {
    return `${index.toString().padStart(2, '0')}:00`;
  }), []);

  const handleCellClick = useCallback((time: string, day: Date) => {
    const newEvent: CalendarEventType = {
      id: uuidv4(),
      title: "New event",
      startDate: parseISO(`${format(day, 'yyyy-MM-dd')}T${time}`),
      durationInMinutes: Math.floor(Math.random() * 120) + 10,
      color: Object.keys(CalendarColorMap)[Math.floor(Math.random() * 8)],
    };

    addEvent(newEvent);
  }, [addEvent]);


  const getMinutesFromMidnight = (date: Date) => {
    return date.getHours() * 60 + date.getMinutes();
  };

  const getEventStyle = (event: CalendarEventType, events: CalendarEventType[], time: String): CSSProperties => {
    const eventStartMinutes = getMinutesFromMidnight(event.startDate);
    const cellStartMinutes = parseInt(time.split(':')[0]) * 60;
    const topOffset = ((eventStartMinutes - cellStartMinutes) / 60) * 100;
    const height = (event.durationInMinutes / 60) * 100;

    const { width, left } = getEventPositioning(event, events);

    return {
      top: `${topOffset}%`,
      left: `${left}%`,
      width: `${width}%`,
      height: `${height}%`,
      position: 'absolute',
    };
  };

  const getEventPositioning = (event: CalendarEventType, events: CalendarEventType[]): { width: number, left: number } => {
    const eventEndDate = addMinutes(event.startDate, event.durationInMinutes);

    const overlappingEvents = events.filter(e => {
      const eEndDate = addMinutes(e.startDate, e.durationInMinutes);
      return (
        (e.startDate <= event.startDate && event.startDate < eEndDate) ||
        (e.startDate < eventEndDate && eventEndDate <= eEndDate) ||
        (event.startDate <= e.startDate && e.startDate < eventEndDate) ||
        (event.startDate < eEndDate && eEndDate <= eventEndDate)
      );
    });

    const overlappingIndex = overlappingEvents.findIndex(e => e.id === event.id);

    const width = (100 / overlappingEvents.length) * 0.9;
    const left = width * overlappingIndex;

    return { width, left };
  };

  return (
    <Table className='bg-slate-50'>
      <TableHeader>
        <TableRow className='h-20 ' >
          <TableHead className='min-w-[50] max-w-[80px]'></TableHead>
          {daysOfWeek.map(day => (
            <TableHead
              key={day.toString()}
              className={isSameDay(day, currentDay) ? "text-blue-600 border-b font-bold" : "border-b"}
            >
              {format(day, 'EEEE')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {timesOfDay.map(time => (
          <TableRow key={time} className='h-24'>
            <TableCell className='align-top' ><p className='relative -top-2 font-medium text-muted-foreground mx-4'>{time}</p></TableCell>
            {daysOfWeek.map(day => (
              <TableCell
                key={day.toString()}
                onClick={() => handleCellClick(time, day)}
                className="relative cursor-pointer hover:bg-slate-100 border-r border-b"
              >
                {events
                  .filter(event => {
                    const eventEnd = new Date(event.startDate.getTime() + event.durationInMinutes * 60000);
                    return isSameDay(event.startDate, day) &&
                      event.startDate <= parseISO(`${format(day, 'yyyy-MM-dd')}T${time}`) &&
                      eventEnd > parseISO(`${format(day, 'yyyy-MM-dd')}T${time}`);
                  })
                  .map(event => {
                    const style = getEventStyle(event, events, time);
                    return (
                      <CalendarEvent
                        key={event.id}
                        event={event}
                        style={style}
                      />
                    );
                  })
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CalendarTable;
import { useEffect, useState } from 'react';
import { add, format, isSameDay, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarEventType } from '@/types/calendarTypes';
import { useWeek } from '@/contexts/weekcontext';
import CalendarEvent from './calendarevent';

function CalendarTable() {
  const { weekStart, currentDay } = useWeek();
  const daysOfWeek = Array.from({ length: 7 }, (_, index) =>
    add(weekStart, { days: index })
  );

  const eventsMock: CalendarEventType[] = [
    {
      id: "1",
      title: "Event 1",
      startDate: new Date("2023-11-25T09:00:00"),
      durationInMinutes: 100,
      color: "border-l-blue-400",
    },
    {
      id: "2",
      title: "Event 2",
      startDate: new Date("2023-11-24T02:00:00"),
      durationInMinutes: 35,
      color: "border-l-red-400",
    },
    {
      id: "3",
      title: "teste de evento com nome longo asd asd asd",
      startDate: new Date("2023-11-23T00:00:00"),
      durationInMinutes: 60,
      color: "border-l-indigo-400",
    },
    {
      id: "4",
      title: "Event 2",
      startDate: new Date("2023-11-24T02:00:00"),
      durationInMinutes: 35,
      color: "border-l-red-400",
    },
  ];

  const [events, setEvents] = useState<CalendarEventType[]>(eventsMock);

  const timesOfDay = Array.from({ length: 24 }, (_, index) => {
    return `${index.toString().padStart(2, '0')}:00`;
  });

  const handleEventClick = (event: CalendarEventType) => {
    console.log("Event clicked:", event);
    // Handle the event click
  };

  const getMinutesFromMidnight = (date: Date) => {
    return date.getHours() * 60 + date.getMinutes();
  };

  const getEventStyle = (event: CalendarEventType, time: string) => {
    const eventStartMinutes = getMinutesFromMidnight(event.startDate);
    const cellStartMinutes = parseInt(time.split(':')[0]) * 60;
    const topOffset = ((eventStartMinutes - cellStartMinutes) / 60) * 100;
    const height = (event.durationInMinutes / 60) * 100;

    return {
      top: `${topOffset}%`,
      height: `${height}%`,
    };
  };


  return (
    <Table>
      {/* Calendar Heading */}
      <TableHeader>
        <TableRow className='h-20' >
          <TableHead></TableHead>
          {daysOfWeek.map(day => (
            <TableHead
              key={day.toString()}
              className={isSameDay(day, currentDay) ? "text-blue-600 border-b" : "border-b"}
            >
              {format(day, 'EEEE')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {timesOfDay.map(time => (
          <TableRow key={time} className='h-24'>
            <TableCell className='align-top' ><p className='relative -top-2 font-medium text-muted-foreground'>{time}</p></TableCell>
            {daysOfWeek.map(day => (
              <TableCell
                key={day.toString()}
                onClick={() => console.log(time, day)}
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
                    const style = getEventStyle(event, time);
                    return (
                      <CalendarEvent
                        key={event.id}
                        event={event}
                        style={style}
                        onEventClick={handleEventClick}
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
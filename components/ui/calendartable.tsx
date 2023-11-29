import { CSSProperties, useCallback, useMemo, useState } from 'react';
import { addMinutes, eachDayOfInterval, endOfWeek, format, isSameDay, parseISO, startOfWeek } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarEventType } from '@/core/types/calendarTypes';
import { useWeek } from '@/contexts/weekContext';
import CalendarEvent from '@/components/ui/calendarEvent';
import { v4 as uuidv4 } from 'uuid';
import { useEventsContext } from '@/contexts/eventContext';
import EventFormModal from './eventFormModal';

function CalendarTable() {
  const { currentDay, weekStart } = useWeek();
  const { events, addEvent, updateEvent, deleteEvent } = useEventsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventType | null>(null);

  let defaultEvent: CalendarEventType = {
    id: uuidv4(),
    title: '',
    startDate: new Date(),
    durationInMinutes: 60,
    color: 'blue',
  };

  const openNewEventModal = useCallback((time: string, day: Date) => {
    const newEvent = {
      ...defaultEvent,
      id: uuidv4(),
      startDate: parseISO(`${format(day, 'yyyy-MM-dd')}T${time}`),
    };
    setSelectedEvent(newEvent);
    setIsModalOpen(true);
  }, []);

  const openEditEventModal = (event: CalendarEventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: CalendarEventType) => {
    if (eventData.id && events.some(e => e.id === eventData.id)) {
      updateEvent(eventData);
    } else {
      addEvent(eventData);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    setIsModalOpen(false);
  };

  const daysOfWeek = useMemo(() => eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) }), [weekStart]);

  const timesOfDay = useMemo(() => Array.from({ length: 24 }, (_, index) => {
    return `${index.toString().padStart(2, '0')}:00`;
  }), []);

  const handleCellClick = useCallback((time: string, day: Date) => {
    openNewEventModal(time, day);
  }, [openNewEventModal]);

  const getMinutesFromMidnight = (date: Date) => {
    return date.getHours() * 60 + date.getMinutes();
  };

  const getTopOffset = (eventStartMinutes: number, cellStartMinutes: number) => {
    return ((eventStartMinutes - cellStartMinutes) / 60) * 100;
  };

  const getHeight = (eventDurationInMinutes: number) => {
    return (eventDurationInMinutes / 60) * 100;
  };

  const getEventStyle = (event: CalendarEventType, events: CalendarEventType[], time: String): CSSProperties => {
    const eventStartMinutes = getMinutesFromMidnight(event.startDate);
    const cellStartMinutes = parseInt(time.split(':')[0]) * 60;
    const { width, left } = getEventPositioning(event, events);

    return {
      top: `${getTopOffset(eventStartMinutes, cellStartMinutes) + 3}%`,
      left: `${left}%`,
      width: `${width}%`,
      height: `${getHeight(event.durationInMinutes) - 6}%`,
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
    const gap = 1;
    const width = ((100 / overlappingEvents.length) * 0.9) - 1.5 * gap;
    const left = overlappingIndex * (width + 1.5 * gap) + gap;

    return { width, left };
  }

  return (<>
    <Table className='bg-slate-50'>
      <TableHeader>
        <TableRow className='h-20 ' >
          <TableHead className='min-w-[50] max-w-[80px]'></TableHead>
          {daysOfWeek.map(day => (
            <TableHead
              key={day.toString()}
              className={isSameDay(day, currentDay) ? "text-primary border-b font-bold" : "border-b"}
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
                        onEdit={openEditEventModal}
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
    <EventFormModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleSaveEvent}
      onDelete={handleDeleteEvent}
      initialEvent={selectedEvent || defaultEvent}
    />
  </>
  );
}

export default CalendarTable;
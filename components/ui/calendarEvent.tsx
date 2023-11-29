import { CalendarEventType, CalendarColorMap, BGCalendarColorMap, BGCalendarColorMapHover } from '@/core/types/calendarTypes';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const CalendarEvent: React.FC<{
  event: CalendarEventType;
  style: React.CSSProperties;
  onEdit: (event: CalendarEventType) => void;
}> = ({ event, style, onEdit }) => {

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(event);
  };

  const endDate = new Date(event.startDate.getTime() + event.durationInMinutes * 60000);

  return (
    <div
      className={cn(
        'flex flex-col truncate justify-between left-0 right-8 z-10 overflow-hidden bg-slate-300 hover:bg-slate-400 rounded-md px-2 py-1 border-l-4 transition-all duration-200', CalendarColorMap[event.color], BGCalendarColorMap[event.color], BGCalendarColorMapHover[event.color], event.durationInMinutes > 30 ? 'h-16' : 'h-8',
      )}
      style={style}

      onClick={handleClick}
    >
      <div className='text-left text-neutral-700 font-semibold'>{event.title}</div>
      {event.durationInMinutes > 30 && (
        <div className='flex gap-1'>
          <div className='text-left text-neutral-700 text-xxs'>{format(event.startDate, 'HH:mm')}</div>
          <div className='text-left text-neutral-700 text-xxs'>-</div>
          <div className='text-left text-neutral-700 text-xxs'>{format(endDate, 'HH:mm')}</div>
        </div>
      )}
    </div>
  );
};

export default CalendarEvent;

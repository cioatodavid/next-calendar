import { CalendarEventType } from '@/types/calendarTypes';
import { cn } from '@/lib/utils';
interface CalendarEventProps {
  event: CalendarEventType;
  style: React.CSSProperties;
  onEventClick: (event: CalendarEventType) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, style, onEventClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEventClick(event);
  };

  return (
    <>
      <div
        className={cn(
          "absolute left-0 right-8 z-10 rounded-r-sm text-ellipsis overflow-hidden  bg-slate-800 hover:bg-slate-900 px-2 py-1 border-l-4",
          event.color
        )}
        style={style}
        onClick={handleClick}
      >
        <p className='text-left text-neutral-100 font-semibold'>{event.title}</p>
      </div>
    </>
  );
};
export default CalendarEvent;



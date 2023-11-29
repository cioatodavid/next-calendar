import { CalendarColorMap, CalendarEventProps, CalendarEventType } from '@/core/types/calendarTypes';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEventsContext } from '@/contexts/eventContext';
import { format } from 'date-fns';
const CalendarEvent: React.FC<CalendarEventProps> = ({ event, style }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteEvent, updateEvent } = useEventsContext();
  const [eventData, setEventData] = useState<CalendarEventType>(event);

  useEffect(() => {
    setEventData(event);
  }, [event]);

  const handleEventChange = (key: string, value: string | Date) => {
    setEventData({
      ...eventData,
      [key]: value,
    });
  };

  const endDate = eventData.startDate ? new Date(eventData.startDate.getTime() + eventData.durationInMinutes * 60000) : new Date();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e.target.name, new Date(e.target.value));
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e.target.name, e.target.value);
  };

  const handleSelectChange = (color: string) => {
    handleEventChange('color', color);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    setIsDialogOpen(false);
  }

  const handleSave = () => {
    updateEvent(eventData);
    setIsDialogOpen(false);
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };


  const captilize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    if (isDialogOpen) {
      document.addEventListener('click', stopPropagation);
    } else {
      document.removeEventListener('click', stopPropagation);
    }

    return () => {
      document.removeEventListener('click', stopPropagation);
    };
  }, [isDialogOpen]);

  const renderColors = () => {
    return (
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder={captilize(eventData.color)} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(CalendarColorMap).map((color) => (
            <SelectItem
              key={color}
              value={color}
              className={`flex items-center justify-between border-l-4 rounded-l-none ${CalendarColorMap[color]}`}
            >
              {captilize(color)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };


  return (
    <>
      <div
        className={cn(
          "flex flex-col truncate justify-between left-0 right-8 z-10 overflow-hidden bg-slate-800 hover:bg-slate-900 px-2 py-1 border-l-4 shadow-md hover:shadow-xl transition-all duration-200",
          CalendarColorMap[event.color]
        )}
        style={style}
        onClick={handleClick}
      >
        <div className='text-left text-neutral-100 font-semibold'>{event.title}</div>

        <div className={`flex gap-1 ${eventData.durationInMinutes <= 30 ? 'hidden' : ''}`}>
          <div className='text-left text-neutral-200 text-xxs'>{format(event.startDate, 'HH:mm')}</div>
          <div className='text-left text-neutral-200 text-xxs'>-</div>
          <div className='text-left text-neutral-200 text-xxs'>{format(endDate, 'HH:mm')}</div>
        </div>
      </div>

      {isDialogOpen && (
        <Dialog modal open={isDialogOpen} onOpenChange={setIsDialogOpen} key={event.id}>
          <DialogContent onClick={(e) => e.stopPropagation()} >
            <DialogHeader>
              <DialogTitle className='mb-4'>Update your event</DialogTitle>
              <DialogDescription className='flex flex-col gap-6'>
                <p className="grid w-full items-center gap-4">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Choose a title"
                    value={eventData.title}
                    onChange={handleInputChange}
                  />
                </p>

                <p className="grid w-full items-center gap-4">
                  <Label htmlFor="color">Color</Label>
                  {renderColors()}
                </p>

                <p className="grid w-full items-center gap-4">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    value={format(eventData.startDate, 'yyyy-MM-dd\'T\'HH:mm')}
                    onChange={handleDateChange}
                  />
                </p>

                <p className="grid w-full items-center gap-4">
                  <Label htmlFor="durationInMinutes">Duration (minutes)</Label>
                  <Input
                    type="number"
                    id="durationInMinutes"
                    name="durationInMinutes"
                    value={eventData.durationInMinutes}
                    onChange={handleInputChange}
                  />
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant={'destructive'} onClick={handleDelete}>Delete</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog >
      )}
    </>
  );
}

export default CalendarEvent;
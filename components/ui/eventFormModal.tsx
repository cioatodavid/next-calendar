import { useEffect } from 'react';
import { BGCalendarColorMap, CalendarColorMap, CalendarEventType } from "@/core/types/calendarTypes";
import { useEventForm } from '@/hooks/useEventForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { capitalize, titleCase } from '@/core/utils/stringUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';

interface EventFormModalProps {
  initialEvent: CalendarEventType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: CalendarEventType) => void;
  onDelete?: (eventId: string) => void;
}

const EventFormModal: React.FC<EventFormModalProps> = ({ initialEvent, isOpen, onClose, onSave, onDelete }) => {
  const { eventData, handleEventChange } = useEventForm(initialEvent);

  useEffect(() => {
    if (isOpen && initialEvent) {
      handleEventChange('title', initialEvent.title || '');
      handleEventChange('color', initialEvent.color || 'defaultColor');
      handleEventChange('startDate', initialEvent.startDate || new Date());
      handleEventChange('durationInMinutes', initialEvent.durationInMinutes || 60);
    }
  }, [isOpen, initialEvent, handleEventChange]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e.target.name, e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e.target.name, new Date(e.target.value));
  };

  const handleSelectChange = (color: string) => {
    handleEventChange('color', color);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialEvent?.id ? 'Edit Event' : 'New Event'}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label>Event Title</Label>
          <Input
            name="title"
            value={titleCase(eventData?.title) || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Event Color</Label>
          <Select onValueChange={handleSelectChange} value={eventData?.color || 'defaultColor'}>
            <SelectTrigger>
              <SelectValue>
                <span className={`w-3 h-3 rounded-full ${BGCalendarColorMap[eventData?.color || 'defaultColor']}`}></span>
                {capitalize(eventData?.color || 'blue')}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.keys(CalendarColorMap).map((color) => (
                <SelectItem
                  key={color}
                  value={color}
                  className={`flex items-center gap-2`}
                >
                  {capitalize(color)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Start Date</Label>
          <Input
            type="datetime-local"
            name="startDate"
            value={eventData?.startDate ? format(eventData.startDate, 'yyyy-MM-dd\'T\'HH:mm') : ''}
            onChange={handleDateChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            name="durationInMinutes"
            value={eventData?.durationInMinutes || 0}
            onChange={handleInputChange}
          />
        </div>
        <DialogFooter>
          {onDelete && initialEvent?.id && (
            <Button variant="destructive" onClick={() => onDelete(eventData.id)}>Delete</Button>
          )}
          <Button onClick={() => onSave(eventData)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormModal;

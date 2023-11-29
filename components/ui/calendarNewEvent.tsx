import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEventsContext } from "@/contexts/eventContext"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { CalendarColorMap, CalendarEventProps, CalendarEventType } from "@/core/types/calendarTypes"

const CalendarNewEvent: React.FC<CalendarEventProps> = ({ event, style }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { deleteEvent, updateEvent } = useEventsContext()
  const [eventData, setEventData] = useState<CalendarEventType>(event)

  useEffect(() => {
    setEventData(event)
  }, [event])

  const handleEventChange = (key: string, value: string | Date) => {
    setEventData({
      ...eventData,
      [key]: value,
    })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e.target.name, new Date(e.target.value))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleEventChange(e.target.name, e.target.value)
  }

  const handleSelectChange = (color: string) => {
    handleEventChange("color", color)
  }

  const handleDelete = () => {
    deleteEvent(event.id)
    setIsDialogOpen(false)
  }

  const handleSave = () => {
    updateEvent(eventData)
    setIsDialogOpen(false)
  }

  const captilize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


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
        className={`absolute rounded-md shadow-lg bg-${event.color}-400 text-white px-2 py-1 text-sm`}
        style={style}
      >
        {event.title}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogTrigger>
          <div className="absolute inset-0" />
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Edit event</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col gap-2">
                  <Label>Event title</Label>
                  <Input
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label>Event color</Label>
              {renderColors()}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Event start</Label>
              <Input
                type="datetime-local"
                name="startDate"
                value={format(eventData.startDate, "yyyy-MM-dd'T'HH:mm")}
                onChange={handleDateChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Event duration (minutes)</Label>
              <Input
                type="number"
                name="durationInMinutes"
                value={eventData.durationInMinutes}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CalendarNewEvent
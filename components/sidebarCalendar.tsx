import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { useWeek } from "@/contexts/weekContext";
import { ScrollArea } from "@/components/ui/scroll-area"


function SidebarCalendar() {
  const { goToDefinedDay, currentMonth, currentDay } = useWeek();
  const [selected, setSelected] = useState(currentDay);

  const handleDateChange = (date: Date | undefined) => {
    setSelected(date!)
    goToDefinedDay(date!)
  }

  useEffect(() => {
    setSelected(currentDay);
  }, [currentDay]);

  return (
    <>
      <ScrollArea className="h-screen min-w-fit p-4 border-r">
        <div className="flex " >
          <Calendar
            mode="single"
            selected={selected}
            weekStartsOn={1}
            onSelect={handleDateChange}
          />
        </div>
      </ScrollArea>

    </>
  );
}

export default SidebarCalendar;
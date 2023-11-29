import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { useWeek } from "@/contexts/weekContext";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarClock, CalendarDays, CalendarSearch } from "lucide-react";

function SidebarCalendar() {
  const { goToDefinedDay, currentDay } = useWeek();
  const [selected, setSelected] = useState(currentDay);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [month, setMonth] = useState(currentDay);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelected(date);
      goToDefinedDay(date);
      setForceUpdate(!forceUpdate);
    }
  };

  const handleMonthChange = (date: Date | undefined) => {
    if (date) {
      setMonth(date);
    };
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelected(today);
    goToDefinedDay(today);
    setMonth(today);
    setForceUpdate(!forceUpdate);
  }

  useEffect(() => {
    setSelected(currentDay);
  }, [currentDay, goToDefinedDay, forceUpdate]);

  return (
    <>
      <ScrollArea className="h-screen min-w-fit p-6 flex items-center justify-center border-r">
        <div className="flex items-end m-4" >
          <div className="flex items-center">
            <CalendarClock className="mr-3 h-8 w-8 text-primary " />
            <h1 className="text-3xl font-bold text-primary">
              next
            </h1>
          </div>
          <h1 className="text-3xl font-semibold text-muted-foreground">
            calendar
          </h1>
        </div>
        <div className="flex items-start my-12 ">
          <Button className="m-4 shadow-lg shadow-blue-500/50 transition duration-100 ease-in-out hover:scale-110" onClick={handleTodayClick}>
            <CalendarSearch className="mr-3 h-6 w-6" />
            Today
          </Button>
        </div>
        <div className="flex items-center content-center" >
          <Calendar
            mode="single"
            selected={selected}
            weekStartsOn={1}
            onMonthChange={handleMonthChange}
            month={month}
            onSelect={handleDateChange}
          />
        </div>
      </ScrollArea>
    </>
  );
}

export default SidebarCalendar;
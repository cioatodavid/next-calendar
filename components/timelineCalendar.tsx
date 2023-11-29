import CalendarHeader from "./ui/calendarHeader";
import CalendarTable from "./ui/calendarTable";

function TimelineCalendar() {
  return (
    <div className="w-full overflow-auto">
      <CalendarHeader />
      <CalendarTable />
    </div>
  );
}

export default TimelineCalendar;
import CalendarHeader from "./ui/calendarHeader";
import CalendarTable from "./ui/calendartable";

function TimelineCalendar() {
  return (
    <div className="w-full overflow-auto">
        <CalendarHeader />
        <CalendarTable />
    </div>
  );
}

export default TimelineCalendar;
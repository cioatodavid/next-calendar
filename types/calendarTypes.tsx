export interface CalendarEventType {
  id: string;
  title: string;
  startDate: Date;
  durationInMinutes: number;
  color: string; // This should be a Tailwind CSS color class name
}
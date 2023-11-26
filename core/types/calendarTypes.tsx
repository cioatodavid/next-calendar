export interface CalendarEventType {
  id: string;
  title: string;
  startDate: Date;
  durationInMinutes: number;
  color: string;
}

export interface CalendarEventProps {
  event: CalendarEventType;
  style: React.CSSProperties;
}

export interface CalendarModalProps {
  event: CalendarEventType;
  style: React.CSSProperties;
  onEventClick: (event: CalendarEventType) => void;
}

export const CalendarColorMap: Record<string, string> = {
  blue: "border-l-blue-400",
  red: "border-l-red-400",
  indigo: "border-l-indigo-400",
  green: "border-l-green-400",
  yellow: "border-l-yellow-400",
  pink: "border-l-pink-400",
  purple: "border-l-purple-400",
  gray: "border-l-gray-400",
};
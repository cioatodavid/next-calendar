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


export const CalendarColorMap: Record<string, string> = {
  blue: "border-l-blue-500",
  red: "border-l-red-500",
  indigo: "border-l-indigo-500",
  green: "border-l-green-500",
  yellow: "border-l-yellow-500",
  pink: "border-l-pink-500",
  purple: "border-l-purple-500",
  gray: "border-l-gray-500",
};

export const BGCalendarColorMap: Record<string, string> = {
  blue: "bg-blue-200",
  red: "bg-red-200",
  indigo: "bg-indigo-200",
  green: "bg-green-200",
  yellow: "bg-yellow-200",
  pink: "bg-pink-200",
  purple: "bg-purple-200",
  gray: "bg-gray-200",
};

export const BGCalendarColorMapHover: Record<string, string> = {
  blue: "hover:bg-blue-300",
  red: "hover:bg-red-300",
  indigo: "hover:bg-indigo-300",
  green: "hover:bg-green-300",
  yellow: "hover:bg-yellow-300",
  pink: "hover:bg-pink-300",
  purple: "hover:bg-purple-300",
  gray: "hover:bg-gray-300",
};
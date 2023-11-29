import { CalendarEventType } from '@/core/types/calendarTypes';


let mockData: CalendarEventType[] = [
  {
    id: "1",
    title: "Event 1",
    startDate: new Date("2023-11-30T09:11:00"),
    durationInMinutes: 100,
    color: "blue",
  },
  {
    id: "3",
    title: "Event 3",
    startDate: new Date("2023-11-29T00:06:00"),
    durationInMinutes: 80,
    color: "blue",
  },
  {
    id: "4",
    title: "Retrospective",
    startDate: new Date("2023-11-30T00:00:00"),
    durationInMinutes: 200,
    color: "purple",
  },
  {
    id: "5",
    title: "Planning Meeting",
    startDate: new Date("2023-11-28T02:09:00"),
    durationInMinutes: 80,
    color: "yellow",
  },
  {
    id: "8767",
    title: "Team Sync",
    startDate: new Date("2023-11-28T02:49:00"),
    durationInMinutes: 120,
    color: "indigo",
  },
  {
    id: "12345",
    title: "QA Testing",
    startDate: new Date("2023-11-31T01:49:00"),
    durationInMinutes: 150,
    color: "pink",
  },
];

const mockDelay = 500;

export const fetchEvents = async (): Promise<CalendarEventType[]> => {
  await new Promise((resolve) => setTimeout(resolve, mockDelay));
  return mockData;
};

export const addEvent = async (event: CalendarEventType): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, mockDelay));
  mockData.push(event);
};
export const deleteEvent = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, mockDelay));
  mockData = mockData.filter((event) => event.id !== id);
};

export const updateEvent = async (updatedEvent: CalendarEventType): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, mockDelay));
  mockData = mockData.map((event) =>
    event.id === updatedEvent.id ? updatedEvent : event
  );
};
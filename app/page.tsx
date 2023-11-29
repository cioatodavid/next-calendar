'use client';
import { WeekProvider } from '@/contexts/weekContext';
import TimelineComponent from '@/components/timelineCalendar';
import { EventsProvider } from '@/contexts/eventContext';
import SidebarCalendar from '@/components/sidebarCalendar';

export default function Home() {
  return (
    <WeekProvider>
      <EventsProvider>
        <main className="flex flex-1 w-full h-screen overflow-hidden">
            <SidebarCalendar />
            <TimelineComponent />
        </main>
      </EventsProvider>
    </WeekProvider>
  )
}

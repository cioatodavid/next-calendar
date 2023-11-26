'use client';
import { WeekProvider } from '@/contexts/weekContext';
import TimelineComponent from '@/components/timelineCalendar';
import { EventsProvider } from '@/contexts/eventContext';

export default function Home() {

  return (
    <WeekProvider>
      <EventsProvider>
        <>
          <main className="p-6">
            <TimelineComponent />
          </main>
        </>
      </EventsProvider>
    </WeekProvider>
  )
}
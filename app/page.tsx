'use client';
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { WeekProvider } from '@/contexts/weekcontext';

import { useState } from "react";
import CalendarTable from "@/components/ui/calendartable";
import CalendarHeader from "@/components/ui/calendarheader";


export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    console.log(date);
  }


  return (
    <WeekProvider>
      <>
        <main className="p-6">
          <h1 className="text-3xl font-semibold">Calendar</h1>
          <Separator className="my-6" />
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="m-4"
          />

          <h1 className="text-3xl font-semibold">Timeline</h1>
          <Separator className="my-6" />
          <CalendarHeader />
          <CalendarTable />

        </main>
      </>
    </WeekProvider>
  )
}
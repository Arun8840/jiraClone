import React, { useState } from "react"
import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns"
import { enUS } from "date-fns/locale"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { Task } from "../types"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./data-calendar.css"
import EventCard from "./Calendar-view-components/Event-card"
import CustomToolbar from "./Calendar-view-components/Custom-toolbar"

interface TaksCardPropTypes {
  data: Task[]
}

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
function TaskCalendar({ data }: TaksCardPropTypes) {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  )

  const events = data?.map((task) => ({
    start: new Date(task?.dueDate),
    end: new Date(task?.dueDate),
    project: task?.project,
    title: task?.name,
    assignee: task?.assignee,
    status: task?.status,
    id: task?.$id,
  }))

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1))
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1))
    } else if (action === "TODAY") {
      setValue(new Date())
    }
  }
  return (
    <section>
      <Calendar
        localizer={localizer}
        date={value}
        events={events}
        views={["month"]}
        defaultView="month"
        toolbar
        showAllEvents
        className="size-full"
        max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer?.format(date, "EEE", culture) ?? "",
        }}
        components={{
          eventWrapper: ({ event }) => <EventCard events={event} />,
          toolbar: () => (
            <CustomToolbar date={value} onNavigate={handleNavigate} />
          ),
        }}
      />
    </section>
  )
}

export default TaskCalendar

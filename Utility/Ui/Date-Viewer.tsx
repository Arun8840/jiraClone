import React from "react"
import { format } from "date-fns"
const DateViewer = () => {
  const date = new Date()

  const today = format(date, "PPP")
  return <div className="text-xs dark:text-primary">{today}</div>
}

export default DateViewer

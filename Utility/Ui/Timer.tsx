"use client"

import React from "react"
import { format } from "date-fns"
import { Play, Pause, Check, TimerIcon } from "lucide-react"

function Timer() {
  // Format time as MM:SS
  const formattedTime = format(new Date(), "hh:mm:ss:SS")

  return (
    <div className="timer-container flex items-center gap-2">
      <TimerIcon size={18} className="text-primary" />
      <p className="text-center flex-1">{formattedTime}</p>
      <div className="timer-buttons flex text-primary gap-2">
        <button title="Start">
          <Play size={18} />
        </button>

        <button title="Stop">
          <Pause size={18} />
        </button>
        <button title="Done">
          <Check size={18} />
        </button>
      </div>
    </div>
  )
}

export default Timer

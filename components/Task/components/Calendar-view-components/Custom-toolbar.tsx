import React from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
interface ToolbarProps {
  date: Date
  onNavigate: (action: "NEXT" | "PREV" | "TODAY") => void
}
function CustomToolbar({ date, onNavigate }: ToolbarProps) {
  return (
    <div className="p-1">
      <div className="flex items-center gap-1">
        <Button
          onClick={() => onNavigate("PREV")}
          className="size-9 text-muted-foreground"
          variant={"outline"}
        >
          <ChevronLeft size={18} />
        </Button>
        <Button
          onClick={() => onNavigate("TODAY")}
          variant={"outline"}
          className="text-muted-foreground text-xs "
        >
          <Calendar className="text-neutral-500" size={18} />
          {format(date, "MMMM yyyy")}
        </Button>
        <Button
          onClick={() => onNavigate("NEXT")}
          className="size-9 text-muted-foreground"
          variant={"outline"}
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  )
}

export default CustomToolbar

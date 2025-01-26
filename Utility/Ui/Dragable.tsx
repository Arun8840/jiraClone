import React, { HTMLAttributes } from "react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DragableProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  dragId: string
  data: any
}
function Dragable({ children, dragId, className, data }: DragableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: dragId,
    data: {
      value: data,
      type: "type199",
    },
  })
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  const baseClass = "flex items-center gap-1 bg-white rounded p-2"
  return (
    <div
      className={cn(baseClass, className)}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <Button {...listeners} variant={"ghost"} className="px-2 w-fit">
        <GripVertical size={18} className="text-muted-foreground" />
      </Button>
      {children}
    </div>
  )
}

export default Dragable

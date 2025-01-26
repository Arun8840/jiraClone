import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"
import { useDroppable } from "@dnd-kit/core"
interface DroppableProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  dropId: string
}

function Droppable({ children, className, dropId }: DroppableProps) {
  const { setNodeRef } = useDroppable({
    id: dropId,
    data: {
      accepts: "type14",
    },
  })
  const baseClass = `p-2 rounded-lg transition-colors duration-150`
  return (
    <div ref={setNodeRef} className={cn(baseClass, className)}>
      {children}
    </div>
  )
}

export default Droppable

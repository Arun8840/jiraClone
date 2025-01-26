import {
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleDot,
  ListTodo,
} from "lucide-react"
import React from "react"
import { TaskStatus } from "../../types"

interface HeaderProps {
  header: string
  count: number
}
function KanbanColumnHeader({ count, header }: HeaderProps) {
  const statusIcon: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.BACKLOG]: <CircleAlert size={15} className="text-red-500" />,
    [TaskStatus.IN_PROGRESS]: (
      <CircleDashed size={15} className="text-blue-500" />
    ),
    [TaskStatus.IN_REVIEW]: <CircleDot size={15} className="text-yellow-500" />,
    [TaskStatus.DONE]: <CircleCheck size={15} className="text-green-500" />,
    [TaskStatus.TODO]: <ListTodo size={15} className="text-orange-500" />,
  }
  return (
    <>
      <div className="flex items-center justify-between pb-1">
        <div className="flex-1 flex items-center gap-1">
          <small className="pl-2">{count}</small>
          <h1 className="font-poppins_normal text-xs px-2 font-medium text-neutral-600">
            {header}
          </h1>
          {/* {statusIcon[header as TaskStatus]} */}
        </div>

        <span className="p-2">{statusIcon[header as TaskStatus]}</span>
      </div>
    </>
  )
}

export default KanbanColumnHeader

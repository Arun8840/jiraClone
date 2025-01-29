import React, { HTMLAttributes } from "react"
import { Projects } from "@/components/workspaces/Projects/type"
import { TaskStatus } from "../../types"
import { cn } from "@/lib/utils"
import {
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleDot,
  ListTodo,
} from "lucide-react"

interface EventProps extends HTMLAttributes<HTMLDivElement> {
  events: {
    start: Date
    end: Date
    project: Projects
    title: string
    assignee: Record<string, string>
    status: string
    id: string
  }
}
function EventCard({ events, className }: EventProps) {
  const { status, title, project, assignee } = events
  const statusColors: Record<TaskStatus, string> = {
    BACKLOG: "bg-blue-100",
    IN_PROGRESS: "bg-yellow-100",
    IN_REVIEW: "bg-purple-100 ",
    TODO: "bg-gray-100",
    DONE: "bg-green-100",
  }

  const statusIcon: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.BACKLOG]: <CircleAlert size={15} className="text-red-500" />,
    [TaskStatus.IN_PROGRESS]: (
      <CircleDashed size={15} className="text-blue-500" />
    ),
    [TaskStatus.IN_REVIEW]: <CircleDot size={15} className="text-yellow-500" />,
    [TaskStatus.DONE]: <CircleCheck size={15} className="text-green-500" />,
    [TaskStatus.TODO]: <ListTodo size={15} className="text-orange-500" />,
  }

  const baseClass = `p-1 m-1 hover:shadow-md transition-shadow duration-150 rounded ${
    statusColors[status as TaskStatus]
  }`
  return (
    <div className={cn(baseClass, className)}>
      <h1
        title={title}
        className="text-sm text-neutral-700 font-medium tracking-wide line-clamp-1"
      >
        {title}
      </h1>
      <div className="flex items-center gap-1 pt-2">
        <div
          title="Project"
          className="size-7 bg-primary rounded-full grid place-items-center"
        >
          <span className="text-white">
            {project?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div
          title="Assignee"
          className="size-7 dark:text-primary bg-secondary rounded-full grid place-items-center"
        >
          <span>{assignee?.name?.charAt(0).toUpperCase()}</span>
        </div>

        <div className="flex-1 flex justify-end">
          {statusIcon[status as TaskStatus]}
        </div>
      </div>
    </div>
  )
}

export default EventCard

import React, { useCallback, useState } from "react"
import { Task, TaskStatus } from "../types"
import KanbanColumnHeader from "./Kanban-components/Kanban-column-header"
import KanbanRowData from "./Kanban-components/Kanban-row-data"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import Droppable from "@/Utility/Ui/Droppable"
import { useBulkUpdateTask } from "../api/use-bulkUpdate-task"
import { Loader } from "lucide-react"
import DetailModal from "@/Utility/Ui/Detail-modal"
interface KanbanPropTypes {
  data: Task[]
}
type Taskstate = {
  [Key in TaskStatus]: Task[]
}

function TaskKnban({ data }: KanbanPropTypes) {
  const boards: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.TODO,
    TaskStatus.DONE,
  ]
  const droppableColors: Record<TaskStatus, string> = {
    BACKLOG: "bg-blue-100 dark:border dark:border-blue-500 dark:bg-inherit",
    IN_PROGRESS:
      "bg-yellow-100 dark:border dark:border-yellow-500 dark:bg-inherit",
    IN_REVIEW:
      "bg-purple-100 dark:border dark:border-purple-500 dark:bg-inherit",
    TODO: "bg-gray-200 dark:border dark:border-gray-500 dark:bg-inherit",
    DONE: "bg-green-100 dark:border dark:border-green-500 dark:bg-inherit",
  }
  const { mutate: bulkUpdate, isPending: isTaskUpdating } = useBulkUpdateTask()
  const [tasks, setTasks] = useState<Taskstate>(() => {
    const initialTasks: Taskstate = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
      [TaskStatus.TODO]: [],
    }

    data?.forEach((task) => {
      initialTasks[task.status as TaskStatus].push(task)
    })

    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
    })

    return initialTasks
  })

  // * CALLBACK FUNCTION OF SERVICE CALL
  const onChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      })
    },
    [bulkUpdate]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      const draggedValue = active?.data?.current?.value

      if (!over || !draggedValue) return
      if (over.id === draggedValue.status) return

      const prevStatus = draggedValue.status // Original status before drag
      const newStatus = over.id // New status after drop

      // Add the updated task with the new status
      const updatedData = {
        ...draggedValue,
        status: newStatus,
      }

      // Remove the dragged item from its previous array
      setTasks((prev) => {
        const updatedPrevStatusTasks = prev[prevStatus as TaskStatus].filter(
          (task) => task.$id !== draggedValue.$id
        )

        return {
          ...prev,
          [prevStatus as TaskStatus]: updatedPrevStatusTasks, // Remove from old status list
          [newStatus as TaskStatus]: [
            ...prev[newStatus as TaskStatus],
            updatedData,
          ], // Add to new status list
        }
      })

      onChange([updatedData])
    },
    [onChange]
  )

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DetailModal title="Task details" description="" />
      <section className="grid lg:grid-cols-5  auto-rows-max gap-2">
        {boards?.map((taskBoard) => {
          const taskLength = tasks[taskBoard]?.length
          const taskData = tasks[taskBoard]
          return (
            <Droppable
              dropId={taskBoard}
              className={`divide-y ${droppableColors[taskBoard]}`}
              key={taskBoard}
            >
              {/* //*HEADER */}
              <KanbanColumnHeader count={taskLength} header={taskBoard} />

              <KanbanRowData data={taskData} />
            </Droppable>
          )
        })}
        {isTaskUpdating && (
          <div className="col-span-full flex justify-center items-center gap-2 p-3 text-muted-foreground">
            <small>Task is updating</small>
            <Loader className="animate-spin origin-center " size={18} />
          </div>
        )}
      </section>
    </DndContext>
  )
}

export default TaskKnban

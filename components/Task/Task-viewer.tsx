"use client"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Calendar, Kanban, Logs, TableProperties } from "lucide-react"
import { useQueryState } from "nuqs"
import TaskTable from "./components/Task-table"
import TaskCalendar from "./components/Task-calendar"
import TaskKnban from "./components/Task-kanban"
import { useGetTasks } from "./api/use-get-tasks"
import { useGetParamId } from "@/hooks/use-getParamId"
import { Loader } from "@/Utility/Ui/Loader"
import { Button } from "../ui/button"
import { useCreateTasktModal } from "@/hooks/use-create-task"
import { CreateTaskModal } from "./components/Modal/Create-task-modal"

function TaskViewer() {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  })
  const { open } = useCreateTasktModal()

  const { workspaceId, projectId } = useGetParamId()
  const { data: tasks, isPending } = useGetTasks({
    workspaceId,
    projectId,
  })

  if (isPending) {
    return <Loader className="dark:text-primary" />
  }
  return (
    <div className="size-full">
      <CreateTaskModal />
      <Tabs defaultValue={view} onValueChange={setView}>
        <div className="flex justify-between">
          <TabsList className="font-poppins_normal bg-neutral-200 dark:bg-neutral-900">
            <TabsTrigger value="table">
              <TableProperties size={18} />
              <small className="pl-1 ">Table</small>
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <Kanban size={18} /> <small className="pl-1 ">Kanban</small>
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar size={18} />
              <small className="pl-1 ">Calendar</small>
            </TabsTrigger>
          </TabsList>

          {/* //* CREATE TASK BUTTON */}
          <div className="pr-1">
            <Button size={"sm"} onClick={open}>
              <Logs />
              New Task
            </Button>
          </div>
        </div>

        <TabsContent value="table">
          <TaskTable data={tasks?.documents || []} />
        </TabsContent>
        <TabsContent value="kanban">
          <TaskKnban data={tasks?.documents || []} />
        </TabsContent>
        <TabsContent value="calendar">
          <TaskCalendar data={tasks?.documents || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TaskViewer

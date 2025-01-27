import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  Calendar,
  Kanban,
  Loader,
  SquareAsterisk,
  TableProperties,
} from "lucide-react"
import { useQueryState } from "nuqs"
import TaskTable from "./components/Task-table"
import TaskCalendar from "./components/Task-calendar"
import TaskKnban from "./components/Task-kanban"
import { useGetTasks } from "./api/use-get-task"
import { useGetParamId } from "@/hooks/use-getParamId"

function TaskViewer() {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  })

  const { workspaceId } = useGetParamId()
  const { data: tasks, isPending } = useGetTasks({
    workspaceId,
  })

  if (isPending) {
    return (
      <div className="size-full p-3 flex justify-center">
        <Loader size={18} className="animate-spin" />
      </div>
    )
  }
  return (
    <>
      <Tabs defaultValue={view} onValueChange={setView}>
        <TabsList className="font-poppins_normal">
          <TabsTrigger className="dark:text-foreground" value="table">
            <TableProperties size={18} />
            <small className="pl-1 ">Table</small>
          </TabsTrigger>
          <TabsTrigger className="dark:text-foreground" value="kanban">
            <Kanban size={18} /> <small className="pl-1 ">Kanban</small>
          </TabsTrigger>
          <TabsTrigger className="dark:text-foreground" value="calendar">
            <Calendar size={18} />
            <small className="pl-1 ">Calendar</small>
          </TabsTrigger>
        </TabsList>

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
    </>
  )
}

export default TaskViewer

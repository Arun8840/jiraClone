import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Calendar, Kanban, TableProperties } from "lucide-react"
import { useQueryState } from "nuqs"
import TaskTable from "./components/Task-table"
import TaskCalendar from "./components/Task-calendar"
import TaskKnban from "./components/Task-kanban"
import { useGetTasks } from "./api/use-get-task"
import { useGetParamId } from "@/hooks/use-getParamId"
import { Loader } from "@/Utility/Ui/Loader"

function TaskViewer() {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  })

  const { workspaceId } = useGetParamId()
  const { data: tasks, isPending } = useGetTasks({
    workspaceId,
  })

  if (isPending) {
    return <Loader className="dark:text-primary" />
  }
  return (
    <>
      <Tabs defaultValue={view} onValueChange={setView}>
        <TabsList className="font-poppins_normal dark:bg-neutral-900">
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

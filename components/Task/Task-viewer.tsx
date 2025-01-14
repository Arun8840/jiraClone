import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { SquareAsterisk, TableProperties } from "lucide-react"
import { useQueryState } from "nuqs"
import TaskTable from "./components/Task-table"

function TaskViewer() {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  })
  return (
    <>
      <Tabs defaultValue={view} onValueChange={setView}>
        <TabsList className="font-poppins_normal">
          <TabsTrigger value="table">
            <TableProperties size={18} />
          </TabsTrigger>
          <TabsTrigger value="card">
            <SquareAsterisk size={18} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="table">
          <TaskTable />
        </TabsContent>
        <TabsContent value="card">Change your Card here.</TabsContent>
      </Tabs>
    </>
  )
}

export default TaskViewer

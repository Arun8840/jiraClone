import React from "react"
import { useGetTasks } from "../api/use-get-task"
import { useGetParamId } from "@/hooks/use-getParamId"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader } from "lucide-react"
function TaskTable() {
  const { workspaceId } = useGetParamId()
  const { data: tasks, isPending } = useGetTasks({
    workspaceId,
  })
  const tableHeaders: string[] = [
    "Task Name",
    "Description",
    "WorkspaceId",
    "ProjectId",
    "AssigneeId",
    "Status",
    "Due Date",
  ]

  return (
    <>
      <Table>
        <TableCaption className="border-t p-2 border-dashed bg-lime-50 text-lime-600">
          A list of your tasks.
        </TableCaption>
        <TableHeader>
          <TableRow>
            {tableHeaders?.map((headers) => {
              return (
                <TableHead
                  key={headers}
                  className={`${headers.includes("Action") && "text-center"}`}
                >
                  {headers}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={tableHeaders?.length}>
                <div className="w-full flex justify-center">
                  <Loader size={18} className="animate-spin origin-center" />
                </div>
              </TableCell>
            </TableRow>
          ) : tasks && tasks?.documents?.length > 0 ? (
            tasks?.documents?.map((taskValues) => (
              <TableRow key={taskValues.$id}>
                <TableCell>{taskValues?.name}</TableCell>
                <TableCell>{taskValues?.description}</TableCell>
                <TableCell>{taskValues?.workspaceId}</TableCell>
                <TableCell>{taskValues?.projectId}</TableCell>
                <TableCell>{taskValues?.assignee?.name}</TableCell>
                <TableCell>{taskValues?.status}</TableCell>
                <TableCell>{taskValues?.dueDate?.split("T")[0]}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableHeaders?.length}>
                <h1 className="text-center text-muted-foreground">
                  No tasks found !!
                </h1>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default TaskTable

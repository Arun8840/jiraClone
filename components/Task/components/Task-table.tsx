import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader, Pen, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { Task } from "../types"
import { Badge } from "@/components/ui/badge"
import { useDeleteTask } from "../api/use-delete-task"
interface statusColorsTypes {
  IN_PROGRESS: string
  DONE: string
  IN_REVIEW: string
  BACKLOG: string
}

interface TaksTablePropTypes {
  data: Task[]
}
function TaskTable({ data }: TaksTablePropTypes) {
  const { mutate, isPending: isTaskRemoving } = useDeleteTask()
  const [DeleteModal, confirmDelete] = useConfirm(
    "Confirmation",
    "Are you sure want to delete this task ?",
    "destructive"
  )
  const tableHeaders: string[] = [
    "Task Name",
    "Project",
    "Description",
    "Assignee",
    "Status",
    "Due Date",
    "Action",
  ]
  const statusColors: statusColorsTypes = {
    IN_PROGRESS: "text-orange-600 bg-orange-600/10",
    DONE: "text-green-600 bg-green-600/10",
    IN_REVIEW: "text-indigo-600 bg-indigo-600/10",
    BACKLOG: "text-red-600 bg-red-600/10",
  }

  const handle_delete_task = async (task: Task) => {
    const confirm = await confirmDelete()
    if (confirm) {
      mutate({
        param: { taskId: task?.$id },
      })
    }
  }
  return (
    <>
      <DeleteModal />
      {isTaskRemoving ? (
        <div className="p-2 flex justify-center">
          <Loader className="animate-spin" size={18} />
        </div>
      ) : (
        <Table className="table-fixed bg-background rounded font-poppins_normal">
          <TableHeader>
            <TableRow>
              {tableHeaders?.map((headers) => {
                return (
                  <TableHead
                    key={headers}
                    className={`${headers.includes("Action") && "text-center"}`}
                  >
                    <p className="line-clamp-1"> {headers}</p>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data?.length > 0 ? (
              data?.map((taskValues) => {
                const status: string = taskValues?.status ?? "COMPLETED"
                return (
                  <TableRow key={taskValues.$id}>
                    <TableCell>
                      <p className="line-clamp-1">{taskValues?.name}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="size-7 grid place-items-center bg-primary rounded-full">
                          <small className="text-white">
                            {taskValues?.project?.name?.charAt(0).toUpperCase()}
                          </small>
                        </div>
                        <p className="line-clamp-1 flex-1">
                          {taskValues?.project?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1">{taskValues?.description}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="size-7 grid place-items-center bg-secondary rounded-full">
                          <small className="text-primary">
                            {taskValues?.assignee?.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </small>
                        </div>
                        <p className="line-clamp-1 flex-1">
                          {taskValues?.assignee?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={"secondary"}
                        className={`${
                          statusColors?.[
                            (status as keyof typeof statusColors) ??
                              "IN_PROGRESS"
                          ]
                        } font-poppins_normal`}
                      >
                        {taskValues?.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1">
                        {taskValues?.dueDate?.split("T")[0]}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Button
                          type="button"
                          variant={"secondary"}
                          className="size-fit  text-muted-foreground p-2"
                        >
                          <Pen size={18} />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handle_delete_task(taskValues)}
                          variant={"secondary"}
                          className="size-fit  text-muted-foreground p-2"
                        >
                          <Trash size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
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
      )}
    </>
  )
}

export default TaskTable

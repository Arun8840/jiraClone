import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Info, MoreVertical, Pen, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { Task } from "../types"
import { Badge } from "@/components/ui/badge"
import { useDeleteTask } from "../api/use-delete-task"
import { Loader } from "@/Utility/Ui/Loader"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import Avatar from "@/Utility/Ui/Avatar"
interface statusColorsTypes {
  IN_PROGRESS: string
  DONE: string
  IN_REVIEW: string
  BACKLOG: string
  TODO: string
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
    "Project",
    "Task Name",
    "Description",
    "Assignee",
    "Status",
    "Due Date",
    "Action",
  ]
  const statusColors: statusColorsTypes = {
    IN_PROGRESS: "bg-orange-600/20 text-orange-600",
    DONE: "bg-green-600/20 text-green-600",
    IN_REVIEW: "bg-indigo-600/20 text-indigo-600",
    BACKLOG: "bg-red-600/20 text-red-600",
    TODO: "bg-yellow-600/20 text-yellow-600",
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
        <Loader className="dark:text-primary" />
      ) : (
        <Table className="table-fixed bg-background dark:bg-black rounded font-poppins_normal">
          <TableHeader>
            <TableRow className="dark:border-b-neutral-900 border-dashed">
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
                const fullLink = `/workspaces/${taskValues?.workspaceId}/tasks/${taskValues?.$id}`
                return (
                  <TableRow
                    key={taskValues.$id}
                    className="dark:border-b-neutral-900 border-dashed"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar title={taskValues?.project?.name} />
                        <p className="line-clamp-1 flex-1">
                          {taskValues?.project?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p title={taskValues?.name} className="line-clamp-1">
                        {taskValues?.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="line-clamp-1">{taskValues?.description}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="bg-secondary text-neutral-800 dark:text-white"
                          title={taskValues?.assignee?.name}
                        />
                        <p className="line-clamp-1 flex-1">
                          {taskValues?.assignee?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          statusColors?.[
                            (status as keyof typeof statusColors) ??
                              "IN_PROGRESS"
                          ]
                        } font-poppins_normal text-xs`}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} className="p-2 size-fit">
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Link
                                href={fullLink}
                                className="flex items-center gap-2"
                              >
                                <Info className="text-primary" /> Task info
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Pen className="text-primary" /> Edit task
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handle_delete_task(taskValues)}
                            >
                              <Trash /> Remove task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

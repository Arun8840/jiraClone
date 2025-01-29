"use client"
import { useDeleteTask } from "@/components/Task/api/use-delete-task"
import { useGetTask } from "@/components/Task/api/use-get-task"
import { TaskStatus } from "@/components/Task/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { useGetParamId } from "@/hooks/use-getParamId"
import BreadCrum from "@/Utility/Ui/BreadCrum"
import { Loader } from "@/Utility/Ui/Loader"
import { format } from "date-fns"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

type CrupTypes = {
  name: string
  path: string | null
}
const TaskIdClient = () => {
  const { taskId } = useGetParamId()
  const router = useRouter()
  const { isLoading, data: task, error } = useGetTask({ taskId })
  const { mutate, isPending: isTaskRemoving } = useDeleteTask()
  const [DeleteModal, confirmDelete] = useConfirm(
    "Confirmation",
    `Are you sure want to delete this task ${task?.name} ?`,
    "destructive"
  )
  if (isLoading) {
    return <Loader className="dark:text-primary" />
  }

  const crumData: CrupTypes[] = [
    {
      name: task?.project?.name ?? "",
      path: `/workspaces/${task?.workspaceId}/project/${task?.projectId}`,
    },
    {
      name: task?.name ?? "",
      path: null,
    },
  ]
  const statusColors = {
    IN_PROGRESS: "bg-orange-600/20 text-orange-600",
    DONE: "bg-green-600/20 text-green-600",
    IN_REVIEW: "bg-indigo-600/20 text-indigo-600",
    BACKLOG: "bg-red-600/20 text-red-600",
    TODO: "bg-yellow-600/20 text-yellow-600",
  }
  const handle_delete_task = async () => {
    const confirm = await confirmDelete()
    if (confirm) {
      mutate(
        {
          param: { taskId: task?.$id as string },
        },
        {
          onSuccess: () => {
            router.push(`/workspaces/${task?.workspaceId}/tasks`)
          },
        }
      )
    }
  }
  return (
    <section className="size-full">
      <DeleteModal />
      <div className="flex items-center justify-between p-1">
        <BreadCrum data={crumData} asChild>
          <div
            title={task?.name}
            className="size-6 rounded-full bg-primary grid place-items-center text-white uppercase"
          >
            <h1>{task?.name?.charAt(0)}</h1>
          </div>
        </BreadCrum>
        <Button
          disabled={isTaskRemoving}
          onClick={handle_delete_task}
          size={"sm"}
          variant={"destructive"}
        >
          {isTaskRemoving ? <Loader /> : <Trash />}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-2 p-1">
        <div className="bg-white rounded-md min-h-[100px] text-sm font-poppins_normal p-3 grid gap-3">
          <div className="flex items-center gap-x-2">
            <h1 className="text-muted-foreground min-w-[100px]">Assignee</h1>

            <div className="flex items-center gap-2">
              <div
                title={task?.assignee?.email}
                className="bg-primary text-white size-6 rounded-full grid place-items-center"
              >
                {task?.assignee?.name?.charAt(0).toUpperCase()}
              </div>
              <p>{task?.assignee?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-muted-foreground min-w-[100px]">Due date</h1>

            <p>{format(task?.dueDate as string, "PPP")}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-muted-foreground min-w-[100px]">Status</h1>

            <Badge className={`${statusColors[task?.status as TaskStatus]}`}>
              {task?.status}
            </Badge>
          </div>

          <div className="flex items-start gap-x-2">
            <h1 className="text-muted-foreground min-w-[100px]">Description</h1>

            <p className="text-muted-foreground line-clamp-2">
              {task?.description ?? "Not set"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TaskIdClient

"use client"
import Analytics from "@/components/Analytics"
import { useGetMembers } from "@/components/members/api/use-get-members"
import { useGetTasks } from "@/components/Task/api/use-get-tasks"
import { CreateTaskModal } from "@/components/Task/components/Modal/Create-task-modal"
import { Task } from "@/components/Task/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGetWorkspaceAnalytics } from "@/components/workspaces/api/use-get-workspace-analytics"
import { useGetProjects } from "@/components/workspaces/Projects/api/use-get-projects"
import { useCreateTasktModal } from "@/hooks/use-create-task"
import { useCreateProjectModal } from "@/hooks/use-createProject-modal"
import { useGetParamId } from "@/hooks/use-getParamId"
import Avatar from "@/Utility/Ui/Avatar"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { Loader } from "@/Utility/Ui/Loader"
import { Calendar, Plus } from "lucide-react"
import Link from "next/link"
import React from "react"
import { format } from "date-fns"

export const WorkspaceIdClient = () => {
  const { workspaceId } = useGetParamId()

  //   *  DATAS
  const { data: workspaceAnalytics, isLoading: isAnalyticsLoading } =
    useGetWorkspaceAnalytics({ workspaceId })

  const { data: projects, isLoading: isProjectLoading } = useGetProjects({
    workspaceId,
  })

  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    workspaceId,
  })

  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  })

  //   * CREATE HOOKS
  const { open: openCreateProjectModal } = useCreateProjectModal()

  const isLoading =
    isAnalyticsLoading || isProjectLoading || isTasksLoading || isMembersLoading

  if (isLoading) {
    return <Loader />
  }

  if (!workspaceAnalytics || !projects || !members || !tasks) {
    return <ErrorComponent />
  }

  return (
    <section className="p-2">
      {workspaceAnalytics ? <Analytics data={workspaceAnalytics} /> : null}
      <div className="grid md:grid-cols-2 gap-2">
        <TaskList data={tasks.documents} total={tasks.total} />
      </div>
    </section>
  )
}

// * TASK LIST

interface TaskListProps {
  data: Task[]
  total: number
}

export const TaskList = ({ data, total }: TaskListProps) => {
  const { workspaceId } = useGetParamId()
  const statusColors = {
    IN_PROGRESS: "bg-orange-600/20 text-orange-600",
    DONE: "bg-green-600/20 text-green-600",
    IN_REVIEW: "bg-indigo-600/20 text-indigo-600",
    BACKLOG: "bg-red-600/20 text-red-600",
    TODO: "bg-yellow-600/20 text-yellow-600",
  }
  const { open: openCreateTaskModal } = useCreateTasktModal()
  return (
    <>
      <CreateTaskModal />
      <Card className="border-0 shadow-none p-3 min-h-[100px] font-poppins_normal divide-y divide-dashed">
        <div className="flex items-center pb-1">
          <div className="flex items-center gap-1 flex-1">
            <Badge
              variant={"secondary"}
              className="size-9 rounded-lg p-0 grid place-items-center text-primary"
            >
              {total}
            </Badge>
            <h1 className="truncate flex-1">Tasks</h1>
          </div>

          <Button
            type="button"
            onClick={openCreateTaskModal}
            className="size-9 p-2 hover:bg-primary text-primary hover:text-white"
            variant={"outline"}
          >
            <Plus />
          </Button>
        </div>
        <ul className="flex flex-col pt-1">
          {data.map((task) => {
            return (
              <li key={task?.$id} className="py-1">
                <Link
                  className="p-2 rounded-lg hover:bg-muted text-sm block"
                  href={`/workspaces/${task?.workspaceId}/task/${task?.$id}`}
                >
                  <div className="flex-1">
                    <h1>{task?.name}</h1>
                    <div className="flex items-center gap-2 pt-2">
                      <Avatar className="size-5" title={task?.project?.name} />
                      <p>{task?.project?.name}</p>

                      <p className="text-xs text-muted-foreground flex-1 text-end flex gap-2 justify-end items-center">
                        <Calendar size={12} className="text-muted-foreground" />{" "}
                        {format(task?.dueDate as string, "PPP")}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
          <li className="bg-muted p-2 rounded text-sm hidden first-of-type:block mb-2">
            <h1 className="text-center">No Tasks found</h1>
          </li>
          {data && (
            <li>
              <Button
                className="block w-full text-center"
                variant={"secondary"}
                asChild
              >
                <Link href={`/workspaces/${workspaceId}/tasks`}>Show all</Link>
              </Button>
            </li>
          )}
        </ul>
      </Card>
    </>
  )
}

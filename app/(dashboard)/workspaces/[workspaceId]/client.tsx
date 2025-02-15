"use client"
import Analytics from "@/components/Analytics"
import { Task } from "@/components/Task/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useGetParamId } from "@/hooks/use-getParamId"
import Avatar from "@/Utility/Ui/Avatar"
import ErrorComponent from "@/Utility/Ui/Error-component"
import { Loader } from "@/Utility/Ui/Loader"
import { Calendar, LinkIcon, Plus, Send, Settings } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import { useGetMembers } from "@/components/members/api/use-get-members"
import { useGetTasks } from "@/components/Task/api/use-get-tasks"
import { useGetWorkspaceAnalytics } from "@/components/workspaces/api/use-get-workspace-analytics"
import { useGetProjects } from "@/components/workspaces/Projects/api/use-get-projects"

import { CreateTaskModal } from "@/components/Task/components/Modal/Create-task-modal"
import { useCreateTasktModal } from "@/hooks/use-create-task"
import { useCreateProjectModal } from "@/hooks/use-createProject-modal"
import { Projects } from "@/components/workspaces/Projects/type"
import { Member } from "@/models/RoleTypes"
import LineChart from "@/Utility/charts/Line-chart"
import { useGetWorkspaces } from "@/components/workspaces/api/use-get-workspaces"
import { Workspace } from "@/components/workspaces/types"
import { toast } from "@/hooks/use-toast"
import { useSendEmailModal } from "@/hooks/use-send-email"
import SendEmailModal from "@/components/workspaces/components/modals/Send-email-modal"
import { InvertedCard } from "@/Utility/Ui/Inverted-card"

export const WorkspaceIdClient = () => {
  const { workspaceId } = useGetParamId()

  //   *  DATAS
  const { data: workspaces, isLoading: isWorkspacesLoading } =
    useGetWorkspaces()
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
  const isLoading =
    isAnalyticsLoading ||
    isProjectLoading ||
    isTasksLoading ||
    isMembersLoading ||
    isWorkspacesLoading

  if (isLoading) {
    return <Loader />
  }

  if (!workspaces || !workspaceAnalytics || !projects || !members || !tasks) {
    return <ErrorComponent />
  }

  return (
    <section className="p-2 size-full flex flex-col">
      <Analytics data={workspaceAnalytics} />

      <div className="grid lg:grid-cols-2 gap-2 flex-1">
        <InvertedCard />
        <TaskList data={tasks.documents} total={tasks.total} />
        <LineChart data={{ data: workspaceAnalytics }} />
        <WorkspaceList data={workspaces?.documents} total={workspaces.total} />
        <ProjectsList data={projects.documents} total={projects.total} />
        <MembersList
          workspaceId={workspaceId}
          data={members.document}
          total={members.total}
        />
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
  const { open: openCreateTaskModal } = useCreateTasktModal()
  const date = new Date()

  const currentDay = date.getDate()

  const getFormatedDate = (value: string, formatString: string) => {
    const formated = format(value, formatString)
    return formated
  }
  return (
    <>
      <CreateTaskModal />
      <Card className="border-0 dark:bg-[#101010] shadow-none p-3 max-h-svh overflow-y-auto font-poppins_normal divide-y divide-dashed flex flex-col gap-2">
        <div className="flex items-center pb-1">
          <h1 className="truncate flex-1 pl-1">Recent Tasks</h1>

          <Button
            title="Create task"
            type="button"
            variant={"outline"}
            onClick={openCreateTaskModal}
            className="size-8 p-2"
          >
            <Plus />
          </Button>
        </div>
        <ul className="flex flex-col gap-2 flex-1">
          {data.slice(0, 4).map((task) => {
            return (
              <li key={task?.$id} className="py-1">
                <Link
                  className="p-2 rounded-lg hover:bg-muted text-sm block"
                  href={`/workspaces/${task?.workspaceId}/tasks/${task?.$id}`}
                >
                  <div className="flex-1">
                    <h1>{task?.name}</h1>
                    <div className="flex items-center gap-2 pt-2">
                      <Avatar
                        imageUrl={task.project.imageUrl}
                        title={task?.project?.name}
                      />
                      <p>{task?.project?.name}</p>

                      <p className="text-xs text-muted-foreground truncate flex-1 text-end flex gap-2 justify-end items-center">
                        <Calendar size={12} className="text-muted-foreground" />{" "}
                        {format(task?.dueDate as string, "PPP")}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
          <li className="bg-inherit place-items-center p-2 rounded text-sm hidden first-of-type:grid h-full">
            <h1 className="text-center capitalize">No Recent tasks found</h1>
          </li>
          {data && (
            <li className="flex-1 h-full place-content-end sticky bottom-0">
              <Button
                className="block w-full text-center"
                variant={"secondary"}
                asChild
              >
                <Link href={`/workspaces/${workspaceId}/tasks`}>
                  Show all tasks <span className="text-primary">{total}</span>
                </Link>
              </Button>
            </li>
          )}
        </ul>
      </Card>
    </>
  )
}

interface WorkspaceListprop {
  data: Workspace[]
  total: number
}

// * WORKSPACE LIST
export const WorkspaceList = ({ data, total }: WorkspaceListprop) => {
  const { open } = useSendEmailModal()
  const handleCopyLink = (fullLink: string) => {
    navigator.clipboard
      .writeText(fullLink)
      .then(() =>
        toast({
          title: "Invite-link",
          description: "Workspace Invite-link copied to clipbord!!",
          variant: "success",
        })
      )
      .catch(() =>
        toast({ variant: "destructive", description: "Failed to copy link." })
      )
  }

  return (
    <>
      <SendEmailModal />
      <Card className="border-0 dark:bg-[#101010] shadow-none p-3 size-full font-poppins_normal divide-y divide-dashed">
        <div className="flex items-center pb-1">
          <div className="flex items-center gap-1 flex-1">
            <Badge
              variant={"secondary"}
              className="size-8 rounded-md p-0 grid place-items-center text-primary"
            >
              {total}
            </Badge>
            <h1 className="truncate flex-1 pl-1">Workspaces</h1>
          </div>
        </div>
        <ul className="flex flex-col pt-1">
          {data.map((workspace) => {
            const fullInviteLink =
              typeof window !== "undefined"
                ? `${window.location.origin}/workspaces/${workspace.$id}/join/${workspace.inviteCode}`
                : ""
            return (
              <li
                key={workspace?.$id}
                className="p-2 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Avatar
                      imageUrl={workspace.imageUrl}
                      title={workspace?.name}
                    />
                    <p className="text-sm">{workspace?.name}</p>
                  </div>
                  <p className="text-muted-foreground text-xs p-1 truncate">
                    {format(workspace.$createdAt, "PPP")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => open({ inviteLink: fullInviteLink })}
                    title="Send join link"
                    className="size-9 rounded-full p-2 hover:bg-primary"
                    variant={"outline"}
                  >
                    <Send />
                  </Button>
                  <Button
                    onClick={() => handleCopyLink(fullInviteLink)}
                    title="Copy join link"
                    className="size-9 rounded-full p-2 hover:bg-primary"
                    variant={"outline"}
                  >
                    <LinkIcon />
                  </Button>
                </div>
              </li>
            )
          })}
          <li className="bg-muted p-2 rounded text-sm hidden first-of-type:block mb-2">
            <h1 className="text-center">No Workspaces found</h1>
          </li>
        </ul>
      </Card>
    </>
  )
}

// * PROJECT LIST
interface ProjectListProps {
  data: Projects[]
  total: number
}
export const ProjectsList = ({ data, total }: ProjectListProps) => {
  const { open: openCreateProjectModal } = useCreateProjectModal()
  return (
    <>
      <Card className="border-0 dark:bg-[#101010] shadow-none p-3 size-full font-poppins_normal divide-y divide-dashed">
        <div className="flex items-center pb-1">
          <div className="flex items-center gap-1 flex-1">
            <Badge
              variant={"secondary"}
              className="size-8 rounded-md p-0 grid place-items-center text-primary"
            >
              {total}
            </Badge>
            <h1 className="truncate flex-1 pl-1">Projects</h1>
          </div>

          <Button
            title="Create project"
            type="button"
            variant={"outline"}
            onClick={openCreateProjectModal}
            className="size-8 p-2"
          >
            <Plus />
          </Button>
        </div>
        <ul className="flex flex-col pt-1">
          {data.map((project) => {
            return (
              <li key={project?.$id} className="py-1">
                <Link
                  className="p-2 rounded-lg hover:bg-muted text-sm flex items-center justify-between"
                  href={`/workspaces/${project?.workspaceId}/project/${project?.$id}`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar imageUrl={project.imageUrl} title={project?.name} />
                    <p>{project?.name}</p>
                  </div>

                  <p className="text-muted-foreground text-xs truncate">
                    {format(project.$createdAt, "PPP")}
                  </p>
                </Link>
              </li>
            )
          })}
          <li className="bg-muted p-2 rounded text-sm hidden first-of-type:block mb-2">
            <h1 className="text-center">No Project found</h1>
          </li>
        </ul>
      </Card>
    </>
  )
}

// * MEMEBERS LIST
interface MemberListProps {
  data: Member[]
  total: number
  workspaceId: string
}
export const MembersList = ({ data, total, workspaceId }: MemberListProps) => {
  return (
    <>
      <Card className="border-0 dark:bg-[#101010] shadow-none p-3 size-full font-poppins_normal divide-y divide-dashed">
        <div className="flex items-center pb-1">
          <div className="flex items-center gap-1 flex-1">
            <Badge
              variant={"secondary"}
              className="size-8 rounded-md p-0 grid place-items-center text-primary"
            >
              {total}
            </Badge>
            <h1 className="truncate flex-1 pl-1">Members</h1>
          </div>
          <Button
            title="Create task"
            type="button"
            variant={"outline"}
            className="size-8 p-2"
            asChild
          >
            <Link
              href={`/workspaces/${workspaceId}/members`}
              className="text-muted-foreground"
            >
              <Settings />
            </Link>
          </Button>
        </div>
        <ul className="grid md:grid-cols-2 lg:grid-cols-2 gap-2 pt-1">
          {data.map((member) => {
            return (
              <li
                key={member?.$id}
                className="p-1 min-h-[100px] border border-dashed grid place-items-center hover:bg-muted transition-colors duration-150 rounded-lg"
              >
                <Avatar className="size-8" title={member.name} />
                <p className="text-sm">{member.name}</p>
                <p className="text-muted-foreground p-2 text-xs truncate">
                  {member?.email}
                </p>
              </li>
            )
          })}
          <li className="bg-muted p-2 rounded text-sm hidden first-of-type:block mb-2">
            <h1 className="text-center">No Members found</h1>
          </li>
        </ul>
      </Card>
    </>
  )
}

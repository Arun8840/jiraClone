import { useGetMembers } from "@/components/members/api/use-get-members"
import { useGetProjects } from "@/components/workspaces/Projects/api/use-get-projects"
import { useGetParamId } from "@/hooks/use-getParamId"
import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TaskStatus } from "@/components/Task/types"
import { useFilterTask } from "@/hooks/use-filter-task"
import { CalendarIcon, FolderIcon, ListCheck, UserRound } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

interface PropTypes extends HTMLAttributes<HTMLDivElement> {
  hideAssigneeFilter?: boolean
}
export const FilterDataTask: React.FC<PropTypes> = ({
  className,
  hideAssigneeFilter,
}) => {
  const { workspaceId } = useGetParamId()
  const baseClass = "text-sm flex items-center gap-2 flex-1"

  // get project
  const { data: projects, isPending: isProjectPending } = useGetProjects({
    workspaceId,
  })
  // get member
  const { data: members, isPending: isMembersPending } = useGetMembers({
    workspaceId,
  })

  const isLoading = isProjectPending || isMembersPending

  const [{ status, assigneeId, duDate, projectId, search }, setFilter] =
    useFilterTask()

  const onStatusChange = (value: string) => {
    setFilter({ status: value === "all" ? null : (value as TaskStatus) })
  }

  const onAssigneeChange = (value: string) => {
    setFilter({ assigneeId: value === "all" ? null : (value as string) })
  }

  const onProjectChange = (value: string) => {
    setFilter({ projectId: value === "all" ? null : (value as string) })
  }

  const memberOption = members?.document?.map((values) => {
    return {
      label: values?.name,
      value: values?.$id,
    }
  })

  const projectOption = projects?.documents?.map((values) => {
    return {
      label: values?.name,
      value: values?.$id,
    }
  })

  if (isLoading) {
    return null
  }
  return (
    <div className={cn(baseClass, className)}>
      {/* //* BY STATUS */}
      <Select
        onValueChange={(value) => onStatusChange(value)}
        defaultValue={status ?? undefined}
      >
        <SelectTrigger className="w-max ring-0!  h-9">
          <div className="flex items-center gap-1">
            <ListCheck className="text-primary" size={14} />
            <SelectValue placeholder="Status" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In-progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In-reviewe</SelectItem>
          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
          <SelectItem value={"all"}>All status</SelectItem>
        </SelectContent>
      </Select>

      {/* //* BY ASSIGNEE */}
      {!hideAssigneeFilter && (
        <Select
          onValueChange={(value) => onAssigneeChange(value)}
          defaultValue={assigneeId ?? "all"}
        >
          <SelectTrigger className="w-fit ring-0!  h-9">
            <div className="flex items-center gap-1">
              <UserRound className="text-primary" size={14} />
              <SelectValue placeholder="All assignee" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {memberOption?.map((member) => {
              return (
                <SelectItem key={member?.value} value={member.value}>
                  {member.label}
                </SelectItem>
              )
            })}

            <SelectItem value={"all"}>All assignees</SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* //* BY PROJECT */}
      <Select
        onValueChange={(value) => onProjectChange(value)}
        defaultValue={projectId ?? "all"}
      >
        <SelectTrigger className="w-fit ring-0!  h-9">
          <div className="flex items-center gap-1">
            <FolderIcon className="text-primary" size={14} />
            <SelectValue placeholder="Project" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {projectOption?.map((project) => {
            return (
              <SelectItem key={project?.value} value={project.value}>
                {project.label}
              </SelectItem>
            )
          })}

          <SelectItem value={"all"}>All projects</SelectItem>
        </SelectContent>
      </Select>

      {/* //* BY DATE */}

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={"outline"}
              className={cn(
                "flex  h-9 w-full text-left dark:text-white dark:bg-inherit font-normal"
              )}
            >
              {duDate ? format(duDate, "PPP") : <span>Filter by date</span>}
              <CalendarIcon className="ml-auto opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              selected={duDate ? new Date(duDate) : undefined}
              mode="single"
              onSelect={(date) => {
                setFilter({
                  duDate: date ? date.toISOString() : null,
                })
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

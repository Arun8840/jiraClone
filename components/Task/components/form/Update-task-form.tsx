"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useGetParamId } from "@/hooks/use-getParamId"
import { useGetProjects } from "@/components/workspaces/Projects/api/use-get-projects"
import { useGetMembers } from "@/components/members/api/use-get-members"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { PriorityStatus, Task, TaskStatus } from "../../types"
import { useUpdateTask } from "../../api/use-update-task"
import { Loader } from "@/Utility/Ui/Loader"
import { UpdateTaskSchema } from "../../Schemas"

interface FormPropTypes {
  onCancel: () => void
  initialValue: Task
}
type UpdateTaskFormType = z.infer<typeof UpdateTaskSchema>
function UpdateTaskForm({ onCancel, initialValue }: FormPropTypes) {
  const { workspaceId } = useGetParamId()

  const { data: Projects, isPending: IsProjectLoading } = useGetProjects({
    workspaceId,
  })
  const { data: Members, isPending: IsMembersLoading } = useGetMembers({
    workspaceId,
  })

  // *status
  const status = [
    {
      label: "Backlog",
      value: TaskStatus.BACKLOG,
    },
    {
      label: "In-progress",
      value: TaskStatus.IN_PROGRESS,
    },
    {
      label: "In-review",
      value: TaskStatus.IN_REVIEW,
    },
    {
      label: "Todo",
      value: TaskStatus.TODO,
    },
    {
      label: "Done",
      value: TaskStatus.DONE,
    },
  ]
  const priorityStatus = [
    {
      label: "Low",
      value: PriorityStatus.LOW,
    },
    {
      label: "Medium",
      value: PriorityStatus.MEDIUM,
    },
    {
      label: "High",
      value: PriorityStatus.HIGH,
    },
  ]

  //   * create task hook
  const { mutate, isPending: isTaskUpdating } = useUpdateTask()
  const form = useForm<UpdateTaskFormType>({
    defaultValues: {
      ...initialValue,
      status: initialValue?.status as TaskStatus,
      priority: initialValue?.priority as PriorityStatus,
      dueDate: initialValue?.dueDate
        ? new Date(initialValue.dueDate)
        : undefined,
      workspaceId: initialValue.workspaceId,
    },
    resolver: zodResolver(UpdateTaskSchema),
  })

  const handleUpdateTask = (data: z.infer<typeof UpdateTaskSchema>) => {
    const updated = {
      taskId: initialValue?.$id as string,
      ...data,
    }
    mutate(
      { json: updated, param: { taskId: initialValue.$id } },
      {
        onSuccess() {
          form.reset()
          onCancel()
        },
      }
    )
  }

  const projectOptions = Projects?.documents?.map((projectValues) => {
    return {
      id: projectValues?.$id,
      name: projectValues?.name,
      imageUrl: projectValues?.imageurl,
    }
  })

  const membersOptions = Members?.document?.map((membersValues) => {
    return {
      id: membersValues?.$id,
      name: membersValues?.name,
    }
  })

  const isLoading = IsProjectLoading || IsMembersLoading

  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateTask)}
          className="flex flex-col justify-between h-full gap-2"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project ID</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectOptions?.length &&
                          projectOptions?.map((project) => {
                            return (
                              <SelectItem value={project?.id} key={project?.id}>
                                {project?.name}
                              </SelectItem>
                            )
                          })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {membersOptions?.length &&
                          membersOptions?.map((member) => {
                            return (
                              <SelectItem value={member?.id} key={member?.id}>
                                {member?.name}
                              </SelectItem>
                            )
                          })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {status?.map((statusValue) => {
                          return (
                            <SelectItem
                              key={statusValue.value}
                              value={statusValue.value}
                            >
                              {statusValue.label}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityStatus?.map((priorityValue) => {
                          return (
                            <SelectItem
                              key={priorityValue.value}
                              value={priorityValue.value}
                            >
                              {priorityValue.label}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "flex  w-full text-left dark:text-white dark:bg-inherit font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isTaskUpdating} type="submit" className="w-full">
            <div>{isTaskUpdating ? <Loader /> : <Plus size={18} />}</div>
            Update
          </Button>
        </form>
      </Form>
    </>
  )
}

export default UpdateTaskForm

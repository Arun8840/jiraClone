"use client"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateTaskSchema } from "../../Schemas"
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
import { CalendarIcon, Loader, Plus } from "lucide-react"
import { useCreateTask } from "../../api/use-create-task"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { TaskStatus } from "../../types"

interface FormPropTypes {
  onCancel: () => void
}
type CreateTaskForm = z.infer<typeof CreateTaskSchema>
function CreateTaskForm({ onCancel }: FormPropTypes) {
  const { workspaceId } = useGetParamId()
  const { data: Projects, isPending: IsProjectLoading } = useGetProjects({
    workspaceId,
  })
  const { data: Members, isPending: IsMembersLoading } = useGetMembers({
    workspaceId,
  })

  //   * create task hook
  const { mutate, isPending: isTaskCreating } = useCreateTask()
  const form = useForm<CreateTaskForm>({
    defaultValues: {
      name: "",
      workspaceId: "",
      projectId: "",
      assigneeId: "",
      dueDate: new Date(),
      description: "",
      status: undefined,
    },
    resolver: zodResolver(CreateTaskSchema.omit({ workspaceId: true })),
  })

  const handleCreateTask = (data: z.infer<typeof CreateTaskSchema>) => {
    mutate(
      { json: { ...data, workspaceId } },
      {
        onSuccess(data) {
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

  return (
    <>
      {isLoading ? (
        <div className="size-full grid place-items-center">
          <Loader
            className="animate-spin origin-center text-muted-foreground"
            size={18}
          />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTask)}
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
                                <SelectItem
                                  value={project?.id}
                                  key={project?.id}
                                >
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
                          <SelectItem value={TaskStatus?.BACKLOG}>
                            Backlog
                          </SelectItem>
                          <SelectItem value={TaskStatus?.IN_PROGRESS}>
                            In-Progress
                          </SelectItem>
                          <SelectItem value={TaskStatus?.IN_REVIEW}>
                            In-Review
                          </SelectItem>
                          <SelectItem value={TaskStatus?.DONE}>
                            Completed
                          </SelectItem>
                          <SelectItem value={TaskStatus?.TODO}>Todo</SelectItem>
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
                    <FormLabel>Priority Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field?.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={TaskStatus?.BACKLOG}>
                            Low
                          </SelectItem>
                          <SelectItem value={TaskStatus?.IN_PROGRESS}>
                            Medium
                          </SelectItem>
                          <SelectItem value={TaskStatus?.IN_REVIEW}>
                            High
                          </SelectItem>
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
                                "flex  w-full text-left font-normal",
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
            <Button disabled={isTaskCreating} type="submit" className="w-full">
              {isTaskCreating ? (
                <Loader className="animate-spin origin-center" size={18} />
              ) : (
                <Plus size={18} />
              )}
              Create
            </Button>
          </form>
        </Form>
      )}
    </>
  )
}

export default CreateTaskForm

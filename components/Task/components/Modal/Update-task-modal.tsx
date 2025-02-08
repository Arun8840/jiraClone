import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useUpdateTasktModal } from "@/hooks/use-update-task"
import UpdateTaskForm from "../form/Update-task-form"
import { useGetTask } from "../../api/use-get-task"
import { Task } from "../../types"
import { Loader } from "@/Utility/Ui/Loader"

export const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTasktModal()

  const { data: initialValue, isPending: IsTaskLoading } = useGetTask({
    taskId: taskId as string,
  })

  return (
    <>
      <Sheet open={!!taskId} onOpenChange={close}>
        <SheetContent className="flex flex-col overflow-y-auto  border-l-0">
          <SheetHeader>
            <SheetTitle className="dark:text-white">Update Task</SheetTitle>
            <SheetDescription>
              Enter the task details below Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          {IsTaskLoading ? (
            <Loader />
          ) : (
            <UpdateTaskForm
              initialValue={initialValue as Task}
              onCancel={close}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

import React from "react"
import { Task } from "../../types"
import Dragable from "@/Utility/Ui/Dragable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Info, MoreVertical, Pen, Trash } from "lucide-react"
import { useConfirm } from "@/hooks/use-confirm"
import { useDeleteTask } from "../../api/use-delete-task"
import { useDetailModal } from "@/hooks/use-detail-modal"

interface KanbanDataProps {
  data: Task[]
}
function KanbanRowData({ data }: KanbanDataProps) {
  const { mutate, isPending: isTaskRemoving } = useDeleteTask()
  const { open } = useDetailModal()
  const [DeleteModal, confirmDelete] = useConfirm(
    "Confirmation",
    "Are you sure want to delete this task ?",
    "destructive"
  )
  const handleRemoveTask = async (taskValue: Task) => {
    const confirm = await confirmDelete()
    if (confirm) {
      mutate({
        param: { taskId: taskValue?.$id },
      })
    }
  }
  return (
    <>
      <DeleteModal />
      <ul className="grid gap-1 pt-1 text-sm font-poppins_normal">
        {data?.length > 0 &&
          data?.map((taskValues) => {
            return (
              <li key={taskValues?.$id}>
                <Dragable data={taskValues} dragId={taskValues?.$id}>
                  <p title={taskValues?.name} className="line-clamp-1 flex-1">
                    {taskValues?.name}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"ghost"} className="size-fit p-2">
                        <MoreVertical size={18} className="text-neutral-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="space-y-1">
                      <DropdownMenuItem onClick={open}>
                        <Info />
                        Task Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pen />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRemoveTask(taskValues)}
                        className="bg-destructive/10 text-destructive"
                      >
                        <Trash /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Dragable>
              </li>
            )
          })}
      </ul>
    </>
  )
}

export default KanbanRowData

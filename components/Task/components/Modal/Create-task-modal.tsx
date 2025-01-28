import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCreateTasktModal } from "@/hooks/use-create-task"
import CreateTaskForm from "../form/Create-task-form"

export const CreateTaskModal = () => {
  const { close, isOpen, setIsOpen } = useCreateTasktModal()
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col overflow-y-auto dark:bg-stone-950 border-l-0 dark:text-white">
          <SheetHeader>
            <SheetTitle className="dark:text-white">Create Task</SheetTitle>
            <SheetDescription>
              Enter the task details below Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          <CreateTaskForm onCancel={close} />
        </SheetContent>
      </Sheet>
    </>
  )
}

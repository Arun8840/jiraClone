import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCreateProjectModal } from "@/hooks/use-createProject-modal"
import CreateProjectForm from "../Create-project-form"

export const CreateProjectModal = () => {
  const { close, isOpen, setIsOpen } = useCreateProjectModal()
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col dark:bg-neutral-900 dark:text-white border-l-0">
          <SheetHeader>
            <SheetTitle className="dark:text-white">Create Project</SheetTitle>
            <SheetDescription>
              Enter the project details below Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          <CreateProjectForm onCancel={close} />
        </SheetContent>
      </Sheet>
    </>
  )
}

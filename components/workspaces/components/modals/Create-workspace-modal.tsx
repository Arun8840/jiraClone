import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCreateWorkspaceModal } from "@/hooks/use-createWorkspace-modal"
import CreateWorkspaceForm from "../forms/create-workspace-form"

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen } = useCreateWorkspaceModal()
  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col dark:bg-neutral-900  dark:text-white border-l-0">
          <SheetHeader>
            <SheetTitle className="dark:text-white">
              Create Workspace
            </SheetTitle>
            <SheetDescription>
              Enter the workspace details below Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>

          <CreateWorkspaceForm />
        </SheetContent>
      </Sheet>
    </>
  )
}

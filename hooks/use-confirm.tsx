import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button, ButtonProps } from "@/components/ui/button"
import { JSX, useState } from "react"

export const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "default"
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  const [isOpen, setIsOpen] = useState(false) // Add a state to control dialog visibility

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
      setIsOpen(true) // Open the dialog
    })
  }

  const handleClose = () => {
    setPromise(null)
    setIsOpen(false) // Close the dialog
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild onClick={handleConfirm}>
              <Button>Continute</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return [ConfirmationDialog, confirm]
}

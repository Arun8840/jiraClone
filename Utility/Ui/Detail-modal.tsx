import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDetailModal } from "@/hooks/use-detail-modal"
import React from "react"

interface DialogProps {
  title: string
  description: string
  chiledren?: React.ReactNode
}
function DetailModal({ chiledren, description, title }: DialogProps) {
  const { isOpen, close } = useDetailModal()
  return (
    <>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title || "title"}</DialogTitle>
            <DialogDescription>
              {description || "description"}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DetailModal

import { parseAsBoolean, useQueryState } from "nuqs"

export const useUpdateProjectModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "update-project",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  )

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  }
}

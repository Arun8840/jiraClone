import { parseAsBoolean, useQueryState } from "nuqs"

export const useDetailModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "detail",
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

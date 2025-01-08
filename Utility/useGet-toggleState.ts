import { useState } from "react"

interface DefaultProps {
  value?: boolean
}
export const useGetToggleState = (arg?: DefaultProps) => {
  const [state, setState] = useState(arg?.value)

  const onOpen = () => setState(true)
  const onClose = () => setState(false)
  return {
    onOpen,
    onClose,
    state,
  }
}

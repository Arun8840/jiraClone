import { parseAsString, useQueryState } from "nuqs"

export const useUpdateTasktModal = () => {
  const [taskId, setTaskId] = useQueryState("update-task", parseAsString)

  const open = (id: string) => setTaskId(id)
  const close = () => setTaskId(null)

  return {
    taskId,
    open,
    close,
    setTaskId,
  }
}

import { TaskStatus } from "@/components/Task/types"
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs"

export const useFilterTask = () => {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
    assigneeId: parseAsString,
    search: parseAsString,
    duDate: parseAsString,
  })
}

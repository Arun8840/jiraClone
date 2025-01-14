import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"
import { TaskStatus } from "../types"

interface UseGetTaskTypes {
  workspaceId: string
  projectId?: string
  status?: TaskStatus | null
  search?: string | null
  assigneeId?: string | null
  dueDate?: string | null
}
export const useGetTasks = ({
  workspaceId,
  assigneeId,
  dueDate,
  projectId,
  search,
  status,
}: UseGetTaskTypes) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      assigneeId,
      status,
      search,
      dueDate,
    ],
    queryFn: async ({}) => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          assigneeId: assigneeId ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      })

      if (!response?.ok) {
        throw new Error("Failed to load tasks")
      }

      const { data } = await response?.json()
      return data
    },
  })

  return query
}

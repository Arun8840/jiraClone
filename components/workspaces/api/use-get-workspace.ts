import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"

interface GetWorkspaceProps {
  workspaceId: string
}
export const useGetWorkspace = ({ workspaceId }: GetWorkspaceProps) => {
  const query = useQuery({
    queryKey: ["workspaces", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"].$get({
        param: { workspaceId },
      })

      if (!response?.ok) {
        return new Error("Failed to load workspace")
      }

      const { data } = await response?.json()
      return data
    },
  })

  return query
}

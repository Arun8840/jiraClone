import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"
import { InferResponseType } from "hono"

interface UserGetWorkspaceAnalyticsTypes {
  workspaceId: string
}

export type ResponseAnalyticsTypes = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["analytics"]["$get"],
  200
>
export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: UserGetWorkspaceAnalyticsTypes) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspaces[":workspaceId"][
        "analytics"
      ].$get({
        param: { workspaceId },
      })
      if (!response?.ok) {
        throw new Error("Failed to load project analytics")
      }

      const { data } = await response?.json()
      return data
    },
  })

  return query
}

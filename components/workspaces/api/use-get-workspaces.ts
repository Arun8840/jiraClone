import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await client.api.workspaces.workspaces.$get()

      if (!response?.ok) {
        return null
      }

      const { data } = await response?.json()

      return data
    },
  })

  return query
}
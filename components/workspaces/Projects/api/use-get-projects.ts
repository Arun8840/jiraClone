import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"

interface UserGetProjectTypes {
  workspaceId: string
}
export const useGetProjects = ({ workspaceId }: UserGetProjectTypes) => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: { workspaceId },
      })

      if (!response?.ok) {
        throw new Error("Failed to load projects")
      }

      const { data } = await response?.json()
      return data
    },
  })

  return query
}

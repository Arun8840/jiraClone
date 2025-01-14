import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param,
      })
      if (!response?.ok) {
        throw new Error("Delete project failed")
      }
      return await response.json()
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast({
        variant: "success",
        description: message,
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: error?.message,
      })
    },
  })

  return mutation
}

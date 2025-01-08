import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["$patch"]
>

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":workspaceId"]["$patch"]({
        form,
        param,
      })
      if (!response?.ok) {
        throw new Error("Update workspace failed")
      }
      return await response.json()
    },
    onSuccess: ({ data, message }) => {
      toast({
        variant: "success",
        description: message,
      })
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] })
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

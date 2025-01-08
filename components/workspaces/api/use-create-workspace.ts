import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces["$post"]({ form })
      if (!response?.ok) {
        throw new Error("Creating workspace failed")
      }
      return await response.json()
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      toast({
        variant: "success",
        description: res?.message,
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

import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>

export const useJoinInviteLinkMember = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[":workspaceId"]["join"][
        "$post"
      ]({
        param,
        json,
      })
      if (!response?.ok) {
        throw new Error("Join invitelink failed")
      }
      return await response.json()
    },
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] })
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

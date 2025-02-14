import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":workspaceId"]["send-inviteLink"]["$post"],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.workspaces)[":workspaceId"]["send-inviteLink"]["$post"]
>

export const useSendWorkspaceInviteLink = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspaces[":workspaceId"][
        "send-inviteLink"
      ]["$post"]({ form, param })
      if (!response?.ok) {
        throw new Error("Sending workspace invite-link failed")
      }
      return await response.json()
    },
    onSuccess: (res) => {
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

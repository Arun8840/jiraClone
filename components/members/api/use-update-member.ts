import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>

export const useUpdateMember = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({
        param,
        json,
      })
      if (!response?.ok) {
        throw new Error("Update member failed")
      }
      return await response.json()
    },
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["members"] })
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

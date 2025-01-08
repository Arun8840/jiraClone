import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>
type RequestType = InferRequestType<(typeof client.api.projects)["$post"]>

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects["$post"]({ form })
      if (!response?.ok) {
        throw new Error("Creating project failed")
      }
      return await response.json()
    },
    onSuccess: ({ message }) => {
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

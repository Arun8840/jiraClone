import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$patch"],
  200
>
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$patch"]
>

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[":projectId"]["$patch"]({
        form,
        param,
      })
      if (!response?.ok) {
        throw new Error("Update project failed")
      }
      return await response.json()
    },
    onSuccess: ({ data, message }) => {
      toast({
        variant: "success",
        description: message,
      })
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["projects", data.$id] })
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

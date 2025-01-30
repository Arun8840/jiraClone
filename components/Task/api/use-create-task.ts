import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

type ResponseType = InferResponseType<(typeof client.api.tasks)["$post"]>
type RequestType = InferRequestType<(typeof client.api.tasks)["$post"]>

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["$post"]({ json })
      if (!response?.ok) {
        throw new Error("Creating workspace failed")
      }
      return await response.json()
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] })

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

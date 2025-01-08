import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json })
      if (!response?.ok) {
        throw new Error("Something went wrong !! ")
      }
      return await response.json()
    },
    onSuccess: (json) => {
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] })
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
      toast({
        variant: "success",
        title: json?.message,
      })
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: error.message || "An error occurred.",
      })
    },
  })

  return mutation
}

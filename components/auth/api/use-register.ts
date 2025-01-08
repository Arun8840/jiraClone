import { toast } from "@/hooks/use-toast"
import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>

export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json })
      if (!response?.ok) {
        throw new Error("Register went wrong !! ")
      }
      return await response.json()
    },
    onSuccess: (res) => {
      router.refresh()
      toast({
        variant: "success",
        description: res?.message,
      })
      queryClient.invalidateQueries({ queryKey: ["current"] })
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        description: err?.message,
      })
    },
  })

  return mutation
}

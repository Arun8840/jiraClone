"use client"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"
import React from "react"
import { useJoinInviteLinkMember } from "../api/use-join-invitelink-member"
import { useRouter } from "next/navigation"
import { Loader } from "@/Utility/Ui/Loader"
import { useGetParamId } from "@/hooks/use-getParamId"
import { Card } from "@/components/ui/card"

function CreateWorkspaceInviteLinkForm() {
  const { inviteCode, workspaceId } = useGetParamId()
  const { mutate, isPending } = useJoinInviteLinkMember()
  const router = useRouter()
  const handleJoin = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data?.$id}`)
        },
      }
    )
  }

  return (
    <Card className="flex flex-col w-1/2 p-3 border-none shadow-none gap-3 font-poppins_normal">
      <h1 className="text-lg font-medium p-2">Join workspace</h1>
      <p className="text-neutral-500 px-2">
        You&apos;ve been invited to join workspace
      </p>
      <div className="flex gap-2 pt-3 items-center">
        <Button
          onClick={() => router.back()}
          type="button"
          variant={"outline"}
          className="w-full"
        >
          Cancel
        </Button>
        <Button disabled={isPending} onClick={handleJoin} className="w-full">
          {isPending ? (
            <Loader className="animate-spin origin-center" />
          ) : (
            <Link />
          )}
          Join Workspace
        </Button>
      </div>
    </Card>
  )
}

export default CreateWorkspaceInviteLinkForm

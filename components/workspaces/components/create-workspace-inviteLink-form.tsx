"use client"
import { Button } from "@/components/ui/button"
import { Link, Loader } from "lucide-react"
import React from "react"
import { useJoinInviteLinkMember } from "../api/use-join-invitelink-member"
import { useRouter } from "next/navigation"

interface FormPropTypes {
  initialValue: {
    name: string
  }
  inviteCode: string
  workspaceId: string
}
function CreateWorkspaceInviteLinkForm({
  initialValue,
  inviteCode,
  workspaceId,
}: FormPropTypes) {
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
    <div className="flex flex-col gap-3">
      <h1 className="text-lg font-medium font-poppins_normal">
        Join workspace
      </h1>
      <p className="text-neutral-500">
        You&apos;ve been invited to join <strong>{initialValue?.name}</strong>
        workspace
      </p>
      <div className="flex gap-2 pt-3 items-center">
        <Button type="button" variant={"outline"} className="w-full">
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
    </div>
  )
}

export default CreateWorkspaceInviteLinkForm

"use client"
import { Button } from "@/components/ui/button"
import { Link, Loader, Merge } from "lucide-react"
import React from "react"
import { useJoinInviteLinkMember } from "../api/use-join-invitelink-member"
import { useRouter } from "next/navigation"
import { Workspace } from "../types"

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
    <div className="flex flex-col gap-3 font-poppins_normal">
      <div className="size-28 bg-neutral-200 dark:bg-muted dark:text-primary rounded-full grid place-items-center mx-auto">
        <Merge size={20} />
      </div>
      <h1 className="text-lg font-medium pt-2">Join workspace</h1>
      <p className="text-neutral-500">
        You&apos;ve been invited to join
        <strong className="text-primary px-2">{initialValue?.name}</strong>
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

"use client"
import React from "react"
import { Workspace } from "../types"
import Image from "next/image"
import { CopyIcon, Images, Link, Loader, Trash } from "lucide-react"
import { useDeleteWorkspace } from "../api/use-delete-workspace"
import { useConfirm } from "@/hooks/use-confirm"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { useResetInviteLink } from "../api/use-reset-invitelink"
import UpdateWorkspaceForm from "./update-workspace-form"

interface PropTypes {
  value: Workspace
}
function WorkspaceDetail({ value }: PropTypes) {
  const router = useRouter()
  const { mutate: deleteWorkspace, isPending: isworkspacePending } =
    useDeleteWorkspace()
  const { mutate: resetInviteLink, isPending: isInvitelinkPending } =
    useResetInviteLink()
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Are you absolutely sure you want to delete?",
    "This action cannot be undone",
    "destructive"
  )
  const [ResetInvitelinkDialog, confirmResetLink] = useConfirm(
    "Reset Invite-link",
    "This will invalidate the current",
    "default"
  )

  const handleDelete = async () => {
    const ok = await confirmDelete()
    if (!ok) return
    deleteWorkspace(
      { param: { workspaceId: value?.$id } },
      {
        onSuccess: () => {
          router.push("/")
        },
      }
    )
  }
  const handleResetLink = async () => {
    const ok = await confirmResetLink()
    if (!ok) return
    resetInviteLink(
      { param: { workspaceId: value?.$id } },
      {
        onSuccess: () => {
          toast({
            title: "Invite-link",
            description: "Workspace Invite-link reset successfully !!",
            variant: "success",
          })
          router.refresh()
        },
      }
    )
  }

  const fullInviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/workspaces/${value?.$id}/join/${value?.inviteCode}`
      : ""
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() =>
        toast({
          title: "Invite-link",
          description: "Workspace Invite-link copied to clipbord!!",
          variant: "success",
        })
      )
      .catch(() =>
        toast({ variant: "destructive", description: "Failed to copy link." })
      )
  }
  return (
    <div className="grid gap-5 mt-5">
      <DeleteDialog />
      <ResetInvitelinkDialog />
      <UpdateWorkspaceForm initialValue={value} />
      <div className="flex gap-2 bg-white  dark:bg-neutral-900 dark:text-white rounded-lg p-3">
        {value?.imageUrl ? (
          <Image
            src={value?.imageUrl}
            alt="logo"
            width={100}
            height={100}
            className="rounded-lg"
          />
        ) : (
          <div className="size-14 bg-neutral-50 dark:bg-primary grid place-items-center rounded-lg">
            <Images />
          </div>
        )}
        <div className="flex-1 ">
          <div className="flex  justify-between">
            <h1 className="text-lg font-medium tracking-wide">{value?.name}</h1>
            <span className="text-neutral-500">
              {value?.$createdAt?.split("T")[0]}
            </span>
          </div>
          <p className="text-neutral-500 text-sm pt-2 text-justify">
            {value.description}
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-900  dark:text-white rounded-lg p-3">
        <h1 className="font-medium pb-2">Invite members</h1>
        <p className="text-neutral-500 text-sm py-2">
          Use the invite-link to add members to your workspace
        </p>
        <div className="flex gap-2">
          <Input
            disabled
            value={fullInviteLink}
            className="dark:text-secondary dark:bg-inherit"
          />
          <Button onClick={handleCopyLink} variant={"outline"}>
            <CopyIcon className="dark:text-primary" />
          </Button>
        </div>
        <div className="flex justify-end pt-3">
          <Button onClick={handleResetLink}>
            {isInvitelinkPending ? (
              <Loader className="animate-spin origin-center" />
            ) : (
              <Link />
            )}
            Reset Invite-link
          </Button>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-900  dark:text-white rounded p-3">
        <h1 className="font-medium pb-2">Danger Zone</h1>
        <p className="text-neutral-500 text-sm">
          Deleting a workspace is irreversible and will remove all associated
          data.
        </p>
        <div className="flex justify-end">
          <Button onClick={handleDelete} variant={"destructive"}>
            {isworkspacePending ? (
              <Loader className="animate-spin origin-center" />
            ) : (
              <Trash />
            )}
            Delete Workspace
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceDetail

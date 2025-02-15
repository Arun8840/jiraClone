import React, { useRef } from "react"
import { Workspace } from "../types"
import Image from "next/image"
import {
  ArrowLeft,
  CopyIcon,
  ImagePlus,
  Link,
  Trash,
  Upload,
  X,
} from "lucide-react"
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { updateWorkSchema } from "../schema/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useUpdateWorkspace } from "../api/use-update-workspace"
import { useRouter } from "next/navigation"
import { useDeleteWorkspace } from "../api/use-delete-workspace"
import { useResetInviteLink } from "../api/use-reset-invitelink"
import { useConfirm } from "@/hooks/use-confirm"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/Utility/Ui/Loader"
import { Textarea } from "@/components/ui/textarea"

interface PropTypes {
  initialValue: Workspace
}
const WorkspaceSettings = ({ initialValue }: PropTypes) => {
  const uploadRef = useRef<HTMLInputElement>(null)
  const { mutate, isPending: isUpdating } = useUpdateWorkspace()
  const form = useForm<z.infer<typeof updateWorkSchema>>({
    resolver: zodResolver(updateWorkSchema),
    defaultValues: {
      ...initialValue,
      image: initialValue?.imageUrl ?? "",
    },
  })

  const router = useRouter()

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]

    if (file) {
      form.setValue("image", file)
    }
  }

  const handle_update = (data: z.infer<typeof updateWorkSchema>) => {
    const updatedValue = {
      ...data,
      image: data.image instanceof File ? data.image : "",
    }
    mutate(
      { form: updatedValue, param: { workspaceId: initialValue?.$id } },
      {
        onSuccess: () => {
          form?.reset()
        },
      }
    )
  }
  return (
    <div className="size-full grid auto-rows-max gap-2 font-poppins_normal">
      <div className=" bg-card p-3 rounded-lg">
        <div className="pb-2 flex items-center gap-2">
          <Button
            onClick={() => router.back()}
            size={"sm"}
            variant={"secondary"}
          >
            <ArrowLeft />
            Back
          </Button>
          <h1>Details</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handle_update)}>
            {/* //* IMAGE BANNER */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="grid place-items-center relative bg-muted h-[250px] rounded-lg overflow-hidden group/uploadImage">
                  {field?.value ? (
                    <Image
                      src={
                        field?.value instanceof File
                          ? URL.createObjectURL(field?.value)
                          : field?.value
                      }
                      width={500}
                      height={500}
                      objectFit="contain"
                      className="object-cover w-full h-[250px] rounded-lg "
                      alt="uploading image"
                    />
                  ) : (
                    <ImagePlus className="text-muted-foreground" size={30} />
                  )}
                  {/* file input */}
                  <Input
                    ref={uploadRef}
                    type="file"
                    className="hidden"
                    accept=".jpg, .svg, .jpeg, .png"
                    onChange={handleUploadImage}
                  />
                  <div className="size-full bg-black/50 absolute opacity-0 group-hover/uploadImage:opacity-1 transition-opacity duration-150 grid place-items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={() => uploadRef?.current?.click()}
                        variant={"outline"}
                        className="size-9 roundedfull"
                      >
                        <Upload />
                      </Button>
                      {field.value && (
                        <Button
                          onClick={() => {
                            field.onChange(null)
                            if (uploadRef.current) {
                              uploadRef.current.value = ""
                            }
                          }}
                          type="button"
                          variant={"outline"}
                          className="size-9 roundedfull"
                        >
                          <X />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-stone-500 tracking-wide text-sm pt-2 absolute bottom-0 right-0 p-2 rounded-br-md bg-white/90 rounded-tl-lg">
                    jpg&#44; jpeg&#44; svg&#44; png&#44; max 1MB
                  </p>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="p-2">
                  <FormLabel>Workspace name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="p-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end p-2">
              <Button disabled={isUpdating}>
                {isUpdating && <Loader />}Save changes
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <InviteLink
        inviteCode={initialValue.inviteCode}
        workspaceId={initialValue.$id}
      />
      <Dangerzone workspaceId={initialValue.$id} />
    </div>
  )
}

export default WorkspaceSettings

// Invite memeber

interface InviteLinkProps {
  inviteCode: string
  workspaceId: string
}
export const InviteLink = ({ inviteCode, workspaceId }: InviteLinkProps) => {
  const router = useRouter()
  const { mutate: resetInviteLink, isPending: isInvitelinkPending } =
    useResetInviteLink()

  const fullInviteLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/workspaces/${workspaceId}/join/${inviteCode}`
      : ""

  const [ResetInvitelinkDialog, confirmResetLink] = useConfirm(
    "Reset Invite-link",
    "This will invalidate the current",
    "default"
  )
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

  const handleResetLink = async () => {
    const ok = await confirmResetLink()
    if (!ok) return
    resetInviteLink(
      { param: { workspaceId: workspaceId } },
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
  return (
    <>
      <ResetInvitelinkDialog />
      <div className="bg-white dark:bg-neutral-900  dark:text-white rounded-lg p-4">
        <h1 className="font-medium pb-2">Invite members</h1>
        <p className="text-sm py-2">
          Use the invite-link to add members to your workspace
        </p>
        <div className="flex gap-2">
          <Input
            disabled
            value={fullInviteLink}
            className="selection:bg-primary selection:text-white"
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
    </>
  )
}

// Delete workspace

interface DangerZonePropsTypes {
  workspaceId: string
}
export const Dangerzone = ({ workspaceId }: DangerZonePropsTypes) => {
  const router = useRouter()
  const { mutate: deleteWorkspace, isPending: isworkspacePending } =
    useDeleteWorkspace()

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Are you absolutely sure you want to delete?",
    "This action cannot be undone",
    "destructive"
  )

  const handleDelete = async () => {
    const ok = await confirmDelete()
    if (!ok) return
    deleteWorkspace(
      { param: { workspaceId } },
      {
        onSuccess: () => {
          router.push("/")
        },
      }
    )
  }
  return (
    <>
      <DeleteDialog />
      <div className="bg-white dark:bg-neutral-900  dark:text-white rounded-lg p-4">
        <h1 className="font-medium pb-2">Danger Zone</h1>
        <p className="text-sm">
          Deleting a workspace is irreversible and will remove all associated
          data.
        </p>
        <div className="flex justify-end">
          <Button onClick={handleDelete} variant={"destructive"}>
            {isworkspacePending ? (
              <Loader message="Deleting ..." />
            ) : (
              <>
                <Trash />
                Delete Workspace
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

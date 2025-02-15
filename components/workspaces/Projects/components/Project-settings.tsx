import React, { useRef } from "react"
import Image from "next/image"
import { ArrowLeft, ImagePlus, Trash, Upload, X } from "lucide-react"
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/hooks/use-confirm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/Utility/Ui/Loader"
import { Projects } from "../type"
import { updateProjectSchema } from "../Schema/schemas"
import { useUpdateProject } from "../api/use-update-project"
import { useDeleteProject } from "../api/use-delete-project"

interface ValueProps {
  initialValue: Projects
}
const ProjectSettings = ({ initialValue }: ValueProps) => {
  const router = useRouter()
  const { mutate, isPending: isUpdating } = useUpdateProject()

  const uploadRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValue,
      image: initialValue?.imageUrl ?? "",
    },
  })
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]

    if (file) {
      form.setValue("image", file)
    }
  }
  const handle_update = (data: z.infer<typeof updateProjectSchema>) => {
    const updatedValue = {
      ...data,
      image: data.image instanceof File ? data.image : "",
    }
    if (data) {
      mutate({
        form: updatedValue,
        param: { projectId: initialValue?.$id },
      })
    }
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
                  <FormLabel>Project name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
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

      <Dangerzone
        projectId={initialValue.$id}
        workspaceId={initialValue.workspaceId}
      />
    </div>
  )
}

export default ProjectSettings

// Delete workspace

interface DangerZonePropsTypes {
  projectId: string
  workspaceId: string
}
export const Dangerzone = ({
  projectId,
  workspaceId,
}: DangerZonePropsTypes) => {
  const router = useRouter()
  const { mutate: DeleteProject, isPending: isProjectDeleting } =
    useDeleteProject()
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Are you absolutely sure you want to delete?",
    "This action cannot be undone",
    "destructive"
  )

  // ! delete project
  const handleProjectDelete = async () => {
    const confirm = await confirmDelete()
    if (confirm) {
      DeleteProject(
        {
          param: { projectId },
        },
        {
          onSuccess: () => {
            router?.push(`/workspaces/${workspaceId}`)
          },
        }
      )
    }
  }
  return (
    <>
      <DeleteDialog />
      <div className="bg-white dark:bg-neutral-900  dark:text-white rounded-lg p-4">
        <h1 className="font-medium pb-2">Danger Zone</h1>
        <p className="text-sm">
          Are you sure you want to delete this project? This action is
          irreversible and will permanently remove all associated tasks, issues,
          and data related to the project. Ensure you have backed up any
          important information before proceeding.
        </p>
        <div className="flex justify-end">
          <Button onClick={handleProjectDelete} variant={"destructive"}>
            {isProjectDeleting ? (
              <Loader className="animate-spin origin-center" />
            ) : (
              <Trash />
            )}
            Delete Workspace
          </Button>
        </div>
      </div>
    </>
  )
}

"use client"
import React, { useRef } from "react"
import { Projects } from "../type"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { ImagePlus, Loader, Pen, Trash } from "lucide-react"
import { useUpdateProject } from "../api/use-update-project"
import { updateProjectSchema } from "../Schema/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useConfirm } from "@/hooks/use-confirm"
import { useDeleteProject } from "../api/use-delete-project"
import { useRouter } from "next/navigation"

interface ValueProps {
  value: Projects
}
function ProjectSettings({ value }: ValueProps) {
  const router = useRouter()
  const { mutate, isPending } = useUpdateProject()
  const { mutate: DeleteProject, isPending: isProjectDeleting } =
    useDeleteProject()
  const uploadRef = useRef<HTMLInputElement>(null)
  const [DeleteDialog, confirmDelete] = useConfirm(
    "Are you absolutely sure you want to delete?",
    "This action cannot be undone",
    "destructive"
  )
  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...value,
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
        param: { projectId: value?.$id },
      })
    }
  }

  // ! delete project
  const handleProjectDelete = async () => {
    const confirm = await confirmDelete()
    if (confirm) {
      DeleteProject(
        {
          param: { projectId: value?.$id },
        },
        {
          onSuccess: () => {
            router?.push(`/workspaces/${value?.workspaceId}`)
          },
        }
      )
    }
  }

  return (
    <div className="rounded-lg p-3">
      <DeleteDialog />
      <h1 className="font-poppins_normal text-lg p-3">{value?.name}</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handle_update)}
          className="flex gap-2"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900 dark:text-white rounded-lg justify-center items-center min-w-[300px] relative">
                <div
                  onClick={() => uploadRef?.current?.click()}
                  className="flex cursor-pointer justify-center border rounded-full items-center size-32 overflow-hidden "
                >
                  {field?.value ? (
                    <Image
                      src={
                        field?.value instanceof File
                          ? URL.createObjectURL(field?.value)
                          : field?.value
                      }
                      width={100}
                      height={100}
                      className="size-full object-center"
                      alt="uploading image"
                    />
                  ) : (
                    <ImagePlus size={20} />
                  )}
                  {/* file input */}
                  <Input
                    ref={uploadRef}
                    type="file"
                    className="hidden"
                    accept=".jpg, .svg, .jpeg, .png"
                    onChange={handleUploadImage}
                  />
                </div>

                {field.value && (
                  <Button
                    title="Remove Image"
                    className="text-xs absolute right-2 top-2 size-fit p-2"
                    onClick={() => {
                      field.onChange(null)
                      if (uploadRef.current) {
                        uploadRef.current.value = ""
                      }
                    }}
                    variant={"destructive"}
                  >
                    <Trash className="fill-current" />
                  </Button>
                )}
                <h1 className="pt-2 text-sm">Upload Image</h1>
                <p className="text-stone-500 tracking-wide text-sm pt-2">
                  jpg,jpeg,svg,png,max 1MB
                </p>
              </div>
            )}
          />

          <div className="flex flex-col justify-between flex-1 bg-neutral-50 dark:bg-neutral-900 dark:text-white p-4 rounded-lg">
            <div className="flex-1 grid gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="Description"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="dark:bg-inherit"
                        placeholder="Description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button disabled={isPending} type="submit">
                {isPending ? (
                  <Loader className="animate-spin origin-center" size={18} />
                ) : (
                  <Pen size={18} />
                )}
                Update
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg w-full mt-2">
        <h1 className="font-medium font-poppins_normal text-lg dark:text-white">
          Danger zone
        </h1>
        <p className="py-3 text-muted-foreground dark:text-white font-poppins_normal text-justify">
          Are you sure you want to delete this project? This action is
          irreversible and will permanently remove all associated tasks, issues,
          and data related to the project. Ensure you have backed up any
          important information before proceeding.
        </p>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleProjectDelete}
            type="button"
            variant={"destructive"}
          >
            {isProjectDeleting ? (
              <Loader className="animate-spin origin-center" size={18} />
            ) : (
              <Trash />
            )}
            Delete Project
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectSettings

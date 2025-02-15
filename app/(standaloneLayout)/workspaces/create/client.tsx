"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateWorkspace } from "@/components/workspaces/api/use-create-workspace"
import { createWorkSchema } from "@/components/workspaces/schema/schemas"
import { Loader } from "@/Utility/Ui/Loader"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, LayoutGrid, Upload, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type WorkspaceForm = z.infer<typeof createWorkSchema>
export const NewWorkspaceForm = () => {
  const uploadRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { mutate, isPending } = useCreateWorkspace()
  const form = useForm<WorkspaceForm>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
    resolver: zodResolver(createWorkSchema),
  })

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]

    if (file) {
      form.setValue("image", file)
    }
  }
  const handleCreate = async (data: WorkspaceForm) => {
    const workspaceData = {
      ...data,
      image: data?.image instanceof File ? data?.image : "",
    }

    mutate(
      { form: workspaceData },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`)
        },
      }
    )
  }

  return (
    <div className="pt-2">
      <Form {...form}>
        <form
          className="grid md:grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(handleCreate)}
        >
          <div className="min-h-[400px] rounded-lg bg-muted">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="grid place-items-center relative bg-muted size-full rounded-lg overflow-hidden group/uploadImage">
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
                      className="object-cover size-full max-h-[400px] rounded-lg "
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
                    Upload jpg&#44; jpeg&#44; svg&#44; png&#44; max 1MB
                  </p>
                </div>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
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
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex-1 flex flex-col">
                  <FormLabel>Description</FormLabel>
                  <FormControl className="flex-1">
                    <Textarea
                      placeholder="Type your message here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button disabled={isPending}>
                {isPending ? <Loader /> : <LayoutGrid />}
                Create Workspace
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

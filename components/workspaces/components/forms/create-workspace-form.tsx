"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { createWorkSchema } from "../../schema/schemas"
import { ImagePlus, Loader, Plus } from "lucide-react"
import { z } from "zod"
import { useCreateWorkspace } from "../../api/use-create-workspace"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"
import { useCreateWorkspaceModal } from "@/hooks/use-createWorkspace-modal"

function CreateWorkspaceForm() {
  const uploadRef = useRef<HTMLInputElement>(null)
  const { close } = useCreateWorkspaceModal()
  const { mutate, isPending } = useCreateWorkspace()
  const form = useForm<z.infer<typeof createWorkSchema>>({
    resolver: zodResolver(createWorkSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]

    if (file) {
      form.setValue("image", file)
    }
  }

  const handle_create = (data: z.infer<typeof createWorkSchema>) => {
    const workspaceData = {
      ...data,
      image: data?.image instanceof File ? data?.image : "",
    }

    mutate(
      { form: workspaceData },
      {
        onSuccess: () => {
          form?.reset()
          close()
        },
      }
    )
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handle_create)} className="space-y-3">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <div className="flex flex-col items-center">
                <div
                  onClick={() => uploadRef?.current?.click()}
                  className="flex cursor-pointer justify-center border rounded-full items-center size-20 overflow-hidden"
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
                <h1 className="pt-2 text-sm">Upload Image</h1>
                <p className="text-stone-500 tracking-wide text-sm pt-2">
                  jpg&#44; jpeg&#44; svg&#44; png&#44; max 1MB
                </p>
              </div>
            )}
          />
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
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending} className="mt-2">
              {isPending ? (
                <Loader className="animate-spin origin-center" size={18} />
              ) : (
                <Plus size={18} />
              )}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default CreateWorkspaceForm

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { updateWorkSchema } from "../schema/schemas"
import { ImagePlus, Loader, Pencil, Save } from "lucide-react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import { Workspace } from "../types"
import { useUpdateWorkspace } from "../api/use-update-workspace"

interface PropTypes {
  initialValue: Workspace
}
function UpdateWorkspaceForm({ initialValue }: PropTypes) {
  const uploadRef = useRef<HTMLInputElement>(null)
  const { mutate, isPending } = useUpdateWorkspace()
  const form = useForm<z.infer<typeof updateWorkSchema>>({
    resolver: zodResolver(updateWorkSchema),
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
    <>
      <Sheet>
        <div className="flex justify-end">
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <Pencil /> Edit
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>{initialValue?.name}</SheetTitle>
            <SheetDescription>
              Update the workspace details below. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handle_update)}
              className="space-y-8 pt-3"
            >
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
                              : initialValue?.imageUrl
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
                        className="text-xs mt-2"
                        onClick={() => {
                          field.onChange(null)
                          if (uploadRef.current) {
                            uploadRef.current.value = ""
                          }
                        }}
                        variant={"destructive"}
                      >
                        Remove image
                      </Button>
                    )}
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
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending} className="mt-2">
                  {isPending ? (
                    <Loader className="animate-spin origin-center" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default UpdateWorkspaceForm

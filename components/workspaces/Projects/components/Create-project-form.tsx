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
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, Loader, Plus } from "lucide-react"
import Image from "next/image"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createProjectSchema } from "../Schema/schemas"
import { useCreateProject } from "../api/use-create-project"
import { useParams } from "next/navigation"

interface CreateFormProps {
  onCancel: () => void
}
export default function CreateProjectForm({ onCancel }: CreateFormProps) {
  const param = useParams()
  const workspaceId = param?.workspaceId as string
  const { mutate, isPending } = useCreateProject()
  const uploadRef = useRef<HTMLInputElement>(null)
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
    defaultValues: {
      name: "",
    },
  })
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]

    if (file) {
      form.setValue("image", file)
    }
  }
  const handle_create = (data: z.infer<typeof createProjectSchema>) => {
    const finalValue = {
      ...data,
      workspaceId,
      image: data.image instanceof File ? data.image : "",
    }

    mutate(
      { form: finalValue },
      {
        onSuccess: () => {
          form.reset()
          onCancel()
        },
      }
    )
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handle_create)}
          className="space-y-3 flex flex-col h-full"
        >
          <div className="flex-1">
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
                    jpg,jpeg,svg,png,max 1MB
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
          </div>
          <Button type="submit" className="w-full">
            {isPending ? (
              <Loader className="animate-spin origin-center" size={18} />
            ) : (
              <Plus size={18} />
            )}
            Create
          </Button>
        </form>
      </Form>
    </>
  )
}

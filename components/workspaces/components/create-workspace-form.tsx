"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { createWorkSchema } from "../schema/schemas"
import TextInput from "@/Utility/ui/Inputs/Text-input"
import Divider from "@/Utility/ui/Divider"
import Button from "@/Utility/ui/Button"
import { Loader, Plus } from "lucide-react"
import { z } from "zod"
import { useCreateWorkspace } from "../api/use-create-workspace"

function CreateWorkspaceForm() {
  const { mutate, isPending, isSuccess } = useCreateWorkspace()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createWorkSchema),
    defaultValues: {
      name: "",
    },
  })

  const handle_create: SubmitHandler<z.infer<typeof createWorkSchema>> = (
    data
  ) => {
    mutate({ json: data })
    isSuccess && reset()
  }
  return (
    <form onSubmit={handleSubmit(handle_create)} className="p-2 lg:w-1/2">
      <h1 className="font-poppins_normal font-medium text-xl capitalize">
        Create your workspace
      </h1>
      <Divider type="dotted" />
      <TextInput {...register("name")} type="text" label="Workspace Name" />
      {errors?.name?.message && (
        <p className="text-red-500 font-poppins_normal text-sm pt-2">
          {errors?.name?.message}
        </p>
      )}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => reset()}
          variant="default"
          label="Cancel"
          className="mt-2 text-stone-800"
        />
        <Button
          disabled={isPending}
          icon={
            isPending ? (
              <Loader className="animate-spin origin-center" size={18} />
            ) : (
              <Plus size={18} />
            )
          }
          label="Create workspace"
          className="mt-2"
        />
      </div>
    </form>
  )
}

export default CreateWorkspaceForm

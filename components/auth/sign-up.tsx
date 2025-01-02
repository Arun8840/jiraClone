"use client"
import Button from "@/Utility/ui/Button"
import Divider from "@/Utility/ui/Divider"
import TextInput from "@/Utility/ui/Inputs/Text-input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { SubmitHandler } from "react-hook-form"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RegisterSchema } from "./schema/AuthSchema"
import { useRegister } from "./api/use-register"
import { Loader } from "lucide-react"

function SignUpComponent() {
  const { mutate, isPending } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const handle_submit: SubmitHandler<z.infer<typeof RegisterSchema>> = (
    data
  ) => {
    mutate({ json: data })
  }
  return (
    <div className="flex-1 grid place-items-center">
      <div className="bg-white p-3 rounded-lg shadow-sm w-3/4 lg:w-1/3">
        <h1 className="text-center text-2xl p-2 font-poppins_bold font-semibold">
          Create a account
        </h1>

        <p className="text-stone-500 text-sm p-2 text-center">
          Provide your email and choose a password
        </p>
        <Divider type="dotted" />

        <form onSubmit={handleSubmit(handle_submit)} className="p-2">
          <TextInput {...register("name")} type="text" label="UserName" />
          {errors.email?.message && (
            <p className="text-red-500 font-poppins_normal text-sm pt-2">
              {errors.name?.message}
            </p>
          )}
          <TextInput {...register("email")} type="text" label="Email" />
          {errors.email?.message && (
            <p className="text-red-500 font-poppins_normal text-sm pt-2">
              {errors.email?.message}
            </p>
          )}
          <TextInput
            {...register("password")}
            type="password"
            label="Password"
          />
          {errors.password?.message && (
            <p className="text-red-500 font-poppins_normal text-sm pt-2">
              {errors.password?.message}
            </p>
          )}
          <Button
            icon={
              isPending && (
                <Loader className="animate-spin origin-center" size={18} />
              )
            }
            className="w-full justify-center mt-3"
          >
            Register
          </Button>
        </form>
        <Divider type="dotted" />

        <p className="col-span-full text-center text-sm p-3">
          Already have a account ?
          <Link href={"/sign-in"} className="px-2 text-blue-500">
            Sign-in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpComponent

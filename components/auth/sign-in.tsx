"use client"
import Button from "@/Utility/ui/Button"
import Divider from "@/Utility/ui/Divider"
import TextInput from "@/Utility/ui/Inputs/Text-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chrome, Github, Loader } from "lucide-react"
import Link from "next/link"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema } from "./schema/AuthSchema"
import { useLogin } from "./api/use-login"

function SignInComponent() {
  const { mutate, isPending } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handle_submit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    mutate({ json: data })
  }

  return (
    <div className="flex-1 grid place-items-center">
      <div className="bg-white p-3 rounded-lg  w-3/4 lg:w-1/3 shadow-sm">
        <h1 className="text-center text-2xl p-2 font-poppins_bold font-semibold">
          Login your account
        </h1>

        <p className="text-stone-500 text-sm p-2 text-center">
          Provide your email and password
        </p>
        <Divider type="dotted" />

        <form onSubmit={handleSubmit(handle_submit)} className="p-2">
          <TextInput {...register("email")} type="text" label="UserName" />
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
            Login
          </Button>
        </form>
        <Divider type="dotted" />

        <div className="grid lg:grid-cols-2 gap-2">
          <Button
            icon={<Chrome size={18} />}
            variant="default"
            disabled
            className="w-full justify-center text-black"
          >
            Google
          </Button>
          <Button
            icon={<Github size={18} />}
            variant="default"
            disabled
            className="w-full justify-center text-black"
          >
            Github
          </Button>

          <p className="col-span-full text-center text-sm p-3">
            Don&apos;t have a account ?
            <Link href={"/sign-up"} className="px-2 text-blue-500">
              Sign-up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInComponent

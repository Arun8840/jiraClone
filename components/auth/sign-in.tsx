"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chrome, Github, Loader } from "lucide-react"
import Link from "next/link"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema } from "./schema/AuthSchema"
import { useLogin } from "./api/use-login"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

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

        <form onSubmit={handleSubmit(handle_submit)} className="p-2">
          <label htmlFor="Email" className="py-2 block">
            Email
          </label>
          <Input {...register("email")} id="Email" type="text" />
          {errors.email?.message && (
            <p className="text-red-500 font-poppins_normal text-sm pt-2">
              {errors.email?.message}
            </p>
          )}
          <label htmlFor="password" className="block py-2">
            Password
          </label>
          <Input {...register("password")} id="password" type="password" />
          {errors.password?.message && (
            <p className="text-red-500 font-poppins_normal text-sm pt-2">
              {errors.password?.message}
            </p>
          )}
          <Button disabled={isPending} className="w-full justify-center mt-3">
            {isPending ? (
              <Loader className="text-white animate-spin origin-center" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <Separator />

        <div className="grid lg:grid-cols-2 gap-2 p-2">
          <Button
            variant="secondary"
            disabled
            className="w-full justify-center"
          >
            <Chrome />
            Google
          </Button>
          <Button
            variant="secondary"
            disabled
            className="w-full justify-center"
          >
            <Github />
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

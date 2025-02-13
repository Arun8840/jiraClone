"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Chrome, Eye, EyeClosed, Github } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema } from "./schema/AuthSchema"
import { useLogin } from "./api/use-login"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader } from "@/Utility/Ui/Loader"
import { signUpWithGithub } from "@/lib/oauth"
import Image from "next/image"

function SignInComponent() {
  const { mutate, isPending } = useLogin()
  const [showPass, setShowPass] = useState<boolean>(false)
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

  const handlePassToggle = () => {
    setShowPass(!showPass)
  }
  const handle_submit: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
    mutate({ json: data })
  }

  return (
    <div className="flex-1 grid  gap-2">
      {/* Login Section */}
      <div className="grid place-items-center">
        <div className="lg:w-1/3 w-[80%] flex flex-col justify-center">
          {/* Header */}
          <div className="border rounded-full p-2 size-fit mx-auto">
            <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          </div>
          <h1 className="text-2xl p-2 font-poppins_bold font-semibold text-center">
            Sign in to your workspace
          </h1>

          {/* Sub-header */}
          <p className="text-stone-500 text-sm text-center p-2">
            Manage your projects, track progress, and collaborate with your team
            seamlessly. Provide your email and password to get started.
          </p>

          {/* Login Form */}
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
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                type={showPass ? "text" : "password"}
              />
              <Button
                onClick={handlePassToggle}
                type="button"
                className=" h-full  absolute right-0 top-0"
                variant={"link"}
              >
                {showPass ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
            {errors.password?.message && (
              <p className="text-red-500 font-poppins_normal text-sm pt-2">
                {errors.password?.message}
              </p>
            )}
            <Button disabled={isPending} className="w-full justify-center mt-3">
              {isPending ? <Loader className="text-white" /> : "Login"}
            </Button>
          </form>

          {/* OAuth Buttons */}
          <div className="grid lg:grid-cols-2 gap-2 p-2">
            <Button
              disabled
              variant="outline"
              className="w-full justify-center"
            >
              <Chrome />
              Google
            </Button>
            <Button
              onClick={() => signUpWithGithub()}
              variant="outline"
              className="w-full justify-center"
            >
              <Github />
              Github
            </Button>

            {/* Sign-up Link */}
            <p className="col-span-full text-center text-sm p-3">
              Don&apos;t have an account?{" "}
              <Link href={"/sign-up"} className="px-2 text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInComponent

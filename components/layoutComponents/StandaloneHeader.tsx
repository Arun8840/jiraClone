"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "../ui/button"
import { ArrowLeft } from "lucide-react"

function StandaloneHeader() {
  const router = useRouter()
  return (
    <div className="flex justify-between dark:text-white">
      <Button onClick={() => router?.back()} variant={"ghost"}>
        <ArrowLeft /> Back
      </Button>
    </div>
  )
}

export default StandaloneHeader

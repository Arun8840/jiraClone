"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { HTMLAttributes } from "react"

interface ErrorProps extends HTMLAttributes<HTMLDivElement> {}
const ErrorComponent: React.FC<ErrorProps> = ({ className, ...otherProps }) => {
  const router = useRouter()
  const baseClass = "size-full grid place-items-center"
  return (
    <div {...otherProps} className={cn(baseClass, className)}>
      <div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-poppins_normal">
          <AlertCircle size={18} /> <span>Something went wrong</span>
        </div>
        <Button
          onClick={() => router.back()}
          size={"sm"}
          className="w-full mt-2 text-primary"
          variant={"outline"}
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default ErrorComponent

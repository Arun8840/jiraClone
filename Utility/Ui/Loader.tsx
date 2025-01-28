import { cn } from "@/lib/utils"
import { Loader as LoaderIcon } from "lucide-react"
import React, { HTMLAttributes } from "react"

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Loader: React.FC<LoaderProps> = ({ className, ...props }) => {
  const baseClass = "size-full grid place-items-center"
  return (
    <div {...props} className={cn(baseClass, className)}>
      <LoaderIcon size={18} className="animate-spin origin-center" />
    </div>
  )
}

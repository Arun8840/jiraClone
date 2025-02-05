import { cn } from "@/lib/utils"
import { Loader as LoaderIcon } from "lucide-react"
import React, { HTMLAttributes } from "react"

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  message?: string
}

export const Loader: React.FC<LoaderProps> = ({
  className,
  message,
  ...props
}) => {
  const baseClass = "size-full grid place-items-center"
  return (
    <div {...props} className={cn(baseClass, className)}>
      <div className="flex items-center gap-2">
        <LoaderIcon
          size={18}
          className="animate-spin origin-center dark:text-primary"
        />
        <small className="text-muted-foreground">{message}</small>
      </div>
    </div>
  )
}

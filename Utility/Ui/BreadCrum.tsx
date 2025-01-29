import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import React, { HTMLAttributes } from "react"

interface BreadCrumProp extends HTMLAttributes<HTMLDivElement> {
  data: { [key: string]: string | null }[]
  asChild?: boolean
  children?: React.ReactNode
}
function BreadCrum({
  data,
  className,
  asChild = false,
  children,
  ...otherProps
}: BreadCrumProp) {
  const baseClass = "flex items-center gap-2 text-sm bg-white p-2 rounded-lg"

  return (
    <div className={cn(baseClass, className)} {...otherProps}>
      {asChild && children}
      {data?.map((crums) => {
        return (
          <React.Fragment key={crums?.name}>
            {crums?.path ? (
              <Link
                href={crums?.path}
                className="text-muted-foreground hover:text-primary transition-colors duration-150 "
              >
                {crums?.name}
              </Link>
            ) : (
              <span className="text-muted-foreground hover:text-primary transition-colors duration-150 ">
                {crums?.name}
              </span>
            )}

            <span className="px-2 last:hidden">
              <ChevronRight size={18} className="text-muted-foreground" />
            </span>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default BreadCrum

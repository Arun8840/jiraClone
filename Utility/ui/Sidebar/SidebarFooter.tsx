import { cn } from "@/Utility/cn"
import React, { HTMLAttributes } from "react"
import { useSidebarContext } from "./SidebarContainer"
interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}
function SidebarFooter({ children, className, ...otherProps }: FooterProps) {
  const defaultClass = "text-white p-1"
  const { isOpen } = useSidebarContext()
  return (
    !isOpen && (
      <div className={cn(defaultClass, className)} {...otherProps}>
        {children ?? "Footer"}
      </div>
    )
  )
}

SidebarFooter.displayName = "SidebarFooter"
export default SidebarFooter

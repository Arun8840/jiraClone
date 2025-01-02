import { cn } from "@/Utility/cn"
import React, { HTMLAttributes } from "react"
import { useSidebarContext } from "./SidebarContainer"
import { Menu } from "lucide-react"

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | null
  icon?: React.ReactNode | null
}
function SidebarHeader({
  children,
  icon,
  className,
  ...otherProps
}: HeaderProps) {
  const baseClass = "p-3 flex items-center gap-2"
  const { isOpen, setopen } = useSidebarContext()
  return (
    <div className={cn(baseClass, className)} {...otherProps}>
      {icon && icon}
      {!isOpen ? (
        <>{children ?? "Header"}</>
      ) : (
        <Menu onClick={() => setopen(!isOpen)} size={18} />
      )}
    </div>
  )
}

SidebarHeader.displayName = "SidebarHeader"
export default SidebarHeader

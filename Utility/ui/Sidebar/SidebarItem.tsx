import { cn } from "@/Utility/cn"
import React, { HTMLAttributes } from "react"
import { useSidebarContext } from "./SidebarContainer"

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode
  value?: string | null
  icon?: React.ReactNode | null | undefined
  active?: boolean
}
function SidebarItem({
  children,
  value,
  className,
  icon,
  active = false,
  ...otherProps
}: ListItemProps) {
  const { isOpen } = useSidebarContext()
  const baseClass = `rounded p-1 flex items-center gap-2 cursor-pointer hover:bg-[var(--selected-color)] ${
    active && "bg-[var(--selected-color)]"
  } hover:text-white transition-colors duration-150`
  return (
    <li className={cn(baseClass, className)} {...otherProps}>
      {icon && <div className="bg-white/5 p-1 rounded">{icon}</div>}
      {!isOpen && <>{value ? value : children}</>}
    </li>
  )
}

SidebarItem.displayName = "SidebarItem"
export default SidebarItem

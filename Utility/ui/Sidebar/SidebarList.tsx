import { cn } from "@/Utility/cn"
import React, { HTMLAttributes } from "react"

interface ListProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode
}
function SidebarList({ children, className, ...otherProps }: ListProps) {
  const baseClass =
    "flex-1 p-1 text-sm flex flex-col gap-2 text-[var(--text-color)] max-h-full overflow-y-auto"
  return (
    <ul className={cn(baseClass, className)}>
      {React.Children.toArray(children).map((child: any) => {
        if (child?.type?.displayName === "SidebarItem") {
          return React.cloneElement(child)
        }
        return null
      })}
    </ul>
  )
}

SidebarList.displayName = "SidebarList"
export default SidebarList

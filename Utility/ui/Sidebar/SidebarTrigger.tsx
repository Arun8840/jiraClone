import React, { HTMLAttributes } from "react"
import { useSidebarContext } from "./SidebarContainer"
import { cn } from "@/Utility/cn"

interface SidebarTriggerProps extends HTMLAttributes<HTMLButtonElement> {}
function SidebarTrigger({ className }: SidebarTriggerProps) {
  const { isOpen, setopen } = useSidebarContext()

  const baseClass = `absolute h-full bg-white/20 p-0.5 opacity-0 hover:opacity-[1] transition-opacity duration-150 top-0 right-0 ${
    isOpen ? "cursor-e-resize" : "cursor-w-resize"
  }`
  return (
    <button
      onClick={() => setopen(!isOpen)}
      className={cn(baseClass, className)}
    />
  )
}

SidebarTrigger.displayName = "SidebarTrigger"
export default SidebarTrigger

import React, { HTMLAttributes } from "react"
import { cn } from "../cn"

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  type?: "dotted" | "solid"
}
function Divider({ className, type = "solid" }: DividerProps) {
  const divderType = {
    dotted: "border-dashed",
    solid: "border-solid",
  }
  const variantType = divderType[type]
  const baseClass = ["border my-3", variantType].filter(Boolean).join(" ")
  return <div className={cn(baseClass, className)} />
}

export default Divider

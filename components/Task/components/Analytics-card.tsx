import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import React, { HTMLAttributes } from "react"

interface PropsTypes extends HTMLAttributes<HTMLDivElement> {
  count: number
  title: string
  increasedValue: number
  variant: "up" | "down"
}
function AnalyticsCard({
  title,
  increasedValue,
  count,
  className,
  variant,
  ...otherProps
}: PropsTypes) {
  const variantColor = variant === "up" ? "text-primary" : "text-destructive"
  const variantIcon =
    variant === "up" ? <ArrowUp size={18} /> : <ArrowDown size={18} />
  const baseClass =
    "border-0 p-3 flex flex-col gap-3 shadow-none font-poppins_normal"
  return (
    <>
      <Card className={cn(baseClass, className)}>
        <div className="flex items-center w-full">
          <h1 className="truncate flex-1">{title}</h1>
          <div className={`${variantColor} flex items-center gap-1`}>
            <span>{increasedValue}</span>
            {variantIcon}
          </div>
        </div>

        <h1 className={cn("text-xl", variantColor)}>{count}</h1>
      </Card>
    </>
  )
}

export default AnalyticsCard

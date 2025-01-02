import { cn } from "@/Utility/cn"
import React, { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | undefined
}
function TextInput({ label, className, ...otherProps }: InputProps) {
  const baseClass = "border w-full p-2 rounded bg-inherit"
  return (
    <div>
      {label && (
        <label htmlFor={label} className="py-2 block font-poppins_normal">
          {label}
        </label>
      )}
      <input className={cn(baseClass, className)} {...otherProps} />
    </div>
  )
}

export default TextInput

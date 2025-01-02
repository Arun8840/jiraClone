import React, { ButtonHTMLAttributes, CSSProperties } from "react"
import { cn } from "../cn"
import theme from "../theme.json"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  label?: string | null
  icon?: React.ReactNode | null
  variant?: "primary" | "secondary" | "default" | "danger" | "success"
  buttonType?: "outlined" | "filled" | "default"
}

function Button({
  children,
  label,
  icon,
  disabled,
  className,
  buttonType = "default",
  variant = "primary",
  ...otherProps
}: ButtonProps) {
  const {
    button: { variant: themeVariant },
  } = theme

  // todo type variant
  const typeStyles = {
    default: "bg-[var(--button-bg)] text-white",
    filled: "bg-[var(--button-bg)] text-white",
    outlined:
      "border border-[var(--button-bg)] text-[var(--button-bg)] bg-transparent",
  }
  // todo button variant
  const variantValue = themeVariant?.[variant] || "bg-gray-500"
  const typeValue = typeStyles?.[buttonType] || "default"
  const styleVariables = {
    "--button-bg": variantValue,
    "--button-effect": `${variantValue}90`,
  } as CSSProperties

  const baseClass = [
    variantValue,
    typeValue,
    "px-4 py-2 rounded  flex items-center gap-2 hover:bg-[var(--button-effect)] transition-colors duration-150",
    disabled && "opacity-60",
  ]
    .filter(Boolean)
    .join(" ")
  return (
    <button
      style={styleVariables}
      className={cn(baseClass, className)}
      {...otherProps}
    >
      {icon}
      {label ? label : children}
    </button>
  )
}

export default Button

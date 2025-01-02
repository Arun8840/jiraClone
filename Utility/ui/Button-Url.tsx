import React, { CSSProperties, AnchorHTMLAttributes } from "react"
import { cn } from "../cn"
import theme from "../theme.json"
import Link from "next/link"

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
  label?: string | null
  icon?: React.ReactNode | null
  variant?: "primary" | "secondary" | "default" | "danger" | "success"
  buttonType?: "outlined" | "filled" | "default"
  url: string
}

function ButtonUrl({
  children,
  label,
  icon,
  className,
  buttonType = "default",
  variant = "primary",
  url,
  ...otherProps
}: ButtonProps) {
  const {
    button: { variant: themeVariant },
  } = theme

  // Type styles
  const typeStyles = {
    default: "bg-[var(--button-bg)] text-white",
    filled: "bg-[var(--button-bg)] text-white",
    outlined:
      "border border-[var(--button-bg)] text-[var(--button-bg)] bg-transparent",
  }

  // Variant value
  const variantValue = themeVariant?.[variant] || "bg-gray-500"

  // Button type value
  const typeValue = typeStyles[buttonType]

  // CSS variables for dynamic styling
  const styleVariables = {
    "--button-bg": variantValue,
    "--button-effect": `${variantValue}90`, // Add transparency for hover effect
  } as CSSProperties

  // Base class
  const baseClass = [
    typeValue,
    "px-4 py-2 rounded flex items-center gap-2 hover:bg-[var(--button-effect)] transition-colors duration-150",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Link
      href={url}
      style={styleVariables}
      className={cn(baseClass, className)}
      {...otherProps}
    >
      {icon}
      {label ? label : children}
    </Link>
  )
}

export default ButtonUrl

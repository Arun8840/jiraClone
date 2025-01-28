import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import React from "react"

function DarkModeSwitcher() {
  const { setTheme, theme } = useTheme()

  const toggle_dark = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button
      onClick={toggle_dark}
      variant={"ghost"}
      className="p-0 size-7 rounded-full"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </Button>
  )
}

export default DarkModeSwitcher

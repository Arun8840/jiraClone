import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"

function DarkModeSwitcher() {
  const [theme, setTheme] = useState<string | null>(null)

  useEffect(() => {
    // Check localStorage or system preference
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      document.documentElement.classList.add(storedTheme)
      setTheme(storedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark")
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setTheme("light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setTheme("dark")
    }
  }

  return (
    <Button onClick={toggleTheme} variant={"ghost"}>
      {theme === "dark" ? "🌙" : "☀️"}
    </Button>
  )
}

export default DarkModeSwitcher

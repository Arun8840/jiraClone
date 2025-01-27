import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import React from "react"

function DarkModeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <>
      <Button onClick={() => setTheme("dark")} variant={"ghost"}>
        🌙
      </Button>
      <Button onClick={() => setTheme("light")} variant={"ghost"}>
        ☀️
      </Button>
    </>
  )
}

export default DarkModeSwitcher

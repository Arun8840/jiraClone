"use client"
import React from "react"
import { SidebarTrigger } from "../ui/sidebar"
import DarkModeSwitcher from "@/Utility/Ui/Dark-mode-switcher"

function Header() {
  return (
    <nav className="p-2.5 border-b w-full flex justify-between items-center">
      <SidebarTrigger />

      <div>
        <DarkModeSwitcher />
      </div>
    </nav>
  )
}

export default Header

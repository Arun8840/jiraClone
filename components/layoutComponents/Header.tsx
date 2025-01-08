"use client"
import React from "react"
import { SidebarTrigger } from "../ui/sidebar"

function Header() {
  return (
    <nav className="p-2.5 border-b w-full flex justify-between items-center">
      <SidebarTrigger />
    </nav>
  )
}

export default Header

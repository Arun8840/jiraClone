"use client"
import React from "react"
import { SidebarTrigger } from "../ui/sidebar"
import DarkModeSwitcher from "@/Utility/Ui/Dark-mode-switcher"
import AccountButton from "./AccountButton"

function Header() {
  return (
    <>
      <nav className="p-1 w-full flex justify-between items-center bg-card dark:bg-black">
        <SidebarTrigger />

        <div className="flex items-center gap-2">
          <DarkModeSwitcher />
          <AccountButton />
        </div>
      </nav>
    </>
  )
}

export default Header

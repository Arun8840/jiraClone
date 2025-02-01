"use client"
import React from "react"
import { SidebarTrigger } from "../ui/sidebar"
import DarkModeSwitcher from "@/Utility/Ui/Dark-mode-switcher"
import AccountButton from "./AccountButton"
import { usePathname } from "next/navigation"

const pathnameMap = {
  tasks: {
    title: "Tasks",
    description: "Monitor all of your tasks here",
  },
  project: {
    title: "Project",
    description: "Monitor all of you projects here",
  },
}
const defaultMap = {
  title: "Home",
  description: "Monitor all of your projects and tasks here",
}
function Header() {
  const currentPath = usePathname()
  const currentPathmap = currentPath.split("/")
  const currentPage = currentPathmap[3] as keyof typeof pathnameMap

  const { title, description } = pathnameMap[currentPage] || defaultMap

  return (
    <>
      <nav className="p-1 w-full flex justify-between items-center bg-card dark:bg-inherit sticky top-0 z-20 font-poppins_normal">
        <div>
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="">{title}</h1>
          </div>
          <p className="text-xs text-muted-foreground p-1 truncate tracking-wide">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DarkModeSwitcher />
          <AccountButton />
        </div>
      </nav>
    </>
  )
}

export default Header

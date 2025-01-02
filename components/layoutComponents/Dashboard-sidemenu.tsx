"use client"
import {
  SidebarContainer,
  SidebarTrigger,
  SidebarHeader,
  SidebarGroup,
  SidebarItem,
  SidebarList,
} from "@/Utility/ui/Sidebar"
import {
  Bell,
  ChartAreaIcon,
  GitCompareArrows,
  Home,
  LayoutDashboardIcon,
  Mail,
  Settings,
  UserRound,
} from "lucide-react"
import Image from "next/image"
import React from "react"

function DashboardSidemenu() {
  const Menus: { title: string; icon: React.ReactNode }[] = [
    {
      title: "Home",
      icon: <LayoutDashboardIcon size={18} />,
    },
    {
      title: "My Tasks",
      icon: <ChartAreaIcon size={18} />,
    },
    {
      title: "Settings",
      icon: <GitCompareArrows size={18} />,
    },
    {
      title: "Members",
      icon: <GitCompareArrows size={18} />,
    },
  ]
  return (
    <SidebarContainer className="h-full border-r border-dashed">
      <SidebarTrigger />
      <SidebarHeader>
        <Image src={"/logo.svg"} width={100} height={100} alt="logo" />
      </SidebarHeader>
      <SidebarList>
        {Menus?.map((childValues) => {
          return (
            <SidebarItem
              icon={childValues?.icon}
              key={childValues?.title}
              title={childValues?.title}
            >
              {childValues?.title}
            </SidebarItem>
          )
        })}
      </SidebarList>
    </SidebarContainer>
  )
}

export default DashboardSidemenu

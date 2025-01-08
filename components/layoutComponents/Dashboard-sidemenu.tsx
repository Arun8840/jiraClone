"use client"
import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import {
  ChartAreaIcon,
  GitCompareArrows,
  LayoutDashboardIcon,
} from "lucide-react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import AccountButton from "./AccountButton"

function DashboardSidemenu() {
  const Menus: { title: string; icon: React.ReactNode; url: string }[] = [
    {
      title: "Workspaces",
      icon: <LayoutDashboardIcon />,
      url: "#",
    },
    {
      title: "My Tasks",
      icon: <ChartAreaIcon />,
      url: "#",
    },
    {
      title: "Settings",
      icon: <GitCompareArrows />,
      url: "#",
    },
    {
      title: "Members",
      icon: <GitCompareArrows />,
      url: "/members",
    },
  ]
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Image src={"/logo.svg"} width={110} height={110} alt="logo" />
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {Menus.map((item, itemIndex) => {
                  const firstindex = itemIndex === 0
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        variant={"default"}
                        isActive={firstindex}
                        asChild
                      >
                        <a href={item.url}>
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <AccountButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}

export default DashboardSidemenu

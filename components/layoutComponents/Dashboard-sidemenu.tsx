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
import { CheckCheck, LayoutGridIcon, UsersRound } from "lucide-react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import AccountButton from "./AccountButton"
import WorkspaceSwitcher from "./WorkspaceSwitcher"
import Link from "next/link"

function DashboardSidemenu() {
  const Menus: { title: string; icon: React.ReactNode; url: string }[] = [
    {
      title: "Workspaces",
      icon: <LayoutGridIcon className="fill-current" />,
      url: "/workspaces",
    },
    {
      title: "My Tasks",
      icon: <CheckCheck />,
      url: "#",
    },
    {
      title: "Members",
      icon: <UsersRound />,
      url: "/members",
    },
  ]
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Image src={"/logo.svg"} width={150} height={150} alt="logo" />
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <WorkspaceSwitcher />
                </SidebarMenuItem>
                {/* <Separator /> */}
                {Menus.map((item, itemIndex) => {
                  return (
                    <SidebarMenuItem
                      className="dark:text-secondary"
                      key={item.title}
                    >
                      <SidebarMenuButton
                        className="p-3 h-10"
                        variant={"default"}
                        asChild
                      >
                        <Link href={item.url}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
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

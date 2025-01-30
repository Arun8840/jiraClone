"use client"
import React from "react"
import {
  Sidebar,
  SidebarContent,
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
import WorkspaceSwitcher from "./WorkspaceSwitcher"
import Link from "next/link"
import { useGetParamId } from "@/hooks/use-getParamId"
import ProjectsList from "../workspaces/Projects/components/ProjectsList"

function DashboardSidemenu() {
  const { workspaceId } = useGetParamId()
  const Menus: { title: string; icon: React.ReactNode; url: string }[] = [
    {
      title: "Workspaces",
      icon: <LayoutGridIcon className="fill-current" />,
      url: "/workspaces",
    },
    {
      title: "My Tasks",
      icon: <CheckCheck />,
      url: `/workspaces/${workspaceId}/tasks`,
    },
    {
      title: "Members",
      icon: <UsersRound />,
      url: "/members",
    },
  ]
  return (
    <>
      <Sidebar className="bg-card dark:bg-neutral-950 group-data-[side=left]:border-r-0">
        <SidebarHeader>
          <div className="flex items-center gap-3">
            <Image src={"/logo.svg"} width={20} height={20} alt="logo" />
            <h1 className="font-bold font flex-1 capitalize tracking-wide text-primary">
              Jira Clone
            </h1>
          </div>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* //* WORKSPACE SWITCHER */}
                <SidebarMenuItem>
                  <WorkspaceSwitcher />
                </SidebarMenuItem>
                {Menus.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
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

                {/* //* PROJECT SWITCHER */}
                <SidebarMenuItem>
                  <ProjectsList />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

export default DashboardSidemenu

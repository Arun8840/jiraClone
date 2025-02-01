"use client"
import React, { Suspense } from "react"
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
import { CheckCheck, Home, Settings } from "lucide-react"
import Image from "next/image"
import { Separator } from "../ui/separator"
import WorkspaceSwitcher from "./WorkspaceSwitcher"
import Link from "next/link"
import { useGetParamId } from "@/hooks/use-getParamId"
import ProjectsList from "../workspaces/Projects/components/ProjectsList"
import { usePathname } from "next/navigation"
import { Loader } from "@/Utility/Ui/Loader"

function DashboardSidemenu() {
  const currentPath = usePathname()
  const { workspaceId } = useGetParamId()
  const Menus: { title: string; icon: React.ReactNode; url: string }[] = [
    {
      title: "Home",
      icon: <Home />,
      url: `/workspaces/${workspaceId}`,
    },
    // {
    //   title: "Workspaces",
    //   icon: <LayoutGridIcon />,
    //   url: `/workspaces`,
    // },
    {
      title: "My Tasks",
      icon: <CheckCheck />,
      url: `/workspaces/${workspaceId}/tasks`,
    },
    {
      title: "Settings",
      icon: <Settings />,
      url: `/workspaces/${workspaceId}/settings`,
    },
    // {
    //   title: "Members",
    //   icon: <UsersRound />,
    //   url: "/members",
    // },
  ]

  return (
    <>
      <Sidebar className="bg-card dark:bg-inherit group-data-[side=left]:border-r-0">
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
                  <Suspense fallback={<Loader />}>
                    <WorkspaceSwitcher />
                  </Suspense>
                </SidebarMenuItem>
                {Menus.map((item) => {
                  const isActive = item?.url === currentPath
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className={`p-3 h-10 ${
                          isActive && "bg-muted text-primary dark:bg-card"
                        }`}
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
                  <Suspense fallback={<Loader />}>
                    <ProjectsList />
                  </Suspense>
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

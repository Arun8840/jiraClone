import DashboardSidemenu from "@/components/layoutComponents/Dashboard-sidemenu"
import Header from "@/components/layoutComponents/Header"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <section className="h-screen bg-neutral-100 dark:bg-black flex w-full">
        <DashboardSidemenu />
        <div className="flex-1 flex flex-col">
          <Header />
          {children}
        </div>
      </section>
    </SidebarProvider>
  )
}

export default DashboardLayout

import DashboardSidemenu from "@/components/layoutComponents/Dashboard-sidemenu"
import Header from "@/components/layoutComponents/Header"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <section className="h-screen bg-neutral-100 dark:bg-black flex w-full">
        <DashboardSidemenu />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header />
          <div className="flex-1 bg-fixed dark:bg-[repeating-linear-gradient(0deg,black_0_5px,transparent_10px_5px),repeating-linear-gradient(90deg,#181C14_0_2px,transparent_2px_10px)]">
            {children}
          </div>
        </div>
      </section>
    </SidebarProvider>
  )
}

export default DashboardLayout

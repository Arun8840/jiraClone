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
          <div className="flex-1 bg-fixed bg-[radial-gradient(#373A40_.5px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#fff_100%,transparent_100%)]">
            {children}
          </div>
        </div>
      </section>
    </SidebarProvider>
  )
}

export default DashboardLayout

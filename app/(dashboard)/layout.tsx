import DashboardSidemenu from "@/components/layoutComponents/Dashboard-sidemenu"
import Header from "@/components/layoutComponents/Header"
import React from "react"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid min-h-screen">
      <main className="flex-1 flex">
        <div className="max-h-full">
          <DashboardSidemenu />
        </div>
        <div className="flex-1">
          <Header />
          {children}
        </div>
      </main>
    </section>
  )
}

export default DashboardLayout

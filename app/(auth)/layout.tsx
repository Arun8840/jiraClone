import { SplashScreen } from "@/Utility/Ui/Splash-screen"
import React from "react"

interface LayoutProps {
  children: React.ReactNode
}
function AuthLayout({ children }: LayoutProps) {
  return (
    <section className="min-h-screen flex flex-col dark:bg-background">
      <SplashScreen />
      {children}
    </section>
  )
}

export default AuthLayout

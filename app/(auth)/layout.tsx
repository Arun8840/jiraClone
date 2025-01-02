import Image from "next/image"
import React from "react"

interface LayoutProps {
  children: React.ReactNode
}
function AuthLayout({ children }: LayoutProps) {
  return (
    <section className="min-h-screen flex flex-col bg-[#EEEEEE50]">
      <div className="flex justify-between p-3">
        <Image src={"./logo.svg"} alt="Logo" width={150} height={150} />
      </div>
      {children}
    </section>
  )
}

export default AuthLayout

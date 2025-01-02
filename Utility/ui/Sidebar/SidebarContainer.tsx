"use client"

import { cn } from "@/Utility/cn"
import React, {
  createContext,
  CSSProperties,
  HTMLAttributes,
  useContext,
  useRef,
  useState,
} from "react"
import theme from "../../theme.json"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  defaultOpen?: boolean
}

interface SidebarContextProps {
  isOpen: boolean
  setopen: (value: boolean) => void
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

gsap.registerPlugin(useGSAP)

function SidebarContainer({
  children,
  className,
  defaultOpen = false,
  ...otherProps
}: ContainerProps) {
  const [isOpen, setopen] = useState(defaultOpen)
  const menuContainer_Ref = useRef<HTMLDivElement>(null)
  const { background, selected, textcolor } = theme?.sidebar_theme || {}
  const styleVariables = {
    "--main-bg": background ?? "#18181b",
    "--text-color": textcolor ?? "#FFFFFF",
    "--selected-color": selected ?? theme?.primary,
  } as React.CSSProperties

  const baseClass =
    "w-[300px] font-poppins_normal divide-y divide-dashed divide-stone-800/10 h-full bg-[var(--main-bg)] flex flex-col relative"

  const tl = gsap.timeline({ paused: true })
  const expandAnimation = tl.fromTo(
    menuContainer_Ref.current,
    {
      width: 300,
      overflow: "visible",
      duration: 0.3,
    },
    {
      width: "fit-content",
      overflow: "hidden",
      duration: 0.3,
    }
  )

  useGSAP(
    () => {
      if (isOpen) {
        expandAnimation.play()
      } else {
        expandAnimation?.revert()
      }
    },
    { dependencies: [isOpen] }
  )

  return (
    <SidebarContext.Provider value={{ isOpen, setopen }}>
      <aside
        ref={menuContainer_Ref}
        style={styleVariables}
        className={cn(baseClass, className)}
        {...otherProps}
      >
        {/* Header */}
        {React.Children.toArray(children).filter(
          (child: any) => child?.type?.displayName === "SidebarHeader"
        )}
        {React.Children.toArray(children).filter(
          (child: any) => child?.type?.displayName === "SidebarTrigger"
        )}
        {/* Main Content */}
        {React.Children.toArray(children).filter(
          (child: any) => child?.type?.displayName === "SidebarList"
        )}
        {React.Children.toArray(children).filter(
          (child: any) => child?.type?.displayName === "SidebarGroup"
        )}
        {/* Footer */}
        {React.Children.toArray(children).filter(
          (child: any) => child?.type?.displayName === "SidebarFooter"
        )}
      </aside>
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarContainer")
  }
  return context
}

export default SidebarContainer

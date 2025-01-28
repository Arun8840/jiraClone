import { cn } from "@/lib/utils"
import React, { HTMLAttributes, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

interface SiriProps extends HTMLAttributes<HTMLDivElement> {}

export const SiriAnimation: React.FC<SiriProps> = () => {
  const siriRef = useRef<HTMLDivElement>(null)

  const baseClass =
    "h-0.5 bg-gradient-to-r from-blue-800 via-pink-700 to-orange-500"

  useGSAP(() => {
    gsap.to(siriRef.current, {
      backgroundPosition: "100% 0%",
      repeat: -1,
      width: "100%",
      duration: 0.4,
      ease: "linear",
      yoyo: true,
    })
  }, [])

  return <div ref={siriRef} className={cn(baseClass)} />
}

"use client"
import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import React, { HTMLAttributes, useRef } from "react"

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  message?: string
}

gsap.registerPlugin(useGSAP)
export const Loader: React.FC<LoaderProps> = ({
  className,
  message,
  ...props
}) => {
  const loaderRef = useRef<HTMLUListElement>(null)
  const baseClass = "size-full grid place-items-center"
  const tl = gsap.timeline({ paused: false, repeat: -1, yoyo: true })

  useGSAP(
    () => {
      if (loaderRef.current?.children) {
        tl.fromTo(
          loaderRef?.current?.children,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            stagger: 0.1,
            duration: 0.2,
          }
        )
      }
    },
    {
      scope: loaderRef,
    }
  )

  return (
    <div {...props} className={cn(baseClass, className)}>
      <div className="flex items-center gap-2">
        {/* <LoaderIcon size={18} className="animate-spin origin-center" /> */}
        <ul
          ref={loaderRef}
          className="flex gap-1 *:h-3 *:w-0.5 *:rounded-full *:origin-bottom"
        >
          {[...Array(4)].map((_, index) => (
            <li key={index} className="bg-primary dark:bg-white"></li>
          ))}
        </ul>
        <small className="font-poppins_normal tracking-wide truncate">
          {message}
        </small>
      </div>
    </div>
  )
}

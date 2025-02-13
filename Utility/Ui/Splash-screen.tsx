"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import React, { useRef } from "react"

gsap.registerPlugin(useGSAP)

export const SplashScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const tl = gsap.timeline({ paused: false, yoyo: true })
  useGSAP(
    () => {
      tl.fromTo(
        imageRef.current,
        { scale: 0, transformOrigin: "center" },
        { scale: 1, transformOrigin: "center" }
      )
        .to(imageRef.current, { delay: 1, scale: 0 })
        .to(containerRef.current, { opacity: 0, display: "none" })
    },
    {
      scope: containerRef,
    }
  )
  return (
    <section
      ref={containerRef}
      className="h-screen size-full bg-black absolute z-10 grid place-items-center"
    >
      <div className="size-fit">
        <Image
          className="scale-0"
          ref={imageRef}
          src={"/logo.svg"}
          width={100}
          height={100}
          alt="logo"
        />
      </div>
    </section>
  )
}

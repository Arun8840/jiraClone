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
        { scale: 0, opacity: 0, transformOrigin: "center" },
        {
          scale: 1,
          opacity: 1,
          rotate: 360,
          transformOrigin: "center",
          duration: 1,
        }
      )
        .to(imageRef.current, {
          filter: "brightness(2) drop-shadow(0px 0px 5px #D2FF72)",
        })
        .to(imageRef.current, {
          filter: "brightness(2) drop-shadow(0px 0px 40px #D2FF72)",
        })
        .to(imageRef.current, {
          filter: "brightness(2) drop-shadow(0px 0px 60px #D2FF72)",
        })
        .to(imageRef.current, {
          opacity: 0,
          duration: 1,
          delay: 1,
        })
        .to(containerRef.current, { opacity: 0, display: "none" })
    },
    {
      scope: containerRef,
    }
  )
  return (
    <section
      ref={containerRef}
      className="h-screen overflow-hidden size-full bg-black absolute z-10 grid place-items-center"
    >
      <div className="size-fit">
        <Image
          className="scale-0 brightness-200"
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

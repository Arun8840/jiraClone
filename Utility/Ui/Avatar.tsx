import { cn } from "@/lib/utils"
import Image from "next/image"
import React, { HTMLAttributes } from "react"

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl?: File | null | undefined | string
  title: string
}
const Avatar: React.FC<AvatarProps> = ({
  className,
  imageUrl,
  title,
  ...otherProps
}) => {
  const baseClass =
    "bg-primary grid place-items-center rounded-full text-xs size-7 overflow-hidden text-white"

  const nameLetter = title?.charAt(0).toUpperCase()
  return (
    <div {...otherProps} title={title} className={cn(baseClass, className)}>
      {imageUrl ? (
        <Image
          src={
            imageUrl instanceof File ? URL.createObjectURL(imageUrl) : imageUrl
          }
          alt="Avatar"
          width={100}
          height={100}
          className="size-full object-center"
        />
      ) : (
        <h1 className="font-poppins_normal">{nameLetter}</h1>
      )}
    </div>
  )
}

export default Avatar

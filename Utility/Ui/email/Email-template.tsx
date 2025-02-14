import Link from "next/link"
import React from "react"

interface EmailTemplateProps {
  title: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  title,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 font-poppins_normal bg-white rounded-lg p-4 shadow-md">
      <h1 className="text-2xl font-bold text-primary">
        Welcome to our Workspace!
      </h1>
      <a href={title} className="text-lg text-primary">
        {title}
      </a>
    </div>
  )
}

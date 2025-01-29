"use client"
import React from "react"
import { Projects } from "../type"
import { Images, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import TaskViewer from "@/components/Task/Task-viewer"

interface ProjectDetailsTypes {
  initialValue: Projects
}
function ProjectDetails({ initialValue }: ProjectDetailsTypes) {
  return (
    <section className="size-full dark:bg-black">
      {/* //* HEADER */}
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 size-10 grid place-items-center rounded-full">
            {initialValue?.imageUrl ? (
              <Image
                src={initialValue?.imageUrl}
                alt="ProjectImage"
                width={50}
                height={50}
              />
            ) : (
              <Images size={18} className="text-muted-foreground" />
            )}
          </div>
          <h1 className="font-poppins_normal text-lg">{initialValue?.name}</h1>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            className="flex items-center gap-2"
            href={`/workspaces/${initialValue?.workspaceId}/project/${initialValue?.$id}/settings`}
          >
            <Button title="Open Project info" variant={"ghost"}>
              <Info className="text-primary" size={18} />
            </Button>
          </Link>
        </div>
      </div>

      {/* //* VIEW OF THE TASK DATA */}
      <div className="p-2 bg-inherit">
        <TaskViewer />
      </div>
    </section>
  )
}

export default ProjectDetails

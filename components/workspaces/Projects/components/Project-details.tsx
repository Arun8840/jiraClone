"use client"
import React from "react"
import { Projects } from "../type"
import { Images, Logs, Pen } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import TaskViewer from "@/components/Task/Task-viewer"
import { useCreateTasktModal } from "@/hooks/use-create-task"
import { CreateTaskModal } from "@/components/Task/components/Modal/Create-task-modal"

interface ProjectDetailsTypes {
  initialValue: Projects
}
function ProjectDetails({ initialValue }: ProjectDetailsTypes) {
  const { open } = useCreateTasktModal()
  return (
    <section className="size-full dark:bg-black">
      <CreateTaskModal />
      {/* //* HEADER */}
      <div className="sticky top-0 z-10 flex justify-between p-2">
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
          <h1 className="font-poppins_normal dark:text-secondary text-lg">
            {initialValue?.name}
          </h1>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button onClick={open}>
            <Logs />
            New Task
          </Button>
          <Button variant={"ghost"}>
            <Link
              className="flex items-center gap-2"
              href={`/workspaces/${initialValue?.workspaceId}/project/${initialValue?.$id}/settings`}
            >
              <Pen className="fill-current text-muted-foreground" size={18} />
            </Link>
          </Button>
        </div>
      </div>

      {/* //* VIEW OF THE TASK DATA */}
      <div className="p-2">
        <TaskViewer />
      </div>
    </section>
  )
}

export default ProjectDetails

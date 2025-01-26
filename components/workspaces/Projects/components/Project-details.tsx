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
    <section className="size-full bg-neutral-50 dark:bg-background">
      <CreateTaskModal />
      {/* //* HEADER */}
      <div className="flex justify-between p-2 bg-[url('/projectBanner.png')] bg-center bg-cover">
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
          <h1 className="font-poppins_normal text-lg text-white">
            {initialValue?.name}
          </h1>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button onClick={open}>
            <Logs />
            Create Task
          </Button>
          <Button variant={"secondary"}>
            <Link
              className="flex items-center gap-2"
              href={`/workspaces/${initialValue?.workspaceId}/project/${initialValue?.$id}/settings`}
            >
              <Pen size={18} />
              Edit Project
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

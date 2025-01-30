"use client"
import React from "react"
import { Images, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import TaskViewer from "@/components/Task/Task-viewer"
import { useGetParamId } from "@/hooks/use-getParamId"
import { useGetProject } from "../api/use-get-project"
import { Loader } from "@/Utility/Ui/Loader"
import ErrorComponent from "@/Utility/Ui/Error-component"

function ProjectDetails() {
  const { projectId } = useGetParamId()
  const { data: project, isLoading, error } = useGetProject({ projectId })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorComponent />
  }

  return (
    <section className="size-full dark:bg-black flex flex-col">
      {/* //* HEADER */}
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 size-10 grid place-items-center rounded-full">
            {project?.imageUrl ? (
              <Image
                src={project?.imageUrl}
                alt="ProjectImage"
                width={50}
                height={50}
              />
            ) : (
              <Images size={18} className="text-muted-foreground" />
            )}
          </div>
          <h1 className="font-poppins_normal text-lg">{project?.name}</h1>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            className="flex items-center gap-2"
            href={`/workspaces/${project?.workspaceId}/project/${project?.$id}/settings`}
          >
            <Button title="Open Project info" variant={"ghost"}>
              <Info className="text-primary" size={18} />
            </Button>
          </Link>
        </div>
      </div>

      {/* //* VIEW OF THE TASK DATA */}
      <div className="p-2 bg-inherit flex-1">
        <TaskViewer />
      </div>
    </section>
  )
}

export default ProjectDetails

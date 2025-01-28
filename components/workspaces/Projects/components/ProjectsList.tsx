"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"
import React from "react"
import { useGetProjects } from "../api/use-get-projects"
import { useCreateProjectModal } from "@/hooks/use-createProject-modal"
import Link from "next/link"
import { useGetParamId } from "@/hooks/use-getParamId"
import { CreateProjectModal } from "./modals/Create-project-modal"
import { Loader } from "@/Utility/Ui/Loader"
function ProjectsList() {
  const { open } = useCreateProjectModal()
  // * load projects data
  const { workspaceId } = useGetParamId()
  const { data, isPending } = useGetProjects({ workspaceId })
  return (
    <>
      <CreateProjectModal />

      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium  font-poppins_normal p-2">
            Projects
          </h1>

          <Button type="button" onClick={open}>
            <Plus /> Create project
          </Button>
        </div>

        <div className="flex-1 grid lg:grid-cols-4 auto-rows-max gap-2 pt-3 ">
          {isPending ? (
            <Loader className="col-span-full dark:text-primary" />
          ) : data?.documents && data?.documents?.length > 0 ? (
            data?.documents?.map((projectValues) => {
              return (
                <div
                  key={projectValues?.$id}
                  className="p-2 min-h-[100px] flex justify-between flex-col bg-card rounded-lg"
                >
                  <div>
                    <h1 className="font-poppins_normal font-medium p-1 text-neutral-600 dark:text-foreground">
                      {projectValues?.name}
                    </h1>
                  </div>
                  <div className="flex justify-between items-center">
                    <small className="text-muted-foreground px-1">
                      {projectValues?.$createdAt?.split("T")[0]}
                    </small>
                    <Link
                      href={`/workspaces/${workspaceId}/project/${projectValues.$id}`}
                    >
                      <Button variant={"ghost"} className="size-fit p-2">
                        <ArrowRight />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full  grid place-items-center">
              <h1 className="text-center p-2 text-muted-foreground">
                No projects found
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProjectsList

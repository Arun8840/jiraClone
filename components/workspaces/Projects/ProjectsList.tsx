"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { useGetProjects } from "./api/use-get-projects"
import { CreateProjectModal } from "./components/Create-project-modal"
import { useCreateProjectModal } from "@/hooks/use-createProject-modal"

interface ProjectPageProps {
  workspaceId: string
}
function ProjectsList({ workspaceId }: ProjectPageProps) {
  const router = useRouter()
  const { open } = useCreateProjectModal()
  // * load projects data
  const { data, isPending } = useGetProjects({ workspaceId })
  return (
    <section className="flex flex-col gap-3">
      <CreateProjectModal />
      <Button
        onClick={() => router.back()}
        className="size-fit p-2"
        variant={"ghost"}
      >
        <ArrowLeft />
        Back
      </Button>
      <div className="bg-white rounded p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium font-poppins_normal p-2">
            Projects
          </h1>

          <Button type="button" onClick={open}>
            <Plus /> Create project
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-2 pt-3">
          {isPending ? (
            <div className="p-2 bg-neutral-100 grid place-items-center min-h-[100px] rounded-lg">
              <Loader className="animate-spin origin-center" />
            </div>
          ) : data?.documents && data?.documents?.length > 0 ? (
            data?.documents?.map((projectValues) => {
              return (
                <div
                  key={projectValues?.$id}
                  className="p-2 min-h-[100px] bg-neutral-100 rounded-lg hover:shadow-md transition-shadow duration-150"
                >
                  <h1 className="font-poppins_normal font-medium p-1 text-neutral-600">
                    {projectValues?.name}
                  </h1>
                </div>
              )
            })
          ) : (
            <div className="col-span-full">
              <h1 className="text-center p-2 text-muted-foreground">
                No projects found
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsList

import { useGetParamId } from "@/hooks/use-getParamId"
import React from "react"
import { useGetProjects } from "../api/use-get-projects"
import { Loader } from "@/Utility/Ui/Loader"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useCreateProjectModal } from "@/hooks/use-createProject-modal"
import { CreateProjectModal } from "./modals/Create-project-modal"
import Avatar from "@/Utility/Ui/Avatar"

function ProjectsList() {
  const { workspaceId, projectId } = useGetParamId()
  const { data, isLoading } = useGetProjects({ workspaceId })
  const { open } = useCreateProjectModal()

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="grid gap-2">
      <CreateProjectModal />
      <div className="flex items-center justify-between">
        <h1 className="p-1">Projects</h1>
        <Button
          onClick={open}
          title="Create Project"
          className="size-fit p-1"
          variant={"ghost"}
        >
          <PlusCircle className="hover:text-primary dark:text-primary text-muted-foreground" />
        </Button>
      </div>

      <ul className="flex flex-col gap-1">
        {data?.documents.map((project) => {
          const isActive = project.$id === projectId
          return (
            <li key={project.$id}>
              <Link
                href={`/workspaces/${workspaceId}/project/${project.$id}`}
                className={`flex items-center gap-2 p-1 hover:bg-muted ${
                  isActive && "bg-muted"
                } rounded`}
              >
                <Avatar title={project.name} />
                <h1 className="flex-1">{project.name}</h1>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProjectsList

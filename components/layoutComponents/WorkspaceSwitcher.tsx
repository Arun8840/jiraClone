import React from "react"
import { useGetWorkspaces } from "../workspaces/api/use-get-workspaces"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useRouter } from "next/navigation"
import { Loader } from "@/Utility/Ui/Loader"
import { useGetParamId } from "@/hooks/use-getParamId"
import { useCreateWorkspaceModal } from "@/hooks/use-createWorkspace-modal"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import { CreateWorkspaceModal } from "../workspaces/components/modals/Create-workspace-modal"

function WorkspaceSwitcher() {
  const router = useRouter()
  const { workspaceId } = useGetParamId()
  const { open } = useCreateWorkspaceModal()
  const { data: workspacesData, isPending } = useGetWorkspaces()
  const workspaces = workspacesData?.documents || []

  const handleChangeWorkspace_Switcher = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`)
  }

  return (
    <div>
      <CreateWorkspaceModal />
      {isPending ? (
        <Loader className="dark:text-primary" />
      ) : (
        <div>
          <div className="flex items-center justify-between pb-1">
            <h1 className="text-sm p-1 flex-1">Workspaces</h1>
            <Button
              onClick={open}
              title="Create Workspace"
              className="size-fit p-1"
              variant={"ghost"}
            >
              <PlusCircle className="hover:text-primary dark:text-primary text-muted-foreground" />
            </Button>
          </div>
          <Select
            defaultValue={workspaceId}
            onValueChange={handleChangeWorkspace_Switcher}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Workspaces" />
            </SelectTrigger>
            <SelectContent>
              {workspaces?.length > 0 ? (
                workspaces?.map((workspaceOptions) => {
                  return (
                    <SelectItem
                      value={workspaceOptions.$id}
                      key={workspaceOptions?.$id}
                    >
                      {workspaceOptions?.name}
                    </SelectItem>
                  )
                })
              ) : (
                <SelectItem value=" " disabled className="capitalize">
                  No workspaces found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

export default WorkspaceSwitcher

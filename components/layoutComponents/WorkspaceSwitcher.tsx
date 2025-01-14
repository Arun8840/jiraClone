import React from "react"
import { Loader, Plus } from "lucide-react"
import { useGetWorkspaces } from "../workspaces/api/use-get-workspaces"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useRouter } from "next/navigation"

function WorkspaceSwitcher() {
  const router = useRouter()
  const { data: workspacesData, isPending } = useGetWorkspaces()
  const workspaces = workspacesData?.documents || []

  const handleChangeWorkspace_Switcher = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`)
  }

  return (
    <div>
      {isPending ? (
        <Loader className="animate-spin origin-center mx-auto" size={18} />
      ) : (
        <div className="pt-2">
          <Select onValueChange={handleChangeWorkspace_Switcher}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Workspaces" />
            </SelectTrigger>
            <SelectContent>
              {workspaces?.length > 0 &&
                workspaces?.map((workspaceOptions) => {
                  return (
                    <SelectItem
                      value={workspaceOptions.$id}
                      key={workspaceOptions?.$id}
                    >
                      {workspaceOptions?.name}
                    </SelectItem>
                  )
                })}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

export default WorkspaceSwitcher

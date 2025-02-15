import React from "react"
import { useCurrent } from "../auth/api/use-current"
import { useLogout } from "../auth/api/use-logout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { SidebarMenuButton } from "../ui/sidebar"
import { Loader } from "@/Utility/Ui/Loader"
import Avatar from "@/Utility/Ui/Avatar"
import { LogOut } from "lucide-react"

function AccountButton() {
  const { data } = useCurrent()
  const { mutate, isPending } = useLogout()
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <div className="grid place-items-center">
              {isPending ? (
                <Loader />
              ) : (
                <Avatar title={data?.email as string} />
              )}
            </div>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-max flex flex-col gap-2">
          <DropdownMenuItem className="flex items-center gap-2">
            <Avatar title={data?.name as string} />
            <p className="truncate">{data?.email}</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-destructive text-destructive-foreground"
            onClick={() => mutate()}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AccountButton

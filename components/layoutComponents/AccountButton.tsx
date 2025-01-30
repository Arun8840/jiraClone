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
        <DropdownMenuContent className="w-[--radix-popper-anchor-width] flex flex-col gap-2">
          <DropdownMenuItem>
            <p className="break-words line-clamp-1">{data?.email}</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="bg-destructive/10 text-destructive"
            onClick={() => mutate()}
          >
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AccountButton

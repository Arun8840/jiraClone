import React from "react"
import { ChevronUp, Loader, LogOut, User2, UserRound } from "lucide-react"
import { useCurrent } from "../auth/api/use-current"
import { useLogout } from "../auth/api/use-logout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { SidebarMenuButton } from "../ui/sidebar"

function AccountButton() {
  const { data } = useCurrent()
  const { mutate, isPending } = useLogout()
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            {isPending ? (
              <Loader className="animate-spin origin-center" />
            ) : (
              <User2 />
            )}
            <span>{data?.email}</span>
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width] flex flex-col gap-2">
          <DropdownMenuItem>
            <div className="size-7 rounded-full bg-primary text-white grid place-items-center">
              <h1>{data?.name?.charAt(0).toUpperCase()}</h1>
            </div>
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

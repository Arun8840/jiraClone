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
            <span>{data?.name}</span>
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
          <DropdownMenuItem>
            <UserRound />
            <p className="break-words line-clamp-1">{data?.email}</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => mutate()}>
            <LogOut />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AccountButton

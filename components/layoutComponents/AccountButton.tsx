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
            <div className="bg-primary size-8 rounded-full grid place-items-center">
              {isPending ? (
                <Loader
                  size={15}
                  className="animate-spin origin-center text-secondary"
                />
              ) : (
                <span className="text-secondary">
                  {data?.email.charAt(0).toUpperCase()}
                </span>
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

"use client"
import { useLogout } from "@/components/auth/api/use-logout"
import Button from "@/Utility/ui/Button"
import { Loader, LogOut, UserRound } from "lucide-react"
import React from "react"
import { useCurrent } from "../auth/api/use-current"

function Header() {
  const { data } = useCurrent()
  const { mutate, isPending } = useLogout()

  const letter = data?.name.charAt(0) ?? "U"
  return (
    <nav className="p-1 pr-2 border-b border-dashed w-full flex justify-end items-center">
      <ul>
        <li>
          <Button
            title={data?.email ?? "User"}
            className="rounded-full text-black size-9 p-0 grid place-items-center"
            variant="default"
            onClick={() => mutate()}
          >
            {isPending ? (
              <Loader size={18} className="animate-spin origin-center" />
            ) : (
              letter
            )}
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default Header

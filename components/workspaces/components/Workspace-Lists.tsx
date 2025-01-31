"use client"
import React from "react"
import { useGetWorkspaces } from "../api/use-get-workspaces"
import { ArrowRight, Images, Plus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreateWorkspaceModal } from "./modals/Create-workspace-modal"
import { useCreateWorkspaceModal } from "@/hooks/use-createWorkspace-modal"
import { Loader } from "@/Utility/Ui/Loader"
import Avatar from "@/Utility/Ui/Avatar"

function WorkspaceLists() {
  const { open } = useCreateWorkspaceModal()
  const { data, isPending } = useGetWorkspaces()
  const workspaces = data?.documents
  return (
    <div>
      <CreateWorkspaceModal />
      <div className="flex justify-between items-center p-1">
        <h1 className="text-lg font-medium tracking-wide dark:text-white">
          WorkSpaces
        </h1>
        <Button
          size={"sm"}
          className="hover:bg-primary hover:text-primary-foreground"
          disabled={isPending}
          onClick={open}
        >
          <Plus /> Workspace
        </Button>
      </div>
      <div className=" grid lg:grid-cols-4 gap-2 pt-2">
        {isPending ? (
          <Loader className="bg-white rounded min-h-[100px]" />
        ) : (
          workspaces &&
          workspaces?.map((items) => {
            return (
              <div key={items.$id} className="p-2 bg-card rounded-lg">
                <div className="flex gap-2">
                  <Avatar
                    title={items?.name}
                    className="size-12"
                    imageUrl={items?.imageUrl}
                  />
                  <div>
                    <h1 className="font-medium font-poppins_normal line-clamp-1">
                      {items?.name}
                    </h1>
                    {items?.description && (
                      <small className="line-clamp-1 text-neutral-400 font-light font-poppins_normal">
                        {items?.description}
                      </small>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-end ">
                  <small className="block p-1 text-neutral-400">
                    {items?.$createdAt?.split("T")[0]}
                  </small>
                  <Link href={`/workspaces/${items?.$id}/settings`}>
                    <Button
                      variant={"ghost"}
                      className="size-fit p-2 group-hover/workspace:bg-secondary"
                    >
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default WorkspaceLists

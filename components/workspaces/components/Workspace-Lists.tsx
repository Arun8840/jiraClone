"use client"
import React from "react"
import { useGetWorkspaces } from "../api/use-get-workspaces"
import { ArrowRight, Images, Loader, Plus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreateWorkspaceModal } from "./modals/Create-workspace-modal"
import { useCreateWorkspaceModal } from "@/hooks/use-createWorkspace-modal"

function WorkspaceLists() {
  const { open } = useCreateWorkspaceModal()
  const { data, isPending } = useGetWorkspaces()
  const workspaces = data?.documents
  return (
    <div>
      <CreateWorkspaceModal />
      <div className="flex justify-between items-center p-1">
        <h1 className="text-lg font-medium tracking-wide">WorkSpaces</h1>
        <Button
          className="hover:bg-primary hover:text-primary-foreground"
          disabled={isPending}
          onClick={open}
        >
          <Plus /> Workspace
        </Button>
      </div>
      <div className=" grid lg:grid-cols-4 gap-2 pt-2">
        {isPending ? (
          <div className="size-full grid place-items-center min-h-[100px] border border-dashed rounded-lg bg-white">
            <Loader className="animate-spin origin-center" size={18} />
          </div>
        ) : (
          workspaces &&
          workspaces?.map((items) => {
            return (
              <div
                key={items.$id}
                className="group/workspace p-2 bg-card rounded-lg"
              >
                <div className="flex gap-2">
                  <div className="grid place-items-center overflow-hidden size-14 rounded-xl bg-primary">
                    {items?.imageUrl ? (
                      <Image
                        src={
                          items?.imageUrl instanceof File
                            ? URL.createObjectURL(items?.imageUrl)
                            : items?.imageUrl
                        }
                        width={100}
                        height={100}
                        className="size-full object-center"
                        alt="uploading image"
                      />
                    ) : (
                      <Images color="white" size={20} />
                    )}
                  </div>
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
                  <Link
                    href={`/workspaces/${items?.$id}/settings`}
                    className="opacity-0 group-hover/workspace:opacity-[1] transition-opacity duration-150"
                  >
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

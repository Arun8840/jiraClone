"use client"
import React from "react"
import { useGetWorkspaces } from "../api/use-get-workspaces"
import { Loader } from "lucide-react"

function WorkspaceLists() {
  const { data, isPending } = useGetWorkspaces()
  console.log(data?.documents)
  const workspaces = data?.documents
  return (
    <div className="p-2 grid lg:grid-cols-4 gap-2">
      {isPending ? (
        <div className="size-full grid place-items-center min-h-[100px] border border-dashed rounded-lg bg-white">
          <Loader className="animate-spin origin-center" size={18} />
        </div>
      ) : (
        workspaces &&
        workspaces?.map((items) => {
          return (
            <div
              key={items?.$id}
              className="border border-dashed rounded-lg p-3 min-h-[100px] bg-white"
            >
              <h1>{items?.name}</h1>
            </div>
          )
        })
      )}
    </div>
  )
}

export default WorkspaceLists

import React from "react"
import { CircleDot, MoreHorizontal } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "../types"
interface statusColorsTypes {
  IN_PROGRESS: string
  DONE: string
  IN_REVIEW: string
  BACKLOG: string
}

interface TaksCardPropTypes {
  data: Task[]
}
function TaskCard({ data }: TaksCardPropTypes) {
  const statusColors: statusColorsTypes = {
    IN_PROGRESS: "text-orange-600 bg-orange-600/10",
    DONE: "text-green-600 bg-green-600/10",
    IN_REVIEW: "text-indigo-600 bg-indigo-600/10",
    BACKLOG: "text-red-600 bg-red-600/10",
  }
  return (
    <section className="py-2 grid lg:grid-cols-3 gap-3">
      {data && data?.length > 0 ? (
        data?.map((taskvalues) => {
          return (
            <div
              key={taskvalues?.$id}
              className="rounded-lg p-3 bg-white min-h-28 flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <h1 className="font-poppins_normal font-medium capitalize text-lg line-clamp-1 text-neutral-600">
                  {taskvalues?.name}
                </h1>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal
                      className="text-muted-foreground"
                      size={18}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-muted-foreground text-sm">
                {taskvalues?.description}
              </p>
              <div className="flex gap-2 flex-wrap text-xs">
                <small
                  className={`bg-green-600/10 text-green-600 py-1 px-3 flex items-center gap-2 rounded font-poppins_normal`}
                >
                  <CircleDot className="fill-current" size={10} /> Low
                </small>
                <small
                  className={`bg-yellow-600/10 text-yellow-600 py-1 px-3 flex items-center gap-2 rounded font-poppins_normal`}
                >
                  <CircleDot className="fill-current" size={10} /> Medium
                </small>
                <small
                  className={`bg-red-600/10 text-red-600 py-1 px-3 flex items-center gap-2 rounded font-poppins_normal`}
                >
                  <CircleDot className="fill-current" size={10} /> High
                </small>
              </div>
              <Separator className="space-y-3" />
              <div className="flex justify-between items-center p-1">
                <div className="size-10 bg-blue-600 rounded-full grid place-items-center">
                  <h1 className="text-white">
                    {taskvalues?.assignee?.name?.charAt(0).toUpperCase()}
                  </h1>
                </div>
                <div>
                  <small
                    className={`${
                      statusColors?.[
                        (taskvalues?.status as keyof typeof statusColors) ??
                          "IN_PROGRESS"
                      ]
                    } p-1 text-xs flex items-center gap-2 rounded font-poppins_normal`}
                  >
                    <CircleDot className="fill-current" size={10} />
                    {taskvalues?.status}
                  </small>
                  <small className="text-muted-foreground pt-1 block">
                    {taskvalues?.dueDate?.split("T")[0]}
                  </small>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="col-span-full">
          <h1 className="text-muted-foreground text-center p-3">
            No Tasks found
          </h1>
        </div>
      )}
    </section>
  )
}

export default TaskCard

"use client"
import { useGetTask } from "@/components/Task/api/use-get-task"
import { useGetParamId } from "@/hooks/use-getParamId"
import { Loader } from "@/Utility/Ui/Loader"
import React from "react"

const TaskIdClient = () => {
  const { taskId } = useGetParamId()
  const { isLoading, data: task, error } = useGetTask({ taskId })

  if (isLoading) {
    return <Loader className="dark:text-primary" />
  }

  return (
    <section className="size-full">
      <h1 className="p-2 font-poppins_bold font-medium text-neutral-700 text-lg">
        {task?.name}
      </h1>
    </section>
  )
}

export default TaskIdClient

import React from "react"
import { ResponseAnalyticsTypes } from "./workspaces/Projects/api/use-get-project-analytics"
import AnalyticsCard from "./Task/components/Analytics-card"

function Analytics({ data }: ResponseAnalyticsTypes) {
  return (
    <div className="grid pb-2 md:grid-cols-5 gap-2">
      <AnalyticsCard
        variant={data.taskDifference > 0 ? "up" : "down"}
        title="Total task"
        count={data.taskCount}
        increasedValue={data.taskDifference}
      />
      <AnalyticsCard
        variant={data.assignedTaskDifference > 0 ? "up" : "down"}
        title="Assigned task"
        count={data.assignedTaskCount}
        increasedValue={data.assignedTaskDifference}
      />
      <AnalyticsCard
        variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
        title="Incomplete task"
        count={data.incompleteTaskCount}
        increasedValue={data.incompleteTaskDifference}
      />
      <AnalyticsCard
        variant={data.completeTaskDifference > 0 ? "up" : "down"}
        title="Completed task"
        count={data.completeTaskCount}
        increasedValue={data.completeTaskDifference}
      />
      <AnalyticsCard
        variant={data.overdueTaskDifference > 0 ? "up" : "down"}
        title="Overdue task"
        increasedValue={data.overdueTaskCount}
        count={data.overdueTaskDifference}
      />
    </div>
  )
}

export default Analytics

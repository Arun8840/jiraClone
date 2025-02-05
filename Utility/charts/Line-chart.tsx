import React, { HTMLAttributes } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ResponseAnalyticsTypes } from "@/components/workspaces/api/use-get-workspace-analytics"
import { TrendingUp } from "lucide-react"

interface ChartProps extends HTMLAttributes<HTMLDivElement> {
  data: ResponseAnalyticsTypes
}
function LineChart({ data, className }: ChartProps) {
  const {
    taskCount,
    taskDifference,
    assignedTaskCount,
    assignedTaskDifference,
    incompleteTaskCount,
    incompleteTaskDifference,
    completeTaskCount,
    completeTaskDifference,
    overdueTaskCount,
    overdueTaskDifference,
  } = data.data
  const chartData = [
    { label: "Tasks", count: taskCount, differences: taskDifference },
    {
      label: "Assigned",
      count: assignedTaskCount,
      differences: assignedTaskDifference,
    },
    {
      label: "Completed",
      count: completeTaskCount,
      differences: completeTaskDifference,
    },
    {
      label: "Incompleted",
      count: incompleteTaskCount,
      differences: incompleteTaskDifference,
    },
    {
      label: "Overdue",
      count: overdueTaskCount,
      differences: overdueTaskDifference,
    },
  ]
  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--primary))",
    },
    differences: {
      label: "Differences",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig

  const baseClass = "w-full"

  return (
    <div className={cn(baseClass, className)}>
      <Card className="border-0 shadow-none p-2">
        <CardHeader>
          <div className="flex gap-2 font-medium leading-none">
            Workspace analytics <TrendingUp className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              <Bar
                dataKey="differences"
                fill="var(--color-differences)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing overall workspace data for this month
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LineChart

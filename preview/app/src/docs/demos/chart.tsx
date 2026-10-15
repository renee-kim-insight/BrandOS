import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "May", manual: 186, agent: 80 },
  { month: "Jun", manual: 160, agent: 120 },
  { month: "Jul", manual: 142, agent: 168 },
  { month: "Aug", manual: 120, agent: 210 },
  { month: "Sep", manual: 98, agent: 246 },
  { month: "Oct", manual: 84, agent: 274 },
]

const config = {
  agent: { label: "With an agent", color: "var(--chart-1)" },
  manual: { label: "Manual", color: "var(--chart-3)" },
} satisfies ChartConfig

export default function ChartDemo() {
  return (
    <Card variant="glass" className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Proposals drafted</CardTitle>
        <CardDescription>May to October, sample data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="aspect-[16/9] w-full">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="agent" fill="var(--color-agent)" radius={6} />
            <Bar dataKey="manual" fill="var(--color-manual)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

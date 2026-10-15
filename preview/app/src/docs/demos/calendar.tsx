import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 15))
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 9, 12),
    to: new Date(2026, 9, 16),
  })
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <Card variant="glass" className="p-3">
        <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 9, 1)} />
      </Card>
      <Card variant="glass" className="p-3">
        <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 9, 1)} />
      </Card>
    </div>
  )
}

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <Field className="w-full max-w-60">
      <FieldLabel htmlFor="dp-due">Review due</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={<Button id="dp-due" variant="outline" className="justify-start font-normal" />}
        >
          <CalendarIcon data-icon="inline-start" />
          {date ? format(date, "EEE d MMM yyyy") : <span className="text-muted-foreground">Pick a date</span>}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 9, 1)} />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

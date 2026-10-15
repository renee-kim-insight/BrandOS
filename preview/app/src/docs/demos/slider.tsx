import * as React from "react"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  const [temp, setTemp] = React.useState<number[]>([0.4])
  const [range, setRange] = React.useState<number[]>([20, 80])
  return (
    <div className="flex w-full max-w-sm flex-col gap-10">
      <Field>
        <div className="flex justify-between">
          <FieldLabel>Creativity</FieldLabel>
          <span className="text-sm font-medium tabular-nums">{temp[0].toFixed(1)}</span>
        </div>
        <Slider value={temp} onValueChange={(v) => setTemp(v as number[])} min={0} max={1} step={0.1} aria-label="Creativity" />
        <FieldDescription>Lower is more predictable. Higher tries more ideas.</FieldDescription>
      </Field>
      <Field>
        <div className="flex justify-between">
          <FieldLabel>Page range</FieldLabel>
          <span className="text-sm font-medium tabular-nums">
            {range[0]} to {range[1]}
          </span>
        </div>
        <Slider value={range} onValueChange={(v) => setRange(v as number[])} aria-label="Page range" />
      </Field>
    </div>
  )
}

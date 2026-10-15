import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const models = [
  { label: "Choose a model", value: null },
  { label: "Fast", value: "fast" },
  { label: "Balanced", value: "balanced" },
  { label: "Most capable", value: "capable" },
]

export default function SelectDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>Model</FieldLabel>
      <Select items={models} defaultValue="balanced">
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Speed first</SelectLabel>
            <SelectItem value="fast">Fast</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Quality first</SelectLabel>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="capable">Most capable</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

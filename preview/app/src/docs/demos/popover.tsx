import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="glass" />}>Run limits</PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Run limits</PopoverTitle>
          <PopoverDescription>Applies to every run of this agent.</PopoverDescription>
        </PopoverHeader>
        <FieldGroup className="gap-4">
          <Field orientation="horizontal">
            <FieldLabel htmlFor="pop-tokens" className="flex-1">
              Max tokens
            </FieldLabel>
            <Input id="pop-tokens" defaultValue="20,000" className="w-28" />
          </Field>
          <Field orientation="horizontal">
            <FieldLabel htmlFor="pop-time" className="flex-1">
              Timeout (min)
            </FieldLabel>
            <Input id="pop-time" defaultValue="10" className="w-28" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  )
}

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"

export default function CheckboxDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Field orientation="horizontal">
        <Checkbox id="cb-terms" defaultChecked />
        <FieldLabel htmlFor="cb-terms">Share run history with my team</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="cb-pii" />
        <FieldContent>
          <FieldLabel htmlFor="cb-pii">Redact personal details</FieldLabel>
          <FieldDescription>Names, emails and phone numbers are masked before the model sees them.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="cb-locked" disabled defaultChecked />
        <FieldLabel htmlFor="cb-locked">Audit logging (set by your admin)</FieldLabel>
      </Field>
    </div>
  )
}

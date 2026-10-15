import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function InputDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Field>
        <FieldLabel htmlFor="in-email">Work email</FieldLabel>
        <Input id="in-email" type="email" placeholder="name@company.com" />
        <FieldDescription>We send run summaries here.</FieldDescription>
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="in-region">Data region</FieldLabel>
        <Input id="in-region" defaultValue="Canada (Toronto)" disabled />
      </Field>
      <Field>
        <FieldLabel htmlFor="in-file">Upload notes</FieldLabel>
        <Input id="in-file" type="file" />
      </Field>
    </div>
  )
}

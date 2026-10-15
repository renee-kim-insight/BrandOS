import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="ta-brief">Brief for the agent</FieldLabel>
      <Textarea id="ta-brief" placeholder="Who is the client, what do they need, and what does a good answer look like?" className="min-h-28" />
      <FieldDescription>Two or three sentences is enough.</FieldDescription>
    </Field>
  )
}

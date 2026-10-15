import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function FieldDemo() {
  return (
    <Card variant="glass" className="w-full max-w-md p-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <FieldSet>
          <FieldLegend>New workspace</FieldLegend>
          <FieldDescription>You can change all of this later in Settings.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="f-name">Workspace name</FieldLabel>
              <Input id="f-name" placeholder="e.g. Retail delivery" />
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="f-slug">Web address</FieldLabel>
              <Input id="f-slug" defaultValue="retail delivery" aria-invalid />
              <FieldError>Use lowercase letters, numbers and dashes only, like retail-delivery.</FieldError>
            </Field>
            <FieldSeparator />
            <Field orientation="horizontal">
              <FieldLabel htmlFor="f-public">Visible to everyone in the company</FieldLabel>
              <Switch id="f-public" defaultChecked />
            </Field>
            <Button type="submit" className="self-end">
              Create workspace
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </Card>
  )
}

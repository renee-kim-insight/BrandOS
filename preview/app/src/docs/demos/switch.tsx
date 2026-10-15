import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return (
    <FieldGroup className="glass w-full max-w-sm rounded-3xl border p-6">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="sw-memory">Remember past runs</FieldLabel>
          <FieldDescription>The agent can reuse earlier answers.</FieldDescription>
        </FieldContent>
        <Switch id="sw-memory" defaultChecked />
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="sw-web">Search the web</FieldLabel>
          <FieldDescription>Adds public sources to answers.</FieldDescription>
        </FieldContent>
        <Switch id="sw-web" />
      </Field>
      <Field orientation="horizontal" data-disabled>
        <FieldContent>
          <FieldLabel htmlFor="sw-ext">Share outside the company</FieldLabel>
          <FieldDescription>Turned off by your admin.</FieldDescription>
        </FieldContent>
        <Switch id="sw-ext" disabled />
      </Field>
    </FieldGroup>
  )
}

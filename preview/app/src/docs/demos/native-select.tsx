import { Field, FieldLabel } from "@/components/ui/field"
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="ns-region">Data region</FieldLabel>
      <NativeSelect id="ns-region" defaultValue="ca">
        <NativeSelectOptGroup label="Americas">
          <NativeSelectOption value="ca">Canada</NativeSelectOption>
          <NativeSelectOption value="us">United States</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Europe">
          <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
          <NativeSelectOption value="eu">European Union</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </Field>
  )
}

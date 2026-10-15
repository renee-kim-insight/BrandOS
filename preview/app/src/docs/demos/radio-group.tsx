import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const options = [
  { value: "draft", label: "Save as draft", desc: "Only you can see it." },
  { value: "team", label: "Share with my team", desc: "Your team can run it, not edit it." },
  { value: "company", label: "Publish to the marketplace", desc: "Everyone at the company can find and run it." },
]

export default function RadioGroupDemo() {
  return (
    <FieldSet className="w-full max-w-sm">
      <FieldLegend>Visibility</FieldLegend>
      <RadioGroup defaultValue="team">
        {options.map((o) => (
          <Field key={o.value} orientation="horizontal">
            <RadioGroupItem value={o.value} id={`rg-${o.value}`} />
            <FieldContent>
              <FieldLabel htmlFor={`rg-${o.value}`}>{o.label}</FieldLabel>
              <FieldDescription>{o.desc}</FieldDescription>
            </FieldContent>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}

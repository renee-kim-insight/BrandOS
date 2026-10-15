import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const teams = ["Sales", "Delivery", "Operations", "Finance"]

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="glass" />}>Filter agents</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter agents</SheetTitle>
          <SheetDescription>Show agents owned by these teams.</SheetDescription>
        </SheetHeader>
        <FieldSet className="px-6">
          <FieldLegend variant="label">Teams</FieldLegend>
          <FieldGroup className="gap-3">
            {teams.map((t, i) => (
              <Field key={t} orientation="horizontal">
                <Checkbox id={`sh-${t}`} defaultChecked={i < 2} />
                <FieldLabel htmlFor={`sh-${t}`}>{t}</FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </FieldSet>
        <SheetFooter>
          <SheetClose render={<Button />}>Show 14 agents</SheetClose>
          <SheetClose render={<Button variant="outline" />}>Clear filters</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

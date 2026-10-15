import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="glass" />}>Rename agent</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename agent</DialogTitle>
          <DialogDescription>People in this workspace see the new name right away.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="dlg-name">Name</FieldLabel>
            <Input id="dlg-name" defaultValue="Proposal writer" />
          </Field>
          <Field>
            <FieldLabel htmlFor="dlg-desc">Description</FieldLabel>
            <Textarea id="dlg-desc" defaultValue="Drafts client proposals from discovery notes and past wins." />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button>Save name</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

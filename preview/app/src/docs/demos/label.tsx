import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LabelDemo() {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id="lbl-notify" defaultChecked />
      <Label htmlFor="lbl-notify">Email me when a run fails</Label>
    </div>
  )
}

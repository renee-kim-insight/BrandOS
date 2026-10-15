import { BoldIcon, ItalicIcon, PinIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic" variant="outline">
        <ItalicIcon />
      </Toggle>
      <Toggle defaultPressed variant="outline">
        <PinIcon />
        Pinned
      </Toggle>
    </div>
  )
}

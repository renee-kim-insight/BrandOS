import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <ToggleGroup defaultValue={["left"]} variant="outline" spacing={0}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align centre">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup multiple defaultValue={["sales", "ops"]}>
        <ToggleGroupItem value="sales">Sales</ToggleGroupItem>
        <ToggleGroupItem value="delivery">Delivery</ToggleGroupItem>
        <ToggleGroupItem value="ops">Operations</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

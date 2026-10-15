import * as React from "react"

import { Card } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const releases = Array.from({ length: 40 }, (_, i) => ({
  version: `v2.${40 - i}.0`,
  note: ["Faster cold starts", "New Trace view", "Glass menus", "Bug fixes", "Theme tokens"][i % 5],
}))

const swatches = [
  { name: "Dawn", from: "var(--backdrop-1)", to: "var(--backdrop-2)" },
  { name: "Harbour", from: "var(--backdrop-3)", to: "var(--backdrop-1)" },
  { name: "Bloom", from: "var(--backdrop-2)", to: "var(--chart-2)" },
  { name: "Signal", from: "var(--chart-1)", to: "var(--chart-3)" },
  { name: "Ember", from: "var(--chart-4)", to: "var(--chart-2)" },
  { name: "Tide", from: "var(--chart-3)", to: "var(--backdrop-3)" },
]

export default function ScrollAreaDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-6">
      <Card variant="glass" className="w-60 gap-0 p-0">
        <ScrollArea className="h-80">
          <div className="p-5">
            <h4 className="mb-4 text-sm font-semibold">Release notes</h4>
            {releases.map((r) => (
              <React.Fragment key={r.version}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-mono text-xs">{r.version}</span>
                  <span className="text-muted-foreground">{r.note}</span>
                </div>
                <Separator className="my-2.5" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card variant="glass" className="w-full max-w-sm gap-0 p-0">
        <ScrollArea className="w-full">
          <div className="flex w-max gap-3 p-4">
            {swatches.map((s) => (
              <figure key={s.name} className="flex w-36 shrink-0 flex-col gap-2">
                <div
                  className="aspect-[3/4] rounded-2xl"
                  style={{ background: `linear-gradient(160deg, ${s.from}, ${s.to})` }}
                />
                <figcaption className="text-muted-foreground text-xs">
                  <span className="text-foreground font-medium">{s.name}</span> backdrop
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  )
}

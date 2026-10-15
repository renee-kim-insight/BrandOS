import { Separator } from "@/components/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="glass w-full max-w-sm rounded-3xl border p-6">
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold">Proposal writer</h4>
        <p className="text-muted-foreground text-sm">Owned by the sales team</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Runs</span>
        <Separator orientation="vertical" />
        <span>Settings</span>
        <Separator orientation="vertical" />
        <span>Access</span>
      </div>
    </div>
  )
}

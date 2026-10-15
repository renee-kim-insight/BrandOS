import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="glass"
        onClick={() =>
          toast.add({ title: "Run finished", description: "Proposal writer drafted 6 pages in 48 seconds." })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.add({ title: "Connection expired", description: "Reconnect Salesforce in Settings to keep syncing." })
        }
      >
        Show warning
      </Button>
    </div>
  )
}

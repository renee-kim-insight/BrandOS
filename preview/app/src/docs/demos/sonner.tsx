import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="glass"
        onClick={() =>
          toast("Agent published", {
            description: "Everyone in the workspace can run it now.",
            action: { label: "Undo", onClick: () => toast("Publishing undone") },
          })
        }
      >
        Show toast
      </Button>
      <Button variant="outline" onClick={() => toast.success("Proposal saved to SharePoint")}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1600)), {
            loading: "Exporting run history",
            success: "Export ready",
            error: "Export failed. Try again.",
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}

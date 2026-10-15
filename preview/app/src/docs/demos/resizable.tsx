import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="glass min-h-64 w-full max-w-xl rounded-3xl border">
      <ResizablePanel defaultSize="30%">
        <div className="flex h-full flex-col gap-2 p-5 text-sm">
          <span className="font-semibold">Runs</span>
          <span className="text-muted-foreground">r-1042</span>
          <span className="text-muted-foreground">r-1041</span>
          <span className="text-muted-foreground">r-1040</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="60%">
            <div className="flex h-full items-center justify-center p-5 text-sm font-medium">Output</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="40%">
            <div className="text-muted-foreground flex h-full items-center justify-center p-5 text-sm">Logs</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

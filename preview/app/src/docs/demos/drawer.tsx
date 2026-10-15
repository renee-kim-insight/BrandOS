import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Progress } from "@/components/ui/progress"

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="glass" />}>View run details</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Run r-1041</DrawerTitle>
            <DrawerDescription>Meeting summariser, started 4 minutes ago.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-2 px-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transcribing</span>
              <span className="font-medium tabular-nums">72%</span>
            </div>
            <Progress value={72} aria-label="Run progress" />
          </div>
          <DrawerFooter>
            <Button>Open transcript</Button>
            <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

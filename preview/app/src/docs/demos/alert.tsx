import { CircleAlertIcon, InfoIcon } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AlertDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Alert>
        <InfoIcon />
        <AlertTitle>New model available</AlertTitle>
        <AlertDescription>Agents on the default model will switch on Monday. Pin a version to keep the current one.</AlertDescription>
        <AlertAction>
          <Button size="sm" variant="outline">
            Pin version
          </Button>
        </AlertAction>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Runs pause in 3 days. Update the card on file to keep them going.</AlertDescription>
      </Alert>
    </div>
  )
}

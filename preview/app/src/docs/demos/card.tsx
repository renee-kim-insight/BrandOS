import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function AgentCard({ variant }: { variant: "default" | "glass" }) {
  return (
    <Card variant={variant} className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Proposal writer</CardTitle>
        <CardDescription>Drafts client proposals from discovery notes and past wins.</CardDescription>
        <CardAction>
          <Badge variant={variant === "glass" ? "glass" : "secondary"}>Sales</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">Last run 2 hours ago by Sam Wong</CardContent>
      <CardFooter className="justify-between">
        <span className="text-muted-foreground text-xs">{variant === "glass" ? "variant=\"glass\"" : "default"}</span>
        <Button size="sm">Run agent</Button>
      </CardFooter>
    </Card>
  )
}

export default function CardDemo() {
  return (
    <div className="flex w-full flex-wrap items-stretch justify-center gap-6">
      <AgentCard variant="default" />
      <AgentCard variant="glass" />
    </div>
  )
}

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ArrowUpIcon, MailIcon, PaperclipIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group"
import { Message, MessageContent } from "@/components/ui/message"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

const runs = [
  { day: "Mon", runs: 186 },
  { day: "Tue", runs: 305 },
  { day: "Wed", runs: 237 },
  { day: "Thu", runs: 273 },
  { day: "Fri", runs: 409 },
  { day: "Sat", runs: 214 },
  { day: "Sun", runs: 260 },
]
const chartConfig = { runs: { label: "Runs", color: "var(--chart-1)" } } satisfies ChartConfig

export function Showcase() {
  return (
    <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="flex flex-col gap-3 sm:gap-4">
        <InviteCard />
        <NotificationsCard />
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <ChatCard />
        <Card variant="glass" className="items-center">
          <CardContent>
            <CalendarDemo />
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 md:col-span-2 xl:col-span-1">
        <RunsCard />
        <BudgetCard />
      </div>
    </div>
  )
}

function InviteCard() {
  const people = [
    { initials: "RK", name: "Renee Kim", email: "renee@example.com", role: "Owner" },
    { initials: "SW", name: "Sam Wong", email: "sam@example.com", role: "Editor" },
    { initials: "JD", name: "Jordan Diaz", email: "jordan@example.com", role: "Viewer" },
  ]
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Invite your team</CardTitle>
        <CardDescription>They get access to every agent in this workspace.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Field>
          <FieldLabel htmlFor="sc-invite">Work email</FieldLabel>
          <div className="flex gap-2">
            <InputGroup>
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
              <InputGroupInput id="sc-invite" type="email" placeholder="name@company.com" />
            </InputGroup>
            <Button onClick={() => toast.success("Invite sent")}>Send invite</Button>
          </div>
        </Field>
        <Separator />
        <ul className="flex flex-col gap-4">
          {people.map((p) => (
            <li key={p.email} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{p.initials}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="text-sm font-medium">{p.name}</span>
                <span className="text-muted-foreground truncate text-xs">{p.email}</span>
              </div>
              <Badge variant={p.role === "Owner" ? "default" : "secondary"} className="ml-auto">
                {p.role}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function NotificationsCard() {
  const rows = [
    { id: "sc-runs", label: "Run finished", desc: "When an agent you started completes.", on: true },
    { id: "sc-mentions", label: "Mentions", desc: "When someone tags you in a comment.", on: true },
    { id: "sc-digest", label: "Weekly digest", desc: "A summary every Monday morning.", on: false },
  ]
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what reaches your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {rows.map((r) => (
          <Field key={r.id} orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor={r.id}>{r.label}</FieldLabel>
              <FieldDescription>{r.desc}</FieldDescription>
            </FieldContent>
            <Switch id={r.id} defaultChecked={r.on} />
          </Field>
        ))}
      </CardContent>
    </Card>
  )
}

function ChatCard() {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Proposal writer</CardTitle>
        <CardDescription>Drafts from your discovery notes.</CardDescription>
        <CardAction>
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+2</AvatarGroupCount>
          </AvatarGroup>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Message align="end">
          <MessageContent>
            <Bubble align="end">
              <BubbleContent>Draft a proposal for the retail client from Tuesday's call.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageContent>
            <Bubble variant="secondary">
              <BubbleContent>
                Done. Three sections: their problem in their words, our approach, and a phased timeline. I added two
                similar wins as proof.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </CardContent>
      <CardFooter>
        <InputGroup>
          <InputGroupTextarea placeholder="Ask for changes" className="min-h-16" />
          <InputGroupAddon align="block-end">
            <InputGroupButton size="icon-sm" variant="ghost" aria-label="Attach a file">
              <PaperclipIcon />
            </InputGroupButton>
            <InputGroupButton size="icon-sm" variant="default" className="ml-auto rounded-full" aria-label="Send">
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </CardFooter>
    </Card>
  )
}

function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 15))
  return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 9, 1)} />
}

function RunsCard() {
  const [range, setRange] = React.useState("week")
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Agent runs</CardTitle>
        <CardDescription>Across all workspaces</CardDescription>
        <CardAction>
          <Tabs value={range} onValueChange={setRange}>
            <TabsList variant="glass">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[16/9] w-full">
          <AreaChart data={runs} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <defs>
              <linearGradient id="sc-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-runs)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-runs)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <Area dataKey="runs" type="monotone" stroke="var(--color-runs)" strokeWidth={2} fill="url(#sc-fill)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function BudgetCard() {
  const [value, setValue] = React.useState<number[]>([1200])
  const used = 820
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Monthly token budget</CardTitle>
        <CardDescription>Runs pause when the budget is reached.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-semibold tracking-tight">${value[0].toLocaleString()}</span>
          <span className="text-muted-foreground text-sm">per month</span>
        </div>
        <Slider value={value} onValueChange={(v) => setValue(v as number[])} min={200} max={3000} step={50} aria-label="Monthly budget" />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Used this month</span>
            <span className="font-medium">
              ${used} of ${value[0].toLocaleString()}
            </span>
          </div>
          <Progress value={Math.min(100, (used / value[0]) * 100)} aria-label="Budget used" />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={() => toast("Budget saved")}>Save budget</Button>
      </CardFooter>
    </Card>
  )
}

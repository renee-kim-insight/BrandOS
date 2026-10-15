import * as React from "react"
import { ArrowUpDownIcon, MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Run = { id: string; agent: string; status: "Done" | "Running" | "Failed"; tokens: number }

const runs: Run[] = [
  { id: "r-1042", agent: "Proposal writer", status: "Done", tokens: 18240 },
  { id: "r-1041", agent: "Meeting summariser", status: "Running", tokens: 6120 },
  { id: "r-1040", agent: "Contract reviewer", status: "Failed", tokens: 2310 },
  { id: "r-1039", agent: "Pricing assistant", status: "Done", tokens: 9480 },
  { id: "r-1038", agent: "Support triage", status: "Done", tokens: 4120 },
]

const tone = { Done: "secondary", Running: "glass", Failed: "destructive" } as const

export default function DataTableDemo() {
  const [desc, setDesc] = React.useState(true)
  const [selected, setSelected] = React.useState<string[]>([])
  const rows = [...runs].sort((a, b) => (desc ? b.tokens - a.tokens : a.tokens - b.tokens))
  const all = selected.length === rows.length
  return (
    <Card variant="glass" className="w-full max-w-2xl gap-0 overflow-x-auto p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all runs"
                checked={all}
                indeterminate={selected.length > 0 && !all}
                onCheckedChange={(c) => setSelected(c ? rows.map((r) => r.id) : [])}
              />
            </TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              <Button variant="ghost" size="sm" onClick={() => setDesc((d) => !d)} className="-mr-2">
                Tokens
                <ArrowUpDownIcon data-icon="inline-end" />
              </Button>
            </TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id} data-state={selected.includes(r.id) ? "selected" : undefined}>
              <TableCell>
                <Checkbox
                  aria-label={`Select ${r.id}`}
                  checked={selected.includes(r.id)}
                  onCheckedChange={(c) =>
                    setSelected((s) => (c ? [...s, r.id] : s.filter((x) => x !== r.id)))
                  }
                />
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{r.agent}</span>
                  <span className="text-muted-foreground font-mono text-xs">{r.id}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={tone[r.status]}>{r.status}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">{r.tokens.toLocaleString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${r.id}`} />}>
                    <MoreHorizontalIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Open run</DropdownMenuItem>
                    <DropdownMenuItem>Re-run</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete run</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

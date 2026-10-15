import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const rows = [
  { agent: "Proposal writer", runs: 412, hours: 206 },
  { agent: "Meeting summariser", runs: 1280, hours: 320 },
  { agent: "Contract reviewer", runs: 96, hours: 144 },
]

export default function TableDemo() {
  return (
    <div className="glass w-full max-w-xl overflow-x-auto rounded-3xl border p-2">
      <Table>
        <TableCaption>Time saved in September, sample data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead className="text-right">Runs</TableHead>
            <TableHead className="text-right">Hours saved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.agent}>
              <TableCell className="font-medium">{r.agent}</TableCell>
              <TableCell className="text-right tabular-nums">{r.runs.toLocaleString()}</TableCell>
              <TableCell className="text-right tabular-nums">{r.hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right tabular-nums">1,788</TableCell>
            <TableCell className="text-right tabular-nums">670</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

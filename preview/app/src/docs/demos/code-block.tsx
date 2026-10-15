import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "@/components/ui/code-block"

const lines: { text: string; variant?: "added" | "removed" | "highlighted" }[] = [
  { text: 'import { Button } from "@/components/ui/button"' },
  { text: "" },
  { text: "export function Publish() {" },
  { text: '  return <Button variant="default">Publish</Button>', variant: "removed" },
  { text: '  return <Button variant="glass">Publish</Button>', variant: "added" },
  { text: "}" },
]

export default function CodeBlockDemo() {
  const source = lines.filter((l) => l.variant !== "removed").map((l) => l.text).join("\n")
  return (
    <CodeBlock className="glass bg-glass w-full max-w-xl border">
      <CodeBlockHeader>
        <CodeBlockTitle className="font-mono text-xs">publish.tsx</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={source} aria-label="Copy code" />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((l, i) => (
          <CodeBlockLine key={i} variant={l.variant}>
            {l.text}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

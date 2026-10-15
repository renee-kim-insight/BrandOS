export default function TypographyDemo() {
  return (
    <article className="glass w-full max-w-xl rounded-3xl border p-8">
      <h1 className="text-4xl font-semibold tracking-[-0.035em] text-balance">Agents that do the work.</h1>
      <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
        A short lead paragraph sets up the page in one or two sentences.
      </p>
      <h2 className="mt-8 text-2xl font-semibold tracking-[-0.025em]">How a run works</h2>
      <p className="mt-3 leading-7">
        Each run reads your inputs, calls the tools it is allowed to use, and writes its output to the place you chose.
        You can see every step in the <code className="bg-muted rounded-md px-1.5 py-0.5 font-mono text-[0.85em]">Trace</code> view.
      </p>
      <ul className="mt-4 ml-5 list-disc space-y-1.5 leading-7">
        <li>Inputs stay in your workspace.</li>
        <li>Tools need an owner's approval.</li>
        <li>Outputs are versioned.</li>
      </ul>
      <blockquote className="border-primary mt-6 border-l-2 pl-4 italic">
        "We cut proposal time from two days to an afternoon."
      </blockquote>
    </article>
  )
}

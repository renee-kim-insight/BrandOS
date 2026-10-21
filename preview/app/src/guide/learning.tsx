import * as React from "react"
import {
  BookOpen,
  ChartColumn,
  Check,
  CircleCheck,
  CircleX,
  Flame,
  GraduationCap,
  House,
  Lightbulb,
  LoaderCircle,
  Lock,
  Menu,
  Minus,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  Plus,
  RotateCcw,
  Settings,
  Timer,
  Trophy,
  Video,
  CircleDot,
} from "lucide-react"

/* ------------------------------------------------------------------ quiz */

const QUESTIONS = [
  {
    prompt: "You want an assistant to summarise a long report. What gives the best result?",
    options: [
      "Paste the report and write \"summarise\"",
      "Say who the summary is for, what they need to decide, and how long it should be",
      "Ask for the shortest summary possible",
      "Split the report into single sentences first",
    ],
    answer: 1,
    why: "Context about the reader and the decision tells the assistant what to keep and what to leave out.",
  },
  {
    prompt: "An answer cites a policy you can't find. What should you do?",
    options: ["Use it, since it was cited", "Ask the assistant to confirm it", "Check the source yourself before acting on it", "Ignore the whole answer"],
    answer: 2,
    why: "Assistants can be confidently wrong. Anything you act on should be checked against the source.",
  },
  {
    prompt: "Which task is the best fit for an assistant?",
    options: ["Approving a contract on your behalf", "Drafting a first version you will edit", "Deciding someone's performance rating", "Sending client emails without review"],
    answer: 1,
    why: "Drafts save time while you keep the judgement and the final say.",
  },
  {
    prompt: "What belongs in a prompt for a recurring task?",
    options: ["Only the task name", "Examples of good output and the format you want", "As little as possible, to save tokens", "Your password, so it can log in"],
    answer: 1,
    why: "Examples and a clear format make results consistent from one run to the next.",
  },
]
const KEYS = ["A", "B", "C", "D"]
type Outcome = "correct" | "incorrect" | undefined

function useCountdown(start: number, running: boolean) {
  const [left, setLeft] = React.useState(start)
  React.useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [running])
  return [left, setLeft] as const
}
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

export function QuizDemo() {
  const [index, setIndex] = React.useState(0)
  const [pick, setPick] = React.useState<number | null>(null)
  const [checked, setChecked] = React.useState(false)
  const [results, setResults] = React.useState<Outcome[]>([])
  const [finished, setFinished] = React.useState(false)
  const [left, setLeft] = useCountdown(150, !finished)
  const q = QUESTIONS[index]
  const correct = results.filter((r) => r === "correct").length
  const incorrect = results.filter((r) => r === "incorrect").length
  let streak = 0
  for (let i = results.length - 1; i >= 0 && results[i] === "correct"; i--) streak++

  const check = () => {
    if (pick === null) return
    setChecked(true)
    setResults((r) => [...r, pick === q.answer ? "correct" : "incorrect"])
  }
  const next = () => {
    if (index === QUESTIONS.length - 1) return setFinished(true)
    setIndex(index + 1)
    setPick(null)
    setChecked(false)
  }
  const restart = () => {
    setIndex(0)
    setPick(null)
    setChecked(false)
    setResults([])
    setFinished(false)
    setLeft(150)
  }

  if (finished) {
    const score = Math.round((correct / QUESTIONS.length) * 100)
    const pass = score >= 75
    return (
      <section className="bos-result" aria-label="Quiz result">
        <div className="bos-ring-wrap">
          <span className="bos-ring bos-ring-lg" data-state={pass ? "pass" : "fail"} style={{ ["--value" as string]: score }} />
          <span style={{ ["--size" as string]: "140px" }}>
            <b>{score}%</b>
            <small>score</small>
          </span>
        </div>
        <div>
          <span className={`bos-pill ${pass ? "bos-correct-text" : "bos-incorrect-text"}`} style={{ alignSelf: "flex-start" }}>
            {pass ? "Passed" : "Not passed yet"}
          </span>
          <h3 className="bos-h2">{pass ? "Nicely done" : "Almost there"}</h3>
          <p className="bos-lead" style={{ margin: 0 }}>
            {pass ? "You can move on to the next lesson." : "You need 75% to pass. Review the answers and try again."}
          </p>
          <ul className="bos-tally">
            <li data-kind="correct"><CircleCheck /><b>{correct}</b> correct</li>
            <li data-kind="incorrect"><CircleX /><b>{incorrect}</b> incorrect</li>
            <li><Timer /><b>{clock(150 - left)}</b> taken</li>
          </ul>
          <div className="bos-btns">
            <button type="button" className="bos-btn-glass" onClick={restart}><RotateCcw size={16} /> Try again</button>
            <button type="button" className="bos-btn-primary">Next lesson</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bos-quiz" aria-label="Practice quiz">
      <header className="bos-quiz-head">
        <span>Question {index + 1} of {QUESTIONS.length}</span>
        <span className="bos-timer" data-state={left === 0 ? "over" : left <= 60 ? "warning" : undefined} aria-label={`${clock(left)} left`}>
          <Timer /> {clock(left)}
        </span>
      </header>
      <ol className="bos-track" aria-label="Progress">
        {QUESTIONS.map((_, i) => (
          <li key={i} data-state={results[i] ?? (i === index ? "current" : undefined)} aria-label={`Question ${i + 1}: ${results[i] ?? (i === index ? "current" : "not answered")}`} />
        ))}
      </ol>
      <h4 className="bos-quiz-prompt">{q.prompt}</h4>
      <div className="bos-options" role="radiogroup" aria-label="Answers" data-locked={checked || undefined}>
        {q.options.map((o, i) => {
          let state: string | undefined
          if (checked) {
            if (i === q.answer) state = pick === i ? "correct" : "missed"
            else if (i === pick) state = "incorrect"
          }
          return (
            <label key={i} className="bos-option" data-state={state}>
              <input type="radio" name={`quiz-${index}`} checked={pick === i} disabled={checked} onChange={() => setPick(i)} />
              <span className="bos-option-key">{KEYS[i]}</span>
              <span>{o}</span>
            </label>
          )
        })}
      </div>
      {checked && (
        <div className="bos-feedback" data-state={pick === q.answer ? "correct" : "incorrect"} role="status">
          {pick === q.answer ? <CircleCheck /> : <CircleX />}
          <strong>{pick === q.answer ? "Correct" : "Not quite"}</strong>
          <p>{q.why}</p>
        </div>
      )}
      <footer className="bos-quiz-foot">
        <ul className="bos-tally" aria-label="Score so far">
          <li data-kind="correct"><CircleCheck /><b>{correct}</b> correct</li>
          <li data-kind="incorrect"><CircleX /><b>{incorrect}</b> incorrect</li>
          {streak >= 2 && <li data-kind="streak"><Flame /><b>{streak}</b> in a row</li>}
        </ul>
        {checked ? (
          <button type="button" className="bos-btn-primary" onClick={next}>{index === QUESTIONS.length - 1 ? "See results" : "Next question"}</button>
        ) : (
          <button type="button" className="bos-btn-primary" onClick={check} disabled={pick === null}>Check answer</button>
        )}
      </footer>
    </section>
  )
}

/* ------------------------------------------------------------------ AI-graded answer */

export function GradedDemo() {
  const [state, setState] = React.useState<"writing" | "grading" | "graded">("writing")
  const [text, setText] = React.useState(
    "I would give the assistant the CRM notes, say the brief is for the account lead before a quarterly review, and ask for three risks and three opportunities with the evidence for each.",
  )
  const submit = () => {
    setState("grading")
    window.setTimeout(() => setState("graded"), 1600)
  }
  return (
    <section className="bos-quiz" aria-label="Challenge">
      <header className="bos-quiz-head">
        <span>Challenge · graded by an assistant</span>
        {state === "graded" && <span className="bos-score">7<small>/ 10</small></span>}
      </header>
      <h4 className="bos-quiz-prompt">How would you ask an assistant to turn CRM notes into a quarterly review brief?</h4>
      <div className="bos-graded">
        <label className="sr-only" htmlFor="gd-graded">Your answer</label>
        <textarea id="gd-graded" value={text} onChange={(e) => setText(e.target.value)} readOnly={state !== "writing"} />
        {state === "grading" && (
          <span className="bos-grading" role="status"><LoaderCircle /> Grading your answer against the rubric</span>
        )}
        {state === "graded" && (
          <ul className="bos-rubric" aria-label="Rubric">
            <li data-state="met"><CircleCheck /><span>Gives context</span><p>Names the reader and the occasion.</p></li>
            <li data-state="met"><CircleCheck /><span>Asks for a clear format</span><p>Three risks and three opportunities.</p></li>
            <li data-state="partial"><CircleDot /><span>Asks for evidence</span><p>Good, but say which notes count as evidence and how recent they must be.</p></li>
            <li data-state="missed"><CircleX /><span>Says how to check it</span><p>Add a step to confirm figures against the CRM before sharing.</p></li>
          </ul>
        )}
      </div>
      <footer className="bos-quiz-foot">
        <span className="bos-caption">Answers are graded by an assistant. You can ask for a review.</span>
        {state === "graded" ? (
          <button type="button" className="bos-btn-glass" onClick={() => setState("writing")}><RotateCcw size={16} /> Revise answer</button>
        ) : (
          <button type="button" className="bos-btn-primary" onClick={submit} disabled={state === "grading" || !text.trim()}>Submit for grading</button>
        )}
      </footer>
    </section>
  )
}

/* ------------------------------------------------------------------ lesson page */

const LESSONS = [
  { title: "What assistants are good at", kind: "Video", time: "6 min", state: "done" },
  { title: "Writing a clear request", kind: "Reading", time: "8 min", state: "done" },
  { title: "Giving context and examples", kind: "Video", time: "12 min", state: "current" },
  { title: "Practice quiz", kind: "Quiz", time: "4 questions", state: "todo" },
  { title: "Challenge: a review brief", kind: "Challenge", time: "Graded", state: "locked" },
] as const

export function LessonDemo() {
  const done = LESSONS.filter((l) => l.state === "done").length
  const icon = (k: string) => (k === "Video" ? <Video /> : k === "Reading" ? <BookOpen /> : k === "Quiz" ? <Check /> : <Trophy />)
  return (
    <div className="bos-learn">
      <div className="bos-stack">
        <div className="bos-video">
          <button type="button" className="bos-video-play" aria-label="Play Giving context and examples"><Play /></button>
          <div className="bos-video-meta"><span>Lesson 3</span><span>12:04</span></div>
          <div className="bos-video-progress" aria-hidden="true"><span style={{ width: "38%" }} /></div>
        </div>
        <div>
          <span className="bos-kicker">Module 1 · Working with assistants</span>
          <h4 className="bos-h2" style={{ marginTop: 6 }}>Giving context and examples</h4>
          <p className="bos-lead" style={{ marginTop: 8 }}>Assistants do their best work when they know who the result is for and what good looks like. This lesson shows how to give both in a few lines.</p>
        </div>
      </div>
      <aside aria-label="Module progress">
        <div className="bos-module-head">
          <div>
            <div className="bos-h3">Module 1</div>
            <span className="bos-caption">{done} of {LESSONS.length} done</span>
          </div>
          <div className="bos-ring-wrap">
            <span className="bos-ring bos-ring-sm" style={{ ["--value" as string]: Math.round((done / LESSONS.length) * 100) }} />
            <span style={{ ["--size" as string]: "44px" }}><b style={{ fontSize: 11 }}>{Math.round((done / LESSONS.length) * 100)}%</b></span>
          </div>
        </div>
        <ol className="bos-lessons">
          {LESSONS.map((l, i) => {
            const Tag = l.state === "locked" ? "div" : "a"
            return (
              <li key={l.title}>
                <Tag className="bos-lesson" data-state={l.state} {...(Tag === "a" ? { href: "#learn", "aria-current": l.state === "current" ? "step" : undefined } : {})}>
                  <span className="bos-lesson-status" aria-hidden="true">
                    {l.state === "done" ? <Check /> : l.state === "locked" ? <Lock /> : l.state === "current" ? <Play /> : i + 1}
                  </span>
                  <span>
                    <span className="bos-lesson-title">{l.title}</span>
                    <span className="bos-meta">{icon(l.kind)} {l.kind} · {l.time}</span>
                  </span>
                  <span className="sr-only">{l.state === "done" ? "Done" : l.state === "locked" ? "Locked until the quiz is passed" : l.state === "current" ? "In progress" : "Not started"}</span>
                </Tag>
              </li>
            )
          })}
        </ol>
      </aside>
    </div>
  )
}

/* ------------------------------------------------------------------ small pieces */

export function SmallPieces() {
  const [n, setN] = React.useState(10)
  return (
    <div className="gd-learn-small">
      <div className="bos-tile">
        <div className="bos-label">Counter</div>
        <p className="bos-caption" style={{ margin: "4px 0 12px" }}>Questions per practice round</p>
        <div className="bos-counter" role="group" aria-label="Questions per round">
          <button type="button" aria-label="Fewer" onClick={() => setN(Math.max(5, n - 1))} disabled={n <= 5}><Minus /></button>
          <output aria-live="polite">{n}</output>
          <button type="button" aria-label="More" onClick={() => setN(Math.min(20, n + 1))} disabled={n >= 20}><Plus /></button>
        </div>
      </div>
      <div className="bos-tile">
        <div className="bos-label">Timer</div>
        <p className="bos-caption" style={{ margin: "4px 0 12px" }}>Plenty of time, under a minute, over time</p>
        <div className="bos-btns">
          <span className="bos-timer"><Timer /> 12:30</span>
          <span className="bos-timer" data-state="warning"><Timer /> 0:48</span>
          <span className="bos-timer" data-state="over"><Timer /> 0:00</span>
        </div>
      </div>
      <div className="bos-tile">
        <div className="bos-label">Progress rings</div>
        <p className="bos-caption" style={{ margin: "4px 0 12px" }}>Course, pass and not passed</p>
        <div className="bos-btns" style={{ gap: 16 }}>
          {[
            [40, undefined],
            [88, "pass"],
            [50, "fail"],
          ].map(([v, s]) => (
            <div key={String(v)} className="bos-ring-wrap">
              <span className="bos-ring" data-state={s} style={{ ["--value" as string]: v, ["--size" as string]: "72px", ["--thickness" as string]: "8px" }} />
              <span style={{ ["--size" as string]: "72px" }}><b>{v}%</b></span>
            </div>
          ))}
        </div>
      </div>
      <div className="bos-tile">
        <div className="bos-label">Tally</div>
        <p className="bos-caption" style={{ margin: "4px 0 12px" }}>Running score during an exam</p>
        <ul className="bos-tally">
          <li data-kind="correct"><CircleCheck /><b>8</b> correct</li>
          <li data-kind="incorrect"><CircleX /><b>2</b> incorrect</li>
          <li data-kind="streak"><Flame /><b>4</b> in a row</li>
        </ul>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ sidebar shell */

export function SidebarShellDemo() {
  const [collapsed, setCollapsed] = React.useState(false)
  const items: [React.ReactNode, string, number?][] = [
    [<House key="h" />, "Home"],
    [<GraduationCap key="t" />, "Training", 2],
    [<Trophy key="c" />, "Challenges"],
    [<Lightbulb key="u" />, "Use cases"],
    [<ChartColumn key="l" />, "Leaderboard"],
  ]
  return (
    <div className="bos-app gd-app-demo" data-collapsed={collapsed || undefined}>
      <aside className="bos-sidebar" aria-label="Example sidebar">
        <div className="bos-sidebar-head">
          <a className="bos-sidebar-brand" href="#heroes">
            <span className="bos-charm bos-charm-sm" aria-hidden="true" />
            <span><strong>Academy</strong><small>Learning</small></span>
          </a>
          <button type="button" className="bos-sidebar-toggle" aria-label={collapsed ? "Expand menu" : "Collapse menu"} aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
        </div>
        <nav className="bos-sidebar-section" aria-label="Main">
          {items.map(([icon, label, count], i) => (
            <a key={label} className="bos-sidebar-item" href="#heroes" title={label} aria-current={i === 1 ? "page" : undefined}>
              {icon}
              <span>{label}</span>
              {count ? <span className="bos-count">{count}</span> : null}
            </a>
          ))}
        </nav>
        <div className="bos-sidebar-footer">
          <a className="bos-sidebar-item" href="#heroes" title="Settings"><Settings /><span>Settings</span></a>
          <a className="bos-sidebar-item" href="#heroes" title="Sam Rivera"><span className="bos-avatar bos-avatar-sm">SR</span><span>Sam Rivera</span></a>
        </div>
      </aside>
      <main className="bos-main">
        <div className="bos-topbar">
          <button type="button" className="bos-sidebar-toggle bos-nav-toggle-side" aria-label="Open menu"><Menu /></button>
          <span className="bos-topbar-title">Training</span>
        </div>
        <div className="bos-page" style={{ paddingTop: 36, paddingInline: "var(--page-gutter)" }}>
          <div className="bos-hero-compact">
            <h3 className="bos-h1">Pick up where you left off</h3>
            <p className="bos-lead">Lesson 3 of 5 in Working with assistants.</p>
          </div>
          <ol className="bos-queue">
            <li><div><div className="bos-h3">Giving context and examples</div><p>Video · 12 min · 38% watched</p></div><button className="bos-btn-primary bos-btn-sm" type="button">Resume</button></li>
            <li><div><div className="bos-h3" style={{ fontSize: 16 }}>Practice quiz</div><p>4 questions</p></div><button className="bos-btn-glass bos-btn-sm" type="button">Start</button></li>
          </ol>
        </div>
      </main>
    </div>
  )
}

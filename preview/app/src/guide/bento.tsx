import * as React from "react"
import { ArrowUpRight, Bot, Braces, CalendarDays, Clock, Copy, Database, Flag, Gauge, ListChecks, Mic, Paperclip, Send, Sparkles, UserPlus, Users } from "lucide-react"

const EVENTS = [
  { title: "Quarterly planning", text: "Agree the roadmap for next quarter", time: "14:00 to 15:00", date: "Dec 5", people: ["AK", "JL"], more: 8, now: "In 15 min" },
  { title: "Design review", text: "Walk through the new onboarding flow and agree what ships first", time: "10:00 to 11:00", date: "Dec 8", people: ["RS", "MP"], more: 4 },
  { title: "Security workshop", text: "Practical steps for keeping client data safe in AI tools", time: "13:00 to 14:30", date: "Dec 11", people: ["DT"], more: 12 },
]

const PEOPLE = [
  { name: "Priya Shah", role: "Product designer", done: 5 },
  { name: "Leo Martin", role: "Mobile developer", done: 8 },
  { name: "Ana Costa", role: "Cloud architect", done: 3 },
  { name: "Sam Okafor", role: "Content designer", done: 10 },
]
const initials = (n: string) => n.split(" ").map((p) => p[0]).join("")

export function BentoDemo() {
  const [text, setText] = React.useState("")
  return (
    <div className="bos-bento">
      <section className="bos-panel bos-span-8" aria-labelledby="bento-week">
        <header className="bos-panel-head">
          <h3 className="bos-panel-title" id="bento-week">This week</h3>
          <div className="bos-btns">
            <span className="bos-chip-meta"><CalendarDays /> Dec 1 to 7</span>
            <a className="bos-link-pill" href="#bento"><ArrowUpRight /> View all</a>
          </div>
        </header>
        <div className="bos-stats">
          <div><div className="bos-stat">12</div><span className="bos-caption">tasks due</span></div>
          <div><div className="bos-stat">3</div><span className="bos-caption">waiting on you</span></div>
          <div><div className="bos-stat">86%</div><span className="bos-caption">on track</span></div>
        </div>
      </section>

      <section className="bos-panel bos-span-4 bos-tall gd-bento-ask" aria-labelledby="bento-ask">
        <div className="gd-bento-ask-top">
          <span className="bos-charm bos-charm-lg" aria-hidden="true"><Sparkles /></span>
          <h3 className="bos-panel-title" id="bento-ask">Welcome, Sam.<br />What can I help with today?</h3>
        </div>
        <div className="bos-suggestions" style={{ justifyContent: "center" }}>
          <button type="button"><UserPlus size={16} /> Add a person</button>
          <button type="button"><Flag size={16} /> Get a report</button>
          <button type="button"><Users size={16} /> Manage access</button>
        </div>
        <div className="bos-composer">
          <textarea aria-label="Ask anything" placeholder="Ask anything" value={text} maxLength={300} onChange={(e) => setText(e.target.value)} />
          <div className="bos-composer-bar">
            <div className="bos-btns">
              <button type="button" className="bos-link-pill" style={{ minHeight: 32 }}><Paperclip /> Attach</button>
              <button type="button" className="bos-link-pill" style={{ minHeight: 32 }} aria-label="Speak"><Mic /></button>
            </div>
            <div className="bos-btns" style={{ alignItems: "center" }}>
              <span className="bos-caption bos-num">{text.length}/300</span>
              <button type="button" className="bos-btn-primary bos-btn-sm" aria-label="Send" disabled={!text.trim()}><Send size={16} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="bos-panel bos-span-4" aria-labelledby="bento-events">
        <header className="bos-panel-head">
          <h3 className="bos-panel-title" id="bento-events">Coming up</h3>
          <a className="bos-link-pill" href="#bento"><ArrowUpRight /> View all</a>
        </header>
        <div className="bos-panel-scroll" style={{ ["--panel-max" as string]: "360px" }}>
          {EVENTS.map((e) => (
            <article key={e.title} className="bos-inner bos-event" data-tone={e.now ? "now" : undefined}>
              <div className="bos-event-head">
                <div>
                  <h4 className="bos-event-title">{e.title}</h4>
                  <p>{e.text}</p>
                </div>
                {e.now && <span className="bos-status" data-tone="waiting">{e.now}</span>}
              </div>
              <div className="bos-event-foot">
                <div className="bos-meta-chips">
                  <span className="bos-chip-meta"><Clock /> {e.time}</span>
                  <span className="bos-chip-meta"><CalendarDays /> {e.date}</span>
                </div>
                <span className="bos-avatars" aria-label={`${e.people.length + e.more} people going`}>
                  {e.people.map((p) => <span key={p}>{p}</span>)}
                  <span className="bos-avatars-more">{e.more}+</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bos-panel bos-span-4" aria-labelledby="bento-onboarding">
        <header className="bos-panel-head">
          <h3 className="bos-panel-title" id="bento-onboarding">Onboarding</h3>
          <a className="bos-link-pill" href="#bento"><ArrowUpRight /> View all</a>
        </header>
        <div className="bos-people">
          {PEOPLE.map((p) => (
            <a key={p.name} className="bos-inner bos-person" href="#bento">
              <span className="bos-person-photo" aria-hidden="true">{initials(p.name)}</span>
              <span className="bos-person-name">{p.name}</span>
              <span className="bos-person-role">{p.role}</span>
              <span className="bos-chip-meta"><ListChecks /> {p.done}/10 tasks done</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ second example: an agent overview */

const SERIES: Record<string, { label: string; total: string; unit: string; points: number[] }> = {
  runs: { label: "Runs", total: "1,256", unit: "runs this week", points: [80, 112, 96, 74, 118, 150, 142] },
  success: { label: "Success rate", total: "94", unit: "% succeeded", points: [90, 92, 91, 95, 93, 96, 94] },
  cost: { label: "Cost", total: "$318", unit: "spent this week", points: [40, 52, 38, 61, 44, 47, 36] },
}
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function LineChart({ points }: { points: number[] }) {
  const w = 640, h = 180, max = Math.max(...points) * 1.15, min = Math.min(...points) * 0.7
  const x = (i: number) => (i / (points.length - 1)) * w
  const y = (v: number) => h - ((v - min) / (max - min)) * h
  const d = points.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")
  return (
    <div className="bos-chart" role="img" aria-label={`Daily values: ${points.join(", ")}`}>
      <svg viewBox={`0 -8 ${w} ${h + 32}`}>
        {[0, 0.5, 1].map((f) => <line key={f} className="bos-chart-grid" x1="0" x2={w} y1={h * f} y2={h * f} />)}
        <path d={`${d} L${w},${h} L0,${h} Z`} fill="currentColor" opacity="0.08" />
        <path d={d} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={i === points.length - 1 ? 5 : 0} fill="currentColor" />)}
        {DAYS.map((dname, i) => <text key={dname} className="bos-chart-axis" x={x(i)} y={h + 22} textAnchor={i === 0 ? "start" : i === DAYS.length - 1 ? "end" : "middle"}>{dname}</text>)}
      </svg>
    </div>
  )
}

export function BentoAgentsDemo() {
  const [metric, setMetric] = React.useState<keyof typeof SERIES>("runs")
  const s = SERIES[metric]
  return (
    <div className="bos-bento">
      <section className="bos-panel bos-span-8" aria-labelledby="bento2-activity">
        <header className="bos-panel-head">
          <h3 className="bos-panel-title" id="bento2-activity">Agent activity</h3>
          <a className="bos-link-pill" href="#bento"><ArrowUpRight /> View report</a>
        </header>
        <div className="bos-metric-tabs" role="tablist" aria-label="Metric">
          {Object.entries(SERIES).map(([k, v]) => (
            <button key={k} type="button" role="tab" aria-selected={metric === k} onClick={() => setMetric(k as keyof typeof SERIES)}>
              <b>{v.total}{k === "success" ? "%" : ""}</b> {v.label}
            </button>
          ))}
        </div>
        <div className="bos-figure">
          <div className="bos-figure-value">{s.total}<small>{s.unit}</small></div>
        </div>
        <LineChart points={s.points} />
      </section>

      <section className="bos-panel bos-span-4" aria-labelledby="bento2-parallel">
        <div className="bos-feature">
          <div className="bos-feature-stage">
            <ul className="bos-bars" aria-label="Agent progress">
              {[["AGENT-01", 42], ["AGENT-02", 66], ["AGENT-03", 18]].map(([n, v]) => (
                <li key={n}><span>{n}</span><div className="bos-bar"><span style={{ width: `${v}%` }}>{v}%</span></div></li>
              ))}
            </ul>
          </div>
          <h3 className="bos-panel-title" id="bento2-parallel">Running in parallel</h3>
          <p>Three agents are working on this week's briefs. Each one reports back when it finishes.</p>
        </div>
      </section>

      <section className="bos-panel bos-span-8" aria-labelledby="bento2-flow">
        <header className="bos-panel-head">
          <h3 className="bos-panel-title" id="bento2-flow">Workflow</h3>
          <span className="bos-status" data-tone="positive">Live</span>
        </header>
        <div className="bos-feature-stage" style={{ minHeight: 120 }}>
          <div className="bos-flow">
            <span className="bos-flow-node" data-state="done"><Braces /> Trigger</span>
            <span className="bos-flow-link" aria-hidden="true" />
            <span className="bos-flow-node" data-state="done"><Database /> CRM notes</span>
            <span className="bos-flow-link" aria-hidden="true" />
            <span className="bos-flow-node" data-state="running"><Bot /> Draft brief</span>
            <span className="bos-flow-link" aria-hidden="true" />
            <span className="bos-flow-node"><Send /> Send for review</span>
          </div>
        </div>
      </section>

      <section className="bos-panel bos-span-4" data-glow aria-labelledby="bento2-speed">
        <header className="bos-panel-head">
          <span className="bos-icon-badge" aria-hidden="true"><Gauge /></span>
          <h3 className="bos-label" id="bento2-speed" style={{ flex: "none" }}>Time saved</h3>
        </header>
        <div className="bos-figure" style={{ marginTop: "auto" }}>
          <div className="bos-figure-value">38<small>hours</small></div>
          <span>this month, across 214 runs</span>
        </div>
      </section>

      <section className="bos-panel bos-span-6" aria-labelledby="bento2-summary">
        <div className="bos-feature">
          <div className="bos-feature-stage" style={{ placeItems: "stretch" }}>
            <div className="bos-inner" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div className="bos-panel-head" style={{ minHeight: 0 }}>
                <span className="bos-label">Summary</span>
                <button type="button" className="bos-link-pill" style={{ minHeight: 30, fontSize: 13 }}><Copy /> Copy</button>
              </div>
              <p style={{ margin: 0, lineHeight: 1.6 }}><mark className="gd-mark">Revenue is up 12% on last quarter, driven by two renewals.</mark> One account is at risk: usage dropped after the champion left.</p>
            </div>
          </div>
          <h3 className="bos-panel-title" id="bento2-summary">Summaries that save time</h3>
          <p>Long notes turned into the three things that matter, with the source one click away.</p>
        </div>
      </section>

      <section className="bos-panel bos-span-6" aria-labelledby="bento2-news">
        <header className="bos-panel-head">
          <h3 className="bos-panel-title" id="bento2-news">New this week</h3>
          <a className="bos-link-pill" href="#bento"><ArrowUpRight /> View all</a>
        </header>
        <div className="gd-media-row">
          <a className="bos-media" href="#bento"><span className="bos-media-img" aria-hidden="true" /><span className="bos-media-title">Agents can now read PDFs</span><p>Drop a contract in and ask about it.</p></a>
          <a className="bos-media" href="#bento"><span className="bos-media-img gd-media-alt" aria-hidden="true"><Sparkles /></span><span className="bos-media-title">Faster summaries</span><p>Half the wait on long documents.</p></a>
        </div>
      </section>
    </div>
  )
}

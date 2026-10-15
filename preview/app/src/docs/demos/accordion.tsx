import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    value: "data",
    q: "Where does an agent's data go?",
    a: "Runs stay inside your workspace's region. Inputs and outputs are kept for 30 days, then deleted unless you pin the run.",
  },
  {
    value: "cost",
    q: "How is usage billed?",
    a: "Each run is billed by the tokens it uses. Set a monthly budget and runs pause when you reach it.",
  },
  {
    value: "share",
    q: "Can I share an agent with a client?",
    a: "Yes. Publish it to a client workspace and they can run it with their own data. They never see your prompts.",
  },
]

export default function AccordionDemo() {
  return (
    <Card variant="glass" className="w-full max-w-lg px-6 py-2">
      <Accordion defaultValue={["data"]}>
        {faqs.map((f) => (
          <AccordionItem key={f.value} value={f.value}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  )
}

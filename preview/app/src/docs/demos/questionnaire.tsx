import * as React from "react"
import { toast } from "sonner"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

const items = [
  { name: "tone", required: true, choices: [{ value: "formal" }, { value: "warm" }, { value: "brief" }] },
  { name: "length", required: true, choices: [{ value: "one" }, { value: "three" }, { value: "six" }] },
] as const

export default function QuestionnaireDemo() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    toast("Got it. Drafting now.", { description: `Tone: ${data.get("tone")}, length: ${data.get("length")} page(s)` })
  }
  return (
    <div className="glass w-full max-w-lg rounded-3xl border p-6">
      <Questionnaire defaultItem="tone" items={items} onSubmit={onSubmit}>
        <QuestionnaireProgress />
        <QuestionnaireItem name="tone" required>
          <QuestionnaireTitle>What tone should the proposal take?</QuestionnaireTitle>
          <QuestionnaireDescription>The agent matches this throughout.</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="formal">
              <span className="font-medium">Formal</span>
              <QuestionnaireChoiceDescription>For procurement and legal readers</QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="warm">
              <span className="font-medium">Warm</span>
              <QuestionnaireChoiceDescription>For a sponsor you know well</QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
            <QuestionnaireChoice value="brief">
              <span className="font-medium">Brief</span>
              <QuestionnaireChoiceDescription>For executives who skim</QuestionnaireChoiceDescription>
            </QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>
        <QuestionnaireItem name="length" required>
          <QuestionnaireTitle>How long?</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="one">One page</QuestionnaireChoice>
            <QuestionnaireChoice value="three">Three pages</QuestionnaireChoice>
            <QuestionnaireChoice value="six">Six pages</QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>
        <QuestionnaireActions className="w-full">
          <QuestionnairePrevious />
          <QuestionnaireNext>Next</QuestionnaireNext>
          <QuestionnaireSubmit>Start drafting</QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}

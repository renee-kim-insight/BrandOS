import { FileTextIcon, ImageIcon, SheetIcon, XIcon } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

const files = [
  { name: "discovery-notes.pdf", meta: "PDF · 2.4 MB", icon: FileTextIcon, state: "done" as const },
  { name: "pricing-model.xlsx", meta: "Uploading · 64%", icon: SheetIcon, state: "uploading" as const },
  { name: "site-photo.png", meta: "PNG · 840 KB", icon: ImageIcon, state: "done" as const },
]

export default function AttachmentDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {files.slice(0, 2).map((f) => (
        <Attachment key={f.name} state={f.state} className="w-full">
          <AttachmentMedia>
            <f.icon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{f.name}</AttachmentTitle>
            <AttachmentDescription>{f.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${f.name}`}>
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
      <AttachmentGroup className="gap-2">
        {files.map((f) => (
          <Attachment key={f.name} size="sm">
            <AttachmentMedia>
              <f.icon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{f.name}</AttachmentTitle>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
    </div>
  )
}

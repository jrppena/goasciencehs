import { statementIconNames, valueIconNames } from "@/lib/icons"
import type { AboutListField } from "./list-form"

const iconOptions = (names: readonly string[]) =>
  names.map((name) => ({ value: name, label: name }))

const orderField: AboutListField = {
  name: "order",
  label: "Order",
  kind: "number",
  hint: "Lower numbers appear first.",
}

export const coreValueFields: AboutListField[] = [
  { name: "icon", label: "Icon", kind: "select", options: iconOptions(valueIconNames) },
  orderField,
  { name: "title", label: "Title", kind: "text" },
  { name: "body", label: "Body", kind: "textarea", rows: 4 },
]

export const milestoneFields: AboutListField[] = [
  { name: "year", label: "Year", kind: "text" },
  orderField,
  { name: "title", label: "Title", kind: "text" },
  { name: "body", label: "Body", kind: "textarea", rows: 4 },
]

export const missionVisionFields: AboutListField[] = [
  {
    name: "icon",
    label: "Icon",
    kind: "select",
    options: iconOptions(statementIconNames),
  },
  {
    name: "tone",
    label: "Tone",
    kind: "select",
    options: [
      { value: "primary", label: "Primary" },
      { value: "secondary", label: "Secondary" },
    ],
  },
  orderField,
  { name: "label", label: "Label", kind: "text" },
  { name: "title", label: "Title", kind: "text" },
  { name: "body", label: "Body", kind: "textarea", rows: 4 },
]

export const storyFields: AboutListField[] = [
  { name: "heading", label: "Heading", kind: "text" },
  {
    name: "paragraphs",
    label: "Paragraphs",
    kind: "textarea",
    rows: 10,
    hint: "Separate paragraphs with a blank line.",
  },
]

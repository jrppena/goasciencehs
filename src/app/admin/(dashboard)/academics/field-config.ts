import type { AcademicsListField } from "./list-form"

const orderField: AcademicsListField = {
  name: "order",
  label: "Order",
  kind: "number",
  hint: "Lower numbers appear first.",
}

const toneField: AcademicsListField = {
  name: "tone",
  label: "Tone",
  kind: "select",
  options: [
    { value: "primary", label: "Primary" },
    { value: "secondary", label: "Secondary" },
  ],
}

export const learningAreaFields: AcademicsListField[] = [
  { name: "name", label: "Name", kind: "text" },
  orderField,
  { name: "body", label: "Body", kind: "textarea", rows: 4 },
]

export const scienceProgramLevelFields: AcademicsListField[] = [
  { name: "grade", label: "Grade", kind: "text" },
  { name: "specialisation", label: "Specialisation", kind: "text" },
  toneField,
  orderField,
  { name: "summary", label: "Summary", kind: "textarea", rows: 4 },
  { name: "work", label: "Work", kind: "list", hint: "One item per row." },
]

export const matatagStepFields: AcademicsListField[] = [
  { name: "year", label: "Year", kind: "text" },
  { name: "title", label: "Title", kind: "text" },
  orderField,
  { name: "body", label: "Body", kind: "textarea", rows: 4 },
]

export const coreSubjectFields: AcademicsListField[] = [
  { name: "name", label: "Name", kind: "text" },
  orderField,
  { name: "body", label: "Body", kind: "textarea", rows: 4 },
]

export const electiveClusterFields: AcademicsListField[] = [
  { name: "name", label: "Name", kind: "text" },
  { name: "summary", label: "Summary", kind: "textarea", rows: 4 },
  {
    name: "subjects",
    label: "Subjects",
    kind: "list",
    hint: "One item per row.",
  },
  { name: "pathways", label: "Pathways", kind: "text" },
  toneField,
  orderField,
]

export const curriculumShiftStepFields: AcademicsListField[] = [
  { name: "year", label: "Year", kind: "text" },
  { name: "title", label: "Title", kind: "text" },
  orderField,
  { name: "body", label: "Body", kind: "textarea", rows: 4 },
]

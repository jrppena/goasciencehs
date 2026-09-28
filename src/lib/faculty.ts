import type { FacultyKind, FacultyMember } from "@/lib/db/models/faculty"

export type { FacultyKind, FacultyMember, Honorific } from "@/lib/db/models/faculty"

/** Display names for the three faculty groups, in page order. */
export const facultyKindLabels: Record<FacultyKind, string> = {
  head: "School head",
  teaching: "Teaching personnel",
  "non-teaching": "Non-teaching personnel",
}

/** Drawn wherever a detail has not been supplied yet. */
export const FACULTY_PENDING = "To be announced"

/** The school head, shown ahead of the rest of the personnel. */
export const schoolHead: FacultyMember & { photo: string } = {
  honorific: "Sir",
  name: "Ronald Enciso",
  position: "Principal",
  photo: "/sir-ronald.png",
  kind: "head",
  isVisible: true,
  order: 1,
}

/**
 * Personnel who keep the school running without a teaching load.
 *
 * TODO: fill in emails and offices once the school confirms them.
 */
export const nonTeachingPersonnel: FacultyMember[] = [
  {
    honorific: "Ma'am",
    name: "Sheryl Blance",
    position: "School Registrar",
    kind: "non-teaching",
    isVisible: true,
    order: 1,
  },
]

/**
 * The teaching personnel, sorted by given name. Seed source for the faculty
 * collection; `npm run seed` upserts by name.
 *
 * TODO: fill in positions, emails, rooms, and subjects once the school
 * confirms them.
 */
export const facultyMembers: FacultyMember[] = [
  { honorific: "Ma'am", name: "Angela P. Ortiz", kind: "teaching", isVisible: true, order: 1 },
  { honorific: "Sir", name: "Apollo C. Tracena", kind: "teaching", isVisible: true, order: 2 },
  { honorific: "Ma'am", name: "Bernadette G. Cariño", kind: "teaching", isVisible: true, order: 3 },
  { honorific: "Ma'am", name: "Catherine R. Dumanay", kind: "teaching", isVisible: true, order: 4 },
  { honorific: "Sir", name: "Earl Henrie B. Pacamarra", kind: "teaching", isVisible: true, order: 5 },
  { honorific: "Ma'am", name: "Famela B. Tibayan", kind: "teaching", isVisible: true, order: 6 },
  { honorific: "Sir", name: "Generoso G. Conmigo", kind: "teaching", isVisible: true, order: 7 },
  { honorific: "Ma'am", name: "Jamaica C. Pascua", kind: "teaching", isVisible: true, order: 8 },
  { honorific: "Ma'am", name: "Jennifer P. Siarot", kind: "teaching", isVisible: true, order: 9 },
  { honorific: "Sir", name: "Jhon Leroy C. Garcera", kind: "teaching", isVisible: true, order: 10 },
  { honorific: "Ma'am", name: "Ketchie G. Magonles", kind: "teaching", isVisible: true, order: 11 },
  { honorific: "Ma'am", name: "Ma. Ferly A. Periera", kind: "teaching", isVisible: true, order: 12 },
  { honorific: "Ma'am", name: "Manilyn B. Gonzaga", kind: "teaching", isVisible: true, order: 13 },
  { honorific: "Sir", name: "Mark Joffet Reconcillo", kind: "teaching", isVisible: true, order: 14 },
  { honorific: "Ma'am", name: "Mary Gel P. Prado", kind: "teaching", isVisible: true, order: 15 },
  { honorific: "Ma'am", name: "Mary Rose B. Reconcillo", kind: "teaching", isVisible: true, order: 16 },
  { honorific: "Ma'am", name: "Michelle Ann T. Botial", kind: "teaching", isVisible: true, order: 17 },
  { honorific: "Sir", name: "Patrick Paul E. Prado", kind: "teaching", isVisible: true, order: 18 },
  { honorific: "Ma'am", name: "Rachel B. Zape", kind: "teaching", isVisible: true, order: 19 },
  { honorific: "Sir", name: "Ryan S. Ortiz", kind: "teaching", isVisible: true, order: 20 },
  { honorific: "Ma'am", name: "Shiela B. Moraña", kind: "teaching", isVisible: true, order: 21 },
]

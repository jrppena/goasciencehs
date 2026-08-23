export type Honorific = "Ma'am" | "Sir"

/**
 * One member of the school's personnel. Only `honorific` and `name` are
 * confirmed; every other field is pending from the school, and the card
 * renders `FACULTY_PENDING` in its place until it arrives.
 */
export type FacultyMember = {
  honorific: Honorific
  name: string
  position?: string
  email?: string
  room?: string
  subjects?: string[]
  /** Path in `public/`. Members without one fall back to a placeholder. */
  photo?: string
}

/** Drawn wherever a detail has not been supplied yet. */
export const FACULTY_PENDING = "To be announced"

/** The school head, shown ahead of the rest of the personnel. */
export const schoolHead: FacultyMember & { photo: string } = {
  honorific: "Sir",
  name: "Ronald Enciso",
  position: "Principal",
  photo: "/sir-ronald.png",
}

/**
 * Personnel who keep the school running without a teaching load.
 *
 * TODO: fill in emails and offices once the school confirms them.
 */
export const nonTeachingPersonnel: FacultyMember[] = [
  { honorific: "Ma'am", name: "Sheryl Blance", position: "School Registrar" },
]

/**
 * The teaching personnel, sorted by given name. Hand-authored for now;
 * a CMS would replace this array and nothing else.
 *
 * TODO: fill in positions, emails, rooms, and subjects once the school
 * confirms them.
 */
export const facultyMembers: FacultyMember[] = [
  { honorific: "Ma'am", name: "Angela P. Ortiz" },
  { honorific: "Sir", name: "Apollo C. Tracena" },
  { honorific: "Ma'am", name: "Bernadette G. Cariño" },
  { honorific: "Ma'am", name: "Catherine R. Dumanay" },
  { honorific: "Sir", name: "Earl Henrie B. Pacamarra" },
  { honorific: "Ma'am", name: "Famela B. Tibayan" },
  { honorific: "Sir", name: "Generoso G. Conmigo" },
  { honorific: "Ma'am", name: "Jamaica C. Pascua" },
  { honorific: "Ma'am", name: "Jennifer P. Siarot" },
  { honorific: "Sir", name: "Jhon Leroy C. Garcera" },
  { honorific: "Ma'am", name: "Ketchie G. Magonles" },
  { honorific: "Ma'am", name: "Ma. Ferly A. Periera" },
  { honorific: "Ma'am", name: "Manilyn B. Gonzaga" },
  { honorific: "Sir", name: "Mark Joffet Reconcillo" },
  { honorific: "Ma'am", name: "Mary Gel P. Prado" },
  { honorific: "Ma'am", name: "Mary Rose B. Reconcillo" },
  { honorific: "Ma'am", name: "Michelle Ann T. Botial" },
  { honorific: "Sir", name: "Patrick Paul E. Prado" },
  { honorific: "Ma'am", name: "Rachel B. Zape" },
  { honorific: "Sir", name: "Ryan S. Ortiz" },
  { honorific: "Ma'am", name: "Shiela B. Moraña" },
]

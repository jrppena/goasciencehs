import { schoolHead } from "@/lib/faculty"
import type { NewsPost } from "@/lib/db/models/news"

/** The news categories, in the order they should appear in the filter. */
export const newsCategories = [
  "Achievement",
  "Admissions",
  "Advisory",
  "Athletics",
  "Campus",
  "Community",
] as const

export type NewsCategory = (typeof newsCategories)[number]

/** Who may sign an Advisory, in the order they should appear in the form. */
export const signatoryRoles = ["Principal", "Officer-in-Charge"] as const

export type SignatoryRole = (typeof signatoryRoles)[number]

/** Shown alongside an Advisory's signature, explaining what makes it official. */
export const ADVISORY_VERIFICATION_RULE =
  "A notice is official only if it carries the principal's or officer-in-charge's signature."

export type { NewsPost }

/**
 * Seed source for the news collection; `npm run seed` upserts by slug.
 *
 * TODO: replace the placeholder copy with the school's real bulletins.
 */
export const newsPosts: NewsPost[] = [
  {
    slug: "research-team-places-second-regional-science-fair",
    category: "Achievement",
    publishedOn: "2026-08-12",
    isPublished: true,
    isFeatured: true,
    title: "GSHS research team places second in the regional science fair",
    excerpt:
      "Two Grade 10 learners took the silver for a low-cost water turbidity sensor built from salvaged parts.",
    author: "Office of the Principal",
    body: [
      "A pair of Grade 10 learners from Goa Science High School placed second in the Regional Science and Technology Fair held in Naga City last week, edging out entries from fourteen schools across Camarines Sur.",
      "Their project, a water turbidity sensor assembled from a salvaged laser diode and a photoresistor, measures suspended sediment in the Hinagyanan River for under three hundred pesos of parts. Commercial units for the same job start at eleven thousand.",
      "The pair spent the second semester calibrating the sensor against samples the municipal health office had already tested, then ran it every morning for six weeks through the tail end of the rainy season. The readings tracked the laboratory results closely enough that the barangay has asked to keep the prototype for the next monitoring cycle.",
      "The research adviser credited the school's after-hours laboratory access, opened last year, for most of the calibration work. The team advances to the national fair in February.",
    ],
  },
  {
    slug: "class-suspension-guidelines-rainy-season",
    category: "Advisory",
    publishedOn: "2026-08-05",
    isPublished: true,
    isFeatured: false,
    title: "Class suspension guidelines for the rainy season",
    excerpt:
      "How announcements are released, and what learners and parents should check first.",
    author: "Office of the Principal",
    signatoryName: schoolHead.name,
    signatoryRole: "Principal",
    body: [
      "With the rainy season underway, the school is restating how class suspensions are decided and announced so that no household has to rely on rumour.",
      "Suspensions covering the whole municipality are declared by the Local Chief Executive of Goa or by the Department of Education regional office. The school does not issue its own suspension when a wider order is already in force — it relays that order.",
      "Announcements are posted to the school's official Facebook page and sent through the class advisers' group chats, in that order. A post carries the signature of the principal or the officer-in-charge; anything without one is not official.",
      "Where no suspension has been declared but local flooding makes travel unsafe, parents may keep their child home. Advisers have been instructed to treat these absences as excused and to make the day's materials available.",
      "For learners already on campus when a suspension is announced mid-day, dismissal is staggered by year level so that the tricycle queue along the access road does not overwhelm the gate.",
    ],
  },
  {
    slug: "entrance-examination-schedule-grade-7",
    category: "Admissions",
    publishedOn: "2026-07-28",
    isPublished: true,
    isFeatured: false,
    title: "Entrance examination schedule released for incoming Grade 7",
    excerpt:
      "Testing runs across three Saturdays in September. Slots are assigned by barangay cluster.",
    author: "Office of Admissions",
    body: [
      "The entrance examination for incoming Grade 7 will be held on the first three Saturdays of September. Applicants are assigned to a testing date by barangay cluster, and the assignment is printed on the examination permit.",
      "Registration opens on the fifteenth of August at the guidance office and closes when the seat count for each date is filled. Exact requirements will be confirmed by the registrar closer to the registration date.",
      "The examination runs three hours and covers scientific reasoning, mathematics, reading comprehension, and English language proficiency.",
      "Results are posted at the school gate and on the official Facebook page four weeks after the last testing date. Passers confirm their slots in person within ten school days; unconfirmed slots go to the waiting list.",
    ],
  },
  {
    slug: "new-computer-laboratory-opens",
    category: "Campus",
    publishedOn: "2026-07-19",
    isPublished: true,
    isFeatured: false,
    title: "New computer laboratory opens with thirty workstations",
    excerpt:
      "Funded through the alumni association and the municipal government of Goa.",
    author: "Office of the Principal",
    body: [
      "The school's second computer laboratory opened this month with thirty workstations, doubling the number of learners who can sit a practical session at one time.",
      "The room was funded jointly by the alumni association, which raised the hardware budget over two years of homecoming drives, and by the municipal government of Goa, which covered the electrical rework and the air conditioning.",
      "Senior high electives get first call on the room during scheduled practical hours. Outside those hours it is open to any learner with an adviser's slip, including for research work that needs a machine at home the learner does not have.",
      "A backup generator line was run to the laboratory during construction, so a brownout no longer ends a practical session mid-way.",
    ],
  },
  {
    slug: "tracksters-sweep-district-meet",
    category: "Athletics",
    publishedOn: "2026-07-02",
    isPublished: true,
    isFeatured: false,
    title: "Tracksters sweep the district meet for the third straight year",
    excerpt:
      "Nine golds across sprints and distance events send eleven athletes to the provincials.",
    author: "Athletics Office",
    body: [
      "Goa Science High School took nine gold medals at the district athletic meet, holding the overall track title for a third consecutive year.",
      "The haul came from both ends of the programme: golds in the 100 and 200 metres for the sprint squad, and a clean sweep of the 1500 and 3000 metres on the distance side. The 4x100 relay team set a district record that had stood since 2019.",
      "Eleven athletes advance to the provincial meet in October. Six of them are in Grade 9 or below, which the coaching staff read as the more durable result.",
      "Morning training resumes at five thirty on the oval, with conditioning moved indoors on rain days now that the laboratory annex corridor is available.",
    ],
  },
  {
    slug: "outreach-program-science-demos-barangays",
    category: "Community",
    publishedOn: "2026-06-21",
    isPublished: true,
    isFeatured: false,
    title: "Outreach program brings science demos to five barangays",
    excerpt:
      "Senior high students ran hands-on stations for elementary pupils over the semestral break.",
    author: "Student Affairs",
    body: [
      "Over the semestral break, seventy senior high learners ran hands-on science stations for elementary pupils in five barangays across Goa.",
      "Each visit set up four stations — density, simple circuits, plant tissue under a field microscope, and a chemistry demonstration built around household reagents. Pupils rotated through in groups of eight, with a GSHS learner running each station.",
      "The programme is organised by the student council and supervised by the science department. Materials came out of the department's consumables budget and from donations collected at the school's science month exhibit.",
      "Barangay officials in three of the five sites have asked for a return visit next break. The council is drawing up a schedule that spreads the load across elective clusters rather than leaning on STEM alone.",
    ],
  },
  {
    slug: "senior-high-cluster-orientation-schedule",
    category: "Admissions",
    publishedOn: "2026-06-08",
    isPublished: true,
    isFeatured: false,
    title: "Elective cluster orientation set for incoming Grade 11 applicants",
    excerpt:
      "Academic Track faculty answer questions on the Strengthened SHS curriculum before slot confirmation closes.",
    author: "Office of Admissions",
    body: [
      "Incoming Grade 11 applicants and their parents are invited to an elective cluster orientation in the covered court, held before slot confirmation closes so that a change of mind costs nothing.",
      "Grade 11 now runs on the Strengthened SHS curriculum, so there are no strands to pick. Faculty will walk through the five core subjects everyone carries, then through each Academic Track cluster — STEM, Business and Entrepreneurship, and Field Experience — and the post-secondary paths its electives feed into.",
      "Current Grade 12 learners will sit on the panel. The admissions office has asked them to speak to the workload plainly rather than to recruit.",
      "Applicants who cannot attend may book a consultation slot with the guidance office during the same week.",
    ],
  },
  {
    slug: "library-extended-hours-research-season",
    category: "Campus",
    publishedOn: "2026-05-27",
    isPublished: true,
    isFeatured: false,
    title: "Library moves to extended hours for research season",
    excerpt:
      "Open until six in the evening on weekdays through the end of the research defence period.",
    author: "Learning Resource Center",
    body: [
      "The learning resource center is open until six in the evening on weekdays for the duration of the research defence period, two hours past the usual close.",
      "The extension covers the reading room, the reference collection, and the four shared desktops. Borrowing still closes at the regular hour so that the day's returns can be shelved.",
      "Learners staying past dismissal must be logged at the desk, and the guard on the evening shift has the roster. Advisers can request a group slot for a defence rehearsal.",
      "The center is also holding short citation clinics twice a week for research groups working through their reference lists.",
    ],
  },
]

const newsDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

/** Renders an ISO date as "12 Aug 2026". */
export function formatNewsDate(isoDate: string) {
  return newsDateFormatter.format(new Date(isoDate))
}

/** URL-safe slug: lowercase, accents stripped, runs of non-alphanumerics to hyphens. */
export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Narrows an unvalidated query string to a known category, case-insensitively. */
export function parseNewsCategory(value: string | string[] | undefined) {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim().toLowerCase()
  return newsCategories.find((category) => category.toLowerCase() === raw)
}

/** How many days (inclusive of today) an Advisory stays in the header strip. */
export const ADVISORY_STRIP_DAYS = 3

/** The school's local time zone, used to decide what "today" means for advisories. */
export const SCHOOL_TIME_ZONE = "Asia/Manila"

const isoDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: SCHOOL_TIME_ZONE,
})

/**
 * The `publishedOn` window (inclusive, YYYY-MM-DD) a current advisory must
 * fall in, anchored to "today" in the school's time zone.
 */
export function advisoryWindow(now: Date): { since: string; today: string } {
  const today = isoDateFormatter.format(now)
  const [year, month, day] = today.split("-").map(Number)
  const since = new Date(Date.UTC(year, month - 1, day - (ADVISORY_STRIP_DAYS - 1)))
    .toISOString()
    .slice(0, 10)

  return { since, today }
}

import type { AcademicsSettings } from "@/lib/db/models/academics-settings"
import type { CoreSubject } from "@/lib/db/models/core-subject"
import type { CurriculumShiftStep } from "@/lib/db/models/curriculum-shift-step"
import type { ElectiveCluster } from "@/lib/db/models/elective-cluster"
import type { LearningArea } from "@/lib/db/models/learning-area"
import type { MatatagStep } from "@/lib/db/models/matatag-step"
import type { ScienceProgramLevel } from "@/lib/db/models/science-program-level"

export type { AcademicsSettings } from "@/lib/db/models/academics-settings"
export type { CoreSubject } from "@/lib/db/models/core-subject"
export type { CurriculumShiftStep } from "@/lib/db/models/curriculum-shift-step"
export type { ElectiveCluster } from "@/lib/db/models/elective-cluster"
export type { LearningArea } from "@/lib/db/models/learning-area"
export type { MatatagStep } from "@/lib/db/models/matatag-step"
export type { ScienceProgramLevel } from "@/lib/db/models/science-program-level"

/**
 * Seed source for the Academics pages. `npm run seed` upserts each entry by its
 * natural key (learning areas by name, science program levels by grade, MATATAG
 * steps by title, core subjects by name, elective clusters by name, curriculum
 * shift steps by title) and the core subject hours as a single document.
 */
export const learningAreas: LearningArea[] = [
  {
    name: "Language",
    body: "English reading, writing, and oral communication, taught as a foundational literacy area under MATATAG.",
    order: 1,
  },
  {
    name: "Filipino",
    body: "Pagbasa, pagsulat, at panitikan — carried across all four year levels.",
    order: 2,
  },
  {
    name: "Mathematics",
    body: "Algebra, geometry, statistics, and probability, enriched for the school's science load.",
    order: 3,
  },
  {
    name: "Science",
    body: "The spiral progression of earth, life, physical, and chemical science, taught with laboratory hours attached.",
    order: 4,
  },
  {
    name: "Araling Panlipunan",
    body: "Asian and Philippine history, geography, economics, and contemporary issues.",
    order: 5,
  },
  {
    name: "Technology and Livelihood Education",
    body: "Replaced by Research in the special science program, with computer education folded into the Research class.",
    order: 6,
  },
  {
    name: "MAPEH",
    body: "Music, Arts, Physical Education, and Health, taken as one learning area.",
    order: 7,
  },
  {
    name: "Values Education",
    body: "Character formation, carried alongside the Homeroom Guidance Program.",
    order: 8,
  },
]

export const scienceProgramLevels: ScienceProgramLevel[] = [
  {
    grade: "Grade 7",
    specialisation: "Environmental Science",
    summary:
      "Ecosystems, water and soil quality, and waste — studied on the campus grounds and along the Goa river system before anything is written up.",
    work: [
      "Field sampling and data collection",
      "Research 1: the nature of scientific investigation",
      "First investigatory project, in pairs",
    ],
    tone: "primary",
    order: 1,
  },
  {
    grade: "Grade 8",
    specialisation: "Biotechnology",
    summary:
      "Fermentation, tissue culture, and applied microbiology, with the laboratory work that the topics need rather than a reading list about them.",
    work: [
      "Culture and sterile technique",
      "Research 2: formulating a hypothesis and designing an experiment",
      "Investigatory project with a controlled variable set",
    ],
    tone: "secondary",
    order: 2,
  },
  {
    grade: "Grade 9",
    specialisation: "Consumer Chemistry",
    summary:
      "The chemistry of what households buy and use — food, cleaning agents, cosmetics, and fuels — tested for what the label claims.",
    work: [
      "Quantitative analysis and titration",
      "Research 3: data handling and statistical treatment",
      "Product-testing investigatory project",
    ],
    tone: "primary",
    order: 3,
  },
  {
    grade: "Grade 10",
    specialisation: "Electronics and Robotics",
    summary:
      "Circuits, microcontrollers, and control systems, ending in a built and working device rather than a diagram of one.",
    work: [
      "Circuit design and microcontroller programming",
      "Research 4: writing and defending the research report",
      "Capstone project, defended before a faculty panel",
    ],
    tone: "secondary",
    order: 4,
  },
]

export const matatagSteps: MatatagStep[] = [
  {
    year: "SY 2024–2025",
    title: "Grade 7 moves first",
    body: "The MATATAG curriculum reached junior high with Grade 7, alongside Kindergarten and Grades 1 and 4. Fewer learning competencies per subject, more time on each.",
    order: 1,
  },
  {
    year: "SY 2025–2026",
    title: "Grade 8 follows",
    body: "The Grade 7 cohort carries the new curriculum upward while Grade 8 shifts onto it, together with Grades 2, 3, and 5.",
    order: 2,
  },
  {
    year: "SY 2026–2027",
    title: "Grades 9 and 10 complete the phase",
    body: "The last two junior high year levels move over with Grade 6. From this year, all of Grades 7 to 10 run one curriculum end to end.",
    order: 3,
  },
]

export const coreSubjects: CoreSubject[] = [
  {
    name: "Effective Communication and Mabisang Komunikasyon",
    body: "Reading, writing, and speaking for academic and workplace purposes, carried in both English and Filipino.",
    order: 1,
  },
  {
    name: "General Mathematics",
    body: "The mathematics every pathway needs before its own advanced electives.",
    order: 2,
  },
  {
    name: "General Science",
    body: "Integrated physical and life science, taught with laboratory hours attached.",
    order: 3,
  },
  {
    name: "Life and Career Skills",
    body: "Financial literacy, digital citizenship, and the groundwork for a career plan.",
    order: 4,
  },
  {
    name: "Pag-aaral ng Kasaysayan at Lipunang Pilipino",
    body: "Philippine history and society, read through primary sources.",
    order: 5,
  },
]

export const electiveClusters: ElectiveCluster[] = [
  {
    name: "Science, Technology, Engineering and Mathematics",
    summary:
      "The cluster the school was built around. Advanced mathematics, specialised sciences, and data analytics, with laboratory hours attached to every science elective.",
    subjects: [
      "Pre-calculus and calculus",
      "Specialised chemistry, physics, and biology",
      "Data analytics and computational thinking",
      "Capstone research, defended before a faculty panel",
    ],
    pathways: "Engineering, medicine, allied health, and the natural sciences",
    tone: "primary",
    order: 1,
  },
  {
    name: "Business and Entrepreneurship",
    summary:
      "Accounting, marketing, and organisational management, taught around a student-run enterprise that has to open, trade, and close its books within Grade 12.",
    subjects: [
      "Fundamentals of accountancy",
      "Applied economics and business mathematics",
      "Marketing and organisational management",
      "Enterprise project, from business plan to final audit",
    ],
    pathways: "Accountancy, business administration, economics, and management",
    tone: "secondary",
    order: 2,
  },
  {
    name: "Field Experience",
    summary:
      "Optional in the Academic Track, and taken alongside a learner's main cluster rather than instead of it. Placements are arranged with partner institutions in and around Goa.",
    subjects: [
      "Apprenticeship with a partner laboratory, clinic, or firm",
      "Extended research placement under a faculty adviser",
      "Supervised community and outreach work",
      "Portfolio and reflection, assessed at the end of the term",
    ],
    pathways: "Any cluster — it deepens the pathway a learner already chose",
    tone: "primary",
    order: 3,
  },
]

export const curriculumShiftSteps: CurriculumShiftStep[] = [
  {
    year: "SY 2026–2027",
    title: "Grade 11 starts the strengthened curriculum",
    body: "Incoming Grade 11 learners enrol under the Academic Track with five core subjects and elective clusters. There is no strand to choose at enrolment.",
    order: 1,
  },
  {
    year: "SY 2026–2027",
    title: "Grade 12 finishes the old curriculum",
    body: "Learners already in Grade 12 stay on the strand they began under — STEM, ABM, or HUMSS — and graduate under it. Their subject load does not change.",
    order: 2,
  },
  {
    year: "SY 2027–2028",
    title: "Both year levels on one curriculum",
    body: "The last strand cohort has graduated and Grades 11 and 12 both run the strengthened curriculum end to end.",
    order: 3,
  },
]

export const academicsSettings: AcademicsSettings = { coreSubjectHours: 160 }

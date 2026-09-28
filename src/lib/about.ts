import type { AboutStory } from "@/lib/db/models/about-story"
import type { CoreValue } from "@/lib/db/models/core-value"
import type { Milestone } from "@/lib/db/models/milestone"
import type { MissionVisionStatement } from "@/lib/db/models/mission-vision"

export type { AboutStory } from "@/lib/db/models/about-story"
export type { CoreValue } from "@/lib/db/models/core-value"
export type { Milestone } from "@/lib/db/models/milestone"
export type { MissionVisionStatement } from "@/lib/db/models/mission-vision"

/**
 * Seed source for the About page. `npm run seed` upserts each entry by its
 * natural key (core values by title, milestones by year, statements by label).
 */
export const coreValues: CoreValue[] = [
  {
    icon: "FlaskConical",
    title: "Inquiry",
    body: "Questions before answers. Coursework is graded on reasoning, and no claim survives here without evidence behind it.",
    order: 1,
  },
  {
    icon: "ShieldCheck",
    title: "Integrity",
    body: "Honest data, honest work. A result that did not happen is worth nothing, in the laboratory and outside it.",
    order: 2,
  },
  {
    icon: "HeartHandshake",
    title: "Service",
    body: "The community funds this school. Outreach, clean-ups, and barangay science demos put that back where it came from.",
    order: 3,
  },
  {
    icon: "Compass",
    title: "Discipline",
    body: "Show up, prepare, follow through. The habits formed across six year levels outlast any single subject.",
    order: 4,
  },
]

export const milestones: Milestone[] = [
  {
    year: "2015",
    title: "The school is established",
    body: "Local stakeholders open GSHS so learners who miss the Philippine Science High School cut-off can still take a science curriculum without leaving Goa. Classes begin in a temporary campus at the ABC Building along Belen Street.",
    order: 1,
  },
  {
    year: "2017",
    title: "Relocation to the permanent campus",
    body: "The school moves to its own grounds in Tagongtong, Goa — room at last for dedicated laboratories and a full six year levels.",
    order: 2,
  },
  {
    year: "2026",
    title: "Six year levels on one campus",
    body: "Junior high and senior high now run at Tagongtong, from Grade 7 through Grade 12.",
    order: 3,
  },
]

export const missionVisionStatements: MissionVisionStatement[] = [
  {
    icon: "Target",
    label: "Mission",
    title: "Teach learners to ask better questions",
    body: "To deliver a rigorous science and mathematics education to the learners of Goa and its neighbouring towns, grounded in inquiry, evidence, and service — without asking any child to leave home for it.",
    tone: "primary",
    order: 1,
  },
  {
    icon: "Eye",
    label: "Vision",
    title: "The science school Bicol sends its children to",
    body: "A campus where every graduate leaves able to design an experiment, defend a conclusion, and carry both back into the community that raised them.",
    tone: "secondary",
    order: 2,
  },
]

export const aboutStory: AboutStory = {
  heading: "From Belen Street to Tagongtong",
  paragraphs: [
    "Every year, learners from Goa sat the Philippine Science High School entrance examination, and every year most of them did not make it — leaving a science curriculum out of reach unless the family could send a child away from Goa entirely. In 2015 local stakeholders decided the town should stop exporting that problem and build the school here instead.",
    "GSHS opened in a temporary campus, the ABC Building along Belen Street, and moved to its own grounds in Tagongtong in 2017. The curriculum was special from the first intake: extra laboratory hours, an advanced mathematics track, and a research project every learner defends out loud — near enough to home that no family has to choose between the two.",
  ],
}

import type { SchoolStats } from "@/lib/db/models/school-stats"
import { facultyMembers, nonTeachingPersonnel } from "@/lib/faculty"

/**
 * Seed source for the school's headline figures. `facultyAndStaff` is only a
 * placeholder here — the data layer recomputes it from the faculty collection.
 *
 * TODO: replace the placeholder figures (everything but faculty and staff)
 * with the school's real numbers once confirmed.
 */
export const schoolStats: SchoolStats = {
  learnersEnrolled: "1,240",
  /** Everyone the faculty page renders: the school head, teaching staff, and non-teaching personnel. */
  facultyAndStaff: String(
    1 + facultyMembers.length + nonTeachingPersonnel.length
  ),
  yearEstablished: "2015",
  collegeProgressionRate: "97%",
}

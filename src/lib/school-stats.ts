import { facultyMembers, nonTeachingPersonnel } from "@/lib/faculty"

/**
 * Single source of truth for the school's headline figures. Read by every
 * component that quotes them — never duplicated.
 *
 * TODO: replace the placeholder figures (everything but faculty and staff)
 * with the school's real numbers once confirmed.
 */
export const schoolStats = {
  learnersEnrolled: "1,240",
  /** Everyone the faculty page renders: the school head, teaching staff, and non-teaching personnel. */
  facultyAndStaff: String(
    1 + facultyMembers.length + nonTeachingPersonnel.length
  ),
  yearEstablished: "2015",
  collegeProgressionRate: "97%",
} satisfies Record<string, string>

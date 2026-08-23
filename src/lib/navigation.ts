export type NavLink = {
  label: string
  href: string
  description: string
}

/** A section without `children` renders as a plain link, not a dropdown. */
export type NavSection = {
  label: string
  href: string
  children?: NavLink[]
}

/**
 * The site's navigation tree. Rendered by the desktop nav, the mobile
 * drawer, and the footer's quick links.
 */
export const navigation: NavSection[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About GSHS",
        href: "/about",
        description: "Our history, mission, and guiding principles.",
      },
      {
        label: "News and Announcements",
        href: "/about/news-and-announcements",
        description: "Campus bulletins, advisories, and student features.",
      },
    ],
  },
  {
    label: "Faculty and Staff",
    href: "/faculty-and-staff",
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      {
        label: "Junior High School",
        href: "/academics/junior-high-school",
        description: "The Grades 7 to 10 special science curriculum.",
      },
      {
        label: "Senior High School",
        href: "/academics/senior-high-school",
        description: "Academic Track elective clusters for Grades 11 and 12.",
      },
    ],
  },
]

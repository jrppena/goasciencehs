/**
 * Single source of truth for the school's identity and contact details.
 * Read by the footer and by the root layout's metadata — never duplicated.
 *
 * TODO: replace the placeholder contact details with the real ones.
 */
export const site = {
  name: "Goa Science High School",
  shortName: "GSHS",
  tagline: "Educating the mind without educating the heart is no education at all.",
  description:
    "A public science high school in Goa, Camarines Sur, offering a special science curriculum for Grades 7 to 12.",
  address: "Tagongtong, Goa, Camarines Sur, 4422, Philippines",
  phone: "+63 54 453 1234",
  email: "info@goasciencehs.edu.ph",
  socials: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
} as const

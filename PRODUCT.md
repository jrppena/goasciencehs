# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site serves four audiences, and all four carry equal weight:

- **Prospective families.** Grade 6 learners and their parents, plus Grade 10 completers weighing senior high. They are deciding whether to apply and what the special science curriculum asks of a learner.
- **Current learners and parents.** They check advisories, class suspensions, and announcements, often on phones and during bad weather.
- **Alumni and the wider community.** They follow achievements, milestones, and school news.
- **DepEd and local government.** They look to the site as the school's official public record.

## Product Purpose

This is the official public website of Goa Science High School (GSHS). GSHS is a public science high school in Tagongtong, Goa, Camarines Sur, Philippines. It offers a special science curriculum for Grades 7 to 12. The site explains the school and its programs, publishes news and advisories, and lists faculty and staff. It succeeds when each audience finds what it came for quickly and can trust it as the school's own voice.

## Positioning

GSHS gives Bicolano learners a rigorous science and mathematics education without making them leave home for it. The school emphasizes laboratory-first instruction, small sections, a yearly investigatory project defended before a faculty panel, and service to the local community.

## Operating Context

- **Stack.** Next.js 16 App Router, React 19, Tailwind CSS v4, and shadcn/ui.
- **Content.** All content is typed data in `src/lib` (`site.ts`, `news.ts`, `faculty.ts`, `navigation.ts`). There is no CMS.
- **Advisories.** Official announcements go out on the school's Facebook page first, then through class advisers. A notice is official only if it carries the principal's or officer-in-charge's signature.
- **Visitors.** Many visitors use phones on variable rural connections.

## Capabilities and Constraints

- **Routes:**
  - Home.
  - About, including story, mission and vision, milestones, core values, and the principal's message.
  - News listing and article detail, with category filters: Achievement, Admissions, Advisory, Athletics, Campus, and Community.
  - Junior High School (Grades 7–10, including the MATATAG rollout and admission).
  - Senior High School (Grades 11–12).
  - Faculty and staff directory.
- **Approval.** This is an official school site. The school must approve all content, and the site must follow DepEd norms for public school communication.
- **Terminology.** Use "learners" (DepEd usage) and "Grade 7–12".
- **Program names.** Use "Junior High School" and "Senior High School".

## Brand Commitments

- **Name.** Goa Science High School, short name GSHS.
- **Tagline.** "Educating the mind without educating the heart is no education at all."
- **Logo.** `public/gshs-logo-transparent.png`.

## Evidence on Hand

- **Real assets:**
  - `public/gshs-logo-transparent.png`.
  - `public/gshs-landing.jpg` (campus grounds).
  - `public/gshs-jhs.jpg` (junior high learners assembled).
  - `public/sir-ronald.png` (staff portrait).
- **Placeholder content.** Treat all of the following as placeholder until the school supplies real data:
  - Every statistic (enrollment, staff count, year established, college progression rate).
  - Every alumni testimonial and name.
  - Every news bulletin.
  - The contact phone, email, and social links in `site.ts`.
- **No new claims.** Do not invent new statistics, quotes, awards, rankings, or names. Layouts must tolerate real figures and copy of different lengths.

## Product Principles

1. **Official record first.** Everything published speaks for the school, so accuracy and approvability outrank flourish.
2. **Every audience finds its door.** Admissions, current-learner notices, and community news each need a clear, fast path. None is buried under another.
3. **Urgent information is never hard to find.** Advisories such as class suspensions must be quick to reach and easy to verify as official.
4. **Show the rigor honestly.** Communicate the special science curriculum through what learners actually do, never through unverified claims.
5. **Built for the phone in the barangay.** Pages stay light and readable on modest devices and connections.

## Accessibility & Inclusion

The audience is public and multi-generational, including parents with varied digital literacy. Aim for WCAG 2.2 AA with readable type and plain-language copy.

# Goa Science High School Website

Public website for **Goa Science High School** (GSHS) — a public science high school in Goa, Camarines Sur, Philippines, offering a special science curriculum for Grades 7 to 12.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and shadcn/ui.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, mission stats, program previews, alumni testimonials, news preview |
| `/about` | Story, mission and vision, milestones |
| `/about/news-and-announcements` | News listing |
| `/about/news-and-announcements/[slug]` | News article detail |
| `/academics/junior-high-school` | Junior high program (Grades 7–10) |
| `/academics/senior-high-school` | Senior high program (Grades 11–12) |
| `/faculty-and-staff` | Faculty and staff directory |

## Project Structure

```
src/
  app/          Routes (App Router), root layout, global styles
  components/
    home/       Landing page sections
    about/      About page sections
    junior-high/, senior-high/   Program page sections
    news/       News listing and article components
    faculty/    Faculty directory components
    layout/     Header, footer, navigation shell
    motion/     Reveal and page-transition primitives
    ui/         shadcn/ui base components
  lib/
    site.ts        School identity and contact details (single source of truth)
    navigation.ts  Nav structure
    news.ts        News content
    faculty.ts     Faculty and staff data
    motion.ts      Shared animation variants
    utils.ts       `cn` class helper
  types/        Local type declarations
```

Content lives as typed data in `src/lib` rather than in a CMS — edit those files to update copy, news, or staff listings.

## Design

Design tokens (colors, typography scale, elevation) are documented in [DESIGN.md](DESIGN.md) and applied as CSS variables in the global stylesheet.

## Conventions

Coding principles (KISS, DRY, self-documenting code, YAGNI) are in [CLAUDE.md](CLAUDE.md). Notes for AI coding agents are in [AGENTS.md](AGENTS.md).

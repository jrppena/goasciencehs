# Goa Science High School Website

Public website for **Goa Science High School** (GSHS) — a public science high school in Goa, Camarines Sur, Philippines, offering a special science curriculum for Grades 7 to 12.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and shadcn/ui.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Copy the example env file and fill in the connection strings:

```bash
cp .env.example .env.local
```

`MONGODB_ENV` selects the database:

| `MONGODB_ENV` | Connection string used | Typical target |
| --- | --- | --- |
| `development` | `MONGODB_URI_DEVELOPMENT` | MongoDB running locally |
| `production` | `MONGODB_URI_PRODUCTION` | MongoDB Atlas |

All three variables are server-only. If `MONGODB_ENV` is missing or the selected connection string is unset, the first database connection fails fast with a clear error.

`AUTH_SECRET` signs the admin session cookie. Generate one with `openssl rand -base64 32` and set the same value on Vercel.

`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` enable admin image uploads. The secret stays server-side; uploaded assets are served from `res.cloudinary.com` (allowed in `next.config.ts`).

#### Local MongoDB

Run MongoDB locally and point `MONGODB_URI_DEVELOPMENT` at it (the default in `.env.example` is `mongodb://127.0.0.1:27017/gshs`).

#### MongoDB Atlas (production)

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Under **Database Access**, create a user with read/write access to the site database.
3. Under **Network Access**, allow the addresses that connect:
   - Local development (only if you use `MONGODB_ENV=production` locally): your current public IP.
   - Vercel: serverless functions use dynamic egress IPs, so allow `0.0.0.0/0`, or route traffic through a fixed IP (Atlas + Vercel integration or a static-IP proxy) and allow only that.
4. Copy the connection string from **Database → Connect → Drivers** into `MONGODB_URI_PRODUCTION`, replacing `<user>`, `<password>`, and `<host>`.
5. In the Vercel project, set `MONGODB_ENV=production` and `MONGODB_URI_PRODUCTION` as environment variables.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run the Vitest suite |
| `npm run create-admin` | Create or update the single admin account |
| `npm run seed` | Upsert the core content into the configured database |

`npm run seed` migrates the content in `src/lib` (news, faculty, site settings, school stats) into MongoDB. It is idempotent — news upserts by slug, faculty by name — so it is safe to re-run.

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

## Admin

The admin area (`/admin`) is protected by [Auth.js](https://authjs.dev) v5 — credentials provider, JWT session cookie — and is meant for a single staff account.

1. Set `AUTH_SECRET` in `.env.local` (see [Environment](#environment)).
2. Create the account:

   ```bash
   npm run create-admin
   ```

   The script reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` when set and prompts otherwise. Only a bcrypt hash is stored.
3. Sign in at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

There is no public signup. Route protection lives in `src/proxy.ts` (Next 16's rename of middleware), and no Server Action may mutate without calling `requireAdmin()` first.

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
    auth/          Auth.js config, password hashing, requireAdmin
    db/            Mongoose connection and models
    site.ts        School identity and contact details (single source of truth)
    navigation.ts  Nav structure
    news.ts        News content
    faculty.ts     Faculty and staff data
    motion.ts      Shared animation variants
    utils.ts       `cn` class helper
  proxy.ts      Auth gate for /admin/** (Next 16's middleware)
  types/        Local type declarations
scripts/        One-off maintenance scripts (create-admin)
```

Content is seeded from typed data in `src/lib` into MongoDB (`npm run seed`). Public pages read it through the `server-only` data layer in `src/lib/db/content.ts`, which filters unpublished news and invisible faculty; admin saves refresh the affected pages via `revalidateContent`.

## Design

Design tokens (colors, typography scale, elevation) are documented in [DESIGN.md](DESIGN.md) and applied as CSS variables in the global stylesheet.

## Conventions

Coding principles (KISS, DRY, self-documenting code, YAGNI) are in [CLAUDE.md](CLAUDE.md). Notes for AI coding agents are in [AGENTS.md](AGENTS.md).

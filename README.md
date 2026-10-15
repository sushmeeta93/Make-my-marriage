# Make My Marriage

A planner-first workspace for coordinating complex Indian weddings.

This repository currently contains the application scaffold and the approved
product, system, database, and API designs under [`docs/`](docs/).

## Stack

- Next.js App Router and Node.js
- React and TypeScript
- Tailwind CSS and shadcn/ui conventions
- MongoDB Atlas with Mongoose
- Zod validation
- Vitest, React Testing Library, and Playwright
- Vercel deployment

Auth.js, Cloudflare R2, Resend, and Google Places are documented integration
boundaries. Their real clients are intentionally deferred to later milestones.

## Local setup

Requirements:

- Node.js 22 or later
- pnpm 10

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The placeholder UI does not require external credentials. Database and service
operations will fail with a clear configuration error until their environment
variables and adapters are implemented.

## Commands

```bash
pnpm dev          # local development
pnpm build        # production build
pnpm lint         # ESLint
pnpm typecheck    # TypeScript
pnpm test         # unit/component tests
pnpm test:e2e     # Playwright (install browsers first)
pnpm format       # Prettier
pnpm format:check # verify formatting
```

Install Playwright browsers before the first E2E run:

```bash
pnpm exec playwright install chromium
```

## Route shells

- `/` — marketing landing page
- `/login` and `/signup` — authentication shell
- `/weddings` — planner workspace shell
- `/weddings/new` — wedding setup placeholder
- `/w/[slug]` — public wedding shell
- `/g/[galleryToken]` — private gallery shell

## Architecture boundaries

- `src/app` — routes and layouts
- `src/components` — UI grouped by experience
- `src/lib` — infrastructure and shared application services
- `src/modules` — product domains
- `src/models` — Mongoose models
- `src/validation` — shared Zod schemas
- `tests` — unit, component, and browser tests

Read the documents in `docs/` before implementing product behavior. They are
the source of truth for scope and permissions.

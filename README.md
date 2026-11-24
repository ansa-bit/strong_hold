This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact Form Email (Resend)

The contact form submits to `/api/contact` and sends emails through Resend.

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and set values:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=hello@yourdomain.com
```

## Content Management (Sanity)

Blog posts, services, projects (Works page + homepage "Recent Works") and FAQs
are managed in Sanity. The Studio is built into the site at **`/studio`**.

Without `NEXT_PUBLIC_SANITY_PROJECT_ID` the site falls back to the bundled
content in `app/**/*-data.ts`, so it always builds.

### One-time setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (dataset: `production`).
2. In the project → **API → CORS origins**, add `http://localhost:3000` and
   `https://strongholdstructures.in` with **Allow credentials** checked.
3. Add to `.env.local` (and your hosting env vars):
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_REVALIDATE_SECRET=any-long-random-string
   ```
4. Import the existing content and images:
   create an **Editor** token under **API → Tokens**, add it as
   `SANITY_API_WRITE_TOKEN` in `.env.local`, then run `npm run sanity:seed`.
   (Delete the token afterwards if you like — the site only reads public data.)
5. Add a webhook so published changes go live instantly (otherwise pages refresh hourly):
   **API → Webhooks → Create** — URL `https://strongholdstructures.in/api/revalidate`,
   triggers Create/Update/Delete, filter `_type in ["blogPost","service","project","faq"]`,
   projection `{_type}`, secret = `SANITY_REVALIDATE_SECRET`.
6. Invite editors under **Members**; they sign in at `/studio`.

### Where things live

| Path | Purpose |
| --- | --- |
| `sanity.config.ts`, `sanity/structure.ts` | Studio config and sidebar |
| `sanity/schemaTypes/` | Content models (blog post, service, project, FAQ, SEO) |
| `sanity/lib/content.ts` | All content fetching used by pages (Sanity or local fallback) |
| `app/api/revalidate/route.ts` | Webhook that refreshes cached pages on publish |
| `scripts/seed-sanity.mjs` | Imports local content into Sanity |

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# strong_hold

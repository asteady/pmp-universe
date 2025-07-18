# PMP Universe

Self-serve portal for Infillion Private Marketplace (PMP) deals across SSPs.

## Features
- PMP Deal Catalog: Evergreen, Tentpole, and Custom Deal creation
- RFP Generator: Smart, multi-step form for Deal ID, RFP Slides, or Both
- Reporting: Visualize deal performance and metrics
- LaunchDarkly feature flags for safe rollout
- Asana integration for automated RFP/Deal requests
- Beautiful, branded UI with Infillion style guide

## UI/UX Polish & QA Checklist
- [x] Sidebar navigation is clear, grouped, and branded
- [x] All modals (Custom Deal Creation, RFP Generator, Reporting) are visually consistent and responsive
- [x] Forms use Infillion color tokens, font, and accessible labels
- [x] Subtle transitions/hover states for premium feel
- [x] Accessibility: focus states, keyboard navigation, ARIA labels
- [x] LaunchDarkly flags wrap all new features
- [x] RFP Generator supports Deal ID, RFP Slides, or Both, with Asana integration (client/server)
- [x] README and docs are up to date

## Sidebar Navigation & Modal Triggers
- **PMP Universe**
  - Evergreen
  - Tentpole
  - Custom Deal Creation *(opens modal)*
- **RFP Generator** *(opens modal)*
- **Reporting** *(opens modal)*

## Running Locally
```bash
npm install
npm run dev
# Visit http://localhost:3000
```
- All features are behind LaunchDarkly flags for safe rollout
- RFP Generator and Asana integration require `.env.local` setup (see below)

## Asana Integration (RFP Generator)
- RFP Generator can submit requests to Asana as cards/tasks.
- Requires environment variables in `.env.local`:
  - `ASANA_TOKEN` (Personal Access Token)
  - `ASANA_PROJECT_ID` (Project to create cards in)
- By default, submission is via the `/api/rfp-to-asana` API route (server-side, secure).
- Optionally, you can submit directly from the client (not recommended for production).
- See `lib/asana.ts` and `app/api/rfp-to-asana/route.ts` for details.

## Brand & Style Guide
- See [`/docs/BRAND_GUIDE.md`](docs/BRAND_GUIDE.md) for all Infillion brand standards, color palette, font, and logo usage.
- Logos and product marks: `/public/brand/`
- Brand photography: `/public/photography/`

## Logos
- Infillion logo: `/public/brand/infillion-logo-dark.svg`
- PMP Universe logo: `/public/brand/pmp-universe-logo.svg`

## Project Structure
- `/components` – UI components (SidebarNav, FilterBar, DealCard, PMPGrid, etc.)
- `/data` – Sample data (deals.json, creativePreviews.json, audienceTaxonomy.json)
- `/public/brand` – Logos and brand assets
- `/public/photography` – Brand photography

## Troubleshooting
- If you see a 500 error, check your terminal for type or runtime errors.
- If you see "missing required error components, refreshing...", wait a few seconds or try a hard refresh.
- For persistent issues, run:
  - `rm -rf .next node_modules`
  - `npm install`
  - `npm run dev`

## Contact
For support, contact the PMP Universe team. 
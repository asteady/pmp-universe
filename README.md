# Infillion Analytics Dashboard

## Features
- MediaMath-style Campaign Performance Grid with dynamic, customizable columns
- Standardized "Columns" popover for all tables (add/remove columns live)
- Consistent filters, export, and UI across all tabs
- Robust error handling for all numeric fields (no more .toFixed()/.toLocaleString() errors)
- Realistic, client-friendly mock data for all charts and tables
- Fully working tooltips (including Audience Definitions)
- Audio, Video, Display, and Native creative support (VCR%/ACR% columns only for relevant formats)
- Beautiful, cyberpunk-inspired UI with premium UX

## Running Locally
1. `npm install`
2. `npm run dev`
3. If port 3000 is in use, Next.js will try 3001, 3002, etc. Check your terminal for the correct port.
4. Visit `http://localhost:PORT/dashboard` (replace PORT as needed)

## Troubleshooting
- If you see a 500 error, check your terminal for type or runtime errors.
- If you see "missing required error components, refreshing...", wait a few seconds or try a hard refresh.
- For persistent issues, run:
  - `rm -rf .next node_modules`
  - `npm install`
  - `npm run dev`

## QA Checklist
- All tables and charts render with realistic data
- All columns, filters, and export features work and are consistent
- All tooltips are visible and never cut off
- No runtime errors on any page

## Contact
For support, contact the Infillion Analytics Dashboard team. 

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
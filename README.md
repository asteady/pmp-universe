# Infillion Analytics Dashboard

A Next.js 15, TypeScript, and Tailwind CSS-based analytics platform with a cyberpunk/neon aesthetic. The dashboard provides advanced campaign analytics, audience insights, and interactive visualizations for advertisers, agencies, and admins.

## Features

- **Modern UI/UX:** Cyberpunk/neon theme, responsive layout, and smooth animations.
- **Header:** User profile in the top right, live status, and quick access to Digest and Email Report modals.
- **Advanced Filters:** Visible calendar/date picker, multi-select segment and device filters, and a single "Run Report" action.
- **Custom Report Builder:** Drag-and-drop grid layout, max component alert, and export options.
- **Interactive Map:** USA heatmap with zoom, pan, and traffic density visualization.
- **Tabs:** Main Dashboard, New to Brand, Viewability, Geo/Device, Placements, Foot Traffic, Audiences, and Custom.
- **Client-Only Mock Data:** Realistic, business-appropriate mock data for all metrics and visualizations.
- **Performance Pulse:** Appears only on the Main Dashboard for real-time campaign health.
- **Export & Email:** CSV/PDF export and scheduled email reports.
- **Gamification:** Badges, leaderboards, and progress bars for campaign achievements.
- **Error Handling:** Friendly error and not-found pages.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) or the port shown in your terminal.

### Environment
- Copy `.env.example` to `.env.local` and adjust as needed.
- Mock data is used by default for all analytics and visualizations.

### Build & Deploy
```bash
npm run build
npm start
```

## Key Components
- `src/app/dashboard/page.tsx` — Main dashboard and tab navigation
- `src/components/Filter.tsx` — Advanced filters with calendar/date picker
- `src/components/CustomReportBuilder.tsx` — Custom report builder with grid and alerts
- `src/components/InteractiveMap.tsx` — Interactive USA heatmap
- `src/api/mockData.ts` — Client-only mock data generators

## Customization
- Tailwind CSS for styling
- Framer Motion for animation
- Easily extend mock data and add new visualizations

## Known Issues
- All mock data is client-only to avoid SSR hydration errors
- Ensure all `.map()` keys are unique (see code for details)

## License
MIT 
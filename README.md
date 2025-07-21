# 🪐 PMP Universe

> **Infillion's Next-Generation Self-Service PMP Portal**

PMP Universe is Infillion's next-generation, self-service portal that brings Private Marketplace (PMP) deals to life. Whether you're a seasoned programmatic vet or new to the world of Deal IDs, this platform empowers sellers, marketers, and partners to:

* **Explore curated Evergreen, Seasonal, and Custom PMP deals**
* **Generate Smart RFPs and Instant Deals**
* **Preview dynamic cross-screen adaptable interactive creatives and proprietary audience insights**
* **Navigate with ease in a premium interface**
* **Glide across DSPs/SSPs** (DSPs such as MediaMath, The Trade Desk, DV360, Adelphic, StackAdapt and beyond; SSPs such as Nexxen, Magnite, OpenX, Index, Beachfront; future integrations for Audio (AdsWizz) and Native (Nativo))
* **Automate workflows** via Asana, LaunchDarkly, and beyond

This README and design system sets the foundation for a smooth dev experience, a polished UI/UX, and a delightful end-user journey.

## 🌈 Features

* ✨ **PMP Deal Catalog** — Filterable by season, format, creative types, and goals
* 📊 **Performance Reporting** — Impressions, Clicks, CTR%, VCR%, ROI by Segment
* 🛠️ **RFP Generator** — Modular form flow for Deal ID, RFP deck, or both
* 🔁 **Asana Integration** — Instant task creation for RFPs & custom deals
* 🔐 **Feature Flagged** — All beta features behind LaunchDarkly toggles
* 🎨 **Creative & Audience Galleries** — Curated preview by PMP + use cases
* 📥 **Downloadable Assets** — From survey templates to polygon geo-fencing previews
* 🌑 **Dark Mode / Light Mode** — Seamless toggling with Infillion-inspired palettes
* 🪄 **Easter Eggs** — Try the Konami code to unlock a secret PMP

## 🗂️ Folder Structure

```
pmp-universe/
├── components/          # UI elements (Cards, Filters, Tabs, Sidebar)
│   ├── DealCard.tsx
│   ├── FilterBar.tsx
│   ├── CustomDealCreationModal.tsx
│   ├── ReportingModal.tsx
│   ├── RFPGeneratorModal.tsx
│   ├── SidebarNav.tsx
│   └── UserProfile.tsx
├── data/               # Demo data (audiences, creatives, taxonomy)
│   ├── pmpData.ts      # Evergreen PMPs
│   ├── seasonalPMPs.ts # Tentpole PMPs
│   ├── customPMPs.ts   # Custom PMPs
│   ├── deals.json
│   └── audienceTaxonomy.json
├── public/
│   ├── brand/          # Logos, brand assets
│   └── photography/    # Lifestyle photography, visual examples
├── docs/               # Style guide, animation references
│   ├── STYLE_GUIDE.md
│   └── ANIMATION_GUIDE.md
├── app/
│   └── pmp-universe/   # Main application page
└── lib/
    ├── featureFlags.ts # LaunchDarkly integration
    └── asana.ts        # Asana API integration
```

## 🎨 PMP Universe Style Guide (Excerpt)

### Brand Colors
- **Primary**: `#3B82F6` (Blue), `#8B5CF6` (Purple), `#10B981` (Green)
- **Background**: `#0F172A` (Dark), `#F9FAFB` (Light)
- **Text**: `#FFFFFF` (Primary), `#94A3B8` (Secondary)
- **Status**: Green = Success, Amber = Caution, Red = Error

### Typography
- **Font**: Inter (Primary), JetBrains Mono (Code)
- **Headings**: `.text-5xl` (Main), `.text-3xl` (Subhead)
- **Body**: `.text-base`, `.text-sm`

### Component Guidelines
```css
/* Primary Button */
.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
         hover:from-blue-700 hover:to-blue-800 
         text-white font-semibold rounded-lg 
         transition-all duration-200;
}

/* Interactive Card */
.card-interactive {
  @apply bg-gradient-to-br from-slate-800 to-slate-900 
         rounded-xl p-6 border border-slate-700 
         shadow-lg hover:shadow-xl hover:scale-105 
         transition-all duration-300 cursor-pointer;
}
```

## 🎬 Animation Guide (Overview)

### Core Animation Patterns
- **`hover:scale-105`**: Cards expand on hover
- **`ease-bounce`**: Used for success pings
- **`animate-fade-in`, `animate-slide-up`**: For modals, sections
- **`transition-all duration-300 ease-in-out`**: Universal animation baseline

### Interactive Elements
- **Cards**: Glow + bounce effects
- **Buttons**: Ripple effect on click
- **Search bar**: Subtle zoom-in on focus
- **Tabs**: Sliding indicator animations

### Accessibility
- **ARIA labels** on all nav and form elements
- **Keyboard navigation** across tabs, forms, filters
- **Motion respects** `prefers-reduced-motion`

### Animation Timing
```css
/* Duration Scale */
.duration-75   { transition-duration: 75ms; }   /* Ultra Fast */
.duration-150  { transition-duration: 150ms; }  /* Fast */
.duration-200  { transition-duration: 200ms; }  /* Normal */
.duration-300  { transition-duration: 300ms; }  /* Slow */
.duration-500  { transition-duration: 500ms; }  /* Slower */
```

## 🚀 Design Goals

* **Frictionless**: Whether you're Joy (don't know shit) or Alan (know fucking everything) navigation should feel intuitive
* **Playful but Professional**: A sprinkle of glow, movement, personality, just enough to say "THIS IS ME ALEX" and to delight others
* **Composable**: Future-ready to plug into TrueSSP, IDVx, Reporting Dashboard, Omni DSP (Meta DSP concepts), MediaMath, and beyond as a product in our component marketplace
* **Clean Hand-off**: All files, animations, and logic neatly organized for Devs, Designers, PMs

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/asteady/pmp-universe.git
cd pmp-universe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
```bash
# Copy environment template
cp env.example .env.local

# Configure your environment variables
NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID=your_client_id
ASANA_ACCESS_TOKEN=your_asana_token
```

## 🎯 Key Components

### PMP Deal Cards
Interactive cards showcasing each PMP with:
- Performance metrics (VCR, CTR, Scale)
- Creative previews
- Targeting information
- One-click Deal ID generation

### Custom Deal Creation
Multi-step wizard for creating custom PMPs:
1. **SSP Selection** (Nexxen, Magnite, OpenX, etc.)
2. **DSP Selection** (MediaMath, Index, etc.)
3. **Deal Parameters** (Budget, targeting, formats)
4. **Automatic Deal ID Generation**

### Advanced Filtering
Multi-category filtering system:
- **Type**: Evergreen, Seasonal, Custom
- **Category**: Sports, Entertainment, Finance, etc.
- **Format**: Video, Display, Audio, Native
- **Performance**: High VCR, High CTR, etc.

## 📝 Form Flows & Asana Integration (2024 Update)

### Custom Deal Request (Multi-Step)
1. **Step 1: Client Details**
   - Agency Name (required)
   - Advertiser Name(s) (required)
   - Deal Name (required)
   - Flighting (required)
   - DSP(s) (multi-select, required, with "Other" option and conditional "DSP (Other) Name" field)
   - DSP Seat ID (optional)
   - Preferred SSP(s) (multi-select, optional, with tooltip)
   - Infillion Curated Creative (multi-select, required)
2. **Step 2: Ideal Audience Persona(s)**
   - Custom Audience (free text, optional)
   - Infillion Audience Taxonomy (multi-select, optional, with definitions)
   - Evergreen & Seasonal (multi-select, optional, with brief definitions)
3. **Step 3: Settings**
   - Primary Goal (single-select, required)
   - Primary Goal Benchmark (free text, required)
   - Secondary KPI (single-select, optional)
   - Secondary KPI Benchmark (free text, optional)
   - Device Type(s) (multi-select, required)
   - Geos (multi-select, required, Americas only)
   - Other Targeting Details (free text, optional)
   - Publisher Inclusion/Exclusion (free text, optional)
   - Reporting & Measurement (multi-select, optional)
4. **Step 4: Review & Submit**
   - Review all details, submit to Asana

### RFP Generator (Multi-Step)
1. **Step 1: Client Details**
   - Agency Name (required)
   - Advertiser/Brand Name (required)
   - Description (required)
2. **Step 2: Deal Settings**
   - Audience Taxonomy (multi-select, required, with definitions)
   - Custom Audiences (free text, required)
   - Creatives (multi-select, required)
   - Device Type(s) (multi-select, required)
   - Reporting & Measurement (multi-select, optional)
3. **Step 3: Review & Submit**
   - Review all details, submit to Asana

### Asana Integration
- **API:** All form submissions POST to Asana using a secure API route.
- **Task Mapping:** Each field is mapped to a custom field in Asana where possible; fallback is markdown in the task description.
- **Section Placement:**
  - Custom Deal: "Deal Request (AUTO)" section
  - RFP Generator: "RFP Proposal Request (AUTO)" section
- **Task Title:** Uses Client/Advertiser Name from the form.
- **Error Handling:** If custom fields fail, all data is included in the notes/description.

### UI/UX Enhancements
- **Dark/Light Mode:** Theme applied site-wide, all hardcoded colors refactored to use theme classes or CSS variables.
- **Guru/SidebarNav:** Internal Seismic links hidden for clients; Guru/SidebarNav refactored for theme and permission logic.
- **DealCard:** Content (Overview, Data, Creatives, Performance) is dynamic and unique per deal; checkmarks fixed to prevent wrapping; tooltips improved for readability.
- **Header:** "DIFFERENCE" removed, "by Infillion" styled and centered, animated typewriter text block added below title/subtitle.

## 🔧 Technical Stack

- **Framework**: Next.js 15.0.0
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Hooks
- **Feature Flags**: LaunchDarkly (simulated)
- **Integration**: Asana API
- **Deployment**: Vercel-ready

## 📊 Performance Metrics

### Current PMP Inventory
- **28 Evergreen PMPs** - Year-round performance
- **15 Seasonal/Tentpole PMPs** - Event-driven campaigns
- **8 Custom PMPs** - Tailored solutions

### Performance Benchmarks
- **Average VCR**: 85%+
- **Average CTR**: 0.8%+
- **Scale**: 1M+ impressions monthly
- **ROI**: 3.2x average return

## 🎨 Brand Integration

### Infillion Brand Elements
- **Logo**: Integrated throughout the interface
- **Color Palette**: Consistent with brand guidelines
- **Typography**: Inter font family for readability
- **Voice**: Professional yet approachable

### Custom Branding
- **PMP Universe Logo**: Custom designed for the platform
- **Icon System**: Consistent iconography
- **Animation Style**: Smooth, purposeful movements

## 🔐 Security & Compliance

- **Feature Flags**: All beta features behind LaunchDarkly
- **Data Privacy**: No sensitive data stored locally
- **API Security**: Secure token-based authentication
- **Compliance**: GDPR and CCPA ready

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: 44px minimum touch targets
- **Progressive Enhancement**: Works without JavaScript
- **Cross-Browser**: Chrome, Safari, Firefox, Edge

## 🚀 Deployment

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
```bash
# Required for production
NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID=
ASANA_ACCESS_TOKEN=
NEXT_PUBLIC_API_URL=
```

## 🤝 Contributing

### Development Workflow
1. **Feature Branch**: Create from `main`
2. **Development**: Follow style and animation guides
3. **Testing**: Ensure accessibility and performance
4. **Review**: Submit PR for review
5. **Merge**: Squash and merge to `main`

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Consistent formatting
- **Husky**: Pre-commit hooks

## 📚 Documentation

- **[Style Guide](./docs/STYLE_GUIDE.md)**: Complete design system
- **[Animation Guide](./docs/ANIMATION_GUIDE.md)**: Animation patterns and timing
- **[API Documentation](./docs/API.md)**: Integration endpoints
- **[Component Library](./docs/COMPONENTS.md)**: Reusable UI components

## 🎯 Roadmap

### Q1 2025
- [ ] **TrueSSP Integration** - Direct SSP connectivity
- [ ] **IDVx Integration** - Identity verification
- [ ] **Enhanced Reporting** - Real-time dashboards

### Q2 2025
- [ ] **Omni DSP** - Meta DSP concepts
- [ ] **MediaMath Deep Integration** - Advanced targeting
- [ ] **Mobile App** - Native iOS/Android

### Q3 2025
- [ ] **AI-Powered Recommendations** - Smart PMP suggestions
- [ ] **Advanced Analytics** - Predictive performance
- [ ] **Enterprise Features** - Multi-tenant support

## 📣 Support

**Questions? Glitches? Killer PMP feature ideas or feedback?**

- **Email**: alex.steady@infillion.com
- **In-App**: Use the Feedback Button inside the app
- **GitHub**: Create an issue for bugs or feature requests

---

**Built with ❤️ by the Infillion Team**

*PMP Universe by Infillion - Where Predictive Programmatic meets Agentic Curation* 
# Infillion Analytics Dashboard

A professional, futuristic analytics dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features a cyberpunk/neon aesthetic with interactive charts, real-time data visualization, and comprehensive admin controls.

## 🚀 Features

### Core Dashboard
- **6 Interactive Tabs**: Main, New to Brand, Viewability, Geo/Device, Placements, Foot Traffic
- **Real-time Charts**: Line charts, bar charts, and pie charts using Chart.js
- **Interactive Filters**: Date ranges, aggregations, organization filters with localStorage persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Futuristic UI**: Neon glow effects, glass morphism, animated backgrounds

### Admin Section
- **User Management**: Add, edit, and manage user accounts
- **Data Export**: CSV and PDF export functionality
- **Settings Panel**: Theme toggle, API key management, system preferences
- **Role-based Access**: Admin, advertiser, and agency user roles

### Components
- **Animated Metric Cards**: Performance indicators with hover effects
- **Interactive Leaderboards**: Rankings with icons and progress indicators
- **Progress Bars**: Animated progress visualization
- **Badge System**: Status indicators with glow effects
- **Filter System**: Advanced filtering with Apply/Run functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom neon theme
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **State Management**: React hooks with localStorage

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd infillion-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3004
   NEXT_PUBLIC_APP_NAME=Infillion Analytics
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3004](http://localhost:3004)

## 🎯 Usage

### Dashboard Navigation
- **Main Tab**: Overview of key metrics and performance indicators
- **New to Brand**: Customer acquisition and brand awareness metrics
- **Viewability**: Ad visibility and engagement analytics
- **Geo/Device**: Geographic and device-based performance data
- **Placements**: Ad placement effectiveness and optimization
- **Foot Traffic**: Physical location visit tracking and analysis

### Admin Features
- **User Management**: Access via `/admin` route
- **Data Export**: Download reports in CSV or PDF format
- **Settings**: Configure API keys, themes, and system preferences

### Filtering System
- **Date Ranges**: Last 30 days, yesterday, last 7 days, month to date, custom
- **Aggregation**: By day, week, month, or all time
- **Organization Filters**: Admin-only organization selection
- **Campaign Filters**: Campaign-specific data filtering
- **Advertiser Filters**: Advertiser-specific data filtering

## 📊 Data Structure

The dashboard uses comprehensive mock data with 50+ realistic entries per tab:

### Campaign Data
- Campaign performance metrics
- Impressions, clicks, conversions
- Cost and ROI analysis
- Geographic distribution

### New to Brand
- Customer acquisition metrics
- Brand awareness indicators
- Conversion funnel analysis
- Customer lifetime value

### Viewability
- Ad visibility metrics
- View-through rates
- Engagement analytics
- Quality scoring

### Geo/Device
- Geographic performance data
- Device type analytics
- Regional optimization
- Cross-device attribution

### Placements
- Ad placement effectiveness
- Inventory optimization
- Performance by placement type
- Revenue attribution

### Foot Traffic
- Physical location visits
- Store visit attribution
- Geographic foot traffic patterns
- Offline conversion tracking

## 🎨 Customization

### Theme Colors
The dashboard uses a custom neon theme defined in `tailwind.config.js`:

```javascript
colors: {
  'neon-blue': '#00d4ff',
  'neon-purple': '#8b5cf6',
  'neon-pink': '#ec4899',
  'neon-green': '#10b981',
  'dark-100': '#0f0f23',
  'dark-200': '#1a1a2e',
  'dark-300': '#16213e',
}
```

### Component Styling
All components use the `futuristic-card` class for consistent styling:
- Glass morphism effects
- Neon glow borders
- Hover animations
- Responsive design

## 🔧 Development

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   └── admin/          # Admin pages
├── components/         # Reusable components
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

### Adding New Components
1. Create component in `src/components/`
2. Use the `futuristic-card` class for styling
3. Add Framer Motion animations
4. Include responsive design
5. Add TypeScript types

### API Integration
The dashboard includes mock API endpoints:
- `/api/campaign-data`
- `/api/foot-traffic`
- `/api/geo-device`
- `/api/new-to-brand`
- `/api/placements`
- `/api/viewability`

Replace mock data with real API calls as needed.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Configure your hosting platform

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 
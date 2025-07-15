# Infillion Analytics Dashboard

A Next.js 15, TypeScript, and Tailwind CSS-based analytics platform with a cyberpunk/neon aesthetic. The dashboard provides advanced campaign analytics, audience insights, and interactive visualizations for advertisers, agencies, and admins.

## 🚀 Features

### **Modern UI/UX**
- **Cyberpunk/Neon Theme:** Dark interface with neon blue, green, pink, and purple accents
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Smooth Animations:** Framer Motion-powered transitions and micro-interactions
- **Professional Header:** User profile, live status indicator, and quick action buttons

### **Advanced Analytics Dashboard**
- **Main Dashboard:** Key metrics, charts, progress bars, and achievement badges
- **New to Brand:** Conversion analysis with doughnut charts and trend lines
- **Viewability:** Performance metrics with bar charts and detailed tables
- **Geo/Device:** Interactive map with geographic and device analytics
- **Placements:** Site and app performance with leaderboards
- **Foot Traffic:** Location-based analytics with verified vs projected visits
- **Audiences:** Segment performance with confidence scoring
- **Custom Reports:** Drag-and-drop report builder with component limits

### **Smart Filtering & Controls**
- **Advanced Filters:** Date picker, segment selection, device types, and more
- **Benchmark Mode:** Toggle between actual and benchmark data
- **Time Machine:** Historical data comparison with delta indicators
- **Real-time Updates:** Live data refresh capabilities

### **Interactive Visualizations**
- **Charts:** Bar, line, doughnut, and area charts with Chart.js
- **Interactive Map:** Geographic visualization with zoom and pan
- **Progress Bars:** Campaign progress tracking with color coding
- **Leaderboards:** Top performers with ranking and change indicators
- **Metric Cards:** Key performance indicators with trend arrows

### **Professional Features**
- **Daily Digest Modal:** Automated report generation
- **Email Report Modal:** Scheduled report delivery
- **Campaign Spotlight:** Featured campaign highlights
- **Performance Pulse:** Real-time performance monitoring
- **Smart Insights:** AI-powered recommendations

## 🛠️ Technical Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript for type safety
- **Styling:** Tailwind CSS with custom cyberpunk theme
- **Animations:** Framer Motion
- **Charts:** Chart.js with custom styling
- **Maps:** Leaflet.js for geographic visualizations
- **Icons:** Lucide React
- **Date Picker:** React DatePicker

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd infillion-analytics-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

## 🎯 Usage

### **Dashboard Navigation**
- Use the tab navigation to switch between different analytics views
- Each tab provides specialized insights for different aspects of campaign performance

### **Filtering Data**
- Click the "Advanced Filters" section to expand filtering options
- Use the date picker to select custom date ranges
- Filter by segments, device types, and other criteria
- Click "Run Report" to apply filters and refresh data

### **Custom Reports**
- Navigate to the "Custom" tab to build custom reports
- Drag and drop components to create your dashboard
- Maximum of 8 components allowed per report
- Save and share custom reports

### **Export & Sharing**
- Use the "📧 Report" button in the header to schedule email reports
- Access the "📊 Digest" for automated daily summaries
- Export data in various formats (CSV, PDF, etc.)

## 🎨 Customization

### **Theme Colors**
The dashboard uses a custom cyberpunk color palette:
- **Neon Blue:** `#00d4ff`
- **Neon Green:** `#00ff88`
- **Neon Pink:** `#ff69b4`
- **Neon Purple:** `#8b5cf6`
- **Dark Backgrounds:** `#0a0a0a`, `#1a1a1a`, `#2a2a2a`

### **Adding New Components**
1. Create your component in `src/components/`
2. Add it to the Custom Report Builder
3. Update the component registry if needed

### **Mock Data**
- All data is generated client-side using realistic mock data
- Advertisers include major brands (Nike, Coca-Cola, Apple, etc.)
- Campaign names are realistic and varied
- Metrics follow industry standards and best practices

## 🔧 Development

### **Project Structure**
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── api/                 # API routes and mock data
├── types/               # TypeScript type definitions
├── lib/                 # Utility functions
└── middleware.ts        # Next.js middleware
```

### **Key Components**
- **Filter.tsx:** Advanced filtering with date picker
- **Chart.tsx:** Chart.js wrapper with custom styling
- **GeographicMap.tsx:** Interactive map component
- **CustomReportBuilder.tsx:** Drag-and-drop report builder
- **MetricCard.tsx:** Key performance indicator cards

### **Data Flow**
1. Mock data is generated client-side using `useEffect`
2. Data is passed as props to dashboard components
3. Components render charts, tables, and visualizations
4. User interactions trigger data updates and re-renders

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### **Other Platforms**
- **Netlify:** Use `npm run build` and deploy the `out` directory
- **AWS Amplify:** Connect repository and configure build settings
- **Docker:** Use the provided Dockerfile for containerized deployment

## 📊 Performance

- **Client-side Rendering:** Fast initial load times
- **Code Splitting:** Automatic route-based code splitting
- **Image Optimization:** Next.js Image component for optimal loading
- **Caching:** Efficient caching strategies for static assets

## 🔒 Security

- **Type Safety:** Full TypeScript implementation
- **Input Validation:** Proper validation for all user inputs
- **Environment Variables:** Secure configuration management
- **CORS:** Proper cross-origin resource sharing setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the component examples in `/src/components`

## 🎉 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first styling
- **Chart.js** for the powerful charting library
- **Framer Motion** for the smooth animations
- **Lucide** for the beautiful icons

---

**Built with ❤️ for the Infillion Analytics Platform** 
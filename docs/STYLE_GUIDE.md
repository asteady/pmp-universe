# PMP Universe Style Guide

## 🎨 Brand Colors

### Primary Colors
- **Infillion Blue**: `#3B82F6` (blue-500)
- **Infillion Purple**: `#8B5CF6` (purple-500)
- **Infillion Green**: `#10B981` (emerald-500)

### Secondary Colors
- **Dark Blue**: `#1E40AF` (blue-700)
- **Light Blue**: `#60A5FA` (blue-400)
- **Dark Purple**: `#7C3AED` (purple-600)
- **Light Purple**: `#A78BFA` (purple-400)

### Background Colors
- **Primary Background**: `#0F172A` (slate-900)
- **Secondary Background**: `#1E293B` (slate-800)
- **Card Background**: `#334155` (slate-700)
- **Overlay Background**: `rgba(0, 0, 0, 0.6)`

### Text Colors
- **Primary Text**: `#FFFFFF` (white)
- **Secondary Text**: `#94A3B8` (slate-400)
- **Muted Text**: `#64748B` (slate-500)
- **Accent Text**: `#60A5FA` (blue-400)

### Status Colors
- **Success**: `#10B981` (emerald-500)
- **Warning**: `#F59E0B` (amber-500)
- **Error**: `#EF4444` (red-500)
- **Info**: `#3B82F6` (blue-500)

## 📝 Typography

### Font Family
- **Primary**: `Inter, system-ui, sans-serif`
- **Monospace**: `JetBrains Mono, monospace`

### Font Sizes
```css
/* Headings */
.text-5xl { font-size: 3rem; line-height: 1; }      /* Main Title */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; } /* Section Headers */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* Sub Headers */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }   /* Card Titles */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; } /* Large Text */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; } /* Body Large */
.text-base { font-size: 1rem; line-height: 1.5rem; }   /* Body */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; } /* Small Text */
.text-xs { font-size: 0.75rem; line-height: 1rem; }     /* Caption */
```

### Font Weights
- **Light**: `font-light` (300)
- **Normal**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)
- **Extrabold**: `font-extrabold` (800)

## 📏 Spacing System

### Base Spacing (8px grid)
```css
/* Padding & Margins */
.p-1 { padding: 0.25rem; }   /* 4px */
.p-2 { padding: 0.5rem; }    /* 8px */
.p-3 { padding: 0.75rem; }   /* 12px */
.p-4 { padding: 1rem; }      /* 16px */
.p-5 { padding: 1.25rem; }   /* 20px */
.p-6 { padding: 1.5rem; }    /* 24px */
.p-8 { padding: 2rem; }      /* 32px */
.p-10 { padding: 2.5rem; }   /* 40px */
.p-12 { padding: 3rem; }     /* 48px */
```

### Component Spacing
- **Card Padding**: `p-6` (24px)
- **Section Spacing**: `mb-8` (32px)
- **Element Spacing**: `gap-4` (16px)
- **Button Padding**: `px-6 py-3` (24px horizontal, 12px vertical)

## 🧱 Component Guidelines

### Buttons
```css
/* Primary Button */
.btn-primary {
  @apply px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
         hover:from-blue-700 hover:to-blue-800 
         text-white font-semibold rounded-lg 
         transition-all duration-200 
         focus:outline-none focus:ring-2 focus:ring-blue-500/20;
}

/* Secondary Button */
.btn-secondary {
  @apply px-6 py-3 bg-slate-700 hover:bg-slate-600 
         text-white font-semibold rounded-lg 
         transition-all duration-200 
         focus:outline-none focus:ring-2 focus:ring-slate-500/20;
}

/* Ghost Button */
.btn-ghost {
  @apply px-6 py-3 text-slate-400 hover:text-white 
         font-semibold rounded-lg 
         transition-all duration-200 
         focus:outline-none;
}
```

### Cards
```css
/* Standard Card */
.card {
  @apply bg-gradient-to-br from-slate-800 to-slate-900 
         rounded-xl p-6 border border-slate-700 
         shadow-lg hover:shadow-xl 
         transition-all duration-300;
}

/* Interactive Card */
.card-interactive {
  @apply bg-gradient-to-br from-slate-800 to-slate-900 
         rounded-xl p-6 border border-slate-700 
         shadow-lg hover:shadow-xl hover:scale-105 
         transition-all duration-300 cursor-pointer;
}
```

### Inputs
```css
/* Text Input */
.input {
  @apply w-full px-4 py-3 bg-slate-800 text-white 
         rounded-lg border border-slate-700 
         focus:border-blue-500 focus:outline-none 
         focus:ring-2 focus:ring-blue-500/20 
         transition-all duration-200;
}

/* Search Input */
.input-search {
  @apply w-full px-4 py-4 pl-12 bg-slate-800/80 text-white 
         rounded-xl border border-slate-700 
         focus:border-blue-500 focus:outline-none 
         focus:ring-2 focus:ring-blue-500/20 
         transition-all duration-200;
}
```

### Modals
```css
/* Modal Overlay */
.modal-overlay {
  @apply fixed inset-0 bg-black/60 backdrop-blur-sm 
         flex items-center justify-center z-50 p-4;
}

/* Modal Content */
.modal-content {
  @apply bg-gradient-to-br from-slate-900 to-slate-800 
         rounded-2xl shadow-2xl w-full max-w-4xl 
         max-h-[90vh] overflow-y-auto 
         border border-slate-700;
}
```

## 🎯 Layout Guidelines

### Grid System
```css
/* Responsive Grid */
.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Summary Cards Grid */
.grid-summary {
  @apply grid grid-cols-1 md:grid-cols-3 gap-6;
}
```

### Container Widths
- **Full Width**: `w-full`
- **Max Width Large**: `max-w-7xl` (1280px)
- **Max Width Medium**: `max-w-4xl` (896px)
- **Max Width Small**: `max-w-2xl` (672px)

### Breakpoints
- **Mobile**: `sm:` (640px+)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)
- **Large Desktop**: `xl:` (1280px+)

## 🌈 Gradients

### Background Gradients
```css
/* Primary Background */
.bg-primary {
  @apply bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900;
}

/* Card Gradients */
.bg-card-blue {
  @apply bg-gradient-to-br from-blue-600 to-blue-700;
}

.bg-card-green {
  @apply bg-gradient-to-br from-green-600 to-green-700;
}

.bg-card-purple {
  @apply bg-gradient-to-br from-purple-600 to-purple-700;
}
```

### Text Gradients
```css
/* Gradient Text */
.text-gradient {
  @apply bg-gradient-to-r from-blue-400 to-purple-400 
         bg-clip-text text-transparent;
}
```

## 🎨 Icon Guidelines

### Icon Sizes
- **Small**: `w-4 h-4` (16px)
- **Medium**: `w-5 h-5` (20px)
- **Large**: `w-6 h-6` (24px)
- **Extra Large**: `w-8 h-8` (32px)

### Icon Colors
- **Primary**: `text-blue-400`
- **Secondary**: `text-slate-400`
- **Success**: `text-green-400`
- **Warning**: `text-amber-400`
- **Error**: `text-red-400`

## 📱 Responsive Design

### Mobile First Approach
1. Start with mobile layout
2. Add tablet breakpoints (`md:`)
3. Add desktop breakpoints (`lg:`)
4. Add large desktop breakpoints (`xl:`)

### Touch Targets
- **Minimum Size**: 44px × 44px
- **Button Height**: `py-3` (12px vertical padding)
- **Icon Button**: `w-10 h-10` (40px)

## 🔍 Accessibility

### Color Contrast
- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio

### Focus States
```css
/* Focus Ring */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500/20;
}

/* Focus Visible */
.focus-visible {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500;
}
```

### Screen Reader Support
- Use semantic HTML elements
- Provide alt text for images
- Use ARIA labels where appropriate
- Ensure keyboard navigation

## 🎭 Dark Theme

### Color Palette
- **Background**: Dark grays and blues
- **Text**: White and light grays
- **Accents**: Bright blues and purples
- **Borders**: Subtle gray borders

### Contrast Considerations
- Use high contrast for important elements
- Maintain readability in all lighting conditions
- Test with color blindness simulators

## 📋 Usage Examples

### Header Component
```jsx
<header className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-5xl font-bold text-white font-sans tracking-tight mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      PMP Universe
    </h1>
    <p className="text-blue-200 text-xl">
      Premium marketplace deals for Q2-Q4 2025
    </p>
  </div>
</header>
```

### Summary Card
```jsx
<div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25">
  <div className="flex items-center justify-between mb-4">
    <span className="text-4xl font-bold">28</span>
    <span className="text-2xl animate-bounce">📈</span>
  </div>
  <h3 className="text-lg font-semibold mb-1">Evergreen PMPs</h3>
  <p className="text-blue-100">Year-round performance</p>
</div>
```

### Interactive Button
```jsx
<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200">
  Create Deal
</button>
```

This style guide ensures consistency across the PMP Universe application while maintaining a modern, professional appearance that's optimized for user experience and accessibility. 
# PMP Universe Animation Guide

## 🎬 Animation Philosophy

The PMP Universe application uses animations to enhance user experience, provide feedback, and create a sense of polish and professionalism. All animations should feel natural, purposeful, and contribute to the overall user journey.

### Core Principles
- **Purposeful**: Every animation serves a specific function
- **Smooth**: Use appropriate easing curves for natural movement
- **Fast**: Keep animations quick to maintain responsiveness
- **Consistent**: Use standardized timing and easing across components
- **Accessible**: Respect user preferences for reduced motion

## ⏱️ Timing System

### Duration Scale
```css
/* Ultra Fast - Instant feedback */
.duration-75 { transition-duration: 75ms; }

/* Fast - Hover states, micro-interactions */
.duration-150 { transition-duration: 150ms; }

/* Normal - Standard interactions */
.duration-200 { transition-duration: 200ms; }

/* Slow - Page transitions, modal animations */
.duration-300 { transition-duration: 300ms; }

/* Slower - Complex animations, card reveals */
.duration-500 { transition-duration: 500ms; }

/* Slowest - Background animations, loading states */
.duration-700 { transition-duration: 700ms; }
```

### Recommended Durations by Use Case
- **Hover Effects**: 150ms - 200ms
- **Button Interactions**: 200ms
- **Card Animations**: 300ms
- **Modal Transitions**: 300ms - 500ms
- **Page Transitions**: 500ms
- **Loading States**: 700ms - 1000ms

## 🎯 Easing Functions

### Standard Easing Curves
```css
/* Linear - No easing */
.ease-linear { transition-timing-function: linear; }

/* Smooth - Standard interactions */
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

/* Bounce - Playful interactions */
.ease-bounce { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }

/* Elastic - Attention-grabbing */
.ease-elastic { transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); }

/* Custom - PMP Universe specific */
.ease-pmp { transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
```

### When to Use Each Easing
- **Linear**: Progress bars, loading indicators
- **Ease-in-out**: Most UI interactions, hover states
- **Ease-bounce**: Success animations, celebrations
- **Ease-elastic**: Attention-grabbing elements, notifications
- **Ease-pmp**: Brand-specific interactions

## 🎨 Animation Patterns

### 1. Hover Animations

#### Scale Transform
```css
/* Subtle scale on hover */
.hover-scale {
  @apply transform transition-transform duration-200 ease-in-out;
}

.hover-scale:hover {
  @apply scale-105;
}

/* Card hover with shadow */
.card-hover {
  @apply transform transition-all duration-300 ease-in-out;
}

.card-hover:hover {
  @apply scale-105 shadow-2xl;
}
```

#### Color Transitions
```css
/* Button hover states */
.btn-hover {
  @apply transition-all duration-200 ease-in-out;
}

.btn-primary:hover {
  @apply from-blue-700 to-blue-800;
}

.btn-secondary:hover {
  @apply bg-slate-600;
}
```

### 2. Loading Animations

#### Spinner
```css
/* Rotating spinner */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Pulse
```css
/* Pulsing effect */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

#### Bounce
```css
/* Bouncing animation */
.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
  50% { transform: none; animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
}
```

### 3. Entrance Animations

#### Fade In
```css
/* Fade in from transparent */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide In
```css
/* Slide in from bottom */
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}
```

#### Scale In
```css
/* Scale in from center */
.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from { 
    transform: scale(0.9);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}
```

### 4. Interactive Feedback

#### Button Press
```css
/* Button press effect */
.btn-press:active {
  @apply scale-95 transition-transform duration-75;
}
```

#### Ripple Effect
```css
/* Ripple animation */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.ripple:active::after {
  width: 300px;
  height: 300px;
}
```

### 5. Status Animations

#### Success Animation
```css
/* Success checkmark */
.animate-success {
  animation: successCheck 0.6s ease-bounce;
}

@keyframes successCheck {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

#### Error Shake
```css
/* Error shake animation */
.animate-error {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```

## 🎭 Component-Specific Animations

### 1. Summary Cards
```css
/* Summary card animations */
.summary-card {
  @apply transform transition-all duration-300 ease-in-out;
}

.summary-card:hover {
  @apply scale-105 shadow-2xl;
}

.summary-card .icon {
  @apply transition-all duration-300 ease-in-out;
}

.summary-card:hover .icon {
  @apply animate-bounce;
}
```

### 2. PMP Cards
```css
/* PMP card entrance */
.pmp-card {
  @apply animate-fade-in;
  animation-delay: calc(var(--card-index) * 100ms);
}

/* PMP card hover */
.pmp-card:hover {
  @apply transform scale-105 shadow-xl transition-all duration-300 ease-in-out;
}
```

### 3. Modal Animations
```css
/* Modal overlay */
.modal-overlay {
  @apply animate-fade-in;
}

/* Modal content */
.modal-content {
  @apply animate-scale-in;
}
```

### 4. Filter Bar
```css
/* Filter chip animations */
.filter-chip {
  @apply transition-all duration-200 ease-in-out;
}

.filter-chip:hover {
  @apply transform scale-105;
}

.filter-chip.active {
  @apply animate-pulse;
}
```

### 5. Search Input
```css
/* Search input focus */
.search-input {
  @apply transition-all duration-200 ease-in-out;
}

.search-input:focus {
  @apply transform scale-105;
}
```

## 🎪 Advanced Animation Techniques

### 1. Staggered Animations
```css
/* Stagger children animations */
.stagger-container > * {
  @apply animate-fade-in;
}

.stagger-container > *:nth-child(1) { animation-delay: 0ms; }
.stagger-container > *:nth-child(2) { animation-delay: 100ms; }
.stagger-container > *:nth-child(3) { animation-delay: 200ms; }
.stagger-container > *:nth-child(4) { animation-delay: 300ms; }
```

### 2. Parallax Effects
```css
/* Parallax background */
.parallax-bg {
  @apply transition-transform duration-700 ease-out;
}

.parallax-bg:hover {
  @apply transform scale-110;
}
```

### 3. Morphing Animations
```css
/* Shape morphing */
.morph-button {
  @apply transition-all duration-300 ease-in-out;
}

.morph-button:hover {
  @apply rounded-full;
}
```

## 🎨 Animation Utilities

### Tailwind Classes
```css
/* Built-in animations */
.animate-spin
.animate-ping
.animate-pulse
.animate-bounce

/* Custom animations */
.animate-fade-in
.animate-slide-up
.animate-scale-in
.animate-success
.animate-error
```

### CSS Custom Properties
```css
:root {
  --animation-duration-fast: 150ms;
  --animation-duration-normal: 300ms;
  --animation-duration-slow: 500ms;
  --animation-easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --animation-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## ♿ Accessibility Considerations

### Reduced Motion
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus Indicators
```css
/* Ensure focus is always visible */
.focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900;
}
```

## 📱 Performance Optimization

### Hardware Acceleration
```css
/* Use transform and opacity for smooth animations */
.optimized-animation {
  @apply transform-gpu;
}
```

### Animation Best Practices
1. Use `transform` and `opacity` for smooth animations
2. Avoid animating `width`, `height`, `margin`, `padding`
3. Use `will-change` sparingly for complex animations
4. Limit concurrent animations to maintain performance

## 🎯 Implementation Examples

### React Component with Animations
```jsx
const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-fade-in transform hover:scale-105 transition-all duration-300 ease-in-out"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
```

### CSS Animation Classes
```css
/* Add to your global CSS */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.3s ease-out forwards;
}
```

This animation guide ensures consistent, performant, and accessible animations throughout the PMP Universe application while maintaining a polished and professional user experience. 
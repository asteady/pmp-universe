# Infillion Brand Style Guide

## Logos
- Use only approved Infillion and product logos.
- Store all logo files in `/public/brand/`.
- Variants: Dark (for light backgrounds), White (for dark backgrounds).
- Product logos: TrueX, Next, InStadium, Gimbal, OnTheWay, Beacons, Arrival, UpLift, XGraph, TrueTargeting.

## Color Palette
| Name         | Hex      | Usage                                 |
|--------------|----------|---------------------------------------|
| Dark Blue    | #161D24  | Main text, dark backgrounds           |
| Light Blue   | #2762A6  | Media products, accent                |
| Purple       | #913198  | Secondary, "human/people"             |
| Magenta      | #DC0053  | Secondary, sparingly                  |
| Orange       | #FFC603  | Commerce products, accent             |
| Yellow       | #FFAF00  | Data products, accent                 |
| Green        | #00C347  | Call-to-action (buttons)              |
| Teal         | #00C2BC  | Secondary, sparingly                  |

- On dark backgrounds, use Light Blue or white/accent for contrast.

## Font
- **Be Vietnam Pro** is the primary brand font.
- [Download from Google Fonts](https://fonts.google.com/specimen/Be+Vietnam+Pro)
- Use Arial for PowerPoint if needed for compatibility.

## Brand Standards
- Left-align most text.
- Use sentence case (capitalize only the first letter).
- Use color for slide subheadings (18pt) and dark blue for headings (32pt).
- No all caps or special characters in product/company names (except in logos).

## Naming Conventions
- Capitalize the first letter; only capitalize others if pronounced independently or starting a new word (e.g., XGraph, TrueX, TrueTargeting).
- Media: TrueX, Connex, InStadium
- Commerce: Gimbal, OnTheWay, Beacons
- Data: Arrival, TrueTargeting, UpLift, XGraph

## Visuals & Photography
- Use provided abstract illustrations and human-centric photography.
- Store in `/public/brand/` and `/public/photography/`.

## Example Tailwind Theme
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        infillion: {
          dark: '#161D24',
          light: '#2762A6',
          purple: '#913198',
          magenta: '#DC0053',
          orange: '#FFC603',
          yellow: '#FFAF00',
          green: '#00C347',
          teal: '#00C2BC',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Arial', 'sans-serif'],
      },
    },
  },
}
```

## Asset References
- Logos: `/public/brand/`
- Product logos: `/public/brand/products/`
- Photography: `/public/photography/`
- Visuals: `/public/brand/visuals/`

## Usage Examples
- Use `<img src="/brand/infillion-logo-dark.svg" />` for logo.
- Use `className="text-infillion-dark bg-infillion-light font-sans"` for brand styling.

---

**For questions or updates, contact the design system owner.** 
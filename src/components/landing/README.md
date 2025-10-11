# Landing Page Components

This directory contains all components for the Surfing Digital landing page.

## Design System

### Colors
- **Primary**: `#0BB7B7` (Turquoise) - Main brand color
- **Secondary**: `#00586A` (Teal) - Supporting color
- **Navy**: `#001639` - Text and backgrounds
- **Accent Pink**: `#E2AAC4` - Decorative accents
- **Accent Peach**: `#FFD08D` - Decorative accents

### Typography
- **Headings**: DM Sans (Regular 400 + Bold 700)
- **Body**: Open Sans Light (300)

### Design Elements
- Rounded corners (0.75rem radius)
- Soft shadows with turquoise glow
- Clean gradients from dark blue to teal
- Ocean-inspired aesthetic

## Components

### Navbar
Fixed navigation bar with mobile responsive menu using Sheet component.
- Desktop: Horizontal navigation
- Mobile: Hamburger menu with slide-out sheet

### Hero
Main hero section with gradient backgrounds and CTA buttons.
- Gradient backgrounds with ocean theme
- Primary and secondary CTAs
- Responsive typography

### Features
Grid of feature cards showcasing key benefits.
- 4 feature cards
- Icon badges with gradient
- Hover effects with turquoise glow

### HowItWorks
Step-by-step process explanation.
- 4 steps in a grid layout
- Numbered badges
- Arrow indicators between steps (desktop)
- Hover interactions

### CTA
Call-to-action section with gradient background.
- Full-width gradient section
- Multiple CTAs
- Trust indicators
- Decorative elements

### FAQ
Accordion-style FAQ section.
- Uses shadcn Accordion component
- 5 common questions
- Smooth transitions

### Footer
Footer with navigation and social links.
- Multiple footer links
- Social media icons
- Copyright information

## Usage

```tsx
import { 
  Navbar, 
  Hero, 
  Features, 
  HowItWorks, 
  CTA, 
  FAQ, 
  Footer 
} from "@/components/landing";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <FAQ />
      <Footer />
    </>
  );
}
```


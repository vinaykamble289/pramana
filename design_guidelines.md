# Pramana Traceability System - Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from enterprise platforms like Linear, Notion, and specialized agricultural tech platforms. The system requires a professional, data-dense interface that builds trust in blockchain technology while remaining accessible to diverse users (farmers to lab technicians).

## Core Design Principles
- **Trust & Transparency**: Clean, professional aesthetic that conveys reliability
- **Multi-User Clarity**: Distinct visual hierarchies for different user roles
- **Data Visualization**: Emphasize traceability flow and blockchain verification
- **Accessibility**: Simple interactions suitable for field use and diverse technical literacy

## Color Palette

### Primary Colors
- **Brand Primary**: 25 85% 35% (Deep forest green - representing natural herbs)
- **Secondary**: 200 60% 45% (Professional blue for trust/technology)

### Functional Colors
- **Success**: 120 70% 40% (Validation/approved states)
- **Warning**: 35 90% 55% (Pending validation)
- **Error**: 5 80% 50% (Failed validation)
- **Neutral Dark**: 220 15% 20% (Text and borders)
- **Neutral Light**: 220 15% 95% (Backgrounds)

### Portal-Specific Accents
- **Farmer**: 85 60% 50% (Earthy yellow-green)
- **Processor**: 260 45% 55% (Industrial purple)
- **Lab**: 180 50% 45% (Scientific teal)
- **Admin**: 15 70% 45% (Analytics orange)

## Typography
- **Primary**: Inter (Google Fonts) - Clean, professional readability
- **Secondary**: JetBrains Mono - Code, batch IDs, blockchain hashes
- **Scale**: text-sm, text-base, text-lg, text-xl, text-2xl for hierarchy

## Layout System
**Tailwind Spacing**: Consistent use of 2, 4, 6, 8, 12, 16 units
- **Micro spacing**: p-2, m-2 (form elements, buttons)
- **Standard spacing**: p-4, gap-4, m-6 (cards, sections)
- **Major spacing**: p-8, my-12, gap-16 (page sections, hero areas)

## Component Library

### Navigation
- **Top Navigation**: Horizontal tabs with portal icons and active state indicators
- **Breadcrumbs**: Show current position in complex workflows
- **Quick Actions**: Floating action button for primary tasks per portal

### Data Display
- **Cards**: Rounded corners (rounded-lg), subtle shadows for batch/transaction display
- **Tables**: Striped rows, sortable headers, status badges
- **Timeline**: Vertical flow for traceability chain visualization
- **QR Display**: Centered with download/print options

### Forms
- **Input Groups**: Consistent spacing, clear labels, validation states
- **Dropdowns**: Searchable for species selection
- **File Upload**: Drag-and-drop areas with preview thumbnails
- **Voice Input**: Prominent microphone button with recording animation

### Status & Feedback
- **Progress Bars**: Multi-step validation process
- **Status Badges**: Color-coded with rounded-full styling
- **Notifications**: Toast messages for sync status and validation results
- **Loading States**: Skeleton screens for data fetching

### Blockchain Elements
- **Hash Display**: Monospace font with copy functionality
- **Merkle Tree**: Visual tree diagram with connecting lines
- **Transaction Cards**: Timestamp, hash preview, verification status

## Portal-Specific Design

### Farmer UI
- **Form-First Layout**: Large, touch-friendly inputs for field use
- **Offline Indicator**: Prominent banner showing connection status
- **GPS Integration**: Map preview with coordinate display

### Processor Portal
- **Workflow Cards**: Visual process steps with completion checkmarks
- **Batch Grid**: Image thumbnails with key metrics overlay
- **QR Generation**: Prominent display with printing options

### Lab Portal
- **Scientific Layout**: Clean, clinical white backgrounds
- **Results Entry**: Structured forms with unit indicators
- **Certification Display**: Official-looking document previews

### Admin Dashboard
- **KPI Cards**: Large numbers with trend indicators
- **Chart Area**: Full-width visualizations using Recharts
- **Export Actions**: Professional report generation UI

### Consumer Portal
- **Journey Map**: Visual timeline of product lifecycle
- **Trust Indicators**: Verification checkmarks and certification logos
- **Mobile-First**: Optimized for smartphone QR scanning

## Animations
**Minimal & Purposeful**:
- **Loading**: Subtle pulse on sync operations
- **Success States**: Brief checkmark animations
- **Data Transitions**: Smooth card flips for status changes
- **Voice Input**: Recording pulse indicator

## Images
No large hero images required. Focus on:
- **Portal Icons**: Simple, recognizable symbols for each user type
- **Certification Badges**: Small verification emblems
- **Product Thumbnails**: Herb/batch imagery in cards
- **Map Integration**: Embedded location previews

This design system emphasizes trust, clarity, and professional functionality while maintaining the agricultural/natural product context through thoughtful color choices and clean data presentation.
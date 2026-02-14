# Sorvi - Business SaaS Platform Prototype

A modern, responsive prototype for **Sorvi** - a comprehensive business SaaS suite application with modules for Finance, Inventory, and Repairs.

## Features

- ✅ **Modern Tech Stack**: Vite + React 18 + TypeScript
- ✅ **Professional UI**: Shadcn/UI components with Tailwind CSS
- ✅ **Dark/Light Theme**: Fully functional theme switching with system preference detection
- ✅ **Responsive Design**: Mobile-first approach with support for all screen sizes
- ✅ **Finance Dashboard**: Complete with KPI cards, charts, and data tables
- ✅ **Module Navigation**: Easy switching between Finance, Inventory, and Repairs
- ✅ **Enterprise-Grade Design**: Clean, professional appearance avoiding "AI-made" look

## Tech Stack

### Core
- **Framework**: Vite + React 18 + TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design tokens
- **Components**: Shadcn/UI (headless, customizable)
- **Routing**: React Router DOM

### Libraries
- **Icons**: Lucide React (UI elements) + Phosphor Icons (module branding)
- **Charts**: Recharts
- **UI Primitives**: Radix UI

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── layout/          # Layout components (Header, Footer, MainLayout)
│   ├── dashboard/       # Dashboard components (KPICard, ChartWidget, GridLayout)
│   └── common/          # Common components (AppSwitcher, ProfileMenu, etc.)
├── pages/               # Page components (Finance, Inventory, Repairs)
├── providers/           # React context providers (ThemeProvider)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
├── data/                # Mock data
└── styles/              # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Sorvi-prototype
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design Principles

### Visual Standards

- **Border Radius**: 6-8px consistently across all components
- **Color Strategy**:
  - Dark Mode: Neutral blacks (#0a0a0a background, #1f1f1f surfaces)
  - Light Mode: Clean whites (#ffffff, #f9fafb backgrounds)
  - Accents: Electric blue (#3b82f6) for interactive elements
- **Typography**: Inter font family with consistent sizing
- **Spacing**: Consistent padding and gaps using Tailwind's spacing scale

### Responsive Breakpoints

- Mobile: < 640px → 1 column grid
- Tablet: 640-1024px → 2 column grid
- Desktop: 1024-1536px → 3 column grid
- Wide: > 1536px → 4 column grid

## Module Overview

### Finance (Implemented)
- Dashboard with KPI cards (Receivables, Payables, Net Exposure)
- Cash flow and balance trend charts
- Recent transactions table
- Full navigation with tabs

### Inventory, Repairs (Placeholder)
- Coming soon pages
- Navigation structure in place
- Ready for future implementation

## Future Enhancements

Features explicitly deferred for later phases:

- Drag-and-drop widget rearrangement
- TanStack Table with virtual scrolling
- Global search functionality (Cmd+K)
- Widget customization and saved layouts
- TanStack Query for data fetching
- Full implementation of Inventory and Repairs modules
- Authentication and user management
- Backend integration and API calls

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - All rights reserved

## Version

v0.1.0 - Initial Prototype Release

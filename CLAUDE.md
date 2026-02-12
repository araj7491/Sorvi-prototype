# Sorvi Prototype - Claude Code Assistant Guide

## Project Overview
Sorvi is a React-based business management application prototype with multiple modules (Finance, Inventory, Repairs, CRM). The project emphasizes flexibility, accessibility, and modern UI patterns.

## Tech Stack
- **Framework**: React 19.2 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Routing**: React Router DOM
- **UI Primitives**: Radix UI (headless, accessible components)
- **Icons**: Phosphor Icons + Lucide React
- **Charts**: Recharts

## UI Architecture & Key Features

### 1. Theme System
- **Provider**: `src/providers/ThemeProvider.tsx`
- **Themes**: Light, Dark, System (follows OS preference)
- **Storage**: Persists to localStorage with key `sorvi-ui-theme`
- **Implementation**: Uses `darkMode: ["class"]` in Tailwind config
- **Toggle Component**: `src/components/common/ThemeToggle.tsx`
- **Settings Component**: `src/components/settings/ThemeSelector.tsx`

### 2. Layout System
- **Provider**: `src/providers/LayoutProvider.tsx`
- **Layouts**:
  - **Modern**: Universal header at top, clean minimal design
  - **Classic**: Sidebar navigation with traditional ERP-style layout
- **Storage**: Persists to localStorage with key `sorvi-layout-preference`
- **Main Layout**: `src/components/layout/MainLayout.tsx` (switches between layouts)
- **Components**:
  - `UniversalHeader.tsx` - Top navigation for modern layout
  - `ClassicLayout.tsx` - Sidebar-based layout
  - `Sidebar.tsx` - Navigation sidebar for classic layout
  - `ContentHeader.tsx` - Tab navigation for content areas
  - `Footer.tsx` - Application footer

#### Content Area Dimension Formulas
The relationship between content area dimensions in Modern vs Classic layouts:

**Height:**
```
Height of content area in Modern view + Content header height in Modern view
= Height of content area in Classic view
```
- Modern view: ContentHeader is a separate horizontal bar above the content area
- Classic view: ContentHeader tabs are integrated into the Sidebar, so content area is taller

**Width:**
```
Width of content area in Modern view - Width of Sidebar in Classic view
= Width of content area in Classic view
```
- Modern view: Content area spans full width (no sidebar)
- Classic view: Sidebar takes horizontal space, reducing content area width

**IMPORTANT**: When adjusting spacing, padding, or layout dimensions, ensure both layouts provide equivalent visual space and consistent user experience despite their structural differences.

### 3. UI Component Library

#### Component Pattern
- Built on **Radix UI primitives** for accessibility
- Styled with **Tailwind CSS**
- Use **class-variance-authority (cva)** for variant management
- **cn utility** (`src/lib/utils.ts`) merges Tailwind classes safely

#### Available Components (`src/components/ui/`)
- **button.tsx** - Variants: default, destructive, outline, secondary, ghost, link; Sizes: default, sm, lg, icon
- **card.tsx** - Card container with Header, Title, Description, Content, Footer
- **input.tsx** - Form input with consistent styling
- **select.tsx** - Radix Select with custom styling
- **switch.tsx** - Toggle switch component
- **tabs.tsx** - Radix Tabs with styling
- **dialog.tsx** - Modal dialog (used for Settings)
- **label.tsx** - Form labels
- **radio-group.tsx** - Radio button groups
- **dropdown-menu.tsx** - Context menus and dropdowns
- **avatar.tsx** - User avatar component
- **badge.tsx** - Status badges

#### Common Components (`src/components/common/`)
- **ThemeToggle.tsx** - Theme switcher button
- **AppSwitcher.tsx** - Module navigation dropdown
- **QuickActions.tsx** - Quick action buttons
- **SearchBar.tsx** - Global search
- **ProfileMenu.tsx** - User profile dropdown
- **DataTable.tsx** - Reusable table component

#### Dashboard Components (`src/components/dashboard/`)
- **GridLayout.tsx** - Responsive grid system
- **KPICard.tsx** - Key performance indicator cards
- **ChartWidget.tsx** - Chart container component

### 4. Color System (CSS Variables)
Uses HSL color tokens defined in `src/styles/globals.css`:
- `--background` / `--foreground` - Base colors
- `--primary` / `--primary-foreground` - Primary action colors
- `--secondary` / `--secondary-foreground` - Secondary elements
- `--accent` / `--accent-foreground` - Accent highlights
- `--muted` / `--muted-foreground` - Subtle backgrounds
- `--destructive` / `--destructive-foreground` - Danger/error states
- `--border` / `--input` / `--ring` - UI element colors
- `--card` / `--popover` - Surface colors

All colors have dark mode variants defined in `.dark` class.

### 5. Icon Usage
- **Phosphor Icons** (`@phosphor-icons/react`) - Primary icon set
- **Lucide React** - Alternative/supplementary icons
- Icons in buttons use automatic sizing via `[&_svg]:size-4` in button variants

## Project Structure
```
src/
├── components/
│   ├── ui/              # Base UI primitives (Radix + Tailwind)
│   ├── common/          # Shared components (SearchBar, ThemeToggle, etc.)
│   ├── layout/          # Layout components (Headers, Layouts, Footer)
│   ├── dashboard/       # Dashboard-specific widgets
│   └── settings/        # Settings dialog and selectors
├── providers/           # React Context providers (Theme, Layout)
├── pages/               # Route pages (Finance, Inventory, Repairs, CRM)
├── lib/                 # Utilities (cn function)
├── types/               # TypeScript type definitions
└── styles/              # Global CSS and Tailwind styles
```

## Development Guidelines

### Component Creation
1. **Use existing UI components** from `src/components/ui/` rather than creating new ones
2. **Follow the cva pattern** for components with variants
3. **Use the cn utility** for conditional className merging
4. **Maintain accessibility** - leverage Radix UI primitives which include ARIA attributes
5. **Keep components composable** - prefer small, focused components

### Styling Conventions
- Use **Tailwind utility classes** for styling
- Use **semantic color tokens** (e.g., `bg-primary`, `text-muted-foreground`) instead of hardcoded colors
- Responsive design: Use `md:`, `lg:` breakpoints as needed
- **Dark mode**: Styles automatically adapt via CSS variables

### State Management
- **Theme state**: Use `useTheme()` hook from ThemeProvider
- **Layout state**: Use `useLayout()` hook from LayoutProvider
- **Local storage**: Both theme and layout preferences persist automatically

### Icons
- Prefer **Phosphor Icons** for consistency
- Import as: `import { IconName } from '@phosphor-icons/react'`
- Standard size: 20px (automatically handled in buttons)

### TypeScript
- Define types in `src/types/index.ts` for shared interfaces
- Use proper typing for component props
- Leverage TypeScript for type safety in variants (cva)

## Common Patterns

### Creating a New Page
```tsx
import { MainLayout } from '@/components/layout/MainLayout'

export function NewPage() {
  return (
    <MainLayout currentModule="module-name" showContentHeader={false}>
      {/* Page content */}
    </MainLayout>
  )
}
```

### Using Theme Toggle
```tsx
import { useTheme } from '@/providers/ThemeProvider'

const { theme, setTheme } = useTheme()
// theme: 'light' | 'dark' | 'system'
```

### Using Layout Switcher
```tsx
import { useLayout } from '@/providers/LayoutProvider'

const { layout, setLayout } = useLayout()
// layout: 'modern' | 'classic'
```

### Conditional Styling with cn
```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "special" && "special-classes"
)} />
```

## Settings & Customization
- **Settings Dialog**: `src/components/settings/SettingsDialog.tsx`
- User can switch between:
  - Layout structures (Modern/Classic)
  - Themes (Light/Dark/System)
- Settings persist across sessions via localStorage

## Important Notes
- The app uses **React 19** - ensure compatibility when adding new dependencies
- **No emojis** should be added to code unless explicitly requested
- **Prefer editing existing files** over creating new ones when possible
- The project uses **ESLint** - follow linting rules
- All paths use **@/ alias** which maps to `src/` directory

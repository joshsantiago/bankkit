# BankKit Frontend

A modern, premium digital banking interface built with React, TypeScript, and shadcn/ui. Features a sophisticated design system with smooth animations, responsive layouts, and comprehensive banking functionality.

![BankKit - Modern Digital Banking](https://img.shields.io/badge/status-production%20ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4)

---

## 🎯 Overview

BankKit is a next-generation digital banking platform designed with a focus on user experience, security, and modern design principles. The frontend provides a complete banking interface including:

- **Public Marketing Pages** - Landing, About, Features, Help, Security, Credit Card showcase, Account types
- **Authentication Flow** - Modern wizard-style onboarding with multi-step registration, login with demo credentials
- **Card Management** - Card application modal with tier selection (Essential/Black Metal), card visualization, spending limits
- **Banking Dashboard** - Comprehensive account overview, balance tracking, recent transactions, spending visualization
- **Accounts & Transfers** - Multi-account management, fund transfers, account insights
- **Transaction History** - Full transaction details, filtering, search capabilities
- **User Settings** - Profile management, preferences, notification settings, account actions
- **Admin Interface** - User and account management for administrators

---

## 🚀 Tech Stack

### Core Technologies
- **[React 18.3](https://react.dev/)** - UI framework with concurrent features
- **[TypeScript 5.6](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite 6](https://vite.dev/)** - Next-generation build tool with HMR
- **[React Router 7](https://reactrouter.com/)** - Client-side routing

### UI & Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality component library built on Radix UI
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Motion (Framer Motion)](https://motion.dev/)** - Production-ready animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library

### Form & Data Handling
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client with JWT interceptors
- **[date-fns](https://date-fns.org/)** - Modern date utility library
- **[Recharts](https://recharts.org/)** - Composable charting library for data visualization

### Additional Libraries
- **[Sonner](https://sonner.emilkowal.ski/)** - Beautiful toast notifications
- **[Embla Carousel](https://www.embla-carousel.com/)** - Lightweight carousel library
- **[cmdk](https://cmdk.paco.me/)** - Command menu for React
- **[input-otp](https://input-otp.rodz.dev/)** - Accessible OTP input component

---

## 📦 Installation

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+

### Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Server will start at http://localhost:5173
```

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR (http://localhost:5173)
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check (tsc --noEmit)

# Testing
npm test            # Run test suite (if configured)
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/                  # React components
│   │   ├── ui/                     # shadcn/ui components (Button, Input, Card, etc.)
│   │   ├── layout/                 # Layout components (Navbar, Footer, Sidebar, PublicLayout)
│   │   ├── onboarding/             # Onboarding wizard components
│   │   │   ├── steps/             # Individual wizard steps
│   │   │   ├── OnboardingWizard.tsx
│   │   │   ├── WizardProgress.tsx
│   │   │   └── WizardNavigation.tsx
│   │   ├── figma/                  # Figma integration components
│   │   │   └── ImageWithFallback.tsx
│   │   ├── CardApplicationModal.tsx # Card application modal
│   │   ├── ErrorBoundary.tsx       # Error boundary wrapper
│   │   ├── ProtectedRoute.tsx      # Auth guard component
│   │   ├── PageTransition.tsx      # Page animation wrapper
│   │   ├── ScrollAnimation.tsx     # Scroll-triggered animations
│   │   ├── ErrorState.tsx          # Error display component
│   │   ├── EmptyState.tsx          # Empty state component
│   │   ├── TestimonialCard.tsx    # Testimonial cards
│   │   ├── FeatureCard.tsx         # Feature showcase card
│   │   ├── LoanCalculator.tsx      # Loan calculation tool
│   │   └── FAQItem.tsx             # FAQ item component
│   │
│   ├── pages/                      # Page components
│   │   ├── Landing.tsx             # Homepage
│   │   ├── About.tsx               # About page
│   │   ├── Security.tsx            # Security information
│   │   ├── Help.tsx                # Help & FAQ
│   │   ├── Features.tsx            # Features showcase
│   │   ├── CreditCard.tsx          # Credit card offering
│   │   ├── CheckSavings.tsx        # Account types
│   │   ├── Login.tsx               # Login page with demo credentials
│   │   ├── Register.tsx            # Registration page
│   │   ├── Onboarding.tsx          # Multi-step registration wizard
│   │   ├── Dashboard.tsx           # Banking dashboard
│   │   ├── Accounts.tsx            # Account management
│   │   ├── Transactions.tsx        # Transaction history
│   │   ├── Cards.tsx               # Card management
│   │   ├── Transfer.tsx            # Money transfer page
│   │   ├── Settings.tsx            # User settings
│   │   └── admin/                  # Admin pages
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminUsers.tsx
│   │       └── AdminAccounts.tsx
│   │
│   ├── context/                    # React context providers
│   │   └── AuthContext.tsx         # Authentication state management
│   │
│   ├── services/                   # API services
│   │   ├── api.ts                 # Axios instance with interceptors
│   │   ├── authService.ts         # Authentication API calls
│   │   ├── accountService.ts      # Account management
│   │   ├── cardService.ts         # Card operations
│   │   ├── transactionService.ts  # Transaction management
│   │   ├── dashboardService.ts    # Dashboard data
│   │   ├── settingsService.ts     # User settings
│   │   ├── securityService.ts     # Security operations
│   │   └── adminService.ts        # Admin operations
│   │
│   ├── hooks/                      # Custom React hooks
│   │   └── useScrollAnimation.ts   # Scroll animation hook
│   │
│   ├── lib/                        # Utility functions
│   │   └── utils.ts               # Tailwind class merging (cn function)
│   │
│   ├── utils/                      # Helper utilities
│   │   └── formatters.ts          # Formatting functions
│   │
│   ├── App.tsx                     # Root component with routing
│   └── main.tsx                    # Application entry point
│
├── public/                         # Static assets
├── index.html                      # HTML entry point
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Dependencies and scripts
```

---

## 🎨 Design System

### Color Palette

The BankKit design system uses a sophisticated emerald green palette with careful attention to contrast and accessibility:

**Primary Colors:**
- `#064E3B` - Deep emerald (primary text, buttons, headers)
- `#10B981` - Emerald green (accents, success states)
- `#DCFCE7` - Light emerald (backgrounds, hover states)

**Supporting Colors:**
- `#F8FAFC` - Light gray (page backgrounds)
- `#6B7280` - Medium gray (secondary text)
- `#EF4444` - Red (errors, destructive actions)
- `#F59E0B` - Orange (warnings, alerts)

### Typography

- **Font Family:** System font stack (Inter, sans-serif fallback)
- **Font Weights:**
  - Regular (400) - Body text
  - Bold (700) - Emphasis, labels
  - Black (900) - Headers, important text
- **Scale:** Tailwind's default type scale with custom tracking

### Spacing & Sizing

- **Base Unit:** 4px (0.25rem)
- **Border Radius:** Generous rounded corners (1rem to 2.5rem) for modern feel
- **Shadows:** Subtle elevation with custom shadow utilities

### Animations

All animations use the Motion library for smooth, performant transitions:

- **Page Transitions:** Fade + slide (300ms)
- **Scroll Animations:** Element reveal on viewport enter
- **Micro-interactions:** Hover, focus, and active states (100-300ms)
- **Loading States:** Skeleton loaders with pulse animation

---

## 🧩 Component Library (shadcn/ui)

BankKit uses shadcn/ui components - a collection of re-usable components built with Radix UI primitives and styled with Tailwind CSS.

### Available Components

**Form Components:**
- `Button` - Multiple variants (default, destructive, outline, secondary, ghost, link)
- `Input` - Text input with validation states
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Checkbox` - Checkboxes with labels
- `RadioGroup` - Radio button groups
- `Switch` - Toggle switches
- `Label` - Form labels

**Layout Components:**
- `Card` - Container with header, content, footer
- `Tabs` - Tabbed interfaces
- `Accordion` - Collapsible content sections
- `Separator` - Visual dividers
- `ScrollArea` - Custom scrollable areas
- `Sidebar` - Collapsible navigation sidebar

**Overlay Components:**
- `Dialog` - Modal dialogs
- `Sheet` - Slide-in panels
- `Popover` - Floating content containers
- `Tooltip` - Hover tooltips
- `HoverCard` - Rich hover content
- `DropdownMenu` - Context and dropdown menus

**Feedback Components:**
- `Alert` - Notification banners
- `Toast` (Sonner) - Temporary notifications
- `Progress` - Progress bars
- `Skeleton` - Loading placeholders
- `Badge` - Status indicators

**Data Display:**
- `Table` - Sortable data tables
- `Avatar` - User profile images
- `Calendar` - Date picker

**Navigation:**
- `NavigationMenu` - Header navigation
- `Breadcrumb` - Page breadcrumbs
- `Pagination` - Page navigation

### Usage Example

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-black">$12,840.50</p>
        <Button className="mt-4">Transfer Funds</Button>
      </CardContent>
    </Card>
  )
}
```

---

## 🎭 Theme Customization

### CSS Variables

BankKit uses CSS custom properties for theming. These can be found in `src/styles/theme.css`:

```css
:root {
  --primary: 158 65% 15%;      /* #064E3B - Deep emerald */
  --primary-foreground: 0 0% 100%;

  --secondary: 158 58% 95%;    /* #DCFCE7 - Light emerald */
  --secondary-foreground: 158 65% 15%;

  --accent: 158 85% 50%;       /* #10B981 - Emerald green */
  --accent-foreground: 0 0% 100%;

  /* Additional color variables... */
}
```

### Tailwind Configuration

Extend or modify the theme in `tailwind.config.js`:

```js
export default {
  theme: {
    extend: {
      colors: {
        // Access CSS variables
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        // Add custom colors
        'brand-blue': '#0066FF',
      },
      borderRadius: {
        // Custom radius values
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    }
  }
}
```

---

## ✨ Key Features

### Card Application System
- Interactive card tier selection (Essential vs. Black Metal)
- Automatic card number generation and validation
- Dynamic spending limits based on card tier
- Real-time card creation with success confirmation
- Seamless integration with authentication flow

### Demo Credentials
The login page features a prominent demo credentials card for easy testing:
- **Email:** `john.doe@example.com`
- **Password:** `password123`
- Clickable fields auto-fill the login form

### Dashboard & Analytics
- Real-time account balance visualization
- Weekly spending charts with Recharts
- Transaction overview with filtering
- Card information display with freeze/unfreeze toggles
- Account insights and metrics

### Onboarding Wizard
Five-step guided registration process:
1. Welcome with value proposition
2. Email/password with strength indicator
3. Personal information (name, phone, DOB)
4. Account type selection (checking/savings/both)
5. Success celebration with account details

---

## 🔐 Authentication Flow

BankKit implements a complete authentication system:

### Login
- Simple email/password form
- "Remember me" functionality
- Error handling with user-friendly messages
- Redirect to dashboard on success

### Registration (Onboarding Wizard)
1. **Welcome Step** - Value proposition and benefits
2. **Credentials** - Email and password with strength indicator
3. **Personal Info** - Name, phone, date of birth
4. **Account Type** - Choose checking, savings, or both
5. **Success** - Celebration screen with account details

### Protected Routes
Uses `ProtectedRoute` component to guard authenticated pages:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Admin Routes
Requires both authentication AND admin role:

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute requireAdmin>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

---

## 📱 Responsive Design

BankKit is fully responsive with mobile-first design:

### Breakpoints
- `sm`: 640px (small tablets)
- `md`: 768px (tablets)
- `lg`: 1024px (desktops)
- `xl`: 1280px (large desktops)
- `2xl`: 1536px (ultra-wide)

### Mobile Optimizations
- Collapsible sidebar on tablets/mobile
- Bottom navigation bar on mobile devices
- Touch-friendly button sizes (min 44x44px)
- Optimized font sizes for readability
- Stacked layouts for narrow viewports

### Example
```tsx
// Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

---

## ⚡ Performance

### Optimizations
- **Code Splitting** - Automatic route-based splitting via Vite
- **Lazy Loading** - Components loaded on-demand
- **Optimized Bundle** - Tree-shaking removes unused code
- **Image Optimization** - WebP format with fallbacks
- **CSS Purging** - Tailwind removes unused styles in production

### Best Practices
- Minimize re-renders with React.memo and useCallback
- Use Suspense for async components
- Implement skeleton loading states
- Optimize images before deployment
- Monitor bundle size with `npm run build`

---

## 🧪 Testing Strategy

### Recommended Testing Setup
```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Test Types
- **Unit Tests** - Component logic and utilities
- **Integration Tests** - User flows and interactions
- **E2E Tests** - Complete user journeys (Playwright/Cypress)

---

## 🚢 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Output directory: dist/
# Assets are minified and hashed for caching
```

### Environment Variables

Create `.env.production` for production settings:

```env
VITE_API_BASE_URL=https://api.bankkit.com
VITE_APP_ENV=production
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

### Deployment Platforms
- **Vercel** - Automatic deployment from Git
- **Netlify** - Static site hosting with CDN
- **AWS S3 + CloudFront** - Enterprise hosting
- **Docker** - Containerized deployment

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes with descriptive commits
3. Test thoroughly across browsers
4. Submit pull request with description
5. Address code review feedback

### Code Style
- Follow TypeScript best practices
- Use ESLint recommended rules
- Maintain consistent component structure
- Write meaningful commit messages
- Add comments for complex logic

### Component Guidelines
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use TypeScript for type safety

---

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Motion Documentation](https://motion.dev/docs)
- [React Router Guide](https://reactrouter.com/docs)

### Design
- [Figma Design Files](https://figma.com/bankkit-design) (if available)
- [Style Guide](./STYLE_GUIDE.md) (if available)
- [Component Library](./COMPONENTS.md)

---

## 📄 License

Copyright © 2026 BankKit. All rights reserved.

---

## 🆘 Support

For issues, questions, or contributions:
- **Issues:** [GitHub Issues](https://github.com/bankkit/bankkit/issues)
- **Discussions:** [GitHub Discussions](https://github.com/bankkit/bankkit/discussions)
- **Email:** support@bankkit.com

---

**Built with ❤️ by the BankKit team**

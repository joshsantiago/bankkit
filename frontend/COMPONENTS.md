# BankKit Component Library

A comprehensive guide to all UI components used in the BankKit frontend application.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Form Components](#form-components)
- [Layout Components](#layout-components)
- [Overlay Components](#overlay-components)
- [Feedback Components](#feedback-components)
- [Data Display Components](#data-display-components)
- [Navigation Components](#navigation-components)
- [Custom Components](#custom-components)
- [Animation Patterns](#animation-patterns)
- [Theme Customization](#theme-customization)

---

## Getting Started

All components in BankKit are built using [shadcn/ui](https://ui.shadcn.com/), a collection of re-usable components built with Radix UI primitives and styled with Tailwind CSS.

### Import Pattern

```tsx
// Import from @/components/ui/
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
```

### Component Philosophy

- **Composable** - Components are designed to work together
- **Accessible** - Built with accessibility in mind (ARIA labels, keyboard navigation)
- **Customizable** - Easy to style with Tailwind classes
- **Type-safe** - Full TypeScript support

---

## Form Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary emerald button
- `destructive` - Red for destructive actions
- `outline` - Outlined button
- `secondary` - Gray secondary button
- `ghost` - Transparent with hover effect
- `link` - Text-only link style

**Sizes:**
- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Square icon button

**Usage:**

```tsx
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// Default button
<Button>Click Me</Button>

// With variant and size
<Button variant="destructive" size="lg">
  Delete Account
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Plus size={20} />
</Button>

// Loading state
<Button disabled>
  <Loader2 className="animate-spin mr-2" size={16} />
  Processing...
</Button>
```

---

### Input

Text input component with built-in styling for various states.

**Props:**
- `type` - Input type (text, email, password, etc.)
- `placeholder` - Placeholder text
- `disabled` - Disable input
- `className` - Additional Tailwind classes

**Usage:**

```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>

// With React Hook Form
<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register('email')} placeholder="Email" />
  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
</form>
```

---

### Textarea

Multi-line text input.

**Usage:**

```tsx
import { Textarea } from '@/components/ui/textarea'

<Textarea
  placeholder="Enter your message..."
  rows={4}
  className="resize-none"
/>
```

---

### Select

Dropdown selection component.

**Usage:**

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'

<Select defaultValue="usd">
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select currency" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="usd">USD ($)</SelectItem>
    <SelectItem value="eur">EUR (€)</SelectItem>
    <SelectItem value="gbp">GBP (£)</SelectItem>
  </SelectContent>
</Select>
```

---

### Checkbox

Checkbox input with label support.

**Usage:**

```tsx
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

---

### RadioGroup

Radio button group for single selection.

**Usage:**

```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

<RadioGroup defaultValue="checking">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="checking" id="checking" />
    <Label htmlFor="checking">Checking Account</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="savings" id="savings" />
    <Label htmlFor="savings">Savings Account</Label>
  </div>
</RadioGroup>
```

---

### Switch

Toggle switch component.

**Usage:**

```tsx
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

## Layout Components

### Card

Container component with header, content, and footer sections.

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

<Card>
  <CardHeader>
    <CardTitle>Account Balance</CardTitle>
    <CardDescription>Checking account ending in 4242</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-black">$12,840.50</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

---

### Tabs

Tabbed interface component.

**Usage:**

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="transactions">Transactions</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <p>Overview content</p>
  </TabsContent>
  <TabsContent value="transactions">
    <p>Transaction history</p>
  </TabsContent>
  <TabsContent value="settings">
    <p>Settings panel</p>
  </TabsContent>
</Tabs>
```

---

### Accordion

Collapsible content sections.

**Usage:**

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>How do I open an account?</AccordionTrigger>
    <AccordionContent>
      You can open an account by clicking "Get Started" and following our
      simple 5-step onboarding process.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is my money insured?</AccordionTrigger>
    <AccordionContent>
      Yes, all accounts are FDIC insured up to $250,000.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### Separator

Visual divider line.

**Usage:**

```tsx
import { Separator } from '@/components/ui/separator'

<div className="space-y-4">
  <h2>Section 1</h2>
  <Separator />
  <h2>Section 2</h2>
</div>

// Vertical separator
<div className="flex gap-4">
  <p>Left content</p>
  <Separator orientation="vertical" />
  <p>Right content</p>
</div>
```

---

### Sidebar

Collapsible navigation sidebar (used in Dashboard).

**Usage:**

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'

<Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <LayoutDashboard size={20} />
            Dashboard
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

---

## Overlay Components

### Dialog

Modal dialog component.

**Usage:**

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed with this action?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Sheet

Slide-in panel (mobile menu, side panels).

**Usage:**

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <Menu size={24} />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
      <SheetDescription>Choose where to go</SheetDescription>
    </SheetHeader>
    {/* Navigation content */}
  </SheetContent>
</Sheet>
```

---

### Popover

Floating content container.

**Usage:**

```tsx
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content goes here</p>
  </PopoverContent>
</Popover>
```

---

### Tooltip

Hover tooltip component.

**Usage:**

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <Info size={16} />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional information</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Dropdown Menu

Context menu and dropdown menus.

**Usage:**

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical size={20} />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Feedback Components

### Alert

Notification banner component.

**Variants:**
- `default` - Gray info alert
- `destructive` - Red error alert

**Usage:**

```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

<Alert>
  <AlertCircle size={16} />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    Your account verification is pending. Check your email for next steps.
  </AlertDescription>
</Alert>

// Error alert
<Alert variant="destructive">
  <AlertCircle size={16} />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Failed to process transaction. Please try again.
  </AlertDescription>
</Alert>
```

---

### Toast (Sonner)

Temporary notification toasts.

**Setup:**

```tsx
// In App.tsx or main layout
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      {/* Your app content */}
      <Toaster />
    </>
  )
}
```

**Usage:**

```tsx
import { toast } from 'sonner'

// Success toast
toast.success('Transaction completed successfully!')

// Error toast
toast.error('Failed to process payment')

// Info toast
toast('Account settings updated')

// With action button
toast('Email sent', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo'),
  },
})

// Promise toast (for async operations)
toast.promise(
  fetch('/api/transfer'),
  {
    loading: 'Processing transfer...',
    success: 'Transfer completed!',
    error: 'Transfer failed',
  }
)
```

---

### Progress

Progress bar component.

**Usage:**

```tsx
import { Progress } from '@/components/ui/progress'

<Progress value={65} className="w-full" />

// With label
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Profile Completion</span>
    <span>65%</span>
  </div>
  <Progress value={65} />
</div>
```

---

### Skeleton

Loading placeholder component.

**Usage:**

```tsx
import { Skeleton } from '@/components/ui/skeleton'

// Loading state for card
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2 mt-2" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-32 w-full" />
  </CardContent>
</Card>

// Loading state for list
<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ))}
</div>
```

---

### Badge

Status indicator badge.

**Variants:**
- `default` - Gray
- `secondary` - Light gray
- `destructive` - Red
- `outline` - Outlined

**Usage:**

```tsx
import { Badge } from '@/components/ui/badge'

<Badge>Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Overdue</Badge>
<Badge variant="outline">Draft</Badge>
```

---

## Data Display Components

### Table

Sortable data table component.

**Usage:**

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

<Table>
  <TableCaption>Recent Transactions</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Merchant</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Feb 14, 2026</TableCell>
      <TableCell>Apple Store</TableCell>
      <TableCell className="text-right">-$1,299.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Feb 12, 2026</TableCell>
      <TableCell>Salary Deposit</TableCell>
      <TableCell className="text-right text-green-600">+$4,500.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Avatar

User profile image component.

**Usage:**

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="/avatars/user.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Different sizes
<Avatar className="h-8 w-8">...</Avatar>
<Avatar className="h-12 w-12">...</Avatar>
<Avatar className="h-16 w-16">...</Avatar>
```

---

### Calendar

Date picker calendar.

**Usage:**

```tsx
import { Calendar } from '@/components/ui/calendar'
import { useState } from 'react'

function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
```

---

## Custom Components

### PageTransition

Animated page transitions using Motion.

**Usage:**

```tsx
import { PageTransition } from '@/components/PageTransition'

<PageTransition>
  <YourPageComponent />
</PageTransition>

// In App.tsx
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
  </Routes>
</AnimatePresence>
```

---

### ScrollAnimation

Scroll-triggered animations.

**Usage:**

```tsx
import { ScrollAnimation } from '@/components/ScrollAnimation'

<ScrollAnimation direction="up">
  <h2>This fades in from bottom when scrolled into view</h2>
</ScrollAnimation>

<ScrollAnimation direction="left" delay={0.2}>
  <div>Slides in from left with 200ms delay</div>
</ScrollAnimation>

// With stagger for children
<ScrollAnimation staggerChildren={0.1}>
  <div>
    <div>Item 1 (no delay)</div>
    <div>Item 2 (100ms delay)</div>
    <div>Item 3 (200ms delay)</div>
  </div>
</ScrollAnimation>
```

---

### ProtectedRoute

Route guard for authenticated pages.

**Usage:**

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute'

// Requires authentication
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

// Requires admin role
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

### ErrorBoundary

React error boundary component.

**Usage:**

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

---

## Animation Patterns

### Page Transitions

Used automatically via `PageTransition` component:

```tsx
// Fade + slide animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.3 }}
```

---

### Micro-interactions

Common hover/focus patterns:

```tsx
// Button hover
className="hover:scale-105 transition-transform"

// Card hover lift
className="hover:shadow-lg hover:-translate-y-1 transition-all"

// Icon slide
className="group-hover:translate-x-1 transition-transform"

// Fade on hover
className="opacity-60 hover:opacity-100 transition-opacity"
```

---

### Loading States

```tsx
// Pulse animation
className="animate-pulse"

// Spin animation (for loaders)
className="animate-spin"

// Bounce animation
className="animate-bounce"
```

---

### Motion Components

Using Motion directly:

```tsx
import { motion } from 'motion/react'

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Hover animations
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

---

## Theme Customization

### Applying Custom Colors

```tsx
// Using Tailwind classes
<Button className="bg-blue-600 hover:bg-blue-700">
  Custom Color Button
</Button>

// Using CSS variables
<div className="bg-[--primary] text-[--primary-foreground]">
  Theme-based color
</div>
```

---

### Custom Variants

Extend component variants:

```tsx
// Create variant using cn utility
import { cn } from '@/lib/utils'

<Button
  className={cn(
    "bg-gradient-to-r from-emerald-500 to-emerald-700",
    "hover:from-emerald-600 hover:to-emerald-800"
  )}
>
  Gradient Button
</Button>
```

---

### Dark Mode Support

All components support dark mode via `next-themes`:

```tsx
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  )
}
```

---

## Best Practices

### Component Composition

✅ **Good:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

❌ **Avoid:**
```tsx
<div className="card">
  <div className="card-header">
    <h3>Title</h3>
  </div>
</div>
```

---

### Accessibility

Always include proper labels and ARIA attributes:

```tsx
// Good
<Button aria-label="Close dialog">
  <X size={16} />
</Button>

<Input
  id="email"
  type="email"
  aria-describedby="email-error"
/>
```

---

### Performance

- Use `React.memo` for expensive components
- Implement skeleton loaders for async data
- Lazy load heavy components
- Avoid inline function definitions in JSX

---

## Additional Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Motion Documentation](https://motion.dev/)
- [React Hook Form](https://react-hook-form.com/)

---

**Last Updated:** February 2026
**Maintained by:** BankKit Development Team

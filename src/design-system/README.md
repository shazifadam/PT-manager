# FitTrack Pro Design System

Apple Health-inspired design system with Base UI integration.

## Core Principles

1. **Content-first**: Minimal UI, maximum clarity
2. **Generous whitespace**: Let content breathe
3. **Subtle separation**: Prefer borders over shadows
4. **Consistent hierarchy**: Strong typography scale
5. **Brand restraint**: Coral red for primary actions only

## Usage Rules

### ✅ DO
- Import all values from `tokens.ts`
- Use FT* components in screens
- Follow Apple Health aesthetic: clean, minimal, trustworthy
- Use semantic color names (never raw hex)

### ❌ DON'T
- Add raw hex colors in screens
- Override Base UI directly in screens
- Create ad-hoc inline styles
- Use brand colors for backgrounds

## Components

### Layout
- `FTPage` - Page wrapper with title/subtitle
- `FTSection` - Section with optional title and divider
- `FTCard` - Surface container with variants

### Interactive
- `FTButton` - primary, secondary, tertiary, danger
- nput` - Form input with error states
- `FTModal` - Modal dialog with footer actions

### Display
- `FTBadge` - Status pills (active, expiring, expired)
- `FTListRow` - Apple Health-style list rows
- `FTMetric` - Large number displays

## Color Usage

- **Background**: gray-100 (main), white (surfaces)
- **Text**: gray-900 (primary), gray-500 (muted)
- **Borders**: gray-200 (default), gray-300 (strong)
- **Primary Action**: coralRed #e6434c
- **Status**: Use semantic colors sparingly

## Typography

- **Headings**: Ubuntu, semibold
- **Body**: Inter, regular
- **Hierarchy**: 5xl (page) → 2xl (section) → lg (card) → base (body)

## Spacing

Use spacing tokens: `spacing[0]` through `spacing[12]`
Common: 4 (spacing[4] = 16px), 5 (20px), 6 (24px)

## Examples
```tsx
// ✅ Good
import { FTPage, FTSection, FTCard, FTButton, semantic } from '../../design-system';

<FTPage title="Dashboard">
  <FTSection title="Today's Sessions">
    <FTCard>
      <FTButton variant="primary">Mark Attended</FTButton>
    </FT</FTSection>
</FTPage>

// ❌ Bad
<div style={{ backgroundColor: '#e6434c', padding: '20px' }}>
  <Button>Click me</Button>
</div>
```

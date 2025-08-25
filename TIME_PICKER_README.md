# Time Picker Component

A customizable time picker component built with Radix UI and Tailwind CSS, designed to integrate seamlessly with your existing UI components.

## Features

- **24-hour format by default** with 12-hour option
- **Manual input with validation**
- **Scrollable quick selection grid** (15-minute intervals)
- **AM/PM toggle** for 12-hour format
- **Keyboard accessible**
- **Fully customizable styling**
- **Disabled state support**
- **Improved scrolling experience**

## Usage

### Basic Usage

```tsx
import { TimePicker } from "@/components/ui/time-picker"

function MyComponent() {
  const [time, setTime] = useState("")

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      placeholder="Select time"
    />
  )
}
```

### 12-Hour Format

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  format="12h"
  placeholder="Select time (12h)"
/>
```

### 24-Hour Format

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  format="24h"
  placeholder="Select time (24h)"
/>
```

### Disabled State

```tsx
<TimePicker
  value="14:30"
  disabled
  placeholder="Disabled time picker"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | The selected time in HH:MM format |
| `onChange` | `(time: string) => void` | `undefined` | Callback when time changes |
| `placeholder` | `string` | `"Select time"` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the picker is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |
| `format` | `"12h" \| "24h"` | `"24h"` | Time format to display (24h is default) |

## Time Format

The component always returns time in 24-hour format (`HH:MM`) regardless of the display format. For example:
- 12-hour format display: "2:30 PM" → value: "14:30"
- 24-hour format display: "14:30" → value: "14:30"

## Styling

The component uses your existing design system and can be customized with Tailwind classes:

```tsx
<TimePicker
  className="w-full max-w-xs"
  placeholder="Custom styled picker"
/>
```

## Integration

The time picker is already integrated into your Sun Simulation app, replacing the previous time selection dropdown with a more user-friendly time picker interface.

## Dependencies

- `@radix-ui/react-popover` - For the dropdown functionality
- `lucide-react` - For the clock icon
- `class-variance-authority` - For component variants
- `clsx` and `tailwind-merge` - For class name utilities 
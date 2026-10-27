# Typography

**Category**: react
**URL**: https://heroui.com/en/docs/react/components/typography
**Source**: https://raw.githubusercontent.com/heroui-inc/heroui/refs/heads/v3/apps/docs/content/docs/en/react/components/(typography)/typography.mdx
> A semantic typography primitive for headings, body copy, and inline code built on React Aria Components Text.

## Usage

```tsx
import {Typography} from "@heroui/react";

```

```tsx
import {Typography} from "@heroui/react";

export const Default = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography type="h1">Build better interfaces</Typography>
      <Typography type="h2">Typography that stays semantic</Typography>
      <Typography type="h3">Composable by default</Typography>
      <Typography type="h4">Small heading</Typography>
      <Typography>
        HeroUI Typography uses React Aria Components Text as the primitive, with semantic typography
        types and render-prop polymorphism.
      </Typography>
      <Typography color="muted" type="body-sm">
        Smaller muted body copy for secondary descriptions.
      </Typography>
      <Typography type="code">pnpm add @heroui/react</Typography>
    </div>
  );
};

```

## Anatomy

`Typography` maps visual `type` values to semantic elements by default.

```tsx
import {Typography} from "@heroui/react";

export default () => (
  <Typography type="h1">Heading</Typography>
);

```

## Examples

### Scale

```tsx
import {Typography} from "@heroui/react";

const scale = [
  {
    label: "h1",
    meta: "36px / 600 / 1.11 / tight",
    sample: "Build better interfaces",
    type: "h1" as const,
  },
  {
    label: "h2",
    meta: "30px / 600 / 1.17 / tight",
    sample: "Built for the intelligence age",
    type: "h2" as const,
  },
  {
    label: "h3",
    meta: "24px / 600 / 1.25 / tight",
    sample: "Pricing on your terms",
    type: "h3" as const,
  },
  {
    label: "h4",
    meta: "20px / 600 / 1.33 / tight",
    sample: "Apply to the startup program",
    type: "h4" as const,
  },
  {
    label: "h5",
    meta: "18px / 600 / 1.39 / tight",
    sample: "Card titles",
    type: "h5" as const,
  },
  {
    label: "h6",
    meta: "16px / 600 / 1.50 / tight",
    sample: "Smaller feature headers",
    type: "h6" as const,
  },
  {
    label: "body",
    meta: "16px / 400 / 1.75",
    sample: "Primary body text used across documentation, marketing copy, and descriptions.",
    type: "body" as const,
  },
  {
    label: "body-sm",
    meta: "14px / 400 / 1.50",
    sample: "Secondary body, table cells, navigation, and sidebar items.",
    type: "body-sm" as const,
  },
  {
    label: "body-xs",
    meta: "12px / 400 / 1.25",
    sample: "Captions, badges, helper text, and fine print.",
    type: "body-xs" as const,
  },
  {
    label: "code",
    meta: "14px / mono",
    sample: "pnpm add @heroui/react",
    type: "code" as const,
  },
] as const;

export const TypographyScale = () => {
  return (
    <div className="flex w-full flex-col divide-y divide-border">
      {scale.map((row) => (
        <div key={row.label} className="grid grid-cols-[160px_1fr] items-center gap-8 py-5">
          <div className="flex shrink-0 flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground">{row.label}</span>
            <span className="text-xs whitespace-nowrap text-muted">{row.meta}</span>
          </div>
          <Typography type={row.type}>{row.sample}</Typography>
        </div>
      ))}
    </div>
  );
};

```

### Primitives

```tsx
import {Typography} from "@heroui/react";

export const Primitives = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography.Heading level={1}>Dashboard</Typography.Heading>
      <Typography.Paragraph>
        Convenience primitives are thin wrappers over Typography, so you can choose explicit
        composition without learning a second styling system.
      </Typography.Paragraph>
      <Typography.Paragraph color="muted" size="sm">
        Paragraph supports base, sm, and xs sizes.
      </Typography.Paragraph>
      <Typography.Code>Typography.Code</Typography.Code>
    </div>
  );
};

```

* `Typography.Heading` maps `level={1..6}` to `type="h1"` through `type="h6"`.
* `Typography.Paragraph` maps `size="base" | "sm" | "xs"` to body text styles.
* `Typography.Code` maps to the inline code style.
* `Typography.Prose` styles rich content passed as regular HTML children.

### Prose

```tsx
import {Typography} from "@heroui/react";

export const Prose = () => {
  return (
    <Typography.Prose className="flex max-w-xl flex-col gap-3">
      <h1>Prose title</h1>
      <p>
        Prose is for authored content where the markup is already semantic and HeroUI applies the
        default typography rhythm.
      </p>
      <h2>Section title</h2>
      <p>
        Inline code like <code>render</code> receives the same code treatment as the Typography
        primitive.
      </p>
    </Typography.Prose>
  );
};

```

### Render Props

```tsx
"use client";

import {Typography} from "@heroui/react";

export const RenderProps = () => {
  return (
    <div className="flex max-w-xl flex-col gap-4">
      <Typography render={({children, ...domProps}) => <h2 {...domProps}>{children}</h2>} type="h1">
        H1 visual style, h2 semantic element
      </Typography>
      <Typography render={({children, ...domProps}) => <span {...domProps}>{children}</span>}>
        The render prop can swap the underlying element while preserving HeroUI props and styles.
      </Typography>
    </div>
  );
};

```

Use the React Aria Components-style `render` prop when you need to customize the rendered element.

## Customization

### Tailwind CSS

```tsx
import {Typography} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex max-w-md flex-col gap-2 rounded-xl border border-border/80 bg-surface-secondary p-4">
      <Typography
        className="text-xs font-medium tracking-wide text-accent uppercase"
        type="body-xs"
      >
        Changelog
      </Typography>
      <Typography className="font-semibold tracking-tight text-foreground" type="h4">
        Faster search results
      </Typography>
      <Typography className="text-sm leading-relaxed text-muted" type="body-sm">
        Queries now return in under 200ms thanks to an improved index.
      </Typography>
    </div>
  );
}

```

### Global CSS

To customize the Typography component classes, you can use the `@layer components` directive. [Learn more](https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes).

```css
@layer components {
  .typography--h1 {
    @apply font-extrabold tracking-tight;
  }

  .typography--code {
    @apply rounded-md bg-default-100 font-mono dark:bg-default-50/20;
  }
}

```

## Styling Reference

HeroUI follows the [BEM](https://getbem.com/) methodology to ensure component variants and states are reusable and easy to customize.

### CSS Classes

The Typography component uses these CSS classes ([View source styles](https://github.com/heroui-inc/heroui/blob/v3/packages/styles/components/typography.css)):

#### Base Classes \[!toc]

* `.typography` - Base typography primitive
* `.typography-prose` - Rich prose container

#### Type Classes \[!toc]

* `.typography--h1` through `.typography--h6`
* `.typography--body`, `.typography--body-sm`, `.typography--body-xs`
* `.typography--code`

#### Modifier Classes \[!toc]

* `.typography--align-start`, `.typography--align-center`, `.typography--align-end`, `.typography--align-justify`
* `.typography--color-default`, `.typography--color-muted`
* `.typography--truncate`
* `.typography--weight-normal`, `.typography--weight-medium`, `.typography--weight-semibold`, `.typography--weight-bold`

## API Reference

### Typography

| Prop | Type | Default | Description |
| ---------- | -------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `type` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'body-sm' \| 'body-xs' \| 'code'` | `'body'` | Semantic typography style. |
| `align` | `'start' \| 'center' \| 'end' \| 'justify'` | `'start'` | Text alignment. |
| `color` | `'default' \| 'muted'` | `'default'` | Text color. |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | - | Font weight override. |
| `truncate` | `boolean` | - | Truncates the text to one line with ellipsis. |
| `render` | `DOMRenderFunction` | - | Custom render function from React Aria. |
| `children` | `ReactNode` | - | Text content. |

## Related Components

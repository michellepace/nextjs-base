---
title: Getting set up
description: Tailwind Plus UI Blocks requirements, Inter font, and dark mode setup.
source: https://tailwindcss.com/plus/ui-blocks/documentation
---

# Getting set up

## Requirements

All of the components in Tailwind Plus are designed for the latest version of Tailwind CSS, which is currently Tailwind CSS v4.2. To make sure that you are on the latest version of Tailwind, update via npm:

```bash
npm install tailwindcss@latest
```

If you're new to Tailwind CSS, you'll want to [read the Tailwind CSS documentation](https://tailwindcss.com/docs) as well to get the most out of Tailwind Plus.

## Add the Inter font family

We've used [Inter](https://rsms.me/inter) for all of the Tailwind Plus examples because it's a beautiful font for UI design and is completely open-source and free. Using a custom font is nice because it allows us to make the components look the same on all browsers and operating systems.

You can use any font you want in your own project of course, but if you'd like to use Inter, the easiest way is to first add it via the CDN:

```html
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
```

Then add "InterVariable" to your "sans" font family in your Tailwind theme:

```css
@theme {
  --font-sans: InterVariable, sans-serif;
  --font-sans--font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}
```

## Dark mode support

If you're using dark mode components, add the `dark:scheme-dark` class to your `<html>` element to ensure that the browser renders scrollbars and other native UIs correctly in dark mode. Also include the `dark:bg-gray-950` class to provide a dark background for the entire page:

```html
<html class="bg-white dark:bg-gray-950 scheme-light dark:scheme-dark">
```

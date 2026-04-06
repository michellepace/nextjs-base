# Reference Files

## Official Tailwind Files

[default.theme.css](default.theme.css):

- Tailwind's complete default design system with all built-in tokens (colours, typography, spacing, shadows, animations).
- See [official docs](https://tailwindcss.com/docs/theme#default-theme-variable-reference).
- ✅ Keep: Reference all available tokens, colour shades, typography/spacing scales, shadows, and decide when to use defaults vs. customise.

[preflight.css](preflight.css):

- Tailwind's CSS reset layer that normalises browser defaults and fixes cross-browser inconsistencies.
- See [official docs](https://tailwindcss.com/docs/preflight).
- ✅ Keep: Understand what Tailwind resets, debug browser behaviour, see browser-specific fixes.

| Need | Check | Then |
|------|-------|------|
| "Why does X look weird?" | `preflight.css` | See what Tailwind reset |
| "What colours are available?" | `default.theme.css` lines 5-246 | Pick from palette or customise |
| "What text sizes exist?" | `default.theme.css` lines 268-293 | Use defaults or override |
| "Change brand colours" | `app/globals.css` | Edit your semantic tokens |

### TIER 3: MEDIUM PRIORITY (Best Practices & Performance)

#### 9. Cache Playwright Browsers (.github/workflows/test-e2e.yml)

**Issue:** Browsers re-downloaded every run (~200MB+), wasting 30-60 seconds.

**Fix:**

```yaml
- name: Get installed Playwright version
  id: playwright-version
  run: echo "PLAYWRIGHT_VERSION=$(node -e "console.log(require('@playwright/test/package.json').version)")" >> $GITHUB_OUTPUT

- name: Cache Playwright browsers
  uses: actions/cache@<SHA>
  id: playwright-cache
  with:
    path: ~/.cache/ms-playwright
    key: playwright-browsers-${{ steps.playwright-version.outputs.PLAYWRIGHT_VERSION }}-${{ runner.os }}

- name: Install Playwright Browsers
  if: steps.playwright-cache.outputs.cache-hit != 'true'
  run: npx playwright install chromium firefox webkit --with-deps
```

**Impact:** 30-60s faster E2E workflow, reduced bandwidth costs. **Effort:** 5 minutes.
**Source:** eval.github-actions.md (Recommendation #2)

---

#### 11. Tighten Lefthook Glob Patterns (lefthook.yml)

**Issue:** Overly broad patterns (`**/*.{ts,tsx}`) trigger tests when only docs/config change.

**Fix:**

```yaml
# Unit tests
glob:
  - "**/*.{ts,tsx,js,jsx}"
  - "*.{ts,tsx,js,jsx}"                           # Root files
  - "!**/*.md"                                    # Exclude docs
  - "package-lock.json"
  - "tsconfig.json"
  - "vitest.config.ts"
  # ... rest

# Playwright tests
glob:
  - "{app,components,lib}/**/*.{ts,tsx,js,jsx}"
  - "app/**/*.css"
  - "playwright.config.ts"
  - "package.json"
  - "package-lock.json"
  - "next.config.ts"
  - "postcss.config.mjs"
  - "middleware.ts"
  - "!**/*.test.{ts,tsx}"  # Don't trigger E2E when only unit tests change
```

**Impact:** Prevents unnecessary test runs, saves 1.4s (unit) or 5.1s (E2E) on doc-only commits. **Effort:** 10 minutes.
**Source:** eval.lefthook-hooks.md (Recommendations #3, #4)

---

#### 17. Add Explicit Include Pattern to Vitest (vitest.config.ts)

**Fix:**

```typescript
include: ['**/*.{test,spec}.{ts,tsx}'],
// OR more specific:
include: ['app/**/*.test.{ts,tsx}', 'lib/**/*.test.{ts,tsx}'],
```

**Impact:** Improved test discovery performance, self-documenting. **Effort:** 2 minutes.
**Source:** eval.vitest-unit.md (Recommendation #2)

---

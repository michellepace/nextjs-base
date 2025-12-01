
## 🍑 Browser caching on CI?

Cache Playwright Browsers (.github/workflows/test-e2e.yml)

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

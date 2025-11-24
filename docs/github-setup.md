## 🍑 GitHub - Protect Branch

```markdown
Create GitHub Branch Ruleset:
- name: "Protect main branch"
- enforced status: Active
- target branch: include default branch (main)
- Rules:
    - Restrict deletions
    - Require a pull request before merging
    - Require status checks to pass
        - Require branches to be up to date before merging
        - Add check: "Lint & Type (biome, tsc) / lint-type"
        - Add check: "Unit Tests (vitest) / unit"
        - Add check: "E2E Tests (playwright) / e2e"
    - Block force pushes
    - Require deployments to succeed [LATER after setting up for Vercel!]
```

Vercel notes:

- Add "Require deployments to success" for rulset
- Do this <https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment>

## 🍑 How to keep my Dependencies at Latest Stable Version

<problem>

## Problem: GitHub Workflows use LTS

All `.github/workflows` have at least one job that has this step:

```yml
    steps:
    # Setup phase
    - uses: actions/checkout@v5
    - uses: actions/setup-node@v6
      with:
        node-version: 'lts/*'
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
```

The problem is, I am I forget to update node regularly on my local dev environment! When I do remember to update, I run these commands manually (<= 2 seconds to complete):

```bash
npm outdated                # Check outdated packages
npx npm-check-updates -u    # Rewrite package.json with latest
npm install                 # Install updated versions
```

But the problem is, I forget to do so often!

## Research and Analyse

Please research and evaluate possible solutions, namely:

1. GitHub Dependebot: <https://raw.githubusercontent.com/github/docs/refs/heads/main/content/code-security/dependabot/wo>
rking-with-dependabot/automating-dependabot-with-github-actions.md
2. Using a `pre-commit` or `pre-push` hook via `lefthook.yml` in root

Analyse the information to evaluate proposed solutions:

- feasibility and common practice
- ease (eg workflow when an update causes tests to fail)
- simplicity and maintainability
- [another important factor, or two!]

## Output: `report.md`

A concise well-structured and coherant report that surfaces your evaluation. Include summary and comparison tables. Make a clear recommendation either to choose one solution over the other, or, a "choose if..." recommendation.

</problem>

## Cache Browser on Github Actions Servers

Try this:

<faster>

In `.github/workflows/test-e2e.yml`:

```yml
name: E2E Tests (playwright)

permissions:
  contents: read

concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

on:
  # Triggers: PR opened, updated (new commits), or reopened
  # 1. Runs on remote GitHub Actions server (fresh environment, not local cache)
  # 2. Required to pass before PR can be merged to main (enforced by branch protection)
  # 3. TODO: Vercel deploy setup
  #    - push to main will trigger Vercel deployment to prod
  #    - but CAN add GitHub Workflow to first run Playwright tests against preview!
  #    - see https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment
  pull_request:
    branches: [main]

jobs:
  e2e:
    name: Run E2E Tests
    timeout-minutes: 10
    runs-on: ubuntu-latest
    
    steps:
    # Step: Checkout code
    - uses: actions/checkout@v5

    # Step: Setup Node.js
    - uses: actions/setup-node@v6
      with:
        node-version: 'lts/*'
        cache: 'npm'

    # Step: Install dependencies
    - name: Install dependencies
      run: npm ci

    # Step: Get Playwright version for cache key
    - name: Get installed Playwright version
      id: playwright-version
      run: echo "PLAYWRIGHT_VERSION=$(node -e "console.log(require('@playwright/test/package.json').version)")" >> $GITHUB_OUTPUT

    # Step: Cache Playwright browsers (saves 30-60s per run)
    - name: Cache Playwright browsers
      uses: actions/cache@v4
      id: playwright-cache
      with:
        path: ~/.cache/ms-playwright
        key: playwright-browsers-${{ steps.playwright-version.outputs.PLAYWRIGHT_VERSION }}-${{ runner.os }}
        restore-keys: |
          playwright-browsers-${{ runner.os }}-

    # Step: Install Playwright browsers (only if cache miss)
    - name: Install Playwright Browsers
      if: steps.playwright-cache.outputs.cache-hit != 'true'
      run: npx playwright install chromium webkit --with-deps

    # Step: Build production
    - name: Build Next.js production
      run: npx next build

    # Step: Run E2E tests
    - name: Run Playwright tests
      run: npx playwright test
    
    # Step: Upload test report
    - uses: actions/upload-artifact@v5
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: .playwright/playwright-report/
        retention-days: 30
```

</faster>

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

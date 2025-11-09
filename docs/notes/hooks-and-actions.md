# Hooks and GitHub Actions

## How it Works

```text
  ┌──────────────────────────────────────────────────────────┐
  │  YOUR LOCAL MACHINE                                      │
  ├──────────────────────────────────────────────────────────┤
  │  1. You run: git commit                                  │
  │     → Lefthook **pre-commit** runs:                      │
  │       ✓ markdownlint (auto-fix)                          │
  │       ✓ biome check (auto-fix)                           │
  │       ✓ tsc --noEmit (type check)                        │
  │     → If any fail, commit is BLOCKED ❌                  │
  │                                                          │
  │  2. You run: git push                                    │
  │     → Lefthook **pre-push** runs:                        │
  │       ✓ npm run test:e2e (Playwright E2E tests)          │
  │     → If tests fail, push is BLOCKED ❌                  │
  │     → Your code NEVER reaches GitHub if this fail        │
  │                                                          │
  │  3. If pre-push passes ✅                               │
  │     → Code is pushed to GitHub remote                    │
  └──────────────────────────────────────────────────────────┘
                               │
                               │ Code arrives at GitHub
                               ▼
  ┌─────────────────────────────────────────────────────────┐
  │  GITHUB (REMOTE SERVER)                                 │
  ├─────────────────────────────────────────────────────────┤
  │  4. GitHub Actions workflow triggers:                   │
  │     → Fresh ubuntu-latest VM spins up                   │
  │     → Clones your repo                                  │
  │     → npm ci (clean install)                            │
  │     → npx playwright install --with-deps                │
  │     → npx playwright test                               │
  │     → Uploads HTML report as artifact                   │
  │                                                         │
  │  5. Results visible in GitHub Actions tab               │
  │     → Green checkmark ✅ or red X ❌ next to commit    │
  └─────────────────────────────────────────────────────────┘
```

## 🎯 How GitHub Actions Works - The Full Picture

### 🖥️ Where Does the Code Run?

Your Playwright tests run on **GitHub's cloud servers**, not your machine!

**Local (What You Know):**

```
Your Machine
├── You write code
├── Git commit triggers Lefthook
├── Lefthook runs tests on YOUR computer
└── Uses YOUR Node.js, YOUR dependencies
```

**Remote (GitHub Actions - The New Part):**

```
GitHub's Cloud Servers (Microsoft Azure)
├── GitHub provides virtual machines (called "runners")
├── Each runner is a fresh Ubuntu computer
├── GitHub installs dependencies on THEIR machine
└── Runs tests on THEIR computer
```

---

### 📊 ASCII Flow Diagram

```text
┌────────────────────────────────────────────────────────────────┐
│  YOUR COMPUTER                                                 │
│                                                                │
│  1. You write code                                             │
│  2. git add / git commit  ──> Lefthook runs locally            │
│  3. git push              ──> Lefthook runs tests locally      │
│                                     │                          │
└─────────────────────────────────────┼──────────────────────────┘
                                      │
                    Code pushed to GitHub
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  GITHUB.COM (Your Repository)                                   │
│                                                                 │
│  4. GitHub receives your push/PR                                │
│  5. GitHub reads .github/workflows/playwright.yml               │
│  6. GitHub says: "Oh! I need to run a workflow"                 │
│                                     │                           │
└─────────────────────────────────────┼───────────────────────────┘
                                      │
                    GitHub Actions Service Activated
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────┐
│  GITHUB'S CLOUD (Microsoft Azure Datacenter)                   │
│                                                                │
│  7. GitHub spins up a FRESH Ubuntu VM (virtual machine)        │
│     - Clean machine, nothing installed yet                     │
│                                                                │
│  8. GitHub runs your workflow steps IN ORDER:                  │
│     ┌────────────────────────────────────────┐                 │
│     │ Step 1: actions/checkout@v4            │                 │
│     │ → Clones YOUR code from GitHub         │                 │
│     └────────────────────────────────────────┘                 │
│     ┌────────────────────────────────────────┐                 │
│     │ Step 2: actions/setup-node@v4          │                 │
│     │ → Installs Node.js on the VM           │                 │
│     └────────────────────────────────────────┘                 │
│     ┌────────────────────────────────────────┐                 │
│     │ Step 3: npm ci                         │                 │
│     │ → Installs YOUR dependencies           │                 │
│     │   (Next.js, Playwright, etc.)          │                 │
│     └────────────────────────────────────────┘                 │
│     ┌────────────────────────────────────────┐                 │
│     │ Step 4: npx playwright install         │                 │
│     │ → Downloads Chrome, Firefox, etc.      │                 │
│     └────────────────────────────────────────┘                 │
│     ┌────────────────────────────────────────┐                 │
│     │ Step 5: npx playwright test            │                 │
│     │ → RUNS YOUR TESTS on GitHub's machine  │                 │
│     │ → Tests pass ✅ or fail ❌            │                 │
│     └────────────────────────────────────────┘                 │
│                                                                │
│  9. GitHub destroys the VM (everything deleted)                │
│     - Nothing persists except the test results                 │
│                                                                │
└─────────────────────────────────────────────┼──────────────────┘
                                              │
                        Results sent back to GitHub
                                              │
                                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  GITHUB.COM (Your PR Page)                                      │
│                                                                 │
│  10. Status check appears on your PR:                           │
│      ✅ "Playwright Tests - passed"  OR                        │
│      ❌ "Playwright Tests - failed"                            │
│                                                                 │
│  11. Branch rules check: Can this PR merge?                     │
│      - If ✅: Merge button enabled                             │
│      - If ❌: Merge button blocked                             │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                        You can merge (or fix and retry)
```

### 🆚 Comparison: Local vs. GitHub Actions

| Aspect | Local (Lefthook) | GitHub Actions |
|--------|------------------|----------------|
| **Runs on** | Your computer | GitHub's cloud servers |
| **When** | Pre-commit, pre-push | On push/PR to GitHub |
| **Environment** | Your Node.js, your OS | Fresh Ubuntu VM each time |
| **Purpose** | Fast feedback before pushing | Final verification, required for merge |
| **Can bypass** | Yes (`--no-verify`) | No (if branch rules enabled) |
| **Speed** | Fast (already has dependencies) | Slower (installs everything fresh) |
| **Visibility** | Just you | Visible on GitHub to team |

## ToDo 1

<todo_1>

### **Understanding the Testing Pipeline**

Let me fetch the [Vercel documentation](https://vercel.com/docs/deployments/environments) first to give you accurate answers about their deployment environments.

First, let's establish the **three layers** you'll have:

```
┌─────────────────┐
│ 1. LOCAL        │  Your machine (Lefthook)
│ (Your Machine)  │  Fast feedback, can be bypassed
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. CI/CD        │  GitHub Actions
│ (GitHub Cloud)  │  Clean environment, cannot bypass
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. DEPLOYED     │  Vercel Preview/Production
│ (Vercel Edge)   │  Real infrastructure, real CDN
└─────────────────┘
```

Now let's answer your questions:

---

### **Q1: Should Unit Tests (Vitest) Run in GitHub Actions Too?**

#### **Answer: YES! Absolutely standard practice.**

**Modern Best Practice Pipeline:**

```
Unit Tests Should Run:
├── ✅ Locally (pre-commit) → Fast feedback (2-5 seconds)
└── ✅ GitHub Actions → Enforced, cannot bypass (required check)
```

#### **Why Run Unit Tests in BOTH Places?**

| Reason | Explanation |
|--------|-------------|
| **Enforcement** | Developers can bypass pre-commit with `--no-verify`, but can't bypass GitHub Actions |
| **Clean environment** | Catches environment-specific issues (OS differences, Node version, etc.) |
| **Team consistency** | Everyone's tests run in same environment, not just "works on my machine" |
| **Merge protection** | Required check prevents broken code from entering `main` |
| **CI/CD confidence** | Your deployment pipeline knows tests passed in a clean environment |

#### **Recommended Lefthook Config (with Vitest):**

```yaml
pre-commit:
  parallel: true
  commands:
    # NEW: Add unit tests here
    unit-tests:
      run: npx vitest run
      
    markdown-lint:
      glob: "*.md"
      run: npx markdownlint-cli2 --fix {staged_files}
      stage_fixed: true
      
    type-check:
      run: npx tsc --noEmit
      
    biome-check:
      run: npx @biomejs/biome check --write --no-errors-on-unmatched --files-ignore-unknown=true {staged_files}
      stage_fixed: true

pre-push:
  commands:
    # Keep e2e tests at pre-push (slower)
    playwright-tests:
      run: npm run test:e2e
```

#### **Recommended GitHub Actions Workflow (vitest.yml):**

```yaml
name: Unit Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
    
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Run unit tests
      run: npx vitest run
```

**Then add "Unit Tests" as a required status check in your branch rules!**

---

### **Q2: Should Linting/Formatting Re-Run in CI?**

#### **Answer: YES, but with a caveat.**

You're **technically correct** that the code doesn't change, BUT modern best practice is to still run them in CI. Here's why:

#### **The Reality:**

```text
Scenario 1: Developer bypasses pre-commit
├── Run: git commit --no-verify
└── Result: Linting/formatting never ran!

Scenario 2: Developer has outdated tool versions
├── Local: Biome v1.0 (lenient)
└── CI: Biome v1.5 (stricter rules)

Scenario 3: Git settings differ
├── Some devs: CRLF line endings (Windows)
└── Others: LF line endings (Mac/Linux)
```

#### **Modern Best Practice:**

✅ **Run in CI, but optimize them:**

```yaml
name: Code Quality
on:
  pull_request:
    branches: [ main, master ]
    
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
      
    # CHECK ONLY, don't fix (want to catch issues, not hide them)
    - name: Lint
      run: npx @biomejs/biome check --no-errors-on-unmatched
      
    - name: Type check
      run: npx tsc --noEmit
```

**Key differences from local:**

- ❌ NO `--write` flag (don't auto-fix)
- ❌ NO `stage_fixed: true` (want failures to be visible)
- ✅ JUST check and fail if issues found

#### **Why This Matters:**

- **Enforcement**: Team members can't merge improperly formatted code
- **Fast**: Linting takes 5-10 seconds, negligible cost
- **Safety net**: Catches the 1% of cases where pre-commit didn't run
- **Standard practice**: All major projects do this (React, Next.js, Vue, etc.)

---

### **Q3: Where Should Tests Run with Vercel? GitHub Actions vs. Preview?**

This is where it gets interesting! Let me map out the modern best practice:

#### **Understanding Vercel Environments:**

Vercel provides three environments: Local Development (your machine), Preview (automatic deployments for PRs/branches), and Production (live user-facing site).

#### **Modern Testing Strategy:**

```
┌─────────────────────────────────────────────────────────────┐
│  UNIT TESTS (Vitest)                                        │
├─────────────────────────────────────────────────────────────┤
│  ✅ Local (pre-commit)     → Fast feedback (5 sec)          │
│  ✅ GitHub Actions         → Required check (30 sec)        │
│  ❌ Vercel Preview         → NOT needed (unit tests don't   │
│  ❌ Vercel Production      → need deployed infrastructure)  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  E2E TESTS (Playwright)                                     │
├─────────────────────────────────────────────────────────────┤
│  ✅ Local (pre-push)       → Against local dev server       │
│  ✅ GitHub Actions         → Required check, isolated env   │
│  ⚠️  Vercel Preview        → OPTIONAL but valuable          │
│  ❌ Vercel Production      → See Q4 below                   │
└─────────────────────────────────────────────────────────────┘
```

#### **Detailed Breakdown:**

##### **Unit Tests: GitHub Actions ONLY (after local)**

```text
Why NOT on Vercel Preview/Production?
├── Unit tests don't need deployed infrastructure
├── They test isolated functions/components
├── No need for CDN, edge functions, or real domains
└── Would be wasteful to test on Vercel
```

##### **E2E Tests: GitHub Actions (Required) + Vercel Preview (Optional)**

**GitHub Actions E2E:**

```yaml
- name: Run Playwright tests
  run: |
    npm run dev & # Start local dev server
    npx playwright test
```

- ✅ Tests against local development server
- ✅ Fast (no deployment wait)
- ✅ Isolated (no external dependencies)
- ✅ **Required for merge**

**Vercel Preview E2E (Optional but Recommended):**

```yaml
- name: Wait for Vercel Preview
  uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
  
- name: Run Playwright against Preview
  run: npx playwright test
  env:
    BASE_URL: ${{ steps.wait-for-vercel.outputs.url }}
```

- ✅ Tests **real deployed infrastructure**
- ✅ Tests CDN, edge functions, serverless functions
- ✅ Tests with real domain/SSL
- ❌ Slower (wait for deployment ~2-3 minutes)
- ⚠️ **Not required, but adds confidence**

#### **My Recommendation:**

**For your stage (beginner, serious personal project):**

```text
Phase 1 (NOW): 
├── Unit tests: Local + GitHub Actions ✅
└── E2E tests: Local + GitHub Actions ✅

Phase 2 (Later, when more mature):
├── Unit tests: Same as Phase 1
└── E2E tests: Add Vercel Preview smoke tests (subset of tests)
```

**Most teams start with Phase 1**, then add Vercel Preview testing when:

- They've had production bugs that passed GitHub Actions
- They use Vercel-specific features (Edge Functions, Middleware)
- They need extra confidence before merging

---

### **Q4: Should Tests Run on Production?**

#### **Answer: NO for tests that modify data. Conditional YES for read-only checks.**

This is a critical distinction in testing philosophy:

#### **The Testing Pyramid:**

```
                    ┌─────────────────┐
                    │  PRODUCTION     │  
                    │  (Read-only)    │  ← Monitoring, not testing
                    └─────────────────┘
                           ▲
                           │
        ┌──────────────────┴──────────────────┐
        │        PREVIEW/STAGING              │
        │    (All tests, safe to modify)      │  ← Testing happens here
        └──────────────────┬──────────────────┘
                           ▲
                           │
        ┌──────────────────┴──────────────────┐
        │          GITHUB ACTIONS             │
        │    (All tests, isolated env)        │  ← Testing happens here
        └──────────────────┬──────────────────┘
                           ▲
                           │
                      ┌────┴────┐
                      │  LOCAL  │  ← Testing happens here
                      └─────────┘
```

#### **Production Environment: What Should Run?**

| Type | Should Run? | Explanation |
|------|-------------|-------------|
| **Unit tests** | ❌ NO | Don't need production for unit tests |
| **E2E tests (write data)** | ❌ **NEVER** | Would corrupt production database! |
| **E2E tests (read-only)** | ⚠️ Maybe | Could work, but... |
| **Smoke tests** | ✅ YES | Quick health checks (1-2 tests) |
| **Synthetic monitoring** | ✅ YES | Continuous checks (Pingdom, DataDog) |

#### **Your Specific Scenario:**

> "What about if the tests modify the database?"

**CRITICAL: You should NEVER run tests that modify data against production!**

Here's why:

```text
❌ BAD: Running E2E tests on Production
├── Test creates user "test@example.com"
├── Test creates order #12345
├── Test deletes user
└── PROBLEM: 
    ├── Real users see test data
    ├── Test data pollutes analytics
    ├── IDs get used up
    └── Risk of deleting real data
```

#### **Modern Best Practice:**

```yaml
# ✅ CORRECT: Test on Preview (isolated database)
Vercel Preview Deployment:
├── Environment: preview
├── Database: preview-database (separate from prod)
├── API Keys: test-mode keys
└── Safe to: Create, modify, delete test data

# ❌ WRONG: Test on Production
Vercel Production:
├── Environment: production
├── Database: production-database (REAL DATA!)
├── API Keys: live-mode keys
└── NEVER: Run tests that modify data
```

#### **What SHOULD Run on Production:**

**Smoke Tests (Read-Only Health Checks):**

```javascript
// ✅ SAFE: Read-only checks after deployment
describe('Production Smoke Tests', () => {
  test('Homepage loads', async () => {
    await page.goto('https://yoursite.com');
    expect(await page.title()).toContain('Your Site');
  });
  
  test('API health endpoint', async () => {
    const response = await fetch('https://yoursite.com/api/health');
    expect(response.ok).toBe(true);
  });
  
  // ❌ DON'T DO THIS:
  // test('User registration', async () => {
  //   await createUser(); // MODIFIES PRODUCTION DB!
  // });
});
```

#### **Complete Testing Strategy:**

```text
1. Development (Local):
   ├── Run: ALL tests (unit + e2e)
   ├── Database: Local SQLite/Postgres
   └── Purpose: Fast feedback while coding

2. CI (GitHub Actions):
   ├── Run: ALL tests (unit + e2e)
   ├── Database: Temporary test database
   └── Purpose: Required check, isolated environment

3. Preview (Vercel):
   ├── Run: OPTIONAL - Smoke tests or full E2E
   ├── Database: Preview database (isolated)
   └── Purpose: Test real infrastructure before production

4. Production (Vercel):
   ├── Run: ONLY read-only smoke tests
   ├── Database: Production (read-only queries only!)
   └── Purpose: Verify deployment succeeded, catch issues quickly
```

---

### **Recommended Complete Setup**

#### **File: `.github/workflows/ci.yml`**

```yaml
name: CI Pipeline
on:
  pull_request:
    branches: [ main, master ]
    
jobs:
  # Job 1: Code Quality
  quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - run: npm ci
    - name: Lint
      run: npx @biomejs/biome check
    - name: Type check
      run: npx tsc --noEmit
      
  # Job 2: Unit Tests
  unit-tests:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - run: npm ci
    - name: Run unit tests
      run: npx vitest run
      
  # Job 3: E2E Tests
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - run: npm ci
    - name: Install Playwright
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
```

#### **Updated Branch Rules:**

Add these as required status checks:

1. ✅ `quality` (linting + type-check)
2. ✅ `unit-tests` (Vitest)
3. ✅ `e2e-tests` (Playwright)

---

### **Summary**

#### **Testing Strategy by Layer:**

| Layer | Unit Tests | E2E Tests | Linting/Types | Database |
|-------|------------|-----------|---------------|----------|
| **Local (Lefthook)** | ✅ pre-commit | ✅ pre-push | ✅ pre-commit | Local test DB |
| **GitHub Actions** | ✅ Required check | ✅ Required check | ✅ Required check | Temp test DB |
| **Vercel Preview** | ❌ Not needed | ⚠️ Optional (advanced) | ❌ Not needed | Preview DB (isolated) |
| **Vercel Production** | ❌ Never | ❌ Never (if writes) | ❌ Never | Production (READ-ONLY) |

#### **Key Principles:**

1. **Defense in Depth**: Multiple layers catch different issues
2. **Fast Feedback First**: Local tests catch 95% of problems
3. **Cannot Bypass CI**: GitHub Actions is the final gatekeeper
4. **Never Test on Production**: Unless read-only health checks
5. **Unit tests**: Don't need deployed infrastructure
6. **E2E tests**: Test in isolation first, optionally test deployed version
7. **Linting/Formatting**: Re-run in CI as safety net (fast anyway)

#### **Your Action Plan:**

**Now:**

1. ✅ Add unit tests to `pre-commit` hook
2. ✅ Create `.github/workflows/ci.yml` with unit + e2e + quality checks
3. ✅ Add all three as required status checks in branch rules
4. ✅ Keep your current Playwright workflow

**Later (when ready):**

1. ⚠️ Optionally add Vercel Preview E2E tests (subset)
2. ✅ Add production smoke tests (read-only) after deployment
3. ✅ Set up proper Preview database (isolated from production)

Does this clarify the complete picture? The key insight is: **test early and often in isolated environments, never modify production data with tests!** 🎯

</todo_1>

## ToDo 2

<todo_2>

You're absolutely right to be confused - I oversimplified this in my previous answer. Let me clarify what's actually happening and why.

---

### **Your Intuition is CORRECT**

You said:
> "I thought the purpose of a Preview environment was to run all tests... in an environment very close to production"

**You're 100% right!** This IS a valid and increasingly common practice. Let me correct my previous answer.

---

### **The Real Story: It's Not "Either/Or" - It's "Both/And"**

Modern best practice is actually:

```text
GitHub Actions (Required)  →  Tests run FAST, blocks bad PRs
         +
Vercel Preview (Optional)  →  Tests run on REAL infrastructure
         =
Maximum Confidence
```

Let me explain why **BOTH** exist and serve different purposes:

---

### **Q1: Why is it "bad practice" to run all tests in Preview?**

#### **Answer: It's NOT bad practice! I misspoke.**

Running all tests in Preview is actually **good practice** for mature projects. The confusion comes from understanding **WHEN and WHY** you run tests in each environment.

#### **The Two-Stage Testing Philosophy:**

```text
┌─────────────────────────────────────────────────────────────┐
│  STAGE 1: GitHub Actions (The Gatekeeper)                   │
├─────────────────────────────────────────────────────────────┤
│  Purpose: Block bad code FAST                               │
│  Speed: 2-3 minutes                                         │
│  When: On every PR, before merge                            │
│  Required: YES - cannot merge without passing               │
│  Environment: Isolated, generic Ubuntu                      │
│  Cost: Free                                                 │
└─────────────────────────────────────────────────────────────┘
                           ↓ (Only if Stage 1 passes)
┌─────────────────────────────────────────────────────────────┐
│  STAGE 2: Vercel Preview (The Confidence Check)             │
├─────────────────────────────────────────────────────────────┤
│  Purpose: Verify REAL infrastructure works                  │
│  Speed: 5-10 minutes (includes deployment)                  │
│  When: After Stage 1 passes, before merge (optional)        │
│  Required: Optional but recommended                         │
│  Environment: Real Vercel edge network, CDN, serverless     │
│  Cost: Included in Vercel plan                              │
└─────────────────────────────────────────────────────────────┘
```

#### **Why NOT *Only* Preview?**

If you ONLY ran tests in Vercel Preview (skipping GitHub Actions):

```text
❌ Problem 1: Slow Feedback
├── Wait for Vercel to build/deploy: 2-3 min
├── Then run tests: 2-5 min
└── Total: 5-8 minutes per PR

✅ With GitHub Actions First:
├── Tests fail in 2 min on GitHub Actions
├── Developer fixes locally
└── Never had to wait for Vercel deployment
```

```text
❌ Problem 2: Deployment Cost
├── Every push triggers Vercel build
├── Even if basic unit tests would fail
└── Wastes build minutes on obviously broken code

✅ With GitHub Actions First:
├── Catch broken code before deployment
└── Only deploy code that passes basic checks
```

```text
❌ Problem 3: External Dependencies
├── Vercel needs to be up
├── Deployment pipeline needs to work
├── Network needs to be stable
└── More moving parts = more failure points

✅ With GitHub Actions First:
├── Isolated environment
├── No external dependencies
└── More reliable gating mechanism
```

---

### **Q2: Why is it "better" to run tests on GitHub servers?**

#### **Answer: It's not "better" - it serves a DIFFERENT purpose.**

Let me reframe this entirely:

#### **GitHub Actions vs. Vercel Preview: Different Jobs**

| Aspect | GitHub Actions | Vercel Preview |
|--------|----------------|----------------|
| **Purpose** | Fast gatekeeper, isolated testing | Real infrastructure validation |
| **Environment** | Generic Ubuntu VM | Real Vercel edge network |
| **Tests** | Can test anything generic | Tests Vercel-specific features |
| **Speed** | Fast (2-3 min) | Slower (5-10 min with deploy) |
| **When fails** | Block merge immediately | You already know GitHub passed |
| **Catches** | Logic bugs, unit test failures, type errors | CDN issues, edge function bugs, region-specific problems |
| **Required?** | YES - Cannot merge without | Optional but recommended |

---

### **The Modern Complete Strategy**

Here's what mature teams actually do:

#### **Flow Diagram:**

```text
Developer pushes PR
         │
         ├─────────────────────────────────────┐
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│ GitHub Actions  │                  │ Vercel Preview  │
│ (Runs in // )   │                  │ (Triggered by   │
│                 │                  │  GitHub)        │
├─────────────────┤                  ├─────────────────┤
│ 1. Lint         │ (2-3 min)        │ 1. Build app    │ (2-3 min)
│ 2. Type check   │                  │ 2. Deploy       │
│ 3. Unit tests   │                  │ 3. Wait for     │
│ 4. E2E tests    │                  │    ready        │
│    (local dev)  │                  │                 │
└────────┬────────┘                  └────────┬────────┘
         │                                     │
         │ PASS ✅                             │ READY ✅
         ├─────────────────────────────────────┤
         ▼                                     ▼
┌──────────────────────────────────────────────────────┐
│  OPTIONAL: Run E2E tests AGAIN against Preview URL   │
│  (Tests real Vercel infrastructure)                  │
└──────────────────────┬───────────────────────────────┘
                       │
                       │ PASS ✅
                       ▼
               ┌───────────────┐
               │ Merge to main │
               └───────────────┘
```

#### **What Each Stage Catches:**

```text
GitHub Actions (Generic Environment):
✅ Unit test failures
✅ Type errors
✅ Linting issues
✅ E2E tests against local dev server
✅ Logic bugs
✅ Breaking changes
❌ Cannot test: Vercel-specific features

Vercel Preview (Real Infrastructure):
✅ CDN caching issues
✅ Edge function bugs
✅ Middleware problems
✅ Environment variable issues
✅ Region-specific problems
✅ Real database connection issues
❌ Slower, so you don't want it as only gate
```

---

### **Your Point 1: Test Data Cleanup**

> "ensure that tests create test data and cleanup after running"

You're mixing two concepts here:

#### **A) Automated Test Data (During Test Runs):**

```javascript
// ✅ CORRECT: Tests clean up after themselves
test('create user', async () => {
  const user = await createUser('test@example.com');
  
  // Test logic here
  
  await cleanup(); // Delete test user
});
```

This applies to **BOTH GitHub Actions AND Vercel Preview** - tests should always clean up.

#### **B) Preview Environment Seeding (For Manual QA):**

```javascript
// ✅ ALSO CORRECT: Seed Preview with realistic data
// This is SEPARATE from automated tests
// Done after deployment, for humans to explore

vercel-preview-seed.js:
- Copy subset of production data
- Anonymize sensitive info
- Make Preview environment "feel real" for stakeholders
```

**These are two different things:**

- Automated tests clean up their own data
- Preview environment can be seeded with realistic data for manual testing

### **Your Point 2: Seed Preview with Prod Data**

> "to seed Preview with data from prod so people can 'really feel it'"

**YES! This is correct, but it's separate from automated testing.**

```text
Vercel Preview Environment:
├── Automated tests run (with cleanup) ✅
├── THEN: Seed with production data
└── Purpose: Manual QA, stakeholder review, demos
```

Example workflow:

```yaml
# After deployment and automated tests
- name: Seed Preview Environment
  if: success()
  run: npm run seed:preview
  env:
    DATABASE_URL: ${{ secrets.PREVIEW_DB_URL }}
    PROD_DATA_SOURCE: ${{ secrets.PROD_READ_REPLICA }}
```

---

### **The Real Best Practice: Layered Testing**

```text
Layer 1: Local (Lefthook)
├── Purpose: Immediate feedback
├── Runs: Unit + E2E against local dev
└── Blocks: Bad commits/pushes

Layer 2: GitHub Actions (Required Check)
├── Purpose: Fast gatekeeper, isolated environment
├── Runs: All tests in clean environment
└── Blocks: Merging bad PRs

Layer 3: Vercel Preview (Optional but Recommended)
├── Purpose: Validate real infrastructure
├── Runs: Smoke tests OR full E2E suite
└── Provides: Extra confidence before merge

Layer 4: Manual QA on Preview (Optional)
├── Purpose: Human testing
├── Environment: Seeded with realistic data
└── Provides: UX validation, stakeholder approval
```

---

### **Revised Recommendation for YOU**

#### **Phase 1 (Start Here - Now):**

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npx vitest run
      - run: npx playwright test
```

**Branch Rule: Require "test" job to pass** ✅

**Don't worry about Vercel Preview testing yet.**

---

#### **Phase 2 (Later, When Mature):**

```yaml
# .github/workflows/ci.yml (same as above)
# PLUS new file:

# .github/workflows/preview-e2e.yml
name: Preview E2E
on:
  pull_request:
    
jobs:
  test-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      # Wait for Vercel deployment
      - name: Wait for Vercel Preview
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        id: vercel-preview
        
      # Run subset of critical tests against real Preview
      - name: E2E Smoke Tests
        run: npx playwright test --grep @smoke
        env:
          BASE_URL: ${{ steps.vercel-preview.outputs.url }}
```

**This adds extra confidence without slowing down the main gate.**

---

#### **Why Both Environments Matter: Real Example**

Imagine this bug:

```javascript
// Your code
export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return <div>{apiUrl}</div>;
}
```

**GitHub Actions Tests:** ✅ PASS

- Environment variable is set in workflow
- Tests run fine

**Vercel Preview Deployment:** ❌ FAIL!

- You forgot to add `NEXT_PUBLIC_API_URL` to Vercel environment variables
- App crashes in production
- Preview E2E tests catch this!

**This is why you want both!**

---

### **Summary**

#### **Q1: Why is it bad practice to run all tests in Preview?**

**It's NOT bad!** It's good practice, but:

- Should be in ADDITION to GitHub Actions (not instead of)
- GitHub Actions is faster and should be the required gate
- Preview testing adds confidence but shouldn't be the only gate

#### **Q2: Why is it better to run tests on GitHub servers?**

**It's not "better" - it's DIFFERENT:**

- GitHub Actions: Fast isolated gate (required)
- Vercel Preview: Real infrastructure validation (optional but valuable)
- Modern practice: Use BOTH

#### **The Truth:**

```text
✅ CORRECT Strategy:
├── GitHub Actions: Required gate (fast)
└── Vercel Preview: Optional confidence check (comprehensive)

❌ WRONG Strategy:
└── ONLY Vercel Preview: Slow, expensive, too many dependencies

❌ WRONG Strategy:
└── ONLY GitHub Actions: Misses infrastructure-specific bugs
```

#### **Your Action Plan:**

**Now:** Just use GitHub Actions as required gate
**Later:** Add Vercel Preview E2E when you're ready for extra confidence

Does this clarify the relationship between the two environments? They're complementary, not competitive! 🎯

</todo_2>

## Correct GitHub Actions Terminology

This <https://github.com/michellepace/nextjs-base/settings/rules/9558817> is: A Branch Protection Ruleset (not a workflow or action).

### Here's the hierarchy

```text
┌───────────────────────────────────────────────────────────┐
│ GitHub Actions (The CI/CD platform)                       │
│                                                           │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Workflow (.github/workflows/playwright.yml)        │   │
│  │                                                    │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │ Job (test)                                   │  │   │
│  │  │                                              │  │   │
│  │  │  ┌────────────────────────────────────────┐  │  │   │
│  │  │  │ Steps (checkout, install, test, etc.)  │  │  │   │
│  │  │  │                                        │  │  │   │
│  │  │  │  ┌──────────────────────────────────┐  │  │  │   │
│  │  │  │  │ Actions (actions/checkout@v4)    │  │  │  │   │
│  │  │  │  └──────────────────────────────────┘  │  │  │   │
│  │  │  └────────────────────────────────────────┘  │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                    │   │
│  │  Creates → Status Check: "Playwright Tests" ✅❌  │   │
│  └────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Branch Protection Ruleset (your JSON file)                  │
│ → Requires status check "Playwright Tests" to pass          │
└─────────────────────────────────────────────────────────────┘
```

---

### General Words

| Term | Definition | Example |
|------|------------|---------|
| **GitHub Actions** | The CI/CD platform | "We use GitHub Actions for CI" |
| **Workflow** | YAML file defining automation | `.github/workflows/playwright.yml` |
| **Job** | A set of steps in a workflow | `jobs: test:` |
| **Step** | Individual task in a job | `- name: Run Playwright tests` |
| **Action** | Reusable code unit | `actions/checkout@v4` |
| **Status Check** | Result of a workflow run | "Playwright Tests" ✅ |
| **Branch Protection** | Rules enforcing checks | Your JSON file |

---

### GitHub Environment Words

| ✅ Good Terms | ❌ Avoid | Why |
|--------------|----------|-----|
| "GitHub Actions runner" | "GitHub server" | Most precise - refers to the actual VM |
| "CI environment" | "The cloud" | Clear and standard professional terminology |
| "GitHub Actions CI" | "GitHub machine" | When referring to the execution |
| "GitHub Actions workflow" | "Online tests" | Specific to your OS |
| "ubuntu-latest runner" | - | - |

**Best General Term:** "CI environment" or "GitHub Actions runner"

Example Usage:

- ✅ "Playwright tests run in the CI environment"  
- ✅ "The GitHub Actions runner uses ubuntu-latest"  
- ✅ "Our CI pipeline runs Playwright on GitHub Actions"  
- ✅ "Tests execute on a GitHub Actions runner"
- ❌ "Tests run on the GitHub server" (too vague)  
- ❌ "Tests run on GitHub's computer" (informal)

### Key Clarifications

**Your JSON file is a Branch Protection Ruleset** that requires the "Playwright Tests" status check (created by your workflow) to pass.

- The **workflow** (`.github/workflows/playwright.yml`) creates the status check
- The **branch protection ruleset** (JSON configuration) requires that status check to pass before merging
- The **GitHub Actions runner** is the VM that executes your workflow

## Q2. How to Refer to the GitHub Environment?

### Recommended Terminology

| ✅ Good Terms | ❌ Avoid | Why |
|---------------|----------|-----|
| "GitHub Actions runner" | "GitHub server" | Most precise - refers to the actual VM |
| "CI environment" | "The cloud" | Clear and standard |
| "GitHub Actions CI" | "GitHub machine" | Professional terminology |
| "GitHub Actions workflow" | "Online tests" | When referring to the execution |
| "ubuntu-latest runner" | - | Specific to your OS |

### Best General Term

**"CI environment"** or **"GitHub Actions runner"**

### Example Usage

✅ **Good:**

- "Playwright tests run in the CI environment"
- "The GitHub Actions runner uses ubuntu-latest"
- "Our CI pipeline runs Playwright on GitHub Actions"
- "Tests execute on a GitHub Actions runner"

❌ **Avoid:**

- "Tests run on the GitHub server" (too vague)
- "Tests run on GitHub's computer" (informal)

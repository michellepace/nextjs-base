# 🛠️ Project Setup Steps

This guide documents the manual configuration required after creating a repo from the `nextjs-base` template. GitHub settings, secrets, and Vercel connections don't transfer with templates.

## 📦 Part 1: Clone `nextjs-base` repo

If you skipped the "Use this template" step in the README and want your new project called "my-project", run:

```bash
gh repo create my-project --template michellepace/nextjs-base --clone --public
```

What does this do?

- Creates `my-project` repo on GitHub (from the template)
- Clones the repo locally to your machine in folder my-project
- Initial commit with template in it

Then:

```bash
cd my-project # Enter project directory
npm install   # Install dependencies
npm run dev   # Open http://localhost:3000 to see app running
```

## 🚀 Part 2: Vercel Setup

### 2.1 Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `my-project` repository (default settings)
3. Click **Deploy** → wait for deploy
4. Click **Continue to Dashboard**: enable Analytics and Speed Insights

### 2.2 Set Up E2E Tests on Vercel Previews

This allows Playwright tests to run against Vercel preview deployments.

**Step A: Create bypass secret in Vercel**

1. Vercel → Project → **Settings** → **Deployment Protection**
2. Scroll to **Protection Bypass for Automation**
3. Click **Add Secret**, add note: `Playwright E2E tests (preview)`,
4. Copy the secret name (VERCEL_AUTOMATION_BYPASS_SECRET) and value

**Step B: Add secret to GitHub**

1. GitHub Repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** → Add secret name and value from Vercel

Alternatively run: `gh secret set VERCEL_AUTOMATION_BYPASS_SECRET`

### 2.3 Link Vercel CLI (optional)

Install the [Vercel CLI](https://vercel.com/docs/cli) globally and link it to your project:

```bash

npm i -g vercel   # Install vercel globally if you don't have it
vercel upgrade    # Otherwise get the latest version
vercel --version  # See installed version

vercel link # Link project (creates .vercel/)
vercel list # See deployments for linked project
```

---

## 📦 Part 3: GitHub Repository Settings

Go to **Settings** → **General** on your GitHub repo.

- [ ] **Description**: Add a project description
- [ ] **Delete head branches**: ✅ Enable "Automatically delete head branches"
- [ ] **Features** (optional): Disable Wikis/Issues/Projects if not needed

The template includes `.github/dependabot.yml` which automatically enables **version updates** (weekly PRs for npm and GitHub Actions). However, **security features** require manual enablement.

Go to **Settings** → **Advanced Security** → **Dependabot**

- [ ] **Grouped security updates**: ✅ Enable (auto-PRs to fix vulnerabilities)

Dependabot will only open PRs — it never merges them. You still review and merge manually.

---

## 🧪 Part 4: Trigger Initial Workflows

Create a test PR to trigger all workflows. This ensures status check names exist in GitHub before configuring the branch ruleset.

1. Create a branch, make a small change (e.g., edit README), commit, push, open PR
2. Wait for all workflows to complete:
   - `Run Lint & Type Checks`
   - `Run Unit Tests`
   - `Run E2E Tests`
   - `Vercel` (preview deployment)
   - `Run E2E Tests on Preview`
3. Vercel → project overview → click "Deployment" URL to verify preview. Or ask Claude Code: `vercel list — find the most recent Preview deployment URL`
4. GitHub → Merge the pull request (or again ask Claude Code)
5. Now run `/merge-cleanup` to ensure clean Git / GitHub status
6. Vercel → project overview → click "Domains" URL to verify production. Or ask Claude Code: `vercel list — find the most recent Production deployment URL`

---

## 🔒 Part 5: Branch Ruleset

Now that all workflows have run, their check names are available in GitHub.

Go to **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**

Configure as follows:

| Setting | Value |
|---------|-------|
| Ruleset name | `Protect main branch` |
| Enforcement status | `Active` |
| Target branches | Add target → Include default branch (i.e. main) |

**Rules to enable:**

- [ ] ✅ **Restrict deletions**
- [ ] ✅ **Require a pull request before merging**
  - Allowed merge methods: `Merge` only (uncheck Squash/Rebase if preferred)
- [ ] ✅ **Require status checks to pass**
  - ✅ Require branches to be up-to-date before merging
  - ✅ Do not require status checks on creation
  - Add these required checks (search by name):
    - `Run Lint & Type Checks`
    - `Run Unit Tests`
    - `Run E2E Tests`
    - `Vercel` (Preview deployment must succeed)
    - `Run E2E Tests on Preview`
- [ ] ✅ **Block force pushes**

Click **Create** to save.

Alternatively, copy this prompt to Claude Code

```markdown
Create a GitHub branch ruleset called "Protect main branch" for the default branch.
Use `gh api` to get the exact check names from the most recent PR's head commit
(both check-runs and statuses endpoints), then create the ruleset via
`gh api repos/{owner}/{repo}/rulesets --method POST` with these rules:
- deletion (restrict deletions)
- pull_request (allowed_merge_methods: ["merge"] only, 0 required approvals)
- required_status_checks (strict policy, do not enforce on create, include all
  GitHub Actions checks and the Vercel deploy status — use the exact context
  strings from the API response)
- non_fast_forward (block force pushes)

Verify by fetching the rulesets list afterwards. Then double check against: `project-setup.md` section "## 🔒 Part 5: Branch Ruleset".
```

---

## 🐰 Part 6: CodeRabbit AI Review (Optional)

CodeRabbit provides AI-powered code review on pull requests.

1. Go to [coderabbit.ai](https://coderabbit.ai)
2. Connect your GitHub account
3. Enable for this repository

Run the `/coderabbit` slash command to evaluate and action specific comments.

---

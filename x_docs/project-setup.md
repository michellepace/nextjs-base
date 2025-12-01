# 🛠️ Project Setup Steps

This guide documents the manual configuration required after creating a repo from the `nextjs-base` template. GitHub settings, secrets, and Vercel connections don't transfer with templates.

## 📦 Part 1: Clone `nextjs-base` repo

Assuming the new project is called "my_proj", run:

```bash
gh repo create my_proj --template michellepace/nextjs-base --clone --public
```

What does this do?

- Creates `my_proj` repo on GitHub (from the template)
- Clones the repo locally to your machine in folder my_proj
- Initial commit with template in it

## 🚀 Part 2: Vercel Setup

### 2.1 Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `my_proj` repository (default settings)
3. Click **Deploy** → wait for deploy
4. Click **Continue to Dashboard**: enable Analytics and Speed Insights

### 2.2 Set Up E2E Tests on Vercel Previews

This allows Playwright tests to run against Vercel preview deployments.

**Step A: Create bypass secret in Vercel**

1. Vercel → Project → **Settings** → **Deployment Protection**
2. Scroll to **Protection Bypass for Automation**
3. Click **Add Secret** and copy the secret name and value

**Step B: Add secret to GitHub**

1. GitHub Repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** → Add secret name and value from Vercel

### 2.3 Link Vercel CLI (optional)

Install the [Vercel CLI](https://vercel.com/docs/cli) globally and link it to your project:

```bash

npm i -g vercel   # Install vercel globally
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

---

## 🧪 Part 4: Trigger Initial Workflows

Create a test PR to trigger all workflows. This ensures status check names exist in GitHub before configuring branch protection.

1. Create a branch, make a small change (e.g., edit README), push, open PR
2. Wait for all workflows to complete:
   - `Run Lint & Type Checks`
   - `Run Unit Tests`
   - `Run E2E Tests`
   - `Vercel` (preview deployment)
   - `Run E2E Tests on Preview`
3. Vercel → project overview → click "Deployment" URL to verify preview
4. GitHub → Merge the pull request
5. Vercel → project overview → click "Domains" URL to verify production

---

## 🔒 Part 5: Branch Protection Ruleset

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

---

## 🐰 Part 6: CodeRabbit AI Review (Optional)

CodeRabbit provides AI-powered code review on pull requests.

1. Go to [coderabbit.ai](https://coderabbit.ai)
2. Connect your GitHub account
3. Enable for this repository

Run the `/coderabbit` slash command to evaluate and action specific comments.

---

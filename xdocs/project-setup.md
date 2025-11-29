# 🛠️ Project Setup Steps

This guide documents the manual configuration required after creating a repo from the `nextjs-base` template. GitHub settings, secrets, and Vercel connections don't transfer with templates.

## 📦 Part 1: Clone `nextjs-base` repo

Assuming the new project is called "devflow", run:

```bash
gh repo create devflow --template michellepace/nextjs-base --clone --public
```

What does this do?

- Creates `devflow` repo on GitHub (from the template)
- Clones the repo locally to your machine in folder devflow
- Initial commit with template in it

## 🚀 Part 2: Vercel Setup

### 2.1 Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `devflow` repository (default settings)
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

## 🔒 Part 4: Branch Protection Ruleset

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
  - Add these required checks (search by name):
    - `Run Lint & Type Checks`
    - `Run Unit Tests`
    - `Run E2E Tests`
    - `Vercel` (Preview deployment must succeed)
    - `Run E2E Tests on Preview`
- [ ] ✅ **Block force pushes**

Click **Create** to save.

---

## 🐰 Part 5: CodeRabbit AI Review

CodeRabbit provides AI-powered code review on pull requests.

1. Go to [coderabbit.ai](https://coderabbit.ai)
2. Connect your GitHub account
3. Enable for this repository

Run the `/coderabbit` slash command to evaluate and action specific comments.

---

## ✅ Verify Setup

Create a test PR to confirm everything works:

1. Create a branch, make a small change, push, open PR
2. GitHub → Open Pull Request: View "all checks have passed"
3. Vercel → project overview → click "Deployment" URL (preview)
4. GitHub → Click "Merge pull request"
5. Vercel → project overview → click "Domains" URL (prod)
6. GitHub Settings → Code security: Confirm Dependabot alerts enabled

## Appendix

Another way to do this is giving Claude Code this prompt:

```markdown
This repo was cloned via: `gh repo create [myproject] --template michellepace/nextjs-base --public --clone`

GitHub templates copy files but NOT repository settings, branch protection, or secrets. I need you to document all manual configuration and setup required for GitHub and Vercel.

**Your task:**
1. Read `README.md` - it documents some required settings
2. Check `.github/workflows/` - identify which status checks need to be required
3. Create `project-setup.md` in root with step-by-step setup guide covering:
   - GitHub repo settings (description, delete-branch-on-merge)
   - Branch protection ruleset (required status checks from workflows)
   - Vercel project setup (new project, Speed Insights, Web Analytics)
   - `VERCEL_AUTOMATION_BYPASS_SECRET` for E2E tests on preview deploys
   - Investigate beyond the above should anything else be needed

Use `gh` CLI where helpful, but note that branch rulesets and Vercel
Deployment Protection require dashboard configuration.
```

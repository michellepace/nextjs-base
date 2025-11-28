# 🛠️ Project Setup Steps

This guide documents the manual configuration required after creating a repo from the `nextjs-base` template. GitHub settings, secrets, and Vercel connections don't transfer with templates.

## 📦 Part 1: Clone `nextjs-base` repo

Assume project is called "devflow", run: `gh repo create devflow --template michellepace/nextjs-base --clone`

- Creates `devflow` repo on GitHub (from the template)
- Clones the repo locally to your machine in folder devflow
- Will do the initial commit with template in it

---

## 📦 Part 2: GitHub Repository Settings

Go to **Settings** → **General** on your GitHub repo.

- [ ] **Description**: Add a project description
- [ ] **Delete head branches**: ✅ Enable "Automatically delete head branches"
- [ ] **Features** (optional): Disable Wikis/Issues/Projects if not needed

The template includes `.github/dependabot.yml` which automatically enables **version updates** (weekly PRs for npm and GitHub Actions). However, **security features** require manual enablement.

Go to **Settings** → **Advanced Security** → **Dependabot**

- [ ] **Grouped security updates**: ✅ Enable (auto-PRs to fix vulnerabilities)

> **Note:** Version updates work automatically from the yml file. Security alerts/updates are separate GitHub features that scan for known CVEs.

---

## 🔒 Part 3: Branch Protection Ruleset

Go to **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**

Configure as follows:

| Setting | Value |
|---------|-------|
| Ruleset name | `Protect main branch` |
| Enforcement status | `Active` |
| Target branches | Add target → Include default branch (ie main) |

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
- [ ] ✅ **Block force pushes**

Click **Create** to save.

---

## 🚀 Part 4: Vercel Setup

### 4.1 Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `devflow` repository
3. Keep default settings (Next.js auto-detected)
4. Click **Deploy**
5. Project settings > Analytics (Enable) > Speed Insights (Enable)

### 4.2 Setup E2E Tests on Vercel Previews

This allows Playwright tests to run against Vercel preview deployments.

**Step A: Create bypass secret in Vercel**

1. Vercel → Project → **Settings** → **Deployment Protection**
2. Scroll to **Protection Bypass for Automation**
3. Click **Add Secret** and copy the secret

**Step B: Add secret to GitHub**

1. GitHub → Repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VERCEL_AUTOMATION_BYPASS_SECRET`
4. Value: (paste the secret from Vercel) → **Add secret**

### 4.3 (Optional) Add Vercel Status Check

To require Vercel deployment success before merge:

1. Rules → Ruleset → "Protect main branch" (Part 2)
2. Edit "Require status checks to pass"
3. Search and add: `Vercel`

### 4.4 Link Vercel CLI (optional)

Install the [Vercel CLI](https://vercel.com/docs/cli) globally and link it to your project:

```bash
npm i -g vercel   # install globally
vercel --version  # see version intalled
vercel link       # link project to vercel
```

This empowers Claude Code as it can run commands like:

- `vercel ls` — list recent deployments
- `vercel env ls` — view environment variables
- `vercel logs <url>` — view serverless function logs
- `vercel inspect <url>` — check deployment details
- Claude Code can query your project's deployment status and logs

---

## 🐰 Part 5: CodeRabbit AI Review

CodeRabbit provides AI-powered code review on pull requests. Run the `/coderabbit` slash command to evaluate and action specific comments.

1. Go to [coderabbit.ai](https://coderabbit.ai)
2. Connect your GitHub account
3. Enable for this repository

---

## ✅ Verification Checklist

After completing setup, verify:

- [ ] Vercel deploys preview on PR creation
- [ ] GitHub Actions run: Lint, Unit Tests, E2E Tests
- [ ] E2E tests run against Vercel preview (check Actions → "E2E Tests (Vercel Preview)")
- [ ] Branch protection prevents direct push to main
- [ ] PR can only merge when all checks pass
- [ ] Dependabot alerts enabled (Settings → Code security)

## Appendix

Another way to do this is giving Claude Code this prompt:

```markdown
This repo was cloned via: `gh repo create [myproject] --template michellepace/nextjs-base --public --clone`

GitHub templates copy files but NOT repository settings, branch protection,
or secrets. I need you to document all manual configuration and setup required for GitHub and Vercel.

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

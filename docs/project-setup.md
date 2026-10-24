# 🛠️ Project Setup Steps

Manual setup for [README](../README.md) step 5. GitHub settings, secrets and Vercel connections don't come with the code.

## 🚀 Part 1: Vercel Setup

### 1.1 Create Vercel Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `my-app` repository (default settings)
3. Click **Deploy** → wait for deploy
4. Click **Continue to Dashboard**: enable Analytics and Speed Insights (the template already renders both in [`app/layout.tsx`](../app/layout.tsx))

### 1.2 Set Up E2E Tests on Vercel Deployments

Vercel puts every deployment URL behind a login by default; only your production domain stays public. The workflow [`.github/workflows/test-e2e-vercel.yml`](../.github/workflows/test-e2e-vercel.yml) tests each deployment's own URL, Preview and Production, so it passes a bypass secret to Playwright.

**Step A: Create bypass secret in Vercel**

1. Vercel → Project → **Settings** → **Deployment Protection**
2. Scroll to **Protection Bypass for Automation**
3. Click **Add Secret**, add note: `Playwright E2E tests (GitHub Actions)`
4. Copy the secret name (`VERCEL_AUTOMATION_BYPASS_SECRET`) and value

**Step B: Add secret to GitHub**

1. GitHub Repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** → Add secret name and value from Vercel

Alternatively run: `gh secret set VERCEL_AUTOMATION_BYPASS_SECRET`

### 1.3 Link Vercel CLI (optional)

Install the [Vercel CLI](https://vercel.com/docs/cli) globally and link it to your project:

```bash
npm i -g vercel   # Install vercel globally if you don't have it
vercel upgrade    # Otherwise get the latest version
vercel --version  # See installed version

vercel link # Link project (creates .vercel/, already gitignored)
vercel list # See deployments for linked project
```

---

## ⚙️ Part 2: GitHub Repository Settings

Go to **Settings** → **General** on your GitHub repo.

- ✅ **Description**: Add a project description
- ✅ **Delete head branches**: Enable "Automatically delete head branches"
- ✅ **Features** (optional): Disable Wikis/Issues/Projects if not needed

Go to **Settings** → **Advanced Security** → **Dependabot**. Version updates need no setup — [`.github/dependabot.yml`](../.github/dependabot.yml) opens weekly grouped PRs for npm and GitHub Actions. Security updates must be switched on per repo:

- ✅ **Dependabot alerts**: Enable (required before security updates)
- ✅ **Dependabot security updates**: Enable (auto-PRs to fix vulnerabilities)

Dependabot will only open PRs — it never merges them. You still review and merge manually.

---

## 🧪 Part 3: Trigger Initial Workflows

Create a test PR to trigger all workflows. This ensures status check names exist in GitHub before configuring the branch ruleset.

1. Create a branch, make a small change (e.g., edit README), commit, push, open PR
2. Wait for all workflows to complete:
   - `Run Lint & Type Checks`
   - `Run Unit Tests`
   - `Run E2E Tests`
   - `Vercel` (preview deployment)
   - `Run E2E Tests on Preview` (triggered by Vercel, so it appears last)
3. Vercel → project overview → click "Deployment" URL to verify preview. Or ask Claude Code: `vercel list — find the most recent Preview deployment URL`
4. GitHub → Merge the pull request (or again ask Claude Code)
5. Tidy up Git / GitHub after the merge: run `/gg-merge-cleanup` if you have the `git-utils` plugin, or just ask Claude Code to "clean up after the merged PR"
6. Vercel → project overview → click "Domains" URL to verify production. Or ask Claude Code: `vercel list — find the most recent Production deployment URL`

---

## 🔒 Part 4: Branch Ruleset

Now that all workflows have run, their check names are available in GitHub.

Go to **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**

Configure as follows:

| Setting | Value |
| --------- | ------- |
| Ruleset name | `Protect main branch` |
| Enforcement status | `Active` |
| Target branches | Add target → Include default branch (i.e. main) |

**Rules to enable:**

- ✅ **Restrict deletions**
- ✅ **Require a pull request before merging**
  - Required approvals: `0`
  - Allowed merge methods: `Merge` only (keeps branch commits intact on main)
- ✅ **Require status checks to pass**
  - Require branches to be up-to-date before merging
  - Do not require status checks on creation
  - Add these required checks (search by name):
    - `Run Lint & Type Checks`
    - `Run Unit Tests`
    - `Run E2E Tests`
    - `Vercel` (Preview deployment must succeed)
    - `Run E2E Tests on Preview` (not `Run E2E Tests on Production`, which only runs after merge)
- ✅ **Block force pushes**

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

Verify by fetching the rulesets list afterwards. Then double check against:
`docs/project-setup.md` § Part 4: Branch Ruleset
```

---

## 🔍 Part 5: Checking Quality

Claude Code ships these [built-in commands](https://code.claude.com/docs/en/commands), listed in the order you reach for them:

| When | Command | What it does |
| --- | --- | --- |
| Once per project | `/run-skill-generator` | Writes a project skill that teaches `/run` and `/verify` how to build, launch and drive your app from a clean setup. Rerun when build or launch steps change |
| While building | `/run` | Launches and drives your app so you see a change working, not just tests passing. With no project skill, it falls back to patterns for web apps, CLIs and TUIs |
| After a nontrivial change | `/verify` | Builds and runs your app and checks the change does what it should. No tests or typecheck, so skip it if nothing changes at runtime. Runs only when typed |
| Tests pass | `/simplify` | Four agents look for reuse, simpler code, efficiency and the right level of abstraction, then apply the fixes. Does not look for bugs, so rerun tests after |
| Before commit | `/code-review` | Reviews unpushed commits and uncommitted changes for bugs, plus cleanups from `medium` up. `--fix` applies them. Once pushed, use `/code-review main...HEAD` |
| After commit | `/security-review` | Checks the branch's commits against origin's default branch for injection, auth, secrets and data-exposure risks. Uncommitted work is not seen. Needs `origin` |
| Big or risky change | `/code-review ultra` | Deep multi-agent review in the cloud, ~15–25 min in the background. Works on a branch before a PR exists. 3 free runs on Pro and Max, then usage credits |
| PR open | `/autofix-pr` | A cloud session watches your branch's PR and pushes fixes for CI failures and review comments. Needs `gh` and the Claude GitHub app. Stop with `/autofix-pr stop` |

For more depth on any of them, run this prompt in Claude Code:

```markdown
Explain these Claude Code built-in commands: /run-skill-generator, /run,
/verify, /simplify, /code-review, /security-review, /code-review ultra,
/autofix-pr. Use the `claude-code-guide` agent; if the docs are thin,
read the skill prompts from the Claude Code binary.
For each: what it does, its benefit, how to use it well, and when.
Crisp and pragmatic, a few lines each.
```

Another option is a free [coderabbit.ai](https://coderabbit.ai) account that reviews each PR. Claude Code then reads the comments and acts on the valid ones.

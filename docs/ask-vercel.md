# Using the /ask-docs personal slash command

Prerequists and setup: see <https://github.com/michellepace/docs-for-ai>

Prompt in Claude Code

```text
/ask-docs vercel I need to get started in deploying this project for the first time to Vercel. I have signed up for an 
account on the hobby plan. But I have not done anything else. Can you please help:

- give me an overview of what it means to deploy to vercel
- do I need to do anything in GitHub considering my this project and its Github actions workflows
- can I preview my webapp whilst a PR is open before I click "merge"... does it go to production?
- How can I run end to end tests after my vercel preview deployment?

Output as well-structured guide using citations to `vercel.md`
```

## Getting Started with Vercel Deployment: A Complete Guide

Source: Documentation from the `vercel` collection at `~/projects/python/docs-for-ai/vercel/`

---

### 1. Overview: What Deploying to Vercel Means

Deploying to Vercel means hosting your web application on Vercel's globally distributed infrastructure. Here's what you need to understand:

#### Projects vs Deployments

> *"A **project** is the application that you have deployed to Vercel... A **deployment** is the result of a successful build of your project."*
> — `projects-and-deployments.md:5-6`

- **Project**: Your application on Vercel (e.g., `nextjs-base`)
- **Deployment**: A specific built version of your project, triggered by code changes

#### Deployment Methods

Vercel supports multiple deployment methods (`deploying-to-vercel.md:8-13`):

1. **Git** (most common) — push to connected repository
2. **Vercel CLI** — deploy from command line
3. **Deploy Hooks** — trigger via URL
4. **REST API** — programmatic deployments

#### How Git Integration Works

> *"When you import a Git repository to Vercel, each commit or pull request automatically triggers a new deployment."*
> — `deploying-to-vercel.md:18`

---

### 2. Importing Your Existing Project

Since you already have a GitHub repository, follow these steps (`import-an-existing-project.md:15-39`):

#### Step-by-Step

1. Go to [vercel.com/new](https://vercel.com/new)
2. Under "Import Git Repository", select **GitHub**
3. Authorise Vercel to access your repositories
4. Find `nextjs-base` and click **Import**
5. Vercel auto-detects Next.js and configures build settings
6. (Optional) Add environment variables if needed
7. Click **Deploy**

#### Using CLI Alternative

```bash
npm i -g vercel
vercel --cwd /home/mp/projects/nextjs/nextjs-base
```

> — `import-an-existing-project.md:7-10`

---

### 3. GitHub Actions: Do You Need to Change Anything?

**No changes required to your existing GitHub Actions workflows.**

When you connect your GitHub repository to Vercel:

- Vercel installs its own GitHub App integration
- It monitors commits and PRs independently of your workflows
- Your existing CI workflows (linting, testing, etc.) continue to run as normal

> *"The most common way to create a deployment is by pushing code to a connected Git repository... each commit or pull request automatically triggers a new deployment."*
> — `deploying-to-vercel.md:17-18`

Both systems work in parallel:

- **GitHub Actions** → Run your CI tests/linting
- **Vercel** → Deploy preview/production builds

---

### 4. Preview Deployments: Testing Before Merging

**Yes! You can preview your webapp whilst a PR is open — it does NOT go to production.**

#### How It Works

Vercel provides **three environments** (`environments.md:5-9`):

| Environment | Trigger | Purpose |
|:---|:---|:---|
| **Local** | `npm run dev` | Development on your machine |
| **Preview** | Any branch except `main` / PR | Testing before production |
| **Production** | Merge to `main` | Live user-facing site |

#### Preview Deployment Flow

> *"A Production environment is one built from the `main` or development branch... A preview environment is created when you deploy from any other branch."*
> — `collaborate-on-vercel.md:9`

When you open a PR (`collaborate-on-vercel.md:22-39`):

1. Create a feature branch and push changes
2. Open a Pull Request
3. Vercel automatically deploys a **Preview** version
4. A bot comment appears on your PR with:
   - Build status
   - **Preview URL** to test your changes
5. Click "Visit Preview" to see your changes live
6. Only when you **merge to `main`** does it become production

#### Two Types of Preview URLs

> — `environments.md:49-51`

- **Branch-specific URL**: Always shows latest changes on that branch
- **Commit-specific URL**: Shows exact deployment of that commit

---

### 5. Running E2E Tests After Preview Deployment

Your project already has Playwright configured. Here's how to run E2E tests against Vercel preview deployments (`how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment.md`):

#### Using GitHub Actions with `repository_dispatch`

Vercel can trigger a `repository_dispatch` event when deployments succeed. Create a new workflow:

**`.github/workflows/playwright-vercel.yml`**

```yaml
name: Playwright Tests

on:
  repository_dispatch:
    types:
      - 'vercel.deployment.success'

jobs:
  run-e2es:
    if: github.event_name == 'repository_dispatch'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.client_payload.git.sha }}
      - name: Install dependencies
        run: npm ci && npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
        env:
          BASE_URL: ${{ github.event.client_payload.url }}
```

> — `how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment.md:19-40`

#### Important: Deployment Protection

> *"If your project has Deployment Protection enabled, ensure you use Protection Bypass for Automation so your test environments can reach your deployments."*
> — `how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment.md:12`

---

### Quick Start Checklist

1. [ ] Go to [vercel.com/new](https://vercel.com/new)
2. [ ] Connect GitHub and import `nextjs-base`
3. [ ] Click Deploy
4. [ ] Create a feature branch, push, and open a PR
5. [ ] Check the Vercel bot comment for your preview URL
6. [ ] (Optional) Add the `repository_dispatch` workflow for automated E2E tests
7. [ ] Merge to `main` when ready for production

---

### References

From <https://github.com/michellepace/docs-for-ai/vercel/>:

| Topic | File |
|:---|:---|
| Platform overview | `getting-started-with-vercel.md` |
| Projects & deployments | `projects-and-deployments.md` |
| Importing projects | `import-an-existing-project.md` |
| Environments | `environments.md` |
| Collaboration & previews | `collaborate-on-vercel.md` |
| Deployment methods | `deploying-to-vercel.md` |
| E2E testing | `how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment.md` |

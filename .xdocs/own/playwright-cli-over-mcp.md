---
title: Playwright MCP vs Playwright CLI with Claude Code 🎭
description: Research task via claude.ai session 2026-04-27
research_urls:
    - CLI: https://playwright.dev/agent-cli/introduction
    - MCP: https://playwright.dev/mcp/introduction
---

*A field guide for Next.js developers who use Claude Code to iterate on UI and generate E2E tests.*

---

**My claude.ai prompt:**

```markdown
**TASK: Playright MCP vs Playwright CLI with Claude Code**

Please research both on offcial docs starting at:
- https://playwright.dev/agent-cli/introduction
- https://playwright.dev/mcp/introduction

**Context:** 

I’ve been using Playwright MCP for the past year to give Claude Code eyes to iterative on my Next.js apps. Also, I make CC use it first before writting my end to end tests.

**Questions:** 

Is my understanding correct that the CLI is good for token light screenshots and page structure, but the MCP remains for deeper introspection? Or CLI for everything now?

**Deliverable:** 

Comprehensive Well steuctured markdown document explained in prose to an intelligent adult engineer beginner well versed in Claude Code. Use emojies and tables for readability, explain in prose to make it enjoyable to read. Include helpful tips along the way.
```

## 🎯 TL;DR — Your hypothesis is (gently) inverted

You asked whether the CLI is the "token-light option for screenshots and page structure" while the MCP remains for "deeper introspection." It's a reasonable guess, but the docs tell a different story:

> **The CLI and the MCP expose the same underlying capability set.** The CLI is not a stripped-down sibling — it's the *successor surface* designed specifically for coding agents like Claude Code working inside large codebases. Same eyes. Same hands. Different calling convention. Vastly different token economics.

In one sentence: **for your Claude-Code-on-Next.js workflow, the CLI is now the recommended path**. The MCP isn't deprecated, but its sweet spot has narrowed to "specialised agentic loops and exploratory automation" — think Claude Desktop chats or one-off scripted bots, not "I'm building a feature and need eyes on my dev server."

> 💡 **Quick mental model:** MCP = "the LLM picks up tools." CLI = "the agent runs commands." Same toolbox; different ergonomics.

---

## 🧭 Why both surfaces exist

Microsoft built the **Playwright MCP** first. It was a brilliant idea: instead of giving an LLM a screenshot and asking it to guess where to click, give it an **accessibility-tree snapshot** with stable element refs (`e5`, `e10`, …). The model reads structured YAML, picks a ref, calls `browser_click`, and you get deterministic interaction with no vision-model fragility.

That worked beautifully — but a pattern emerged once people started using it inside coding agents like Claude Code on real codebases:

* The full set of MCP tool schemas (40+ tools) sits in the model's context the entire session, even when you only need three of them.
* Every snapshot returned by a tool call is also context.
* On a large repo, that's competing with your *actual* code for room in the window.

The **Playwright CLI** is the explicit answer to that pain. It ships the same engine, the same accessibility-tree philosophy, and the same browser drivers — but it talks to the agent via shell commands instead of MCP tool calls. You don't pay for tool schemas you aren't using, and snapshots are written to files that the agent can choose to read or skip.

> 🛈 The CLI is the newer surface. It exists *because* of what the MCP team learned about coding-agent workflows. Treat it as Playwright's considered v2 of the "give the LLM eyes" idea, not as a lite version.

---

## 🔧 How each one actually works

### Playwright MCP — LLM-driven tool calls 🧠

You add it to your MCP client config:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Claude Code then sees a set of tools (`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_take_screenshot`, …). The model picks one, the MCP server executes it inside a real browser, and the result — including a fresh accessibility snapshot — flows back into the conversation.

* ✅ Zero-friction for chat-style clients (Claude Desktop, Cursor's agent panel, etc.)
* ✅ Browser opens **headed** by default, which is what you want for "give Claude eyes on my running app"
* ❌ Tool schemas live in your context window for the whole session
* ❌ Every snapshot is conversation tokens, even when you don't need to read it

### Playwright CLI — agent-driven shell commands 🛠

You install it once, globally:

```bash
npm install -g @playwright/cli
playwright-cli install --skills   # optional but recommended
```

Then Claude Code drives it through its existing Bash tool. A typical session looks like this:

```bash
playwright-cli open http://localhost:3000 --headed
playwright-cli type "Buy groceries"
playwright-cli press Enter
playwright-cli check e21
playwright-cli screenshot
```

After every command, the CLI prints a tiny header and a *path to a snapshot file*:

```
### Page
- Page URL: http://localhost:3000/todos
- Page Title: My App
### Snapshot
[Snapshot](.playwright-cli/page-2026-02-14T19-22-42-679Z.yml)
```

The snapshot file is the same accessibility tree you'd get from the MCP — but it's on disk. Claude Code reads it only when it needs to. The terminal output it always sees is just a few lines.

* ✅ Tool schemas don't pollute context — the agent learns commands on demand via skills or `--help`
* ✅ A persistent daemon keeps the browser alive between commands (no cold start per call)
* ✅ Snapshots are files, so the agent can grep/scope/read-partial
* ⚠️ Defaults to **headless** — for your "give Claude eyes" use case, you'll want `--headed`

> 💡 **Tip:** `playwright-cli install --skills` drops local skill files that teach Claude Code how to use the CLI for common tasks (test generation, network mocking, tracing, storage state, video recording…). It's the difference between Claude rediscovering the tool every session and Claude knowing the right command on the first try.

---

## ⚖️ Side-by-side comparison

| Dimension | 🌐 Playwright MCP | 💻 Playwright CLI |
|---|---|---|
| **Best for** | Specialised agentic loops, exploratory automation, chat clients | Coding agents (Claude Code, Copilot) on large codebases |
| **Calling convention** | LLM invokes structured MCP tools | Agent runs shell commands via Bash |
| **Token cost** | Higher — tool schemas + every snapshot live in context | Lower — concise CLI output, snapshots on disk, skills loaded on demand |
| **Default mode** | Headed | Headless (use `--headed`) |
| **Setup** | JSON in MCP client config | `npm install -g @playwright/cli` |
| **Persistence** | Session-bound | Daemon process across commands |
| **Skill discovery** | Tool schemas always present | Installable skill files + `--help` |
| **Snapshot delivery** | Inline in the tool response | File path you can choose to read |
| **Element refs** | Stable within snapshot, invalidated on navigation | Same — identical philosophy |
| **Selector support** | Refs only | Refs **plus** CSS selectors **plus** Playwright locators (`getByRole`, `getByTestId`, …) |
| **Multiple browsers** | One MCP-server per session | Multiple isolated sessions out of the box (`-s=<name>`) |

> 🔍 **Worth pausing on the selector row.** The CLI accepts `playwright-cli click "getByRole('button', { name: 'Submit' })"` directly. That's huge for your E2E-test-generation workflow: Claude can rehearse the *exact locator string* it's about to bake into a `*.spec.ts`, confirm it works, then write the test. With MCP you typically end up translating from a ref back into a locator after the fact.

---

## 🧪 Capability depth — the bit that overturns your hypothesis

Here's the misconception worth dispelling head-on. The CLI is **not** a screenshot-and-snapshot toy. Comparing the official command/tool inventories:

| Capability area | MCP has it? | CLI has it? |
|---|:-:|:-:|
| Navigation (goto, back, forward, reload) | ✅ | ✅ |
| Click / type / fill / check / hover / drag | ✅ | ✅ |
| Form filling (multi-field) | ✅ | ✅ (via fill loop or `run-code`) |
| File upload | ✅ | ✅ |
| Tabs (list, new, switch, close) | ✅ | ✅ |
| Dialog handling | ✅ | ✅ |
| Network listing & mocking (`route`/`unroute`) | ✅ | ✅ |
| Cookies / localStorage / sessionStorage | ✅ | ✅ (CLI also covers sessionStorage explicitly) |
| Storage-state save/load | ✅ | ✅ |
| Console messages | ✅ | ✅ |
| Arbitrary `eval` / Playwright code execution | ✅ | ✅ (`eval`, `run-code`) |
| Screenshots | ✅ | ✅ |
| PDF export | ✅ | ✅ |
| Tracing (start/stop) | ✅ | ✅ |
| Video recording (with chapters in CLI) | ✅ | ✅ |
| Accessibility-tree snapshot with refs | ✅ | ✅ |
| Multiple isolated sessions | Limited | ✅ first-class (`-s=<name> <cmd>`) |
| Locator generation for tests | ✅ (`browser_generate_locator`) | ✅ (snapshots + locator strings as input) |
| Visibility / text assertions | ✅ (`browser_verify_*`) | ✅ via `eval`/run-code patterns |
| Vision mode (raw mouse XY) | Optional | Yes (see Vision Mode docs) |

So when you ask "is the MCP for *deeper introspection*?" — there isn't really a depth axis where MCP wins. **They're peers in capability.** The CLI even has a couple of practical wins (multi-session ergonomics, locator-string selectors, video chapters, snapshot scoping by CSS or ref).

> 💡 **Tip:** The one place the MCP can feel "deeper" is the **headed-by-default** behaviour. When you want Claude Code to literally *watch* a UI animation or hover state alongside you, MCP's default ceremony is lower. With the CLI just remember `--headed` once and the daemon keeps the window open.

---

## 💰 The token economics — why this matters for Next.js work

For your specific workflow — `cd ~/projects/nextjs/devflow`, run `next dev`, ask Claude Code to iterate on a component, then have it write an E2E spec — token budget is the silent killer. A typical Claude Code session on a real Next.js repo is already eating context with:

* Your `app/` and `components/` source files
* Tailwind config and design-token files
* Any uploaded reference docs (your `plugin_*.md` files in the find-my-font project, for example)
* Tool results from `Bash`, `Grep`, `Read`

Adding the MCP on top means **40+ tool schemas + every accessibility snapshot returned inline** is also competing for that window. On a slightly cluttered page (a real Next.js app with a layout, nav, sidebar, and main content) snapshots can run into thousands of tokens each. Three iterations and you've spent a meaningful slice of your budget on browser plumbing rather than your actual code.

The CLI flips this: the agent sees `### Snapshot [path/to/file.yml]`, decides whether the snapshot is interesting *for this turn*, and reads it (or scopes it: `playwright-cli snapshot "#main"`, `--depth=4`, `e34`) only if it is. The browser plumbing stays out of the way.

> 💡 **Tip — scope your snapshots.** On a Next.js page with a heavy `<Layout>` wrapper, `playwright-cli snapshot "main"` or `playwright-cli snapshot --depth=4` will give Claude Code the part of the tree it's actually working on, often 5–10× smaller than a full-page dump.

---

## 🪄 Practical recommendation for your workflow

Given exactly how you described your usage — "Claude Code uses MCP first, then writes E2E tests against my Next.js apps" — here's the decision tree I'd run:

| Task | Recommended surface | Why |
|---|---|---|
| Iterating on a component, "look at this and tell me what's wrong" | **CLI** (`--headed`) | Token-light, daemon stays warm across many small commands |
| Generating E2E tests after a feature is done | **CLI** | Locator-string selectors translate directly into `*.spec.ts`; skills include explicit "test generation" guidance |
| Network mocking during dev (e.g. forcing an API error state) | **CLI** | `route` / `unroute` / `route-list` are first-class; cheap to repeat |
| Capturing a tracing/video artefact for a bug report | **CLI** | `tracing-start`/`tracing-stop`, `video-chapter` for narrated sections |
| One-off "open this URL and tell me what you see" in Claude Desktop (not Claude Code) | **MCP** | No coding-agent context to protect; headed-by-default is convenient |
| Long-running exploratory automation outside a code project | **MCP** | Sweet spot per Microsoft's own positioning |

### The migration path 🛤

If you've been on the MCP for a year, your muscle memory is solid. Switching looks like:

1. `npm install -g @playwright/cli`
2. `playwright-cli install --skills` — Claude Code will pick these up and stop guessing.
3. Add a one-line note to your project's `CLAUDE.md` (or equivalent): something like *"Use `playwright-cli` for browser interaction. Default to `--headed` against `localhost:3000`. Snapshots live in `.playwright-cli/`. Re-snapshot after navigation."*
4. Optional: keep the MCP server configured but disabled. You can flip back any time, and you'll want it for non-coding-agent clients.
5. Add `.playwright-cli/` to `.gitignore`.

> 💡 **Tip:** Adding a sentence to `CLAUDE.md` is more powerful than it looks. Without it, Claude Code may default to whatever it sees first (the MCP if it's still configured, or `Bash` with `curl` for HTTP-only checks). One line nudges every future session.

> ⚠️ **Watch out:** Element refs are valid only until the next page change. A `goto`, a route transition, or a re-render after a state change all invalidate them. Both surfaces share this rule — but with the CLI it bites slightly more often because you're typically firing off more, smaller commands. The fix is mechanical: re-snapshot after navigation. The skills file calls this out too.

---

## 🧠 When the MCP genuinely still wins

I want to be honest about this rather than pretend the CLI is a clean replacement:

* **Chat-only clients.** Claude Desktop and similar surfaces don't have a Bash tool. The MCP is the only way in.
* **Headed-first ergonomics.** If your day involves "open a browser and watch what happens" more than "drive a browser to test code," the MCP's defaults match your intent better.
* **Existing investment.** If you have a year of prompts, snippets, or shared workflows referencing `browser_*` tool names, churn isn't free. The MCP isn't going anywhere; it's still maintained.
* **Latency-sensitive single calls.** If you want one tool call inside a non-coding agentic loop with no codebase to protect, the MCP is fewer moving parts.

> 🛈 The official positioning, in Microsoft's own words: MCP for "specialised agentic loops, exploratory automation"; CLI for "coding agents working with large codebases." Take that seriously — they're not the same buyer.

---

## 📚 Bonus tips for the Claude-Code-on-Next.js workflow

A handful of habits that pay off once you're on the CLI:

* 🔄 **Always re-snapshot after navigation or significant state changes.** Stale refs are the #1 cause of "but it worked a moment ago" failures. Both MCP and CLI share this constraint.
* 🎯 **Prefer refs over CSS selectors when interacting**, but **prefer Playwright locators when generating tests.** The CLI lets you use both — exploit that asymmetry. Refs are deterministic for the agent; locators are durable for the test file.
* 🪟 **Keep the daemon alive across a session.** The CLI's persistent browser process is one of its biggest under-advertised wins — there's no JIT cost on the second, third, or fortieth command.
* 🧹 **Use `state-save` / `state-load`** for authenticated flows on your Next.js apps. Log in once, save the storage state, restore it before every test or iteration. Both surfaces support this; the CLI version is two short commands.
* 🧾 **Use `--raw` when piping snapshots through other tools.** `playwright-cli snapshot --raw | grep button` is the kind of thing that turns Claude Code's Bash tool into a reasonably good page-introspection workbench.
* 🧪 **For test generation, demonstrate first, then ask Claude to write the spec.** Drive the flow live with `playwright-cli` commands so each interaction prints its locator-friendly output. Then ask Claude to translate the session into a `*.spec.ts`. Quality is dramatically better than asking it to write the spec from a description alone.
* 📁 **Add `.playwright-cli/` to `.gitignore`.** Snapshot YAML files accumulate quickly and you don't want them in PRs.
* 🧰 **Keep `playwright-cli config-print` in your back pocket.** Useful sanity check when something feels off — confirms which browser, which profile, which session is active.

---

## 🪞 Closing reflection

Your year of MCP usage wasn't wasted — it taught you the accessibility-tree-and-refs philosophy that the CLI inherits unchanged. You're not learning a new tool; you're learning a more frugal way to invoke the same one. For Claude-Code-on-Next.js, that frugality is the whole game: every token of browser plumbing you don't pay is a token your agent can spend understanding *your* code instead.

So to answer the original question directly: **it's CLI for almost everything in your workflow now.** Not because the MCP got worse — it didn't — but because Microsoft built a surface that fits coding-agent realities much better, and your workflow is squarely in its target audience.

Keep the MCP installed for the chat-client moments. Wire the CLI in for everything else. Then forget about the plumbing and get back to shipping.

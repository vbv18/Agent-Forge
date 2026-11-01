# AgentForge — Frontend Audit: Issue Register

**Audit date:** October 2026
**Scope:** `/client` — UI components, design system, typography, accessibility, bundle size, UX
**Product:** Autonomous AI agent orchestration workbench for engineers (Coding, Search, PPT, PDF, Image, Auto agents)

## Summary

| Category | Count | Severity |
| :--- | :---: | :--- |
| [A. Code bugs](#a-code-bugs) | 8 | P0 |
| [B. AI-generated design tells](#b-ai-generated-design-tells) | 5 | P1 |
| [C. Component UX deficiencies](#c-component-ux-deficiencies) | 21 | P1–P2 |

**Fix first:** A1, A4, A8 (broken behavior, render violations, 70% bundle bloat).

---

## A. Code bugs

### A1. Ternary trapped inside template literal — `ChatInput.jsx:189–194`
```jsx
className={`
  isActive ? "text-white" : "text-slate-500"
`}
```
**Problem:** Missing `${}`. The browser receives the literal text as the class string, so the active agent icon never turns white.
**Fix:** `` className={`${isActive ? "text-white" : "text-slate-500"}`} ``

### A2. Invalid Tailwind arbitrary value — `ChatInput.jsx:181`
```jsx
shadow-[0_1px_8px_rgba(99, 102, 241, .35)]
```
**Problem:** Spaces inside bracket utilities break Tailwind's class parsing; the shadow never applies.
**Fix:** `shadow-[0_1px_8px_rgba(99,102,241,0.35)]`

### A3. Mixed Tailwind v3 and v4 gradient syntax
| Syntax | Locations |
| :--- | :--- |
| v3 `bg-gradient-to-r/br` | `ChatInput.jsx:181`, `MessageBubble.jsx:28` |
| v4 `bg-linear-to-r/br` | `SideBar.jsx:279`, `MessageList.jsx:24`, `NotFound.jsx:42` |

**Problem:** Fragile builds; classes may silently fail to compile after Vite or Tailwind updates.
**Fix:** Standardize on the installed Tailwind version. (Gradients are being removed anyway; see B1.)

### A4. State updates during render — `ChatInput.jsx:36–40`
```jsx
if (initialPrompt && initialPrompt !== prevInitialPrompt) {
  setPrevInitialPrompt(initialPrompt);
  setValue(initialPrompt);
  onResetPrompt?.();
}
```
**Problem:** Setters and a parent callback run in the render body. This triggers React warnings and cascading re-renders.
**Fix:** Move into a `useEffect` keyed on `initialPrompt`.

### A5. Direct DOM mutation — `MessageBubble.jsx:39`
```jsx
onError={(e) => e.currentTarget.remove()}
```
**Problem:** Removing nodes behind React's back can throw on re-render or unmount.
**Fix:** Track image failure in state and render a fallback.

### A6. Title truncation mismatch — `ChatInput.jsx:66–68`
```jsx
prompt.length > 20 ? prompt.slice(0, 40) + "..." : prompt
```
**Problem:** For prompts of 21–40 characters, the slice returns the full string and still appends `...`.
**Fix:** Use one constant for both: `prompt.length > 32 ? prompt.slice(0, 32) + "..." : prompt`

### A7. Loose equality — `MessageBubble.jsx:119`
```jsx
{copiedCode == value ? ... : ...}
```
**Problem:** Type coercion can produce false "copied" confirmations and violates lint standards.
**Fix:** Use `===`.

### A8. Monolithic syntax highlighter import — `MessageBubble.jsx:6`
```js
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
```
**Problem:** Bundles 190+ language grammars synchronously. Build output: `index.js` at **1,650 kB (503 kB gzip)**, with the highlighter making up more than 70% of it. Slow first load and poor Core Web Vitals.
**Fix:** Use `react-syntax-highlighter/dist/esm/prism-light` and register only needed languages (`javascript`, `typescript`, `python`, `json`, `bash`, `html`, `css`, `sql`, `yaml`), or lazy-load.

---

## B. AI-generated design tells

| # | Tell | Where | Fix |
| :-: | :--- | :--- | :--- |
| B1 | Indigo-violet gradient on every action | Sidebar "New Chat", ChatInput Send and active chip, user MessageBubble, NotFound "Return Home", Login Google button shadow | Solid buttons with crisp borders; reserve color for state |
| B2 | Neon blur spheres as decoration | `NotFound.jsx:11–12` (`bg-indigo-500/10 blur-2xl`) | Remove; use a structural terminal-grid motif |
| B3 | Tracked-out all-caps eyebrow labels | `NotFound.jsx:18`, `MessageBubble.jsx:112` | Sentence case with clear state indicators |
| B4 | No design tokens; 7 hardcoded dark colors | `#0d0f14`, `#0c0d12`, `#13151c`, `#111318`, `#1b1d24`, `#0d1117`, `#12141c` | One token system (see [Appendix](#appendix-forge-basalt-tokens)) |
| B5 | Generic boilerplate copy | `MessageList.jsx`, `lib/data.js` ("Write a Netflix Clone", "Explain Redis"); Login ("Please login to continue") | Replace with real multi-agent engineering workflows |

---

## C. Component UX deficiencies

### C1. Nav header — `Nav.jsx`
- **C1.1** Hardcoded `pl-12` mobile padding to dodge the floating sidebar button.
- **C1.2** No active-agent indicator (Auto, Coding, Search, etc.).
- **C1.3** No connection status, model name, or latency readout.
- **C1.4** Title truncates abruptly with no tooltip.

### C2. Sidebar — `SideBar.jsx` (567 lines)
- **C2.1** Monolithic file mixing collapse, mobile drawer, editing, deletion, and auth. Split it.
- **C2.2** No search or filter; finding past tasks requires endless scrolling.
- **C2.3** Orphaned credits icon (line 529): `<Coins />` with no balance shown.
- **C2.4** Title editing commits only on Enter or checkmark; blur leaves the input stuck or discards changes.
- **C2.5** Accessibility: toggle lacks `aria-expanded`; no keyboard navigation between conversation items.

### C3. Chat canvas — `ChatArea.jsx`, `MessageList.jsx`
- **C3.1** Empty-state prompts read like tutorial exercises, not agent workflows (see B5).
- **C3.2** User messages sit in colored cards, but assistant messages float unbordered with no container, agent label, or metadata.
- **C3.3** No action toolbar: cannot copy a full response, retry, rate, or export to an artifact.

### C4. Chat input — `ChatInput.jsx`
- **C4.1** Seven agent chips wrap to 2–3 rows on narrow screens and push the input down.
- **C4.2** Textarea has `rows={3}` fixed with hidden scrollbars, so users cannot gauge scroll position in long prompts.
- **C4.3** Paperclip (attach) and Mic (voice) buttons have no handler, tooltip, or disabled state.

### C5. Code blocks and artifacts — `MessageBubble.jsx`, `Articraft.jsx`
- **C5.1** Filename typo: `Articraft.jsx` should be `ArtifactPanel.jsx` (imports in `Home.jsx` lines 3 and 10).
- **C5.2** ~~Panel is hidden below `xl:` and shows a static placeholder.~~ **Resolved:** Removed the desktop vertical trigger rail from `Artifact.jsx`; the Nav.jsx Artifacts button now solely controls panel visibility.
- **C5.3** Agent-generated artifacts never reach the panel, so it stays empty.
- **C5.4** Code blocks lack a line-number toggle, show raw uppercase language tags, and `atomOneDark` clashes with the canvas colors.

### C6. Login page — `LoginPage.jsx`
- **C6.1** Bare 340px box on `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm`.
- **C6.2** No brand identity, product narrative, or feature highlights.
- **C6.3** Google button uses a heavy indigo glow (`shadow-indigo-700/30`) on a white button.

### C7. 404 page — `NotFound.jsx`
- **C7.1** Template hallmarks: blur spheres, uppercase `404 NOT FOUND` badge, oversized gradient button (B1–B3).
- **C7.2** No diagnostics such as an error code or the requested path.

---

## Remediation plan

### P0 — Bugs and bundle
- [ ] A1 Fix ternary template literal
- [ ] A2 Fix Tailwind shadow syntax
- [ ] A4 Move prompt sync into `useEffect`
- [ ] A5 Replace DOM `.remove()` with state fallback
- [ ] A6 Fix truncation (`> 32` and `slice(0, 32)`)
- [ ] A7 Use `===`
- [ ] A8 Switch to Prism light build
- [ ] C5.1 Rename `Articraft.jsx` to `ArtifactPanel.jsx` and update imports

### P1 — Tokens and ergonomics
- [ ] B4 Add Forge Basalt tokens to `src/index.css`; replace all hardcoded darks
- [ ] A3 / B1 Remove gradients; use solid states with cyan focus borders
- [ ] Add typographic scale with tabular numerals for metrics
- [ ] C4.1 / C4.2 Agent selector as scroll bar or dropdown; auto-growing textarea (max 200px)
- [ ] C3.2 / C3.3 Assistant cards with agent badge, model, timestamp, copy action
- [ ] C2.2 / C2.3 Sidebar filter (`Ctrl+K`) and live credit balance
- [ ] C1 Nav: active-agent pill and execution indicator; remove `pl-12` hack
- [ ] C2.4 / C2.5 Commit title edits on blur; add ARIA and keyboard navigation

### P2 — Secondary surfaces
- [ ] C6 Two-column terminal-style login with product narrative
- [ ] C7 404 as command-line diagnostic (`ERR_SESSION_NOT_FOUND`, path readout)
- [ ] B5 / C3.1 Replace sample prompts in `src/lib/data.js`
- [ ] C4.3 Implement or disable-with-tooltip the attach and mic buttons
- [ ] C5.3 Pipe generated artifacts into the artifact panel
- [ ] C2.1 Split `SideBar.jsx` into focused components

---

## Appendix: Forge Basalt tokens

| Token | Value | Use |
| :--- | :--- | :--- |
| `--surface-canvas` | `#090B0E` | Root background |
| `--surface-panel` | `#0E1217` | Sidebar, header, input dock |
| `--surface-card` | `#151921` | Assistant cards, modals, chips |
| `--surface-active` | `#1E2430` | Selected row, active agent, code header |
| `--border-subtle` | `rgba(255,255,255,0.07)` | Dividers, card borders |
| `--border-active` | `rgba(56,189,248,0.30)` | Focus and selected states |
| `--accent-cyan` | `#38BDF8` | Primary highlight, links, focus ring |
| `--accent-amber` | `#F59E0B` | Credits, compute, warnings |
| `--text-primary` | `#F8FAFC` | Headings, core text |
| `--text-secondary` | `#94A3B8` | Subheads, meta |
| `--text-muted` | `#64748B` | Timestamps, hints |

Semantic status colors: success `#10B981`, error `#F43F5E`.
**Type:** Inter (UI, with `tnum`) and JetBrains Mono (code, token counts, IDs). Scale: 11 / 12 / 13 / 14 / 16 / 20 px.
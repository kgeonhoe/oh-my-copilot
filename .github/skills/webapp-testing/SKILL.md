---
name: webapp-testing
description: Generates and executes a Node.js Playwright script that captures screenshots and interaction evidence for a feature review. Called by the Objector agent.
---

# Web Application Testing

Generates a Node.js Playwright capture script, executes it, and saves all evidence under the feature directory.

**Runtime**: Node.js + `@playwright/test` (already installed in `node_modules`). No Python, no server management — the server URL is provided by the caller.

---

## Inputs (provided by Objector)

| Variable          | Example                                                 |
| ----------------- | ------------------------------------------------------- |
| `FEATURE_DIR`     | `features/dark-only-home-screens-and-unified-width`     |
| `SERVER`          | `http://localhost:3000`                                 |
| Pages list        | `["/", "/about", "/how-it-works"]`                      |
| Interactions list | `["nav hover", "primary CTA click", "mobile viewport"]` |

---

## Step 1 — Derive Script Path & Evidence Directory

```
SCRIPT  = <FEATURE_DIR>/capture.js
EVIDENCE = <FEATURE_DIR>/objector-evidence/
```

Create `EVIDENCE` directory if it does not exist.

---

## Step 2 — Write the Capture Script

Write a Node.js script to `SCRIPT` that:

### 2.1 Boilerplate

```js
const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const SERVER  = '<SERVER>';                          // injected by skill
const OUT     = path.resolve('<FEATURE_DIR>/objector-evidence');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });

  /** Full-page screenshot */
  async function shot(page, name) {
    const file = path.join(OUT, name + '.png');
    await page.screenshot({ path: file, full_page: true });
    console.log('saved', name + '.png');
  }

  /** Above-fold (viewport-only) screenshot */
  async function shotVP(page, name) {
    const file = path.join(OUT, name + '.png');
    await page.screenshot({ path: file, full_page: false });
    console.log('saved', name + '.png');
  }
```

### 2.2 Static Page Coverage

For **each page** in the pages list, generate:

```js
// ── /some-route ─────────────────────────────────────────────
{
  const desk = await browser.newPage();
  await desk.setViewportSize({ width: 1440, height: 900 });
  await desk.goto(SERVER + "/some-route", { waitUntil: "networkidle" });
  await shot(desk, "some_route_desktop_full");
  await shotVP(desk, "some_route_desktop_above_fold");
  await desk.close();

  const mob = await browser.newPage();
  await mob.setViewportSize({ width: 390, height: 844 });
  await mob.goto(SERVER + "/some-route", { waitUntil: "networkidle" });
  await shot(mob, "some_route_mobile_full");
  await shotVP(mob, "some_route_mobile_above_fold");
  await mob.close();
}
```

Use safe filename slugs: `/how-it-works` → `how_it_works`, `/` → `home`.

### 2.3 Interaction Coverage

For **each interaction** in the interactions list, generate the appropriate block. Use this reference:

**Nav hover** (hover each `nav a`, screenshot):

```js
{
  const p = await browser.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto(SERVER + "/", { waitUntil: "networkidle" });
  const links = await p.locator("nav a").all();
  for (let i = 0; i < links.length; i++) {
    const txt = ((await links[i].textContent()) || "link")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_");
    await links[i].hover();
    await p.waitForTimeout(300);
    await shotVP(p, "nav_hover_" + txt);
  }
  await p.close();
}
```

**Scroll sections** (25 / 50 / 75 / 100%):

```js
{
  const p = await browser.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto(SERVER + "/", { waitUntil: "networkidle" });
  for (const pct of [25, 50, 75, 100]) {
    await p.evaluate(
      (v) => window.scrollTo(0, (document.body.scrollHeight * v) / 100),
      pct,
    );
    await p.waitForTimeout(400);
    await shotVP(p, "home_scroll_" + pct + "pct");
  }
  await p.close();
}
```

**CTA click** (click first matching link, screenshot result):

```js
{
  const p = await browser.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto(SERVER + "/", { waitUntil: "networkidle" });
  const cta = p
    .locator("a")
    .filter({ hasText: /get started/i })
    .first();
  if ((await cta.count()) > 0) {
    await cta.click();
    await p.waitForLoadState("networkidle");
    await shotVP(p, "cta_click_result");
    console.log("CTA landed on", p.url());
  }
  await p.close();
}
```

**Mobile nav** (open hamburger if present):

```js
{
  const p = await browser.newPage();
  await p.setViewportSize({ width: 390, height: 844 });
  await p.goto(SERVER + "/", { waitUntil: "networkidle" });
  const btn = p
    .locator(
      '[aria-label*="menu" i], [aria-label*="nav" i], button:has-text("☰")',
    )
    .first();
  if ((await btn.count()) > 0) {
    await btn.click();
    await p.waitForTimeout(400);
    await shotVP(p, "mobile_nav_open");
  } else {
    await shotVP(p, "mobile_nav_state");
  }
  await p.close();
}
```

**Form interaction** (focus input, fill, submit):

```js
{
  const p = await browser.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  await p.goto(SERVER + "/some-form-route", { waitUntil: "networkidle" });
  await p.locator("input").first().focus();
  await shotVP(p, "form_input_focused");
  await p.locator("input").first().fill("test value");
  await shotVP(p, "form_input_filled");
  await p.close();
}
```

### 2.4 Teardown

```js
  await browser.close();
  console.log('Done. Evidence in', OUT);
})().catch(e => { console.error(e.message); process.exit(1); });
```

---

## Step 3 — Execute the Script

Run the script using Node.js directly:

```bash
node <FEATURE_DIR>/capture.js
```

`@playwright/test` is a project dependency resolved through `node_modules`. Do not use `npx` or `pnpm exec` — just `node`.

If the script exits with an error:

1. Read the error message carefully
2. Fix the selector or logic in the script
3. Re-run once

If it still fails, document the failure and note which pages/interactions could not be captured. Proceed to Phase 3 of the Objector with whatever evidence exists.

---

## Step 4 — Confirm

List the files now in `<FEATURE_DIR>/objector-evidence/` and report them back to the Objector:

```
Evidence ready:
- home_desktop_full.png
- home_desktop_above_fold.png
- ...
```

---

## Constraints

- NEVER manage server lifecycle — the server URL is passed in and assumed to be running.
- NEVER use Python or `with_server.py`.
- ALWAYS use `waitUntil: 'networkidle'` before taking screenshots on dynamic apps.
- ALWAYS close each page after capturing to free memory.
- Script filename is always `capture.js` inside `FEATURE_DIR`.
- Evidence directory is always `objector-evidence/` inside `FEATURE_DIR`.

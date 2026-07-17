# Security fixes: PostCSS XSS + js-yaml DoS

Two moderate advisories commonly flagged on Next.js projects. Do **not** run `npm audit fix --force` — for the PostCSS issue it will try to downgrade Next.js to 9.x and break the app.

---

## 1. PostCSS: XSS via unescaped `</style>` (GHSA-qx2v-qp2m-jg93)

**What it is:** PostCSS `< 8.5.10` does not escape `</style>` when stringifying CSS. If untrusted CSS is parsed and embedded in an HTML `<style>` tag, that can break out into XSS.

**Why Next.js is flagged:** Stable Next.js (through at least `16.2.x`) still nests `postcss@8.4.31`. Audit reports both `postcss` and `next`.

**Fix — npm override** (until a stable Next release ships PostCSS ≥ 8.5.10):

```json
{
  "overrides": {
    "postcss": "^8.5.10"
  }
}
```

Then:

```bash
npm install
npm ls postcss   # expect ≥ 8.5.10 under next (often deduped)
npm audit        # should clear these two findings
```

**Other package managers:**

```json
// pnpm — in package.json
{
  "pnpm": {
    "overrides": {
      "postcss": "^8.5.10"
    }
  }
}
```

```json
// Yarn — in package.json
{
  "resolutions": {
    "postcss": "^8.5.10"
  }
}
```

**Notes:**
- Risk is mostly build-time / untrusted-CSS-in-`<style>` flows; still worth clearing for audit/CI.
- Prefer staying on current Next + override over jumping to canary just for this.

---

## 2. js-yaml: DoS via repeated merge aliases `<<` (GHSA-h67p-54hq-rp68 / CVE-2026-53550)

**What it is:** Crafted YAML with many repeated merge aliases (`<<: [*a, *a, ...]`) causes quadratic CPU use and can stall the event loop.

**Affected:** `js-yaml` `< 3.15.0` and `4.0.0`–`4.1.1`  
**Fixed:** `3.15.0+` (v3 line) and `4.2.0+` (v4 line; prefer `4.3.0+` for a related merge-chain DoS fix)

**Check:**

```bash
npm ls js-yaml
```

**Fix options (pick one that fits the tree):**

1. **Upgrade the parent package** that pulls in old js-yaml (e.g. bump `gray-matter`, ESLint-related deps, etc.).
2. **Override** if a parent still pins a vulnerable range:

```json
{
  "overrides": {
    "js-yaml": "^4.3.0"
  }
}
```

If something requires the v3 API only, use:

```json
{
  "overrides": {
    "js-yaml": "^3.15.0"
  }
}
```

Then `npm install` and `npm ls js-yaml` / `npm audit` again.

**Notes:**
- Highest risk when parsing **untrusted** YAML (APIs, uploads, CI configs from users). Local MDX/front matter is lower risk but still worth patching.

---

## Combined `package.json` example

```json
{
  "overrides": {
    "postcss": "^8.5.10",
    "js-yaml": "^4.3.0"
  }
}
```

Verify:

```bash
npm install
npm audit
npm ls postcss js-yaml
```

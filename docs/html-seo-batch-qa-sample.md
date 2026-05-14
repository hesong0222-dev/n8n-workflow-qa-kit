# HTML/SEO Batch QA Sample

Version: 2026-05-14

This is a public sample for paid reviews where a client has many static HTML pages and wants AI-assisted SEO, code, and publishing readiness checks.

The paid review does not need site credentials, analytics exports, private customer data, production CMS access, or API keys. It starts from 2-5 representative HTML files, a written SEO prompt, and synthetic/redacted examples.

## Fixed-Scope Review Offer

- `$79`: review the SEO prompt plus up to 5 representative HTML pages and return a repeatable processing plan with before/after notes.
- `$149`: build the first 10-page batch runner plan with payload contracts, validation checklist, and change-report template.

## Input Contract

```json
{
  "pageId": "demo-page-001",
  "fileName": "demo-page.html",
  "targetKeyword": "custom automation workflow",
  "secondaryKeywords": ["n8n automation", "workflow QA"],
  "pageGoal": "service landing page",
  "html": "<!doctype html><html>...</html>"
}
```

## Checks

1. Title exists, is unique, and stays under the agreed character target.
2. Meta description exists and reflects the page goal.
3. Exactly one primary H1 exists.
4. H2/H3 structure is not empty or random.
5. Images have meaningful `alt` text where the image is informative.
6. Internal links have readable anchor text.
7. Canonical URL and robots assumptions are explicit.
8. Forms, CTAs, and phone/email links are visible in the HTML.
9. No obvious placeholder text remains.
10. AI-written changes are returned as a reviewable diff or change report, not silently applied.

## Change Report Template

```text
Page:
Target keyword:
Primary issue:
Risk:
Recommended change:
Reason:
Manual approval needed:
```

## Batch Runner Shape

```text
Read HTML files
  -> extract metadata and visible headings
  -> run deterministic checks
  -> run AI review with the client's SEO prompt
  -> merge deterministic + AI findings
  -> produce per-page change report
  -> mark pages as ready / needs edit / needs manual approval
```

## Fail-Safe Rules

- Do not publish automatically in the first pass.
- Do not overwrite source HTML without a backup.
- Do not invent business claims, prices, guarantees, reviews, or compliance statements.
- Do not alter legal, medical, financial, or policy copy without explicit human approval.
- If a page has missing context, mark it `needs manual approval`.

## Example Output

```json
{
  "pageId": "demo-page-001",
  "status": "needs_edit",
  "deterministicFindings": [
    "Missing meta description",
    "Two H1 elements detected",
    "Three informative images have empty alt text"
  ],
  "aiFindings": [
    "CTA copy does not match the page goal",
    "The target keyword appears in headings but not in the opening paragraph"
  ],
  "manualApproval": [
    "Confirm whether the service guarantee can be stated publicly"
  ]
}
```

## Buyer Handoff

The useful deliverable is not a vague AI rewrite. It is a repeatable QA packet:

- input contract
- deterministic checks
- AI prompt boundary
- per-page change report
- manual approval list
- publish/no-publish status

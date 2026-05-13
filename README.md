# n8n Workflow QA + Refactor Kit

Date: 2026-05-14

This is a privacy-safe starter kit for cleaning up n8n workflows before they become production automations. It is built for freelancers, internal ops teams, and founders who need a repeatable way to test payload shape, catch malformed inputs, and document error behavior without uploading private customer data.

## What Is Included

- `workflows/qa-harness-manual.json`: an importable manual QA harness that seeds synthetic cases, validates required fields, and returns a structured pass/fail report.
- `workflows/error-handler-starter.json`: an importable Error Trigger starter workflow that normalizes production workflow failures into a compact incident payload.
- `workflows/async-job-queue-skeleton.json`: an importable webhook skeleton for production-style async jobs with request validation, synthetic job IDs, and webhook responses.
- `docs/qa-checklist.md`: a practical checklist for refactoring a messy workflow.
- `docs/import-and-test.md`: exact import and manual test steps.
- `docs/client-delivery-template.md`: a short handoff template for paid client work.
- `PRODUCT_LISTING.md`: checkout-page copy for Payhip, Gumroad, or Ko-fi.
- `index.html`: a local sales page that can be adapted into a Payhip, Gumroad, Ko-fi, or static landing page.
- `scripts/validate-package.js`: local validation for package shape and privacy leaks.

## Privacy Boundary

The workflows use synthetic examples only. There are no credentials, customer names, API tokens, private endpoints, or real logs in this package.

## Suggested Price

Start at `$29` for the kit. Offer a `$79` tier that includes one async workflow review or a 30-minute implementation call.

## Sources Checked

- n8n exports workflows as JSON and warns that exported workflows may include credential names/IDs or authentication headers, so this kit deliberately avoids credentials and secrets.
- n8n Error Trigger workflows run for linked automatic workflow failures and receive structured execution/workflow error data.
- n8n templates are importable workflow examples; the creator marketplace is still changing, so direct checkout is the faster revenue path.

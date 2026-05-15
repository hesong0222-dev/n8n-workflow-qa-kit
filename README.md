# The n8n Client Delivery Playbook

Date: 2026-05-14

This is a privacy-safe delivery system for freelancers, automation agencies, and internal operators who need to hand over n8n workflows with proof instead of hope.

The bundle combines a short practical ebook with importable workflow starters, QA checklists, and client handoff templates. The goal is simple: turn one messy automation into a client-ready QA packet in about 60 minutes without exposing credentials, customer data, private endpoints, or production logs.

## What Is Included

- `docs/ebook/n8n-client-delivery-playbook.md`: a public sample from the ebook/playbook.
- `docs/ebook/n8n-client-delivery-playbook.html`: browser-readable public sample.
- `workflows/qa-harness-manual.json`: an importable manual QA harness that seeds synthetic cases, validates required fields, and returns a structured pass/fail report.
- `workflows/error-handler-starter.json`: an importable Error Trigger starter workflow that normalizes production workflow failures into a compact incident payload.
- `workflows/async-job-queue-skeleton.json`: an importable webhook skeleton for production-style async jobs with request validation, synthetic job IDs, and webhook responses.
- `docs/qa-checklist.md`: a practical checklist for refactoring a messy workflow.
- `docs/import-and-test.md`: exact import and manual test steps.
- `docs/client-delivery-template.md`: a short handoff template for paid client work.
- `docs/sample-async-qa-report.md`: a synthetic example of the paid async QA review deliverable.
- `docs/html-seo-batch-qa-sample.md`: a public sample for paid HTML/SEO batch review projects.
- `docs/voice-agent-event-qa-sample.md`: a public sample for paid Vapi/Twilio/n8n voice-agent review projects.
- `PRODUCT_LISTING.md`: checkout-page copy for Payhip, Gumroad, or Ko-fi.
- `index.html`: a local sales page that can be adapted into a Payhip, Gumroad, Ko-fi, or static landing page.
- `scripts/validate-package.js`: local validation for package shape and privacy leaks.

The complete buyer bundle is delivered after payment or written acceptance. Do not publish the private buyer zip in this public repository.

## Privacy Boundary

The workflows use synthetic examples only. There are no credentials, customer names, API tokens, private endpoints, or real logs in this package.

## Suggested Price

Use a very low-friction ladder first. The current target is many small paid commitments, not one large sale:

- `$3`: Quick async risk note for one redacted workflow idea, screenshot, or brief.
- `$5`: Micro QA audit for one redacted Make/n8n/Zapier workflow brief.
- `$9`: Small repair map with failure paths, duplicate-risk notes, synthetic test payloads, and handoff notes.
- `₹299`: Public n8n Basket Lite listing for the manual QA harness: https://n8nbasket.com/workflow/8aa249d1-1b8f-42bc-bf04-77c77a5753c6
- `$49`: Playbook bundle, including ebook, workflow starters, checklist, and templates.
- `₹4,999`: Public n8n Basket listing for the importable QA harness JSON: https://n8nbasket.com/workflow/4af3e281-63fb-492b-b58e-4758f981a751
- `$19+`: Async review or agency overflow QA packet when a buyer already wants deeper workflow help.
- `$149`: Urgent 24-hour QA packet for one workflow brief, using redacted or synthetic data only.

## Sources Checked

- n8n exports workflows as JSON and warns that exported workflows may include credential names/IDs or authentication headers, so this kit deliberately avoids credentials and secrets.
- n8n Error Trigger workflows run for linked automatic workflow failures and receive structured execution/workflow error data.
- n8n templates are importable workflow examples; the creator marketplace is still changing, so direct checkout is the faster revenue path.

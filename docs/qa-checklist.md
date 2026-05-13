# n8n Workflow QA Checklist

Use this before publishing, handing off, or quoting a fix for a workflow.

## 1. Privacy And Secrets

- Remove credential names that reveal private systems or clients.
- Remove Authorization headers copied from cURL imports.
- Replace real emails, phone numbers, customer IDs, order IDs, and URLs with synthetic examples.
- Check every Code node for hardcoded API keys, tokens, passwords, cookies, and bearer strings.

## 2. Trigger And Input Contract

- Name the expected trigger: manual, webhook, schedule, app event, or sub-workflow.
- Write the minimum required input fields.
- Add a validation step before expensive API calls or AI calls.
- Keep one synthetic passing input and one synthetic failing input pinned or documented.

## 3. Branch Safety

- For every IF/Switch branch, record which branch is allowed to output zero items.
- Avoid joins that wait forever when one branch may not execute.
- Add fallback fields for optional nested properties.
- Keep branch names business-readable, not just "true" and "false."

## 4. Error Behavior

- Decide whether failures should stop the workflow or continue per item.
- Use an Error Trigger workflow for stop-the-world production failures.
- For per-item failures, use continue-on-fail style behavior and route failed items to an inline log branch.
- Include execution ID, workflow name, last node, and error message in the incident payload when available.

## 5. Refactor Boundaries

- Split reusable validation, enrichment, notification, and logging into sub-workflows when they are shared.
- Keep one workflow responsible for one business event.
- Avoid mixing intake, enrichment, billing, notification, and reporting in one long chain unless the transaction boundary truly requires it.

## 6. Delivery Evidence

- Export workflow JSON after final changes.
- Run at least one passing synthetic case and one failing synthetic case.
- Save screenshots or execution IDs if the buyer needs proof.
- Include known limitations and required credentials in the handoff.


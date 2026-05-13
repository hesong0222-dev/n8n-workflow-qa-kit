# Sample async n8n workflow QA report

This is a synthetic example of the paid async review deliverable. It does not include customer data, API keys, private logs, or real workflow exports.

## Scope

- Workflow type: lead intake webhook to CRM update and Slack alert
- Review input: exported n8n JSON with credentials removed
- Data used: synthetic webhook payloads only
- Review depth: first-pass handoff QA, not production incident response

## Executive summary

The workflow is close to shippable, but it has three handoff risks:

1. The webhook accepts missing `email` and `source` fields, which can create incomplete CRM records.
2. The Slack alert branch can fail without preserving the original payload for retry.
3. The workflow has no duplicate guard, so retrying the same webhook can create two CRM updates.

Recommended first fix: add a validation gate before the CRM node and persist a deterministic `request_id` before any external side effect.

## Synthetic test cases

| Case | Payload | Expected result | Current result | Status |
|---|---|---|---|---|
| `pass_basic_lead` | `email`, `name`, `source`, `request_id` present | CRM update + Slack alert | CRM update + Slack alert | Pass |
| `fail_missing_email` | `email` empty | Stop with validation error | CRM node receives blank email | Fail |
| `fail_missing_source` | `source` missing | Stop or default to `unknown` | Slack message omits source | Fail |
| `retry_same_request` | Same `request_id` twice | Second run is ignored or updates same record | Duplicate update possible | Fail |
| `slack_timeout` | Slack node returns timeout | Error handler preserves payload for retry | Payload context is partially lost | Fail |

## Workflow risks

### 1. Validation happens too late

The first external write happens before the workflow proves that the payload is complete. This makes bad input visible in the CRM and forces manual cleanup.

Suggested guard:

- Required fields: `email`, `source`, `request_id`
- Normalize `email` to lowercase before lookup
- Reject blank strings, not only missing keys
- Return a clear error object for failed validation

### 2. Idempotency is missing

The workflow needs one stable duplicate key before external writes. Without it, any retry from the sender or n8n execution replay can create duplicate updates.

Suggested key:

```text
request_id = sha256(source + ":" + email + ":" + submitted_at)
```

If the sender already provides a reliable event ID, use that instead.

### 3. Error branch loses context

The error handling branch should preserve:

- `request_id`
- original payload
- node name
- execution URL
- normalized error category
- suggested operator action

## Recommended patch plan

1. Add a `Set` or `Code` node immediately after the webhook to normalize payload fields.
2. Add an `IF` node or `Code` validation node before the CRM node.
3. Add a lookup by `request_id` before creating or updating the CRM record.
4. Add an Error Trigger workflow that writes a compact incident record.
5. Add two manual test payloads: one passing case and one failing validation case.

## Handoff checklist

- [ ] Workflow export has credentials removed before review.
- [ ] Passing synthetic case is recorded.
- [ ] Failing synthetic case is recorded.
- [ ] Duplicate/retry behavior is defined.
- [ ] Error handler preserves payload context.
- [ ] Client receives import steps, known limits, and rollback notes.

## Privacy boundary

For a real paid review, send only one of:

- exported n8n workflow JSON with credentials removed
- screenshots with secrets blurred
- a written workflow brief
- synthetic payload samples

Do not send API keys, customer records, private inbox exports, payment data, PHI, or production logs.

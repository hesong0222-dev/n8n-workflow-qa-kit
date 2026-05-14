# AgentBrains Early Customer Feedback Submission Packet

Date: 2026-05-14 KST

## Participant

- Name: WorkflowPatch
- Company / Agency: WorkflowPatch Demo Co
- Contact email: lost.gust.712@birchlogicdusk.com
- PayPal email: To be provided after eligibility review.
- Country: To be provided after eligibility review.

## Completed Deliverables

- Onboarded company: WorkflowPatch Demo Co.
- Knowledge Base: public n8n Workflow QA Kit website URL uploaded.
- Vector DB: completed successfully.
- Employee Tab agent: Workflow QA Assistant.
- Webhook: configured with a verified JSON endpoint.
- n8n workflow evidence screenshot: [workflow-evidence-20260514.png](workflow-evidence-20260514.png).
- n8n workflow evidence page: [workflow-evidence-20260514.html](workflow-evidence-20260514.html).

## Demo Data Boundary

This submission uses only public and synthetic data. It does not include customer records, credentials, private documents, PHI, payment data, phone numbers, production workflow exports, production logs, or real customer lead lists.

## Company And Knowledge Base

- Company name: WorkflowPatch Demo Co
- Website source: https://hesong0222-dev.github.io/n8n-workflow-qa-kit/
- Knowledge Base document: n8n Workflow QA Kit
- Use case: a privacy-safe QA assistant for n8n workflow handoff, credential-redaction checks, retry/idempotency review, synthetic payload design, and client-readable reports.

## Agent

- Name: Workflow QA Assistant
- Type: Custom Employee
- Purpose: answer workflow QA and handoff questions using synthetic/public docs, with emphasis on privacy boundaries, credential redaction, idempotency, retry handling, error states, and client-readable reports.
- Initial message: Hi, I am Workflow QA Assistant. Ask me about privacy-safe n8n workflow QA, test payloads, retries, idempotency, error handling, and client handoff reports.

## Webhook Verification

- URL: https://api.requex.me/hook/1662aa1e-4737-4101-bd17-8d4583c77edb
- Verification command: POST with JSON body.
- Result: HTTP 200.
- Content type: application/json.
- Response shape: a single `message` key.

## Feedback Notes

The onboarding path worked after creating an Agent builders account and adding a company manually. The Knowledge Base URL upload and vectorization completed successfully. The Employee creation flow clearly explained the webhook request and response contract.

Suggested improvements:

- Add a first-run checklist that shows the required reward deliverables in one place.
- Clarify whether demo companies are eligible for the feedback reward.
- Allow PayPal/country details to be collected after eligibility review, so applicants do not place payout details in early public or semi-public artifacts.
- Provide a downloadable sample n8n workflow that matches the Custom Employee webhook request/response contract.
- Surface a privacy reminder near Knowledge Base upload and workflow screenshot upload steps.

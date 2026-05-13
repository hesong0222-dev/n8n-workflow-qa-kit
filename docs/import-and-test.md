# Import And Test Guide

## Import

1. Open n8n.
2. Create a new workflow or open the workflow menu.
3. Use Import from File.
4. Import one JSON file from `workflows/`.
5. Review every node before activating anything.

## Test `qa-harness-manual.json`

1. Import the workflow.
2. Click Execute workflow.
3. Review the final `Build QA report` node output.
4. Expected result: one passing synthetic item and one failing synthetic item.

## Test `error-handler-starter.json`

1. Import the workflow.
2. Save it as `QA Kit - Error Handler Starter`.
3. In another automatic workflow, open Workflow Settings.
4. Set Error workflow to this imported workflow.
5. Trigger a controlled failure in the other workflow.
6. Review the normalized incident payload.

Note: n8n Error Trigger workflows run for automatic workflow failures. They are not the same as manual test executions.

## Test `async-job-queue-skeleton.json`

1. Import the workflow.
2. Open the Webhook trigger node.
3. Copy the test URL.
4. Send a JSON request with `requestId`, `taskType`, and `payload`.
5. Expected result: a response containing `accepted: true`, a synthetic `jobId`, and a `next` instruction.

Example request:

```json
{
  "requestId": "req_demo_001",
  "taskType": "summarize_ticket",
  "payload": {
    "ticketId": "TICKET-123",
    "text": "Synthetic customer note for QA testing."
  }
}
```

## Before Client Delivery

Run:

```bash
node scripts/validate-package.js
```

The validator checks JSON shape and scans for obvious credential leaks.


# Voice Agent Event QA Sample

Version: 2026-05-14

This is a public sample for paid reviews of Vapi, Twilio, n8n, and CRM voice-agent projects. It is designed for the first review pass before anyone shares API keys, phone numbers, CRM records, transcripts, recordings, or production lead lists.

## Fixed-Scope Review Offer

- `$79`: async design/QA review from written requirements, event examples, or screenshots.
- `$149`: urgent 24-hour implementation packet with event contracts, payload examples, failure states, and an acceptance checklist.

## Goal

Turn a voice-agent idea into a testable delivery packet:

- event contract
- lead intake shape
- scoring schema
- CRM logging payload
- failure and retry rules
- human handoff decision points
- launch acceptance checklist

## Event Contract

```json
{
  "eventType": "call.completed",
  "callId": "call-demo-001",
  "leadId": "lead-demo-001",
  "startedAt": "2026-05-14T12:00:00Z",
  "endedAt": "2026-05-14T12:04:22Z",
  "recordingUrl": "redacted",
  "transcriptUrl": "redacted",
  "outcome": "qualified",
  "score": 92,
  "nextAction": "book_meeting"
}
```

## Lead Intake Contract

```json
{
  "leadId": "lead-demo-001",
  "name": "Demo Lead",
  "company": "Demo Company",
  "phone": "+10000000000",
  "timezone": "America/New_York",
  "context": "Requested office-space quote",
  "doNotCall": false,
  "allowedCallWindow": {
    "days": ["monday", "tuesday", "wednesday", "thursday", "friday"],
    "start": "09:00",
    "end": "17:00"
  }
}
```

Use synthetic phone numbers in tests. Production phone numbers should not enter a review packet unless there is a paid engagement and a privacy boundary.

## Scoring Schema

```json
{
  "budgetMentioned": true,
  "budgetRange": "5000-10000",
  "timeline": "this_month",
  "officeSize": "10-25",
  "decisionMaker": true,
  "confidence": 0.86,
  "score": 92,
  "reason": "Budget, timeline, and decision authority all present"
}
```

## n8n Flow Shape

```text
CSV or CRM lead intake
  -> validate call window and do-not-call flag
  -> create Vapi/Twilio outbound call request
  -> receive voice-agent event webhook
  -> normalize transcript/outcome payload
  -> score lead
  -> branch:
       hot lead -> alert + meeting booking
       unclear -> manual review
       disqualified -> CRM note only
  -> log call outcome, score, transcript link, and recording link to CRM
```

## Failure States

| Failure | Expected behavior |
| --- | --- |
| Lead missing phone number | Do not call; mark `needs_data` |
| Outside call window | Queue until next allowed window |
| Vapi/Twilio call creation fails | Retry with backoff, then alert owner |
| Webhook event missing call ID | Reject event and log reason |
| CRM update fails | Store pending CRM update and retry |
| Score below threshold | Do not book meeting automatically |
| Handoff requested but no human available | Notify owner and end call safely |

## Human Handoff Decision

```text
Trigger handoff only when:
- score >= threshold
- caller asks for a human
- compliance/sensitive question appears
- booking flow fails after retry
- agent confidence is below threshold but the lead is high-value
```

## Acceptance Checklist

- Lead intake rejects missing or invalid phone fields.
- Call windows prevent accidental off-hours calls.
- Every Vapi/Twilio event maps to one normalized event type.
- Hot lead scoring is deterministic enough to audit.
- CRM writes are idempotent by `callId` or `leadId + eventType`.
- Transcript and recording URLs are stored as links, not copied into public logs.
- Failed CRM writes do not lose the call outcome.
- Human handoff has a clear fallback if no one answers.
- The workflow can be tested with synthetic leads before production launch.

## Buyer Handoff

The useful first deliverable is a voice-agent implementation packet, not a vague promise:

- event examples
- n8n branch map
- CRM payload contract
- failure-state table
- handoff decision rules
- launch acceptance checklist

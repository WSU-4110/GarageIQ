# GarageIQ — Sprint 2 Scrum Meeting Summaries

**Course:** CSC 4110 — Software Engineering Lab, Section 003  
**Team:** Yahya Alhawati (lead), Ammar Deno, Faiyad Chowdhury, Mohamed Hamidat  
**Weekly check-in slot:** Mondays, 4:00 PM (October 26; November 2, 9, and 16, 2026)  
**Communication:** iMessage / Microsoft Teams (confirm the channel used for each meeting)

> **Record status — team verification required.** The four entries below are **reconstructed draft summaries** based on the team's Sprint 2 plan and subsequent GitHub work. They are **not verified minutes**: GitHub activity does not establish that a meeting occurred at 4:00 PM, who attended, or what was said. Confirm each meeting with your actual messages/calendar and edit the attendance, outcomes, blockers and dates before submitting this file as a meeting record.

## Sprint objective and workload baseline

Deliver an integrated modification recommender, performance shop finder, modification-aware maintenance, and frontend improvements that can be demonstrated end to end.

| Owner | Planned subtask A | Hours | Planned subtask B | Hours | Total |
|---|---|---:|---|---:|---:|
| Ammar Deno | Improve mod recommendation logic | 10 | Extend RAG data, compatibility and tests | 8 | 18 |
| Mohamed Hamidat | Shop search and location/service filtering | 10 | Shop details, frontend integration and error handling | 6 | 16 |
| Yahya Alhawati | Modification-to-maintenance rules and intervals | 10 | Reminders, one-time checks, frontend and tests | 6 | 16 |
| Faiyad Chowdhury | Integrate advisor and maintenance UI | 10 | UI quality, bug fixes and unit tests | 8 | 18 |
| **Sprint 2 planned new work** | | | | | **68** |

Sprint 1 retrospective records **7 remaining person-hours** carried forward. If these are included as Sprint 2 scope, the combined planning baseline becomes **75 person-hours**. Estimates are planning values, **not verified hours worked** or historically recorded burndown values.

---

## Meeting 1 — Monday, October 26, 2026 · 4:00 PM

**Status:** Draft agenda / reconstructed progress summary — verify meeting, attendees and decisions.  
**Attendees:** To confirm from actual team discussion.  
**Focus:** Sprint 2 kickoff and work ownership.

| Member | Work available / completed before this week | Next planned work | Possible blocker to confirm |
|---|---|---|---|
| Yahya | Sprint 1 vehicle and maintenance functionality available | Define installed-modification impact rules and interval behavior; coordinate issue ownership | Reuse existing reminder logic without overwriting users' schedules |
| Ammar | Baseline recommendation system available | Plan broader recommendation datasets and compatibility testing | Limited vehicle and parts coverage |
| Mohamed | Shop finder scoped but not yet live | Define location, specialty and results requirements | Search provider integration and credentials |
| Faiyad | Shared React UI and maintenance workflows exist | Identify integration tasks, navigation and test gaps | Cross-feature frontend/backend dependencies |

**Proposed next actions (confirm):** Split four major deliverables into two smaller tasks each; assign GitHub issues; track estimated hours remaining; require peer review before merge.  
**Evidence to reconcile:** [Sprint 1 retrospective](./retrospective-sprint-1.md).  
**Actual attendance, decisions, and hours remaining:** **Not independently verified.**

## Meeting 2 — Monday, November 2, 2026 · 4:00 PM

**Status:** Draft agenda / reconstructed progress summary — verify meeting, attendees and decisions.  
**Attendees:** To confirm.  
**Focus:** Rule definitions and feature implementation.

| Member | Progress topic to verify | Next planned work | Possible blocker to confirm |
|---|---|---|---|
| Yahya | Maintenance impact rule design and supported modification families | Build rule matching for installed mods and define interval override safeguards | Avoid unsupported automatic service intervals |
| Ammar | Recommendation quality, data organization and compatibility approach | Improve recommendation relevance and prepare retrieval testing | Missing vehicle-specific reference data |
| Mohamed | Shop search design and location/service inputs | Implement shop provider integration and filtering | External API setup |
| Faiyad | Frontend architecture and integration points | Connect new results to React views and add loading/error behavior | Backend and UI readiness may differ |

**Proposed next actions (confirm):** Create reviewable implementation branches, agree on request/response contracts, and add unit tests as features land.  
**GitHub evidence note:** These are planning topics, not claims that code was already merged on November 2.  
**Actual attendance, decisions, and hours remaining:** **Not independently verified.**

## Meeting 3 — Monday, November 9, 2026 · 4:00 PM

**Status:** Draft agenda / reconstructed progress summary — verify meeting, attendees and decisions.  
**Attendees:** To confirm.  
**Focus:** Integration, UML/design patterns and test preparation.

| Member | Progress topic to verify | Next planned work | Possible blocker to confirm |
|---|---|---|---|
| Yahya | Existing vehicle data flow and reminder behavior | Connect modification rules to effective reminders, dashboard, and persistence | Per-vehicle isolation and preserving original intervals |
| Ammar | Advisor improvements in progress | Validate supporting-mod compatibility, expand RAG inputs and test retrieval | Recommender relevance for unsupported vehicles |
| Mohamed | Shop finder backend and UI work in progress | Check shop result fields, provider handling and deployment integration | Production API route and provider configuration |
| Faiyad | Maintenance calculations and advisor frontend | Finalize Strategy-based reminders, integrated advisor page and unit tests | Merge coordination and UI regression risk |

**Next actions proposed for verification:** Integrate code through short PRs, review cross-feature changes, and prepare a demo path for each owner.  
**Subsequent supporting PRs (not evidence that they existed during this meeting):** [#62](https://github.com/WSU-4110/GarageIQ/pull/62), [#63](https://github.com/WSU-4110/GarageIQ/pull/63), [#64](https://github.com/WSU-4110/GarageIQ/pull/64), [#65](https://github.com/WSU-4110/GarageIQ/pull/65).  
**Actual attendance, decisions, and hours remaining:** **Not independently verified.**

## Meeting 4 — Monday, November 16, 2026 · 4:00 PM

**Status:** Draft agenda / reconstructed progress summary — verify meeting, attendees and decisions.  
**Attendees:** To confirm.  
**Focus:** Final Sprint 2 integration and Presentation 3 readiness.

| Member | Progress topic to verify | Next planned work | Possible blocker to confirm |
|---|---|---|---|
| Yahya | Maintenance rule engine and mod-specific reminder UI | Finish interval linking, check completion/ignore controls, tests and integration | Browser behavior and duplicate panel regression |
| Ammar | Advisor integration and additional data | Complete hybrid retrieval improvements, data changes and validation | Data coverage and deploy testing |
| Mohamed | Shop discovery integration | Complete shop filter/results, test hosted backend connection | Google Places configuration and route deployment |
| Faiyad | Advisor UI and reminder tests | Finish test improvements, integration and frontend polish | End-to-end regressions and merging |

**Proposed next actions (confirm):** Require teammate approvals, finalize UML/pattern evidence, upload the Sprint 2 workbook, and rehearse the November 19 demo.  
**Later GitHub outcomes (not claimed as completed by this meeting):** [Maintenance tests #71](https://github.com/WSU-4110/GarageIQ/pull/71), [FR13 #72](https://github.com/WSU-4110/GarageIQ/pull/72), [RAG #73](https://github.com/WSU-4110/GarageIQ/pull/73), [Shop finder #76](https://github.com/WSU-4110/GarageIQ/pull/76), [Shop finder deployment issue #77](https://github.com/WSU-4110/GarageIQ/issues/77).  
**Actual attendance, decisions, and hours remaining:** **Not independently verified.**

---

## Evidence and follow-up

- The actual GitHub issue/PR dates and approvals should be used to verify technical delivery; they do **not** establish who attended a meeting.
- For the course staff, summarize each real stand-up in this order: **done, next, blocked**, and note a responsible owner for each unresolved blocker.
- Update the workbook's **remaining-hours** estimates from team records. Do not equate a merged PR with a particular number of hours spent.
- Record the Sprint 2 retrospective **after it takes place**, in a separate `docs/retrospective-sprint-2.md`; this package intentionally includes **no retrospective template**.

## UML diagrams included with this documentation package

- [GarageIQ system use case diagram](uml/garageiq-use-case-diagram.png)
- [FR13 modification-aware maintenance class diagram](uml/garageiq-modification-aware-maintenance-class-diagram.png)

The first is a **use case** diagram (not an activity diagram); the second is a **class** diagram.

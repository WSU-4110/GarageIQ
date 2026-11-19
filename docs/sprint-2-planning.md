# GarageIQ — Sprint 2 Planning Summary

**Course:** CSC 4110 Software Engineering Lab · Section 003  
**Sprint 2 review:** Thursday, November 19, 2026  
**Sprint interval represented:** October 23 – November 18, 2026 (presentation workbook period)

## Sprint goal

Integrate useful vehicle-specific modification recommendations, maintenance adjustments, and performance-shop discovery into the existing GarageIQ frontend; maintain a reproducible issue/PR review process and demonstrate these improvements together at Presentation 3.

## Agreed feature ownership

The four feature areas below follow the assignments documented in [Sprint 1 retrospective](retrospective-sprint-1.md). These were planning responsibilities, not all-inclusive descriptions of each individual's actual code changes.

| Feature / lead | Planned outcome | Traceable GitHub evidence |
|---|---|---|
| **Ammar Deno — Mod recommendation system** | Improve recommendation retrieval, supporting-mod data, and integration with the advisor | [PR #73](https://github.com/WSU-4110/GarageIQ/pull/73), [#74](https://github.com/WSU-4110/GarageIQ/pull/74), [#75](https://github.com/WSU-4110/GarageIQ/pull/75); [Task #58](https://github.com/WSU-4110/GarageIQ/issues/58) |
| **Mohamed Hamidat — Shop finder** | Search automotive/performance shops by location and service; display results; support specialization preference | [PR #76](https://github.com/WSU-4110/GarageIQ/pull/76); [FR14–16](https://github.com/WSU-4110/GarageIQ/issues/14) |
| **Faiyad Chowdhury — Frontend and maintenance integration** | Integrate screens, improve navigation/UX, implement maintenance recommendations, and test | [PR #64](https://github.com/WSU-4110/GarageIQ/pull/64), [#69](https://github.com/WSU-4110/GarageIQ/pull/69), [#71](https://github.com/WSU-4110/GarageIQ/pull/71) |
| **Yahya Alhawati — Modification-aware maintenance; team lead** | Derive inspection checks from installed mods, allow user-selected interval changes and reminder workflows, support cross-feature integration | [PR #72](https://github.com/WSU-4110/GarageIQ/pull/72), [FR13 #13](https://github.com/WSU-4110/GarageIQ/issues/13) |

## Scope and acceptance

1. Recommendation flow accepts an identified vehicle and modification intent; returns grounded supporting-mod advice or a clear fallback.
2. Maintenance features preserve the original reminder, activate a user-approved modified interval only with matching installed mods, support one-time checks and hide/restore operations, and keep vehicles separate.
3. Shop finder searches real listings through a backend service and displays an error when the third-party provider or configuration is unavailable.
4. Users can navigate to and use the new features within the React application; build, lint, and applicable tests pass.
5. PRs link to an issue and are reviewed by another teammate before merge; progress is reflected in the workbooks and Scrum summaries.

## Initial effort and carryover

The Sprint 1 retrospective proposed the following **planning estimates** (not actual hours): Ammar **18 h**, Mohamed **16 h**, Yahya **16 h**, Faiyad **18 h**, totaling **68 h** for the four major tasks. The submitted Sprint 1 workbook had **7 h remaining**; those hours must be reconciled with Sprint 2 capacity and tracked without double counting. The Sprint 2 burndown workbook is the authoritative place for the team's confirmed day-by-day remaining-hour estimates.

Do **not** portray an unverified smooth burndown or later-created GitHub issues as proof that daily stand-ups occurred on earlier dates.

## Task decomposition and review flow

- Break each major deliverable into small issues: rule/data work, backend contract, frontend integration, error handling, tests and documentation where appropriate.
- Record one responsible owner, estimate, acceptance checklist, and due/check-in date per task.
- Create a fresh issue branch from `main`; open a PR for focused changes; require a teammate to submit a GitHub approval before merging.
- Update the PR/issue tracker with real reviewer and submission times, and update burndown with actual *remaining work* after each check-in.
- Keep Sprint 3 or stretch features (e.g., document uploads and broader wishlist work) separate from Sprint 2 commitments unless the team explicitly changes scope.

## Dependencies and known risks

- Firebase Authentication/Firestore are used by the frontend; backend FastAPI uses authorized cloud credentials.
- Shop finder depends on a deployed API and server-side Places key; the team encountered and resolved deployment/API-configuration issues during integration.
- Changes to React navigation, shared vehicle data, and maintenance components can overlap; review merge conflicts and rerun tests after each integration.
- Workshop/presentation proof: deployed `main`, diagrams, code-level pattern evidence, an actual burndown, and GitHub PR approvals.

## Decision and date provenance

- Original Sprint 2 ownership and 68-hour proposal: recorded in the existing Sprint 1 retrospective.
- PR and issue links: verified GitHub records as of November 18, 2026.
- **Planning meeting date, attendance and exact member-confirmed commitments were not provided**. Add them only after checking the team's Teams/iMessage record or original notes.

# GarageIQ — Product Backlog

**CSC 4110 · Section 003**  
**Repository:** https://github.com/WSU-4110/GarageIQ  
**Snapshot:** November 18, 2026. Status is taken from GitHub issues at the time this document was prepared; GitHub is the authoritative live backlog.

## Product goal and priorities

GarageIQ helps enthusiasts manage vehicle profiles, installed modifications, maintenance history, supporting-modification recommendations, and performance-shop discovery in one application. Items below are grouped by value and dependencies rather than implying that every initial requirement is fully delivered in the same release.

| Priority | Requirement / issue | Deliverable / acceptance focus | GitHub status at snapshot |
|---|---|---|---|
| P0 | [FR1 #1](https://github.com/WSU-4110/GarageIQ/issues/1) | User registration and sign-in | Closed |
| P0 | [FR2 #2](https://github.com/WSU-4110/GarageIQ/issues/2), [FR3 #3](https://github.com/WSU-4110/GarageIQ/issues/3) | Create and manage a vehicle profile | Closed |
| P0 | [FR4 #4](https://github.com/WSU-4110/GarageIQ/issues/4), [FR5 #5](https://github.com/WSU-4110/GarageIQ/issues/5), [FR6 #6](https://github.com/WSU-4110/GarageIQ/issues/6) | Build sheet, installed mods, categories | Closed |
| P0 | [FR7 #7](https://github.com/WSU-4110/GarageIQ/issues/7), [FR8 #8](https://github.com/WSU-4110/GarageIQ/issues/8) | Maintenance logging and history | Closed |
| P1 | [FR9 #9](https://github.com/WSU-4110/GarageIQ/issues/9) | Upcoming maintenance reminders | Closed |
| P1 | [FR13 #13](https://github.com/WSU-4110/GarageIQ/issues/13) | Modification-aware checks and user-approved interval adjustments | Closed · [PR #72](https://github.com/WSU-4110/GarageIQ/pull/72) |
| P1 | [FR11 #11](https://github.com/WSU-4110/GarageIQ/issues/11), [FR12 #12](https://github.com/WSU-4110/GarageIQ/issues/12), [Task #58](https://github.com/WSU-4110/GarageIQ/issues/58), [NFR #59](https://github.com/WSU-4110/GarageIQ/issues/59) | Compatibility, supporting mods, recommender integration and data | Closed; PRs #73–75 and #69 provide additional evidence |
| P1 | [FR14 #14](https://github.com/WSU-4110/GarageIQ/issues/14)–[FR16 #16](https://github.com/WSU-4110/GarageIQ/issues/16) | Shop search, filtering, details | Closed · [PR #76](https://github.com/WSU-4110/GarageIQ/pull/76) |
| P1 | [FR18 #18](https://github.com/WSU-4110/GarageIQ/issues/18) | Vehicle dashboard summary | Closed |
| P2 | [FR10 #10](https://github.com/WSU-4110/GarageIQ/issues/10) | Future build wishlist and planner | **Open** |
| P2 | [FR17 #17](https://github.com/WSU-4110/GarageIQ/issues/17) | Upload/link vehicle documents and receipts | **Open** |
| Cross-cutting | [NFR1 #19](https://github.com/WSU-4110/GarageIQ/issues/19)–[NFR6 #25](https://github.com/WSU-4110/GarageIQ/issues/25) | Performance, security, privacy, accessibility, reliability, maintainability | **Open** |

## Definitions of ready and done

**Ready:** A short title, named owner, acceptance criteria, estimate, dependencies, and relevant GitHub issue. Large requirements should be broken into reviewable tasks.

**Done:** Implemented and manually checked; relevant automated tests/build pass; code merged into `main` after **a different teammate's submitted GitHub review**; issues and workbook/PR tracker updated. Closing an issue in GitHub is evidence of workflow status, not proof that every possible use case was tested.

## Sprint placement and dependencies

- **Sprint 1 (completed demo Oct 22):** authentication, vehicles, build sheets, maintenance logs, basic UI.
- **Sprint 2 (review Nov 19):** modification advisor, mod-based maintenance, shop finder, integration and tests. Work is traced to PRs and issue closure dates.
- **Sprint 3 planning:** unfinished wishlist/document features, cross-cutting NFRs, broader supported platforms, reliability, and documentation improvements.

## Risks and backlog grooming

- Keep server-side Google Places credentials outside the frontend; live shop search depends on backend configuration.
- Avoid asserting manufacturer-recommended maintenance intervals when GarageIQ only supplies inspection guidance or user-selected intervals.
- Track edge cases: unsupported vehicles/mods, missing service histories, incomplete recommendations, authorization failures, and API errors.
- Some broad/old requirement issues were closed in batches; add smaller follow-ups with owners and dates when additional work is identified.

> **Planning note:** Backlog priorities above are a suggested ordering for documentation and should be confirmed by the team. Dates/statuses are a GitHub snapshot, not a reconstruction of earlier daily stand-ups.

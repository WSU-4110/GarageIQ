# GarageIQ — Sprint 1 Retrospective



**CSC 4110 — Section 003 | Sprint 1 demo: October 22, 2026**





## 1. Date and Attendance



- **Retrospective meeting date:** 10/24/2026

- **Attendance:** Yahya Alhawati, Ammar Deno, Faiyad Chowdhury, Mohamed Hamidat

- **Sprint 1 presentation:** October 22, 2026

- **Sprint 1 result:** 50/50 suggested final score (staff 50/50; class median 50/50).

- **Submitted Sprint 1 workbook:** 12 task rows, 96 estimated person-hours committed, 7 hours remaining at the end. The issue tracker contained 16 PR entries and no recorded approvals in that workbook. Staff observed one approval among 23 GitHub PRs at review time.



Our sprint delivered a working GarageIQ foundation: authentication and Firebase data storage, vehicle profiles, build/modification management, maintenance logs, and a functional frontend. The recommendation feature advanced but still needed more complete integration. We agreed to organize Sprint 2 around one major deliverable per member, with the team lead assisting across workstreams.



## 2. Start / Stop / Continue



### Start

- **Start** holding short working-day check-ins in Microsoft Teams, noting progress, blockers, and updated remaining-hour estimates.

- **Start** assigning each Sprint 2 issue to its feature owner with a specific acceptance checklist before coding.

- **Start** recording a teammate's **Approve** review on each pull request before merging and using `Closes #n` when a PR fully resolves an issue.

- **Start** testing each feature through a complete UI-to-data flow, including browser refresh and failure cases.



### Stop

- **Stop** merging changes without a recorded PR approval or clear link to an issue.

- **Stop** waiting until the presentation week to update burndown values and reconcile GitHub records.

- **Stop** presenting a prototype recommendation or search result as fully implemented before backend integration is tested.



### Continue

- **Continue** demonstrating actual working features with realistic vehicle and maintenance examples.

- **Continue** maintaining a shared repository with feature branches and focused pull requests.

- **Continue** building on Firebase-backed, vehicle-specific data and the existing React UI.

- **Continue** helping teammates debug and integrate across frontend and backend boundaries.



## 3. Two Sprint 2 Actions We Will Follow Up On



\| Action | Owner | Checkable outcome |

\|---|---|---|

\| **A. Make issue ownership and PR reviews traceable.** Give every Sprint 2 issue an assignee and acceptance criteria; require a separate teammate to submit a GitHub approval before merging; update the issue/PR tracker and remaining-hours workbook regularly. | **Yahya Alhawati** (coordination; all members participate) | At Presentation 3, every completed major feature has linked issues, assigned owners, PRs, approval evidence, and a dated burndown history. |

\| **B. Integrate Sprint 2 features continuously, not all at the end.** Pair each backend milestone with a React UI connection, supported-vehicle tests, and an error/fallback state. | **Faiyad Chowdhury** (frontend integration), with Ammar, Mohamed, and Yahya | At Presentation 3, all delivered features can be exercised end-to-end in the application; unfinished pieces are explicitly marked rather than hidden. |



**Team leadership:** Yahya owns modification-aware maintenance logic and, as team lead, will also monitor all four workstreams, assist with troubleshooting and code integration as needed, review status, and help remove blockers. This support does not replace each member's responsibility for their own deliverable.



## 4. Presentation 2 Feedback and Our Response



**Outcome:** The published evaluation lists GarageIQ's suggested final score as **50.00/50**. The teaching staff praised the live demo while identifying process and recommendation improvements.



**Staff feedback — MP:**

> “Some concerns about the mod search but it looks like the team is on the correct path.”



**Our Sprint 2 response:** Ammar will finish the modification recommendation engine, connect it to the frontend with Faiyad, and test realistic inputs, unsupported vehicles, and API errors. We will distinguish actual recommendations from placeholder results.



**Staff feedback — MP:**

> “I suggest moving to Microsoft teams for discussions so I also can be involved.”



**Our Sprint 2 response:** We will use the course-accessible Microsoft Teams discussion for check-ins, blockers, and decisions so the professor and TA can follow our progress.



**Staff feedback — AT:**

> “only 1 of your 23 PRs has an approval recorded in GitHub”



**Our Sprint 2 response:** Require a teammate's submitted approval before merging, retain reviewer details in the PR tracker, and consider branch protection if repository permissions allow it.



**Staff feedback — AT:**

> “29 of the 33 issues were created by one person and only 6 are assigned”



**Our Sprint 2 response:** Split issue creation and maintenance among the four feature owners, assign each issue, and reference `Closes #n` in PR descriptions when the associated requirement is complete.



**Class feedback:**

> “I could not tell whether the build information was being permanently saved and would still be available after closing and reopening the application.”



**Our Sprint 2 response:** Include save → refresh → sign-out/sign-in checks in acceptance testing, using different vehicles and accounts to verify persistence and isolation.



**Class feedback — email verification:**
> “The email verification process needs to be fixed because new users are unable to verify their email addresses after registration.”

**Clarification and response:** Email verification is implemented and functional. During our live demo, the verification email/process was slower than expected, which made it appear that it was not working. We will test delivery speed and user-facing feedback, such as an informative waiting message and the option to resend a verification email, so delays are less confusing. We will also demonstrate successful verification end to end in the next review.

**Burndown / repository lesson:** The **submitted** Sprint 1 workbook showed **96 hours planned and 7 remaining**, rather than zero. Our Sprint 2 workbook will track remaining estimates as work evolves, including increases when scope is underestimated, and avoid making the chart look artificially smooth. The submitted PR tracker had blank approval cells; GitHub approvals and merge events must be verified separately.



## 5. Sprint 2 Backlog — Ordered and Sized



We propose **four major task groups**, one per team member. They are ordered by integration dependencies, not by team member importance. Estimates are planning values to be confirmed by the team and copied into the Sprint 2 workbook; they are **not actual hours worked**.



\| Priority | Major task / owner | Estimated person-hours | Scope and definition of done |

\|---:|---|---:|---|

\| 1 | **Modification Recommendation Engine — Ammar Deno** | **18** | Finish recommender logic and backend/API integration; provide meaningful supporting-mod suggestions for supported vehicles, tested outputs, and graceful handling of unsupported data/errors. Related: [FR12 #12](https://github.com/WSU-4110/GarageIQ/issues/12) (verify existing closed-issue scope before reopening or creating a follow-up). |

\| 2 | **Shop Finder and Recommendation System — Mohamed Hamidat** | **16** | Find relevant nearby automotive/performance shops by location; display shop information and basic brand/service relevance; integrate with the app. Related: [FR14 #14](https://github.com/WSU-4110/GarageIQ/issues/14), [FR15 #15](https://github.com/WSU-4110/GarageIQ/issues/15), [FR16 #16](https://github.com/WSU-4110/GarageIQ/issues/16). |

\| 3 | **Modification-Based Maintenance Interval Adjustments — Yahya Alhawati** | **16** | Detect relevant installed modifications and recommend corresponding maintenance interval changes, explain why intervals change, preserve user overrides, and test with multiple vehicles. Related: [FR13 #13](https://github.com/WSU-4110/GarageIQ/issues/13). |

\| 4 | **Frontend Integration, UI Improvements and Bug Fixes — Faiyad Chowdhury** | **18** | Integrate the recommender, shop finder, and modified maintenance guidance into React; refine navigation and responsiveness; handle loading, empty/error states; test end-to-end usability. Related: [NFR4 #23](https://github.com/WSU-4110/GarageIQ/issues/23) and new integration/bug issues as needed. |

\| | **Total proposed Sprint 2 effort** | **68** | |



### Integration Plan and Ownership



- **Ammar** owns recommender behavior and the recommendation API; **Faiyad** handles its user-facing integration.

- **Mohamed** owns shop discovery and recommendation logic; **Faiyad** integrates the shop-search experience.

- **Yahya** owns the modification-aware maintenance rules and supports integration and troubleshooting across all three feature tracks.

- **Faiyad** owns common UI consistency, navigation, responsiveness, and frontend defect fixes.

- Each owner will create or update GitHub Sprint 2 issues, assign the appropriate owner, and break their major deliverable into reviewable PRs. Existing requirement issues will be reused where appropriate, and follow-up issues created where a closed issue no longer describes the remaining work.



### Carryover and Scope Notes



- Sprint 1's **7 remaining estimated hours** are acknowledged as unfinished effort and should be reconciled with the new Sprint 2 estimates rather than simply erased.

- Email verification **speed and user feedback** (the feature already works), security/data persistence checks, and review-workflow improvements remain explicit acceptance/quality tasks within the major workstreams; any unexpectedly large effort should be re-estimated in the Sprint 2 workbook.

- Wishlist/future build planning and advanced compatibility features are **not part of the four committed major Sprint 2 tasks** unless the team agrees to change scope.

- For Presentation 3, the team will show the four major deliverables, a dated burndown, assigned GitHub issues, and peer-approved PRs.



---



**GitHub submission:** Save this file as `docs/retrospective-sprint-1.md` on the team repository and submit its direct GitHub link in Canvas. Peer Review 1 is a separate individual submission.


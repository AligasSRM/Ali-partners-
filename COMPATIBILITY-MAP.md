# ALI PARTNER — Final Compatibility Map & Product Specification

**Status:** 🟢 Approved baseline / 🔒 architecture locked  
**Scope:** Product architecture and project-continuity controls for Sections 01–20  
**Purpose:** Establish one stable product contract so implementation can proceed section by section without repeatedly redesigning the architecture.

## 1. Decision and change-control rule

This document is the architecture baseline for future implementation. Do not reopen settled decisions during ordinary feature work. Revisit this map only if one of these occurs:
1. A verified defect or dependency conflict makes the architecture unworkable.
2. A material legal, privacy, security, payment-provider, or partner-program requirement changes.
3. Real customer/partner evidence requires a documented product-scope change.
4. The project owner explicitly approves a change.

Any approved change must update this file, affected section contracts, and tests in the same change. Do not silently change scope or mark unimplemented capabilities GREEN.

## 2. Product layers

ALI PARTNER has four product layers plus a cross-cutting project-continuity function:

1. **Discovery & trust (Sections 01–09):** Help visitors discover, evaluate, and assess business products, services, companies, offers, and verification claims.
2. **Content & acquisition (Sections 10–11):** Educate visitors and provide useful free tools that bring relevant traffic into discovery.
3. **Partner & workspace operations (Sections 12–16):** Onboard companies, manage partner relationships, support user/company workspaces, and report attributable performance.
4. **Business operating suite and infrastructure (Sections 19, 17–18):** Add integrated business tools only after demand and workspace foundations are proven; add payouts and external integrations behind security and commercial gates.

**Section 20 is a project-operations function, not a customer-facing product layer.** It records the real state of the repository, decisions, verified work, blockers, remaining tasks, and the next-session objective so work can stop safely and resume later.

## 3. Canonical section map (20 sections)

| ID | Section | Responsibility / boundary | Key dependencies |
|---|---|---|---|
| 01 | Home | Canonical public landing page: positioning, featured categories/products/offers, and primary calls to action. The canonical file is `site/index.html`; `site/sections/01-home/index.html` must not become a competing second homepage. | Sections 02, 03, 08, 10, 11, 12, 13 |
| 02 | Business Marketplace | Browse published products/services from eligible participating companies. | 03, 04, 05; shared catalog |
| 03 | Categories | Taxonomy and category landing/filter definitions. | Shared catalog; 02, 06 |
| 04 | Product Pages | Canonical product/service detail, features, pricing references, terms, links, offer relationships, and trust status. | 02, 05, 08, 09; shared catalog |
| 05 | Company Pages | Public company profile, ownership of listings, contact/partner information, and published verification state. | 04, 09, 12, 15 |
| 06 | Search | Search the same published catalog and taxonomy used by marketplace pages; support filters and empty/error states. | 02, 03, 04, 05; shared catalog |
| 07 | Compare | Compare a bounded set of compatible products/services using normalized attributes; never invent missing values. | 04, 06; shared catalog |
| 08 | ALI Deals | Publish time-bounded offers with source, eligibility, terms, and expiration status. | 04, 05, 09, 12, 13 |
| 09 | ALI Verified | Explain and record exactly what was checked, by whom/which process, when, evidence status, and expiry/review state. A badge alone is not verification. | 05, 12, 15; audit trail |
| 10 | Learn / Academy | Guides, tutorials, learning paths, and educational content. Keep editorial claims sourced and dated where needed. | 01; links to relevant 02–11 pages |
| 11 | Free Business Tools | Small, clearly scoped calculators/generators/checklists. State assumptions; do not represent estimates as official financial or legal advice. | 01, 10; optionally 19 later |
| 12 | Partner With ALI | Public company/partner application, requirements, consent, submission, and review status. Submission does not mean acceptance. | 05, 08, 09, 13, 15 |
| 13 | ALI Partner Network | Partner directory and relationship/campaign discovery. Separate a partner listing from an approved affiliate/referral/reseller agreement. | 05, 08, 12, 15, 16 |
| 14 | User Dashboard | Authenticated user area: profile, saved items, comparisons, preferences, and activity. | Identity/access control; 04, 06, 07 |
| 15 | Company Dashboard | Authenticated company workspace: company profile, listing drafts/publishing, offers, verification requests, and authorized analytics. Tenant isolation is mandatory. | Identity/access control; 04, 05, 08, 09, 12, 13 |
| 16 | Commission / Earnings | Auditable referral attribution, conversion status, commission rules/versions, disputes, and earned/approved/payable states. | 12, 13, 15; event ledger; verified partner terms |
| 17 | Wallet / Payouts | Financial ledger views, payout eligibility, methods, approval controls, reconciliation, and statements. Not a bank account or stored-value product by default. | 16; payment provider and legal/compliance review |
| 18 | API / Reseller / White-label | Versioned external interfaces, access scopes, rate limits, reseller contracts, tenant boundaries, and white-label configuration. | Stable domain contracts; security review; 15 and/or 19 |
| 19 | ALI Business Studio | Future integrated business-tool workspace: website/landing-page builder, funnels, email marketing, CRM/pipelines, automation, booking calendar, courses/memberships, webinars, community, store, affiliate management, templates, blog/content/SEO, and sub-accounts/workspaces. Deliver these as modules, not one giant release. | Identity/access control; 15; permissions, tenant model, audit logs, and module-specific data contracts |
| 20 | Project Notes & Handover | Internal project continuity log: end-of-session inventory, verified changes, statuses, decisions, blockers, remaining work, next-session objective, and exact resume point. Never present notes as proof of tests that were not run. | Repository state, PR/commit evidence, test results, and the current compatibility map |

### Numbering rule

Keep Sections 01–18 stable to avoid breaking existing paths and references. Section 19 is added as **ALI Business Studio** because the operating-tool scope is too large and cross-cutting to hide inside “Free Business Tools” or the partner network. The numbering is an identifier, not a delivery order.

### Section 20 operating rule

At the end of each work session, update `PROJECT-NOTES.md` with: (1) date/session, (2) actual repository/branch/commit, (3) work completed with evidence, (4) GREEN/YELLOW/RED/LOCKED statuses, (5) unresolved issues and risks, (6) what remains, (7) the single next-session objective and ordered next steps, and (8) an exact resume point. Separate verified facts from assumptions. If work stops early, record the blocker and the safest next action. Do not mark the whole project GREEN because documentation or a build exists. Keep a short dated history; never overwrite prior session records without reason.

## 4. Shared domain model — canonical concepts

Use one canonical definition for each concept. Names can be mapped to database/API naming conventions later, but must not fork semantically.

- **Company:** stable ID, legal/display identity as appropriate, status, profile, ownership/access membership, verification state.
- **Product/Service:** stable ID, owning company ID, category IDs, publication status, descriptive attributes, pricing reference (with currency and source/date when applicable), links, and timestamps.
- **Category:** stable ID, parent/category relationships if needed, slug, label, status.
- **Offer/Deal:** stable ID, company/product references, terms, eligibility, start/end time, source, status.
- **Verification Record:** subject type/ID, check type, evidence reference, result, reviewer/process, checked-at, expiry/review date, and audit events. Do not store unnecessary sensitive evidence in public pages.
- **Partner Relationship:** partner/company IDs, relationship type (listing, referral, affiliate, reseller, integration), status, terms/version, effective dates, and responsible party.
- **Referral/Conversion:** stable event ID, partner/campaign reference, attribution method/window, conversion source, timestamps, fraud/reversal/dispute state, and evidence reference.
- **Commission Entry:** source conversion, rule/version, currency, calculated amount, status, adjustment/reversal trail, and audit history.
- **Payout:** payable ledger entries, requested amount, currency, destination reference held securely by the payment provider where possible, approval/rejection state, provider reference, and reconciliation status.
- **User / Membership / Role:** identity ID, tenant/company scope where relevant, role, permissions, status, and audit history.
- **Business Studio Resource:** tenant/company ID, module type, resource ID, owner, access policy, lifecycle status, and audit events.

Do not use UI text, browser storage, or user-submitted client values as the authoritative source for prices, verification, commissions, balances, permissions, or payout state.

## 5. Cross-section contracts

1. **One catalog:** marketplace, categories, product/company pages, search, compare, deals, and verification reference the same published entities and IDs.
2. **One publication rule:** drafts are private to authorized owners; only approved/published records appear publicly. Unpublished, suspended, expired, or removed items must not leak through search or direct links.
3. **One identity and authorization layer:** dashboards and future Studio modules use server-enforced permissions and tenant isolation. Hiding a button is not authorization.
4. **One audit trail for sensitive changes:** verification decisions, company approval, listing publication, partner terms, commission adjustments, payout actions, role changes, and API credential changes must be attributable.
5. **One money source of truth:** commission and payout values come from an auditable server-side ledger; UI totals are read-only projections.
6. **No false trust claims:** verification, partner approval, offer availability, customer numbers, earnings, and integrations must reflect real evidence/status.
7. **External partner programs:** do not assume acceptance, commission rates, or API access. Verify program terms and store source/version/effective date.
8. **Privacy by design:** collect minimum data, define retention/access, avoid exposing private application or verification evidence, and provide a route for correction/removal where applicable.
9. **Integration boundaries:** external providers are adapters behind stable internal contracts; secrets remain server-side and are never committed.
10. **Graceful states:** every data-driven page must define loading, empty, error, stale/expired, unavailable, and unauthorized states as applicable.

## 6. Dependency and delivery order

### Phase A — Public discovery foundation
**Sections:** 01–13, implemented in thin slices, not as 13 simultaneous projects.

1. Canonical navigation and landing page.
2. Shared catalog contract and small, clearly identified sample/test records.
3. Categories and marketplace browsing.
4. Product and company detail pages.
5. Search over the same catalog.
6. Comparison using normalized attributes.
7. Offers with expiry/terms.
8. Verification workflow and truthful public display.
9. Partner application/review and partner directory.
10. Learn content and the first genuinely useful free tool.

### Phase B — Identity and company operations
**Sections:** 14–16.

1. Identity, sessions, recovery, and server-side authorization.
2. User dashboard.
3. Company membership, role boundaries, and tenant isolation.
4. Company dashboard and publication/review workflow.
5. Partner agreement and referral attribution.
6. Commission rules, immutable history, disputes/reversals, and reporting.

### Phase C — ALI Business Studio
**Section:** 19.

Build one validated module at a time after Phase B foundations. Start with the smallest module supported by real demand. Each module must have its own data contract, permission model, lifecycle, audit events, tests, and export/deletion considerations. Do not build every module at once.

### Phase D — Financial and external platform capabilities
**Sections:** 17–18.

- Enable payouts only after real approved payable earnings, provider capability, reconciliation, security controls, and applicable legal/compliance checks are validated.
- Expose APIs/reseller/white-label only after internal contracts stabilize, scopes and rate limits are implemented, tenant isolation is tested, and real commercial need exists.

## 7. Minimum acceptance gates

A section is **GREEN** only when all relevant gates have evidence:

- [ ] Requirement and owner/dependency are documented.
- [ ] User flow and error/empty/unauthorized states work.
- [ ] Data contracts and authorization are enforced server-side where applicable.
- [ ] Links/routes work on desktop and mobile layouts.
- [ ] Automated tests cover core behavior and important regressions.
- [ ] Security/privacy review is completed for sensitive flows.
- [ ] No fake live data, fake revenue, fake verification, or fake partner acceptance.
- [ ] Build/deployment and live behavior are verified when the feature is deployed.
- [ ] Evidence is recorded in the change/PR; otherwise status remains YELLOW.

For a static documentation or layout-only stage, state the limited scope and do not claim backend or business functionality has passed.

## 8. Explicit non-goals for the initial release

- No full all-in-one business suite before demand validation.
- No real-money wallet/payout activation before the Phase D gates.
- No public API keys, private credentials, or secrets in the repository.
- No fabricated companies, partner approvals, reviews, verified badges, revenue, or commissions.
- No coupling to unrelated repositories or products.
- No renumbering of Sections 01–18 without an approved, documented reason.

## 9. Current baseline status

The repository currently contains a public landing-page shell and 18 section placeholder pages. The presence of those files does **not** mean the described capabilities exist. The shared data model, working search/catalog, authentication, partner workflows, ledger, payouts, and Business Studio are specification-level/planned until separately implemented and tested.

**Baseline decision:** use this map as the single architecture reference for implementation planning. Changes require an explicit reason and synchronized documentation/tests; ordinary feature work should follow the map rather than restart architecture discussions.

**Section 20 decision:** every work session ends with a repository-backed handover note. The note records the true state and the next objective so the project can be paused and resumed without reconstructing the entire discussion.

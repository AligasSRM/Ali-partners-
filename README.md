# ALI PARTNER

> Global business platform connecting customers with trusted products, services and partners.

**Project status:** 🟡 Foundation / planning  
**Project name:** Temporary — subject to change.

## Architecture source of truth

**[COMPATIBILITY-MAP.md](COMPATIBILITY-MAP.md) is the canonical product architecture and compatibility specification.** It defines the 20-section map, shared domain model, dependencies, delivery gates, and change-control rules. If this README or older notes conflict with that map, the map governs until documentation is synchronized.

## Vision

ALI PARTNER is planned as a global business discovery, marketplace and partner platform, with a future integrated business-tool workspace. It may connect customers with products, services and business partners while supporting affiliate, referral, reseller and marketplace relationships.

This project uses the general business-platform model as a structural benchmark, but it is **not a clone**. Its product structure, UX, partner model and implementation will be developed independently.

## Canonical Sections

### Public discovery, trust and acquisition
01. **Home** — canonical landing page at `site/index.html`; the separate Section 01 page must not become a competing homepage.
02. **Business Marketplace** — discover published products and services.
03. **Categories** — shared category taxonomy.
04. **Product Pages** — product/service details and terms.
05. **Company Pages** — company profiles and published status.
06. **Search** — search the same shared catalog.
07. **Compare** — compare compatible products using normalized attributes.
08. **ALI Deals** — time-bounded offers with terms and source.
09. **ALI Verified** — evidence-backed, scoped verification.
10. **Learn / Academy** — educational content.
11. **Free Business Tools** — scoped calculators, generators and checklists.
12. **Partner With ALI** — partner/company application and review.
13. **ALI Partner Network** — partner discovery and approved relationships.

### Identity, workspace and partner operations
14. **User Dashboard** — authenticated user features.
15. **Company Dashboard** — company workspace, listings and authorized analytics.
16. **Commission / Earnings** — auditable referral attribution and commission states.

### Future business suite and infrastructure
17. **Wallet / Payouts** — controlled financial ledger and payout operations, gated by legal, provider and security review.
18. **API / Reseller / White-label** — versioned integrations and partner distribution, after internal contracts stabilize.
19. **ALI Business Studio** — future modular business workspace: websites, landing pages/funnels, email marketing, CRM/pipelines, automation, bookings, courses/memberships, webinars, community, store, affiliate management, templates, blog/content/SEO and sub-accounts.
20. **Project Notes & Handover** — internal session log recording verified progress, statuses, blockers, remaining work, next-day goals, and the exact resume point.

Section numbers are stable identifiers, not delivery order. Section 20 is an internal project-management function, not a public product feature. See [PROJECT-NOTES.md](PROJECT-NOTES.md) for the session template and current handover; see the canonical compatibility map for dependency and rollout order.

## Delivery Plan

- **Phase A — Public discovery foundation:** implement Sections 01–13 as small, testable slices; validate real visitor and partner demand.
- **Phase B — Identity and operations:** implement Sections 14–16 after defining identity, authorization, tenant isolation and audit requirements.
- **Phase C — ALI Business Studio:** implement Section 19 one validated module at a time; no giant all-at-once backend.
- **Phase D — Financial and external capabilities:** implement Sections 17–18 only after their ledger, security, provider, commercial and compliance gates pass.

## Operating Rules

1. Inspect the current repository state before changing anything.
2. Build in small, testable stages.
3. Do not build a large backend before business validation.
4. Do not assume partner acceptance; verify each partner program and its current terms.
5. No fake customers, fake commissions, fake verification or simulated revenue presented as real.
6. Keep this repository independent from unrelated projects.
7. A stage is **GREEN** only after its relevant tests and evidence are recorded.
8. Do not reopen a GREEN/LOCKED stage unless a real defect, regression or approved scope change requires it.
9. Never commit credentials, private keys, or provider secrets.
10. The final brand name can change later without changing the domain contracts.

## Status Legend

- 🟢 **GREEN** — completed and verified with evidence
- 🟡 **YELLOW / ACTIVE** — preliminary, in progress, or not yet fully verified
- 🔴 **NOT STARTED / BLOCKED** — not implemented or blocked
- 🔒 **LOCKED** — reviewed and frozen unless an approved reason requires reopening

## Current Stop Point

**🟡 Foundation / planning.** The repository currently contains a landing-page shell and 18 original section placeholder pages; Section 20 is being added as a project-notes/handover page. The documented business capabilities remain unimplemented until separately built and tested. Those files are not proof that the described functionality exists. The next work follows `COMPATIBILITY-MAP.md`: establish shared catalog contracts and implement the first small public discovery slice, with tests before expansion.

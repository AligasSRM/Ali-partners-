# ALI PARTNER — Product Structure

**Canonical architecture specification:** [COMPATIBILITY-MAP.md](COMPATIBILITY-MAP.md)  
This file summarizes the product layers and expansion scope. If any detail conflicts with the compatibility map, the compatibility map is authoritative.

## Product position

ALI PARTNER is a marketplace-first business discovery and partner platform with a future modular business operating suite. It uses the broad structural logic of integrated business platforms as a benchmark, but does not copy another product's UI, content, or implementation.

## Four connected layers

1. **Discovery & trust (01–09):** Home, marketplace, categories, product/company pages, search, compare, deals, and evidence-backed verification.
2. **Content & acquisition (10–11):** Learn / Academy and free business utilities.
3. **Partner & workspace operations (12–16):** partner applications, partner network, user/company workspaces, referral attribution and commission reporting.
4. **Business operating suite & infrastructure (19, 17–18):** ALI Business Studio modules first; financial payout and external API/reseller/white-label capabilities only after their prerequisites and validation gates pass.

## Canonical section inventory

### Public discovery, trust and acquisition
01. Home
02. Business Marketplace
03. Categories
04. Product Pages
05. Company Pages
06. Search
07. Compare
08. ALI Deals
09. ALI Verified
10. Learn / Academy
11. Free Business Tools
12. Partner With ALI
13. ALI Partner Network

### Identity and partner operations
14. User Dashboard
15. Company Dashboard
16. Commission / Earnings

### Future infrastructure
17. Wallet / Payouts
18. API / Reseller / White-label

### Modular operating suite
19. ALI Business Studio

Section 19 groups the operating-tool scope into one modular workspace instead of scattering it across unrelated public pages. Its modules may include:

- Website Builder
- Landing Pages / Sales Funnels
- Email Marketing
- CRM / Pipelines
- Marketing Automation
- Booking Calendar
- Online Courses / Memberships
- Webinars
- Community
- Product / Store
- Affiliate Management
- Templates
- Blog / Content / SEO
- Sub-accounts / Workspaces

These modules are planned capabilities, not currently implemented functionality. They must be released individually, based on validated demand and with their own data contracts, authorization, lifecycle, audit events and tests.

## Differentiation

- Marketplace-first discovery and multi-company catalog.
- Comparison and scoped verification as first-class features.
- Offers and partner discovery.
- Affiliate, referral, reseller and marketplace relationships with distinct states and terms.
- Free business utilities as acquisition tools.
- A staged architecture that validates demand before expensive infrastructure.

## Build rule

Use [COMPATIBILITY-MAP.md](COMPATIBILITY-MAP.md) as the stable contract for section boundaries, shared entities, dependencies, delivery phases and acceptance gates. Build small, testable slices; record evidence; and do not mark planned or placeholder functionality GREEN.

<?php

return [
    'software-development' => [
        'title' => 'Streamline: Multi-Tenant Billing Platform',
        'type' => 'SaaS Platform',
        'summary' => 'A ground-up SaaS billing platform serving 40,000+ subscribers across three pricing tiers, rebuilt for reliability and scale.',
        'client' => ['name' => 'Elena Vasquez', 'role' => 'CTO', 'company' => 'Ledgerly', 'subtitle' => 'Ozytech Client · SaaS Billing'],
        'testimonial' => 'Ozytech Agency rebuilt our subscription engine from the ground up. We went from weekly billing incidents to zero downtime in production.',
        'problems' => [
            ['problem' => "Ledgerly's legacy billing system caused weekly outages and couldn't scale past its original 5,000-subscriber design.", 'solution' => 'Ozytech Agency rebuilt the billing engine on a multi-tenant architecture with automated failover, eliminating downtime as the subscriber base grew past 40,000.'],
            ['problem' => "Manual reconciliation between the billing system and the accounting team's books consumed hours every week and produced frequent discrepancies.", 'solution' => 'Ozytech Agency built an automated reconciliation pipeline that syncs subscription events to the ledger in real time, removing manual entry entirely.'],
        ],
    ],
    'mobile-apps' => [
        'title' => 'Transit Now: Real-Time Commuter App',
        'type' => 'Mobile App',
        'summary' => 'A cross-platform mobile app helping 200,000+ riders track buses and trains in real time across four metro systems.',
        'client' => ['name' => 'Marcus Bellweather', 'role' => 'Head of Product', 'company' => 'Transit Now', 'subtitle' => 'Ozytech Client · Transit Technology'],
        'testimonial' => 'Our app store rating jumped from 2.8 to 4.7 stars within two months of the Ozytech Agency rebuild.',
        'problems' => [
            ['problem' => 'Riders had no reliable way to see real-time bus and train positions, leading to missed connections and a 2.8-star app rating.', 'solution' => 'Ozytech Agency built a cross-platform app with live GPS tracking and predictive arrival times across four metro systems.'],
            ['problem' => 'The existing app crashed frequently during peak commute hours when server load spiked.', 'solution' => 'Ozytech Agency re-architected the backend for horizontal scaling and added offline caching, stabilizing the app under peak load.'],
        ],
    ],
    'mvp-development' => [
        'title' => 'Fundrise: Investor Waitlist MVP',
        'type' => 'MVP Product',
        'summary' => 'A six-week MVP that let a fintech founder validate demand and close a seed round before writing a single line of production code.',
        'client' => ['name' => 'Priya Anand', 'role' => 'Founder', 'company' => 'Fundrise Labs', 'subtitle' => 'Ozytech Client · Fintech Startup'],
        'testimonial' => 'We used the Ozytech Agency prototype to close our seed round two weeks after launch. It did exactly what it needed to.',
        'problems' => [
            ['problem' => 'The founder needed to prove investor demand before committing engineering budget to a full product build.', 'solution' => 'Ozytech Agency shipped a focused six-week MVP with a waitlist and investor dashboard, generating the traction data needed to pitch.'],
            ['problem' => 'With no in-house engineering team yet, the founder needed a build that could hand off cleanly to future hires.', 'solution' => 'Ozytech Agency documented the architecture and delivered a codebase structured for a new team to extend without a rewrite.'],
        ],
    ],
    'llc-incorporation' => [
        'title' => 'Northwind Studio: US Market Entry',
        'type' => 'Business Formation',
        'summary' => 'End-to-end Delaware incorporation, EIN setup, and compliance handoff for a European studio expanding into the US market.',
        'client' => ['name' => 'Lukas Feldmann', 'role' => 'Managing Director', 'company' => 'Northwind Studio', 'subtitle' => 'Ozytech Client · European Studio'],
        'testimonial' => 'Ozytech Agency handled our entire US formation in three weeks. We were signing contracts with American clients before we expected to even be registered.',
        'problems' => [
            ['problem' => 'Northwind Studio needed to sign US contracts but had no legal entity, EIN, or registered agent in the country.', 'solution' => 'Ozytech Agency handled Delaware incorporation, EIN registration, and registered agent setup end to end within three weeks.'],
            ['problem' => 'The studio was unfamiliar with US compliance obligations and risked missing filing deadlines after formation.', 'solution' => 'Ozytech Agency set up a compliance calendar and handoff documentation so the studio could operate independently going forward.'],
        ],
    ],
    'web-development' => [
        'title' => 'Arbor & Co: Corporate Platform Rebuild',
        'type' => 'Corporate Website',
        'summary' => "A full corporate website rebuild focused on page speed, accessibility, and a content model the client's own team could operate.",
        'client' => ['name' => 'Rachel Kim', 'role' => 'Marketing Director', 'company' => 'Arbor & Co', 'subtitle' => 'Ozytech Client · Professional Services Firm'],
        'testimonial' => 'Our new site loads in under a second and our team finally edits pages without filing a ticket.',
        'problems' => [
            ['problem' => "Arbor & Co's old site took over six seconds to load and every content change required filing a developer ticket.", 'solution' => 'Ozytech Agency rebuilt the site on a performance-first stack with a content model the marketing team could operate directly.'],
            ['problem' => 'The site failed basic accessibility checks, excluding visitors using screen readers or keyboard navigation.', 'solution' => 'Ozytech Agency rebuilt every page to meet WCAG standards, verified with automated and manual accessibility testing.'],
        ],
    ],
    'cms-development' => [
        'title' => 'Bramwell Journal: Editorial Platform',
        'type' => 'Editorial Platform',
        'summary' => 'A custom WordPress rebuild for a digital publication managing 40+ contributing writers and daily editorial deadlines.',
        'client' => ['name' => 'Tobias Reyes', 'role' => 'Editor-in-Chief', 'company' => 'Bramwell Journal', 'subtitle' => 'Ozytech Client · Digital Publication'],
        'testimonial' => 'Publishing went from a 20-minute ordeal to a two-minute task. Our writers actually enjoy using the CMS now.',
        'problems' => [
            ['problem' => '40+ contributing writers shared one clunky WordPress setup that made publishing a 20-minute ordeal under daily deadlines.', 'solution' => 'Ozytech Agency rebuilt the CMS with custom blocks and a streamlined editorial workflow, cutting publishing time to two minutes.'],
            ['problem' => 'Editors had no way to manage contributor permissions, leading to accidental edits on live articles.', 'solution' => 'Ozytech Agency introduced role-based permissions and a review queue so edits are approved before going live.'],
        ],
    ],
    'shopify-store-development' => [
        'title' => 'Solstice Goods: Direct-to-Consumer Launch',
        'type' => 'E-Commerce Website',
        'summary' => 'A Shopify storefront built to launch a new consumer goods brand, from checkout customization to app integrations.',
        'client' => ['name' => 'Ines Duarte', 'role' => 'Co-Founder', 'company' => 'Solstice Goods', 'subtitle' => 'Ozytech Client · Consumer Goods Brand'],
        'testimonial' => 'We hit our first-month sales target in eleven days. The checkout flow Ozytech Agency built converts far better than our old store.',
        'problems' => [
            ['problem' => 'Solstice Goods was launching a new brand with no storefront, checkout flow, or app integrations in place.', 'solution' => 'Ozytech Agency built a conversion-focused Shopify store with a customized checkout and the integrations needed for launch day.'],
            ['problem' => 'The founders needed the store live before their first-month sales window closed.', 'solution' => 'Ozytech Agency delivered the full build in time to launch, helping the brand hit its first-month sales target in eleven days.'],
        ],
    ],
    'payment-solutions' => [
        'title' => 'Marketplace Pay: Multi-Currency Checkout',
        'type' => 'Payment Infrastructure',
        'summary' => 'A payment infrastructure overhaul enabling multi-currency checkout and automated payouts for a two-sided marketplace.',
        'client' => ['name' => 'Daniel Osei', 'role' => 'VP Engineering', 'company' => 'Marketplace Pay', 'subtitle' => 'Ozytech Client · Two-Sided Marketplace'],
        'testimonial' => 'Failed payments dropped by 80% after the integration. Our finance team finally trusts the numbers.',
        'problems' => [
            ['problem' => 'The marketplace could only accept a single currency, blocking expansion into new regions.', 'solution' => 'Ozytech Agency built multi-currency checkout on Stripe Connect, enabling transactions in the currencies each market needed.'],
            ['problem' => 'Failed payments were common and the finance team had no reliable way to reconcile payouts.', 'solution' => 'Ozytech Agency automated payout reconciliation and improved retry logic, cutting failed payments by 80%.'],
        ],
    ],
    'cloud-management' => [
        'title' => 'Vertex Cloud: Observability Overhaul',
        'type' => 'Cloud Observability Platform',
        'summary' => 'A full observability and cost-governance program for a platform running 200+ microservices across multiple regions.',
        'client' => ['name' => 'Samuel Okafor', 'role' => 'Director of Infrastructure', 'company' => 'Vertex Systems', 'subtitle' => 'Ozytech Client · Infrastructure Platform'],
        'testimonial' => 'We cut our cloud bill by a third and finally know what triggered every incident before customers notice.',
        'problems' => [
            ['problem' => 'With 200+ microservices across multiple regions, the team had no unified view of what triggered incidents.', 'solution' => 'Ozytech Agency built a centralized observability stack with distributed tracing so incidents can be traced to their root cause instantly.'],
            ['problem' => 'Cloud spend was growing faster than usage, with no visibility into which services were driving cost.', 'solution' => 'Ozytech Agency introduced cost-governance dashboards and rightsizing policies, cutting the cloud bill by a third.'],
        ],
    ],
    'cloud-migration' => [
        'title' => 'Halcyon Retail: Cloud-Native Migration',
        'type' => 'Cloud Migration',
        'summary' => 'A zero-downtime migration of a legacy retail platform from on-premise servers to a modern cloud-native architecture.',
        'client' => ['name' => 'Grace Whitfield', 'role' => 'CTO', 'company' => 'Halcyon Retail', 'subtitle' => 'Ozytech Client · Retail Platform'],
        'testimonial' => 'We migrated our entire platform without a single minute of downtime during business hours. Impressive execution.',
        'problems' => [
            ['problem' => 'Halcyon Retail needed to move off aging on-premise servers without disrupting business-hours traffic.', 'solution' => 'Ozytech Agency planned a phased, zero-downtime cutover to a cloud-native architecture, migrating with no interruption during business hours.'],
            ['problem' => 'The legacy platform had tightly coupled services that made a straight lift-and-shift risky.', 'solution' => 'Ozytech Agency decoupled critical services ahead of migration, containerizing them for a cleaner move to the cloud.'],
        ],
    ],
    'it-infrastructure' => [
        'title' => 'Meridian Labs: Office IT Foundation',
        'type' => 'IT Infrastructure',
        'summary' => 'A secure network and server infrastructure build-out for a fast-growing R&D lab expanding to a second office.',
        'client' => ['name' => 'Owen Whitaker', 'role' => 'Operations Manager', 'company' => 'Meridian Labs', 'subtitle' => 'Ozytech Client · R&D Lab'],
        'testimonial' => 'Our new office was fully operational on day one, network, servers, and all, thanks to the handoff documentation.',
        'problems' => [
            ['problem' => 'Meridian Labs was opening a second office with no network, server, or security infrastructure planned.', 'solution' => 'Ozytech Agency designed and deployed a secure network and server foundation ready before the office opened.'],
            ['problem' => 'The operations team had no documentation to maintain the systems after handoff.', 'solution' => 'Ozytech Agency delivered full handoff documentation, letting the new office run fully operational from day one.'],
        ],
    ],
    'cyber-security' => [
        'title' => 'Ferro Bank: Security Hardening Program',
        'type' => 'Security Hardening Program',
        'summary' => 'A risk assessment and access-hardening program for a fintech handling sensitive customer financial data.',
        'client' => ['name' => 'Isabelle Moreau', 'role' => 'Head of Security', 'company' => 'Ferro Bank', 'subtitle' => 'Ozytech Client · Fintech'],
        'testimonial' => "We passed our first SOC2 audit without a single major finding, a first in our company's history.",
        'problems' => [
            ['problem' => 'Ferro Bank needed to pass a SOC2 audit but had never undergone a formal risk assessment.', 'solution' => 'Ozytech Agency ran a full risk assessment and hardened access controls across the organization ahead of the audit.'],
            ['problem' => 'Sensitive customer financial data lacked consistent access controls across teams.', 'solution' => 'Ozytech Agency implemented least-privilege access policies and incident response playbooks, closing the gaps before auditors arrived.'],
        ],
    ],
    'consulting-training' => [
        'title' => 'Bright Path Health: Engineering Playbook',
        'type' => 'Engineering Enablement Program',
        'summary' => "An architecture review and team training program that gave a growing healthtech's engineers a shared decision-making framework.",
        'client' => ['name' => 'Nathaniel Cross', 'role' => 'VP Engineering', 'company' => 'Bright Path Health', 'subtitle' => 'Ozytech Client · Healthtech'],
        'testimonial' => 'Our team ships with a third of the back-and-forth we used to have. The workshops paid for themselves in a month.',
        'problems' => [
            ['problem' => "Bright Path Health's growing engineering team had no shared framework for making architecture decisions, causing repeated back-and-forth.", 'solution' => 'Ozytech Agency ran an architecture review and built a shared decision-making framework the team could apply going forward.'],
            ['problem' => 'Junior engineers lacked structured guidance, slowing onboarding and code review cycles.', 'solution' => 'Ozytech Agency delivered hands-on workshops that gave engineers a common vocabulary and review standard.'],
        ],
    ],
    'remote-team' => [
        'title' => 'Quantum Freight: Extended Engineering Pod',
        'type' => 'Remote Engineering Team',
        'summary' => "A dedicated remote engineering pod embedded with an in-house team to accelerate a logistics platform's roadmap.",
        'client' => ['name' => 'Felicity Adeyemi', 'role' => 'CTO', 'company' => 'Quantum Freight', 'subtitle' => 'Ozytech Client · Logistics Platform'],
        'testimonial' => 'It stopped feeling like outsourcing after the second week. The Ozytech Agency engineers just became part of our team.',
        'problems' => [
            ['problem' => "Quantum Freight's roadmap was moving faster than its in-house team could deliver.", 'solution' => 'Ozytech Agency embedded a dedicated remote engineering pod that integrated directly with the existing team and process.'],
            ['problem' => 'Previous outsourcing engagements felt disconnected from the product and communicated poorly.', 'solution' => 'Ozytech Agency engineers joined daily standups and planning directly, becoming indistinguishable from the in-house team within weeks.'],
        ],
    ],
    'data-refinement' => [
        'title' => 'Clearline Logistics: Reporting Overhaul',
        'type' => 'Data Platform',
        'summary' => 'A data cleaning and pipeline automation project that turned years of inconsistent logistics data into trustworthy reporting.',
        'client' => ['name' => 'Victor Almeida', 'role' => 'Head of Analytics', 'company' => 'Clearline Logistics', 'subtitle' => 'Ozytech Client · Logistics Analytics'],
        'testimonial' => 'For the first time, our leadership team trusts the dashboard numbers enough to make decisions from them.',
        'problems' => [
            ['problem' => 'Years of inconsistent logistics data made leadership distrust the reporting dashboards.', 'solution' => 'Ozytech Agency cleaned and standardized the historical data, rebuilding the pipelines that feed the dashboards.'],
            ['problem' => 'Reports were generated manually each week, delaying decisions by days.', 'solution' => 'Ozytech Agency automated the reporting pipeline end to end, giving leadership always-current numbers they could trust.'],
        ],
    ],
    'localization' => [
        'title' => 'Aurelia Beauty: Five-Market Expansion',
        'type' => 'Product Localization',
        'summary' => "A full product and marketing localization effort supporting a beauty brand's expansion into five new international markets.",
        'client' => ['name' => 'Camille Laurent', 'role' => 'International Growth Lead', 'company' => 'Aurelia Beauty', 'subtitle' => 'Ozytech Client · Beauty Brand'],
        'testimonial' => 'Our conversion rate in new markets matched our home market within the first quarter, that never happens.',
        'problems' => [
            ['problem' => 'Aurelia Beauty was expanding into five new markets with product and marketing content that read as machine-translated.', 'solution' => 'Ozytech Agency led a full localization effort adapting language, imagery, and workflows for each market.'],
            ['problem' => 'The product had no RTL support, blocking a clean launch in right-to-left markets.', 'solution' => 'Ozytech Agency rebuilt the interface with full RTL support and locale-specific testing before launch.'],
        ],
    ],
    'ecommerce' => [
        'title' => 'Woodland Supply Co: Storefront Relaunch',
        'type' => 'E-Commerce Website',
        'summary' => 'A complete e-commerce relaunch with a new storefront, payment setup, and inventory system for a growing outdoor goods retailer.',
        'client' => ['name' => 'Henry Caldwell', 'role' => 'Owner', 'company' => 'Woodland Supply Co', 'subtitle' => 'Ozytech Client · Outdoor Goods Retailer'],
        'testimonial' => 'Cart abandonment dropped by 30% after the new checkout went live. Best investment we made this year.',
        'problems' => [
            ['problem' => 'Woodland Supply Co was losing nearly a third of customers at checkout on their old storefront.', 'solution' => 'Ozytech Agency relaunched the storefront with a streamlined checkout and modern payment setup.'],
            ['problem' => 'Inventory tracking was manual, causing overselling of out-of-stock items.', 'solution' => 'Ozytech Agency integrated a live inventory system connected directly to the storefront.'],
        ],
    ],
    'ui-ux-design' => [
        'title' => 'Fintra: Banking App Redesign',
        'type' => 'Banking App Redesign',
        'summary' => "A full research-led redesign of a personal finance app's interface, cutting onboarding drop-off dramatically.",
        'client' => ['name' => 'Sophie Tanaka', 'role' => 'Head of Design', 'company' => 'Fintra', 'subtitle' => 'Ozytech Client · Personal Finance App'],
        'testimonial' => 'Onboarding completion went from 54% to 89%. Users finally understand the app on the first try.',
        'problems' => [
            ['problem' => "Fintra's onboarding flow lost 46% of new users before they reached the core product.", 'solution' => 'Ozytech Agency led a research-backed redesign of the onboarding flow, simplifying every step to its essentials.'],
            ['problem' => 'Users frequently misunderstood core banking features, driving support tickets up.', 'solution' => 'Ozytech Agency redesigned the interface around clear, tested patterns that matched how users actually think about their money.'],
        ],
    ],
    'seo-optimization' => [
        'title' => 'Coastal Realty Group: Organic Growth',
        'type' => 'SEO Growth Program',
        'summary' => "A technical SEO and content overhaul that tripled a regional real estate firm's organic search traffic in six months.",
        'client' => ['name' => 'Andre Bellamy', 'role' => 'Marketing Director', 'company' => 'Coastal Realty Group', 'subtitle' => 'Ozytech Client · Real Estate Business'],
        'testimonial' => 'Organic leads tripled without increasing our ad spend by a single dollar. The technical audit alone was worth it.',
        'problems' => [
            ['problem' => "Coastal Realty Group's listings rarely appeared past page two of search results, starving the sales team of organic leads.", 'solution' => 'Ozytech Agency ran a technical SEO audit and rebuilt the content strategy around the terms buyers actually search.'],
            ['problem' => 'Slow page speeds were hurting both rankings and conversion on mobile.', 'solution' => 'Ozytech Agency optimized Core Web Vitals across the site, improving both search rank and mobile conversion.'],
        ],
    ],
    'website-maintenance' => [
        'title' => 'Hearth & Home: Ongoing Site Reliability',
        'type' => 'Site Reliability Program',
        'summary' => 'An ongoing maintenance program that stabilized a high-traffic e-commerce site plagued by recurring outages and slow releases.',
        'client' => ['name' => 'Miriam Solberg', 'role' => 'Head of E-Commerce', 'company' => 'Hearth & Home', 'subtitle' => 'Ozytech Client · High-Traffic E-Commerce'],
        'testimonial' => "We haven't had a single unplanned outage since Ozytech Agency took over maintenance. Our release cadence doubled too.",
        'problems' => [
            ['problem' => 'Hearth & Home suffered recurring, unplanned outages during high-traffic sales events.', 'solution' => 'Ozytech Agency diagnosed the root causes and put continuous monitoring and alerting in place to catch issues before customers noticed.'],
            ['problem' => 'Releases were slow and risky, limiting how often the team could ship improvements.', 'solution' => "Ozytech Agency streamlined the release process, doubling the team's shipping cadence without adding incidents."],
        ],
    ],
];

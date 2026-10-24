export type Service = {
  slug: string; title: string; short: string; intro: string; outcome: string;
  capabilities: { title: string; description: string }[];
  deliverables: string[]; questions: { question: string; answer: string }[];
};

export const serviceCatalog: Service[] = [
  {
    slug: 'website-development', title: 'Website Development', short: 'A better first impression. A clearer path to enquiry.',
    intro: 'Website development brings your business online with a fast, accessible site that explains your offer and helps visitors take the next step. Cryol builds business websites, landing pages and ecommerce experiences for companies in Chennai and beyond.',
    outcome: 'Turn your website into a useful part of your sales process.',
    capabilities: [
      { title: 'Business websites & landing pages', description: 'Clear messaging, service pages and mobile layouts designed around your customers and enquiry goals.' },
      { title: 'Ecommerce development', description: 'Product discovery, catalogues, checkout integrations and order workflows scoped to your business.' },
      { title: 'Technical SEO & performance', description: 'Crawlable pages, metadata, structured data, image optimisation and a focus on Core Web Vitals.' },
      { title: 'CMS & ongoing care', description: 'Manage your content with an agreed CMS, supported by updates, backups and maintenance options.' },
    ],
    deliverables: ['Page structure and content plan', 'Responsive interface and enquiry forms', 'SEO foundations and analytics setup', 'Launch checklist and handover'],
    questions: [
      { question: 'Can you redesign our existing website?', answer: 'Yes. We review your current content, enquiry journey and technical setup, then agree what to retain, rewrite or rebuild. URL redirects are planned where pages change.' },
      { question: 'How much does a business website cost?', answer: 'Cost depends on page count, content, design and integrations. Share your requirements and we will prepare a scoped proposal with deliverables and milestones.' },
      { question: 'Will the website work on mobile and support SEO?', answer: 'We plan responsive layouts and technical SEO from the start. Search performance also depends on your content, competition, reputation and ongoing work; rankings cannot be guaranteed.' },
    ],
  },
  {
    slug: 'application-development', title: 'Application Development', short: 'Software built around the way your business works.',
    intro: 'Custom application development turns specific business workflows into software. Cryol plans and builds web applications, business portals, dashboards and integrations, with attention to maintainability, access control and your users’ needs.',
    outcome: 'Connect your people, processes and data in one practical application.',
    capabilities: [
      { title: 'Custom business software', description: 'Replace repetitive spreadsheets and manual steps with applications shaped around your operations.' },
      { title: 'Customer & team portals', description: 'Role-based workspaces for customers, staff and partners, with appropriate access controls.' },
      { title: 'APIs & integrations', description: 'Connect payment, CRM, accounting and third-party platforms through documented interfaces.' },
      { title: 'Modernisation & maintenance', description: 'Assess existing software, improve usability and performance, and plan sustainable updates.' },
    ],
    deliverables: ['Requirements and workflow mapping', 'Interface prototypes and development milestones', 'Testing and deployment documentation', 'Source code handover and support scope'],
    questions: [
      { question: 'Can you build an MVP before a full product?', answer: 'Yes. We help prioritise the smallest useful set of features so you can validate workflows and collect user feedback before expanding.' },
      { question: 'Can the application integrate with our current tools?', answer: 'We first review the APIs, access permissions and data formats of your existing tools. Feasible integrations and any limitations are included in the proposal.' },
      { question: 'Who owns the source code?', answer: 'Ownership, third-party licences, hosting access and handover responsibilities are documented in the project agreement before development starts.' },
    ],
  },
  {
    slug: 'mobile-app-development', title: 'Mobile App Development', short: 'Useful mobile experiences, wherever your customers are.',
    intro: 'Mobile app development creates software for phones and tablets. Cryol helps businesses plan Android and iOS applications, from first prototype and backend APIs through testing and app store submission support.',
    outcome: 'Put the right experience in your customers’ hands.',
    capabilities: [
      { title: 'Android & iOS applications', description: 'Choose a native or cross-platform approach based on device features, budget and long-term plans.' },
      { title: 'Mobile UX & prototypes', description: 'Validate navigation and key journeys before investing in full development.' },
      { title: 'Connected app features', description: 'Plan authentication, payments, notifications and offline behaviour around real use cases.' },
      { title: 'Testing & release support', description: 'Test agreed devices and workflows, prepare release assets and support store submission.' },
    ],
    deliverables: ['Platform and feature scope', 'Interactive mobile designs', 'Application and backend integration', 'Release documentation and maintenance plan'],
    questions: [
      { question: 'Should I choose native or cross-platform development?', answer: 'Cross-platform development can share code across Android and iOS. Native development may suit deeper device integrations. We recommend an approach after reviewing your features and constraints.' },
      { question: 'Do you help with Google Play and App Store releases?', answer: 'Yes. Release support can include build preparation, store assets and submission guidance. Developer accounts belong to your business, and approval remains with the app store.' },
      { question: 'Can you update an existing mobile app?', answer: 'We can assess the codebase, dependencies and release access, then propose fixes or a rebuild where appropriate.' },
    ],
  },
  {
    slug: 'digital-marketing', title: 'Digital Marketing', short: 'Get found by the people who need what you do.',
    intro: 'Digital marketing connects your business with potential customers through search, useful content, paid campaigns and social channels. Cryol brings SEO, local visibility and conversion measurement into a coordinated plan.',
    outcome: 'Build visibility that leads to meaningful business conversations.',
    capabilities: [
      { title: 'On-page & technical SEO', description: 'Search intent, service content, internal linking, indexing checks and performance improvements.' },
      { title: 'Local SEO & off-page presence', description: 'Business Profile consistency, relevant listings, genuine review processes and useful industry outreach.' },
      { title: 'AEO & generative search visibility', description: 'Clear service explanations, helpful answers and accurate business entities that support search understanding.' },
      { title: 'Paid media & conversion tracking', description: 'Campaign planning, landing pages and consent-aware measurement of qualified enquiries.' },
    ],
    deliverables: ['Search and competitor baseline', 'Prioritised content and technical roadmap', 'Campaign and conversion measurement plan', 'Agreed reporting and review cadence'],
    questions: [
      { question: 'What is the difference between SEO, AEO and GEO?', answer: 'SEO improves discovery in search. AEO describes making answers easy to find and understand; GEO refers to visibility in generative search experiences. All benefit from useful content, crawlability and credible business information.' },
      { question: 'Can you guarantee first-page rankings or AI citations?', answer: 'No. Rankings and AI citations are controlled by search platforms. We focus on measurable improvements to content, technical quality, local presence and qualified enquiry tracking.' },
      { question: 'What off-page SEO do you offer?', answer: 'We can plan accurate business listings, genuine customer review requests, relevant partnerships and editorial outreach. We avoid paid link schemes, fabricated reviews and spam submissions.' },
    ],
  },
  {
    slug: 'cloud-services', title: 'Cloud Services', short: 'Infrastructure that can grow with your business.',
    intro: 'Cloud services help you host, operate and scale digital systems without managing every physical server yourself. Cryol supports cloud planning, migration, deployment automation and operational improvements across your agreed environment.',
    outcome: 'Make your infrastructure easier to operate, secure and scale.',
    capabilities: [
      { title: 'Cloud assessment & migration', description: 'Map applications, dependencies and data before creating a staged migration and rollback plan.' },
      { title: 'Hosting & deployment automation', description: 'Repeatable application releases and infrastructure configuration for your chosen platform.' },
      { title: 'Backups & recovery planning', description: 'Define recovery objectives, retention requirements and restore checks for critical workloads.' },
      { title: 'Monitoring & cost review', description: 'Improve visibility into service health, resource usage and recurring infrastructure costs.' },
    ],
    deliverables: ['Infrastructure and dependency assessment', 'Architecture and migration plan', 'Access, backup and monitoring configuration', 'Operating documentation and support agreement'],
    questions: [
      { question: 'Can you migrate our website or application to the cloud?', answer: 'Yes. We assess dependencies, data size and acceptable interruption, then plan migration, testing and rollback steps.' },
      { question: 'Will you reduce our cloud bill?', answer: 'We can review resource usage and propose cost improvements. Actual savings depend on the workload, availability requirements and current commitments.' },
      { question: 'Is cloud support available after migration?', answer: 'Ongoing support can be included under an agreed scope covering response windows, monitoring responsibilities and maintenance activities.' },
    ],
  },
  {
    slug: 'cyber-security', title: 'Cyber Security', short: 'Understand your exposure. Strengthen your defences.',
    intro: 'Cyber security services help identify and reduce risks to applications, infrastructure and business information. Cryol supports authorised security assessments, remediation planning and practical security improvements.',
    outcome: 'Move from uncertainty to a prioritised security action plan.',
    capabilities: [
      { title: 'Application & API assessments', description: 'Review agreed web application and API targets for weaknesses affecting confidentiality and access.' },
      { title: 'Infrastructure & cloud reviews', description: 'Examine configuration, identity permissions and exposed services within an authorised scope.' },
      { title: 'Remediation & retesting', description: 'Translate findings into prioritised fixes and verify agreed remediation work.' },
      { title: 'Security awareness & readiness', description: 'Help teams improve everyday security practices and prepare response responsibilities.' },
    ],
    deliverables: ['Written authorisation and assessment scope', 'Risk findings with supporting evidence', 'Prioritised remediation recommendations', 'Retest and closure report when included'],
    questions: [
      { question: 'Do you need permission before testing our systems?', answer: 'Yes. Testing begins only after written authorisation, target scope, testing windows and escalation contacts are agreed with the system owner.' },
      { question: 'What will a security assessment report include?', answer: 'The agreed report describes tested assets, findings, evidence, risk context and practical remediation steps. Coverage and limitations are documented.' },
      { question: 'Can you help fix discovered vulnerabilities?', answer: 'Remediation assistance and retesting can be included in the engagement. Responsibilities and changes to production systems are agreed before implementation.' },
    ],
  },
  {
    slug: 'cyber-forensics', title: 'Cyber Forensics', short: 'Bring clarity to a digital incident.',
    intro: 'Cyber forensics examines digital evidence to understand what may have happened during an incident. Cryol helps organisations scope evidence preservation, review available data and document technical findings within an authorised engagement.',
    outcome: 'Understand the available evidence and plan your next steps.',
    capabilities: [
      { title: 'Incident scoping & preservation', description: 'Identify relevant systems and plan evidence handling before potentially altering useful data.' },
      { title: 'Log & account analysis', description: 'Review available activity records and access information to help establish a technical timeline.' },
      { title: 'Digital evidence examination', description: 'Assess agreed devices or data sources with documented handling and examination limitations.' },
      { title: 'Findings & recovery guidance', description: 'Communicate evidence, uncertainty and recommended security follow-up in a practical report.' },
    ],
    deliverables: ['Authorisation and evidence scope', 'Documented evidence handling', 'Technical timeline and findings', 'Limitations and next-step recommendations'],
    questions: [
      { question: 'What should we do before a forensic review?', answer: 'Avoid deleting logs, resetting devices or making unnecessary changes. Record what you observed and contact us to agree preservation steps. Do not upload evidence, credentials or sensitive records through this enquiry form.' },
      { question: 'Can you guarantee data recovery or identify an attacker?', answer: 'No. Conclusions depend on the quality and availability of evidence. We document what the evidence supports and where uncertainty remains.' },
      { question: 'Can you examine any device or account?', answer: 'We only examine systems and information covered by documented authority. The engagement defines ownership, access, permitted activities and evidence handling requirements.' },
    ],
  },
];

export const getService = (slug: string) => serviceCatalog.find(service => service.slug === slug)!;

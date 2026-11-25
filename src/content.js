// ─────────────────────────────────────────────────────────────
//  ALL PORTFOLIO TEXT LIVES HERE. Edit this file only.
// ─────────────────────────────────────────────────────────────
export const me = {
  name: 'Raj Kumar',
  role: 'Team Lead & Full Stack Developer',
  intro: 'For 9+ years I have built and scaled web, mobile, SaaS and AI products. Today I lead BharatPayroll, serving 200+ companies.',
}

// Newest first.
export const experience = [
  { role: 'Team Lead & Full Stack Developer', company: 'Pranathi Software Services', years: 'Feb 2026 to now, Hyderabad', text: 'Lead BharatPayroll, UAE HRMS, Talent Scan and Bharat ATS: architecture, code reviews, sprint planning and production releases.' },
  { role: 'Freelance Full Stack Developer', company: 'Insurance technology', years: 'Jul 2025 to Jan 2026, remote', text: 'Integrated 12 insurer APIs and built policy auto-read, auto-punch and an insurance CRM for broker clients.' },
  { role: 'Full Stack Developer & Team Lead', company: 'Sendwishonline.com', years: 'Jul 2020 to Jun 2025', text: 'Scaled the platform from 0 to 8M+ users, led TheEcards.com end to end, and managed a team of 5 developers.' },
  { role: 'Full Stack Developer', company: 'Sircl Tech', years: 'Apr 2019 to Jun 2020, Sirsa', text: 'Built a hybrid mobile app for insurance agents and secure back ends in Laravel and CodeIgniter on AWS.' },
  { role: 'PHP Web Developer', company: 'Sircl Tech', years: 'Jan 2018 to Mar 2019, Sirsa', text: 'Built a custom e-commerce platform, REST APIs for mobile apps, and insurance portal automation.' },
  { role: 'Web Designer and Intern', company: 'Sircl Tech', years: 'Jul 2016 to Dec 2017, Sirsa', text: 'Delivered 10+ responsive websites for travel agencies and educational institutions.' },
]

export const contact = [
  { label: 'Email', value: 'vraj1898@gmail.com', href: 'mailto:vraj1898@gmail.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/itsrajverma', href: 'https://linkedin.com/in/itsrajverma' },
  { label: 'GitHub', value: 'github.com/itsrajverma', href: 'https://github.com/itsrajverma' },
  // To show a phone number, add: { label: 'Phone', value: '+91 …', href: 'tel:+91…' }
]

// A * makes the skill a collectable star in the game (up to 24 fit well).
const groups = {
  Languages: '*Python, *JavaScript, *PHP, SQL',
  'Back end': '*Django, *Django REST Framework, *Celery, *Node.js, *Laravel, CodeIgniter',
  'Front end': '*React, *Next.js, *Angular, *React Native, Bootstrap, HTML5, CSS3',
  Databases: '*PostgreSQL, PgBouncer, Patroni HA, MySQL, *Redis, *Firebase',
  'Cloud and DevOps': '*AWS, *Docker, *Cloudflare, Serverless Framework, HAProxy, CI/CD, Azure',
  'AI engineering': '*AI Agents, *RAG, *MCP, *Claude, *Gemini, Function calling, Vector search, Ragas, LangSmith, Guardrails, *Computer Vision, *Playwright',
  Integrations: 'PayU, Insurer APIs, ZKTeco and ESSL biometrics, Microsoft Teams, Slack',
  Tools: '*Git, Bitbucket, WordPress, Shopify',
}
export const skills = Object.entries(groups).flatMap(([group, list]) => list.split(', ').map(s => ({ group, name: s.replace('*', ''), star: s[0] === '*' })))

// Order = order round the map. `id` picks the 3D landmark, so keep ids as they are.
// Optional: points, stack, groups [{title, items}], link + linkLabel
export const islands = [
  { id: 'home', name: 'Home Field', kind: 'About', title: 'Hello, I’m Raj',
    text: me.intro, points: ['Based in Hyderabad, Telangana', 'Deep experience in HR, payroll and insurance technology', 'Hands-on with LLM agents, RAG and computer vision', 'English and Hindi fluent, Punjabi conversational'] },
  { id: 'experience', name: 'Experience', kind: 'Career', title: 'Experience',
    text: 'From web design intern in 2016 to leading product teams.', showExperience: true,
    groups: [
      { title: 'Awards', items: ['Overall Best Employee (Division Two), 2024', 'Onboarding Project Lead, 2023', 'Most Innovative Employee of the Year, 2021'] },
      { title: 'Education', items: ['A Level, Computer Science, NIELIT, 2023 to 2026', 'O Level, Computer Science, NIELIT, 2019 to 2020', 'High School Certificate, Vivekanand Bal Mandir Sr. Sec. School, 2013 to 2016'] },
      { title: 'Certifications', items: ['AWS Lambda', 'WordPress Developer', 'Python Programmer'] },
    ] },
  { id: 'payroll', name: 'BharatPayroll', kind: 'Project', title: 'BharatPayroll',
    text: 'A multi-tenant HRMS and payroll platform serving 200+ client companies.',
    points: ['Schema-per-tenant PostgreSQL, so each client’s data stays isolated', 'PgBouncer pooling and high availability with Patroni, etcd and HAProxy', 'EPF, ESIC, Professional Tax, TDS and Form 16', 'PayU subscription billing with GST invoices', 'Teams, Slack, SSO and biometric attendance', 'Cloudflare WAF and S3 access control in support of SOC 2'],
    stack: ['Django', 'DRF', 'React', 'PostgreSQL', 'Celery', 'Redis', 'AWS'] },
  { id: 'insurance', name: 'Insurance', kind: 'Project', title: 'Insurance Brokerage Suite',
    text: 'Everything an insurance broker needs, from live quotes to renewals.',
    points: ['12 insurer APIs: quotes, proposals, payment and policy issuance', 'Auto-read pulls policy details out of PDFs', 'Auto-punch enters them into the CRM and insurer portals', 'CRM for leads, policies, renewals, endorsements and commissions'],
    stack: ['Django', 'PostgreSQL', 'Angular', 'Playwright'] },
  { id: 'sendwish', name: 'SendWishOnline', kind: 'Project', title: 'SendWish Online',
    text: 'A group e-card platform I architected and scaled from 0 to 8M+ users worldwide.',
    points: ['Serverless and EC2 architecture on AWS', 'Led a cross-functional team of 5 developers', 'Cut feedback cycles by 30% with Agile practices'],
    stack: ['Angular', 'AWS Lambda', 'EC2', 'S3'], link: 'https://sendwishonline.com' },
  { id: 'theecards', name: 'TheEcards', kind: 'Project', title: 'TheEcards',
    text: 'Group eCards for birthdays, anniversaries and milestones. I led development end to end.',
    points: ['65% rise in user engagement within 6 months', 'Company logo and background music on cards', 'Scheduled delivery'], link: 'https://theecards.com' },
  { id: 'shop', name: 'E-commerce', kind: 'Project', title: 'E-commerce platform',
    text: 'A custom online store built at Sircl Tech.',
    points: ['Integrated payment gateways', '50% increase in conversions'], stack: ['PHP'] },
  { id: 'school', name: 'School Websites', kind: 'Projects', title: 'School websites',
    text: 'Responsive sites for educational institutions, part of 10+ websites I designed and delivered.',
    points: ['Works on every screen size', 'Built with SEO best practices'], stack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'] },
  { id: 'ai', name: 'AI Bots', kind: 'Projects', title: 'AI bots',
    text: 'Priya is an AI avatar that runs the entire HRMS through plain conversation.',
    points: ['Priya: a Gemini agentic loop calling tools in the Django back end', 'Role-based permissions and strict guardrails on every action', 'CCTV attendance: GPU face recognition for sites of 300 to 500 people'],
    stack: ['Gemini', 'Agents', 'Tool calling', 'Computer vision'] },
  { id: 'trading', name: 'Trading Bots', kind: 'Projects', title: 'Trading bots',
    text: 'Programs that watch the market and act on rules, so nobody has to stare at a chart.',
    points: ['Strategy rules written as code', 'Market data and order APIs'] },
  { id: 'opensource', name: 'Open Source', kind: 'Open source', title: 'Open source',
    text: 'Tools I build in the open.',
    points: [{ name: 'LogSetu', text: 'self-hosted log management for Next.js, React and Django', href: 'https://github.com/itsrajverma/logsetu' }, { name: 'Bastion', text: 'an AI SRE command line that manages servers from plain English', href: 'https://github.com/itsrajverma/bastion' }, { name: 'claude-chakra', text: 'a multi-key, Anthropic-compatible API proxy', href: 'https://github.com/itsrajverma/claude-chakra' }, { name: 'react-native-option-menu', text: 'native options dialog for iOS, Android and web', href: 'https://github.com/itsrajverma/react-native-option-menu' }, { name: 'angular-social-login', text: 'social login for Angular apps', href: 'https://github.com/itsrajverma/angular-social-login' }],
    link: 'https://github.com/itsrajverma', linkLabel: 'See my GitHub' },
  { id: 'stack', name: 'Workshop', kind: 'Skills', title: 'Tech stack',
    text: 'The tools I reach for. Stars you have collected are filled in.', showSkills: true },
  { id: 'contact', name: 'Lighthouse', kind: 'Contact', title: 'Send me a message',
    text: 'Have something to build? I’d like to hear about it.', showContact: true },
]

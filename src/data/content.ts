export const profile = {
  name: 'Dafreisy Veras',
  short: 'DV',
  title: 'Office Manager',
  tagline: 'Keeping teams, records and days running the way they should.',
  intro:
    'Office manager and administrative operations professional with 6+ years coordinating workflows, staff support, scheduling, records, billing and client service — bilingual in English and Spanish.',
  location: 'Lowell, Massachusetts',
  email: 'garridodv@gmail.com',
  phone: '413-317-0236',
  phoneHref: 'tel:+14133170236',
  linkedin: '', // add LinkedIn URL when available
}

export const stats = [
  { value: '6+', label: 'Years in operations' },
  { value: '30+', label: 'Employees supported' },
  { value: '2,000+', label: 'Individuals served' },
  { value: '2', label: 'Promotions in one year' },
]

export const marquee = [
  'FEATURE ROLE // OFFICE OPERATIONS',
  'ORIGINAL SERIES // STAFF SUPERVISION',
  'BLOCKBUSTER // SCHEDULING & COVERAGE',
  'ACCLAIMED // RECORDS & COMPLIANCE',
  'NOW STREAMING // BILLING & AP COORDINATION',
  'BILINGUAL // ENGLISH & SPANISH',
]

export const heroStats = ['6+ Years', 'Office Ops • Staff • Records', 'Bilingual EN/ES']

export const milestones = [
  'Promoted twice within one year at Vitra Health — three roles in twelve months.',
  'Supervises a 30+ person care team serving more than 2,000 individuals.',
  'Dean’s List and President’s List (Fall 2025, Spring 2026), Southern New Hampshire University.',
  'CPR and Home Health Aide certified; native English and Spanish.',
]

export const toolkit = ['Microsoft Excel', 'Outlook', 'Word', 'Google Workspace', 'Salesforce', 'Epic', 'eClinicalWorks', 'EHR Systems']

/** Skills deck — one card per competency, with the concrete tools/methods as chips. */
export const skillDeck: { label: string; title: string; desc: string; chips: string[] }[] = [
  { label: 'Operations', title: 'Office & Workflow Coordination', desc: 'Running the daily rhythm of a professional office — phones, mail, calendars, travel, meetings and supplies — so nothing slips.', chips: ['Calendar & Meetings', 'Travel', 'Supply Inventory', 'Purchasing', 'Front Desk'] },
  { label: 'People', title: 'Staff Supervision & Coaching', desc: 'Leading teams of 25–30+: scheduling, call-out coverage, one-on-ones, onboarding, performance follow-up and escalations.', chips: ['Scheduling', 'Coverage', 'One-on-Ones', 'Onboarding', 'Escalations'] },
  { label: 'Records', title: 'Documentation & Compliance', desc: 'Accurate charts, contracts, admission records and reports — reviewed, corrected and kept confidential to standard.', chips: ['EHR Review', 'Filing Systems', 'QI Follow-up', 'Confidentiality', 'Reporting'] },
  { label: 'Finance', title: 'Billing & Accounts Payable', desc: 'Invoice preparation, AP tracking, insurance verification, copay collection and payment processing without loose ends.', chips: ['Invoicing', 'AP Tracking', 'Insurance Verification', 'Payments', 'CCT Billing'] },
  { label: 'Systems', title: 'Healthcare & Office Software', desc: 'Fluent across the tools that run a modern office and a clinical practice.', chips: ['Epic', 'eClinicalWorks', 'Salesforce', 'Excel', 'Outlook', 'Google Workspace'] },
  { label: 'Service', title: 'Client & Patient Experience', desc: 'A calm, welcoming and dependable experience for patients, families and partners — in English and Spanish.', chips: ['Bilingual EN/ES', 'Patient Access', 'Intake', 'De-escalation', 'Follow-through'] },
]

export type Role = {
  n: string
  title: string
  company: string
  place: string
  period: string
  summary: string
  points: string[]
  tags: string[]
  match: string
  category: string
}

export const roles: Role[] = [
  {
    n: '01',
    title: 'Clinical Supervisor',
    company: 'Vitra Health',
    place: 'Braintree, MA',
    period: 'Mar 2026 — Present',
    summary:
      'Leads day-to-day support for a 30+ person care team serving more than 2,000 individuals — coaching, coverage, caseloads, quality and escalations.',
    points: [
      'Monthly one-on-ones, performance follow-up and escalation handling for 30+ employees',
      'Caseload distribution, client assignments, call-out coverage and scheduling productivity',
      'Recruitment, onboarding and training; attendance, documentation and compliance standards',
      'EHR chart, contract, admission-record and operational-report review with QI follow-up',
      'Partners with clinical, billing, finance and leadership on CCT billing and workflow issues',
    ],
    tags: ['Leadership', 'EHR', 'Quality Improvement', 'Billing'],
    match: '99% Match',
    category: 'TEAM LEADERSHIP',
  },
  {
    n: '02',
    title: 'Administrative Assistant',
    company: 'Vitra Health',
    place: 'Braintree, MA',
    period: 'Jan 2026 — Mar 2026',
    summary:
      'Ran daily office operations — phones, mail, calendars, travel, records — and kept accounts payable and supply inventory organized.',
    points: [
      'High-volume phones and email, mail, calendars, meetings, travel and records',
      'Contracts, invoices, reports, presentations and spreadsheets; electronic and physical filing',
      'AP support: invoice organization, follow-up tracking and internal communication',
      'Supply inventory monitoring and purchasing coordination',
    ],
    tags: ['Office Operations', 'Accounts Payable', 'Filing Systems', 'Inventory'],
    match: '98% Match',
    category: 'OFFICE OPERATIONS',
  },
  {
    n: '03',
    title: 'Community Support Specialist',
    company: 'Vitra Health',
    place: 'Lawrence, MA',
    period: 'Apr 2025 — Jan 2026',
    summary:
      'Managed an independent caseload — schedules, appointments and community services — for individuals with developmental disabilities.',
    points: [
      'Accurate service and progress documentation shared with caregivers and multidisciplinary teams',
      'Resolved day-to-day service issues while maintaining confidentiality and care-plan requirements',
      'Built trust with clients and families through dependable follow-through',
    ],
    tags: ['Case Management', 'Documentation', 'Client Relations'],
    match: '97% Match',
    category: 'CASE MANAGEMENT',
  },
  {
    n: '04',
    title: 'Practice Assistant',
    company: 'Mass General Brigham',
    place: 'Lawrence, MA',
    period: 'Oct 2022 — 2025',
    summary:
      'Supported five providers and 100+ daily calls in Epic — registration, scheduling, referrals, prior authorizations and insurance verification.',
    points: [
      'Patient registration, scheduling, referrals, prior authorizations and copay collection',
      'Resolved access and documentation issues with patients, payers, specialists and clinical staff',
      'Maintained accurate medical records and tracked outstanding requests',
    ],
    tags: ['Epic', 'Scheduling', 'Insurance Verification', 'Patient Access'],
    match: '98% Match',
    category: 'PATIENT ACCESS',
  },
  {
    n: '05',
    title: 'Receptionist',
    company: 'Lawrence Medical Center',
    place: 'Lawrence, MA',
    period: 'Mar 2021 — Aug 2022',
    summary:
      'Managed front-office workflow in eClinicalWorks — multi-line phones, check-in, message routing, insurance and payment processing.',
    points: [
      'Verified insurance, demographic and account information; processed patient charges',
      'Coordinated communication between patients, providers and administrative staff',
      'Maintained organization and confidentiality during high-volume periods',
    ],
    tags: ['eClinicalWorks', 'Front Office', 'Payments'],
    match: '96% Match',
    category: 'FRONT OFFICE',
  },
  {
    n: '06',
    title: 'Administrative / Office Support',
    company: 'New England Residential & Commercial Cleaning',
    place: 'New Hampshire',
    period: '2020 — 2022',
    summary:
      'Scheduled 25+ field employees, handled call-outs and coverage, and ran intake, invoicing, contracts and supplies for a growing service business.',
    points: [
      'Scheduling, call-out replacement and client/staff communication for 25+ employees',
      'Phones, email, intake, complaints, contracts, invoices, spreadsheets and filing',
      'Supply and inventory tracking, purchasing, marketing materials and social content',
    ],
    tags: ['Scheduling', 'Invoicing', 'Client Intake', 'Business Development'],
    match: '97% Match',
    category: 'ADMIN & SCHEDULING',
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Operations', items: ['Office Workflow Coordination', 'Scheduling & Coverage', 'Calendar, Meeting & Event Coordination', 'Supply Inventory & Purchasing'] },
  { group: 'People', items: ['Staff Supervision', 'Coaching & One-on-Ones', 'Hiring & Onboarding', 'Escalation Resolution'] },
  { group: 'Records', items: ['Reports & File Management', 'EHR Documentation Review', 'Quality Improvement Follow-Up', 'Confidentiality & Compliance'] },
  { group: 'Finance', items: ['Billing Coordination', 'Invoice Preparation', 'Accounts Payable Support', 'Payment Processing'] },
  { group: 'Systems', items: ['Microsoft Office (Word, Excel, Outlook)', 'Google Workspace', 'Salesforce', 'Epic', 'eClinicalWorks', 'EHR & Database Systems'] },
  { group: 'Languages', items: ['English — Native', 'Spanish — Native'] },
]

export const services = [
  { n: '01', title: 'Office & Front-Desk Management', desc: 'Phones, mail, calendars, travel, visitors and the daily rhythm of a professional office — handled so leadership can focus elsewhere.', meta: 'Operations' },
  { n: '02', title: 'Staff Coordination & Supervision', desc: 'Scheduling, coverage, one-on-ones, onboarding and performance follow-up for teams of 25–30+.', meta: 'People' },
  { n: '03', title: 'Records & Documentation Systems', desc: 'Organized electronic and physical filing, EHR and chart review, and consistent documentation standards.', meta: 'Records' },
  { n: '04', title: 'Billing & Accounts-Payable Support', desc: 'Invoice preparation, AP tracking, insurance verification, copay and payment processing.', meta: 'Finance' },
  { n: '05', title: 'Client & Patient Experience', desc: 'A welcoming, confidential and dependable experience for clients, families, patients and partners — in English and Spanish.', meta: 'Service' },
  { n: '06', title: 'Reporting & Cross-Team Projects', desc: 'Reports, presentations, spreadsheets and follow-through across clinical, finance and leadership teams.', meta: 'Coordination' },
]

export const why = [
  { title: 'Promoted twice in one year', desc: 'Three roles at Vitra Health in under twelve months — a record of trusted judgment.' },
  { title: 'Calm at volume', desc: '100+ calls a day, 25+ schedules, multi-line phones — organized under pressure.' },
  { title: 'Bilingual by default', desc: 'Native English and Spanish for clients, families and staff.' },
  { title: 'Compliance-minded', desc: 'Confidentiality, documentation accuracy and care-plan requirements, every day.' },
  { title: 'Finance-literate', desc: 'Comfortable with billing, invoices, AP and payment reconciliation.' },
  { title: 'Follow-through', desc: 'Outstanding requests get tracked, closed and communicated.' },
]

export const education = [
  { degree: 'B.S. Business Administration', school: 'Southern New Hampshire University', note: 'Expected Spring 2027 · Dean’s List · President’s List, Fall 2025 & Spring 2026' },
  { degree: 'A.S. Business Administration', school: 'Northern Essex Community College', note: '2025' },
]

export const certifications = ['CPR Certified', 'Home Health Aide Certified']

/** §20 — real testimonials only. Leave empty until genuine quotes are supplied; the section hides itself. */
export const testimonials: { quote: string; name: string; role: string }[] = []

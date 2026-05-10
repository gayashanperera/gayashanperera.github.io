import type {
  CodeLine,
  ContactRow,
  FileEntry,
  FileId,
  JobId,
  JobMeta,
  PaletteCommand,
  ProblemEntry,
  Project,
  ProjectId,
  SkillBar,
  SourceControlEntry,
} from './profile.types';

// =============================================================================
// Helpers
// =============================================================================

/** Build a frozen `id`-keyed lookup from a list of records. */
function keyBy<T extends { readonly id: K }, K extends string>(
  items: readonly T[],
): Readonly<Record<K, T>> {
  return Object.freeze(
    items.reduce(
      (acc, item) => {
        acc[item.id] = item;
        return acc;
      },
      {} as Record<K, T>,
    ),
  );
}

// =============================================================================
// Personal info
// =============================================================================

export const CONTACT = {
  email: 'pereragayashan@gmail.com',
  phone: '+94715770954',
  phoneDisplay: '+94 715 770 954',
  linkedinHandle: 'gayashan-perera-301986117',
  linkedinUrl: 'https://linkedin.com/in/gayashan-perera-301986117',
  githubHandle: 'gayashanperera',
  githubUrl: 'https://github.com/gayashanperera',
  location: 'Pitipana North, Homagama, Sri Lanka',
} as const;

// =============================================================================
// Files (sidebar + tabs + outline)
// =============================================================================

export const FILES: readonly FileEntry[] = [
  {
    id: 'profile',
    label: 'profile.ts',
    crumb: 'profile.ts',
    lang: 'TypeScript',
    dotColor: 'var(--str)',
    iconColor: 'var(--fn)',
    iconGlyph: '⌥',
    outlineTitle: 'Symbols · profile.ts',
    symbols: [
      { kind: 'k', name: 'import', line: 'L4' },
      { kind: 't', name: 'Engineer', line: 'L4' },
      { kind: 'v', name: 'gayashan', line: 'L6' },
      { kind: 'f', name: 'at_a_glance', line: 'L22' },
    ],
  },
  {
    id: 'experience',
    label: 'experience.ts',
    crumb: 'experience.ts',
    lang: 'TypeScript',
    dotColor: 'var(--num)',
    iconColor: 'var(--num)',
    iconGlyph: '⌥',
    outlineTitle: 'Symbols · experience.ts',
    symbols: [
      { kind: 'v', name: 'experience[]', line: 'L3' },
      { kind: 'v', name: 'SkillGround', line: 'L4' },
      { kind: 'v', name: 'Synapsys', line: 'L5' },
      { kind: 'v', name: 'Edhirya IT', line: 'L6' },
      { kind: 'v', name: 'Sense', line: 'L7' },
      { kind: 'v', name: 'OpenArc', line: 'L8' },
      { kind: 'v', name: 'education[]', line: 'L12' },
    ],
  },
  {
    id: 'skills',
    label: 'skills.json',
    crumb: 'skills.json',
    lang: 'JSON',
    dotColor: 'var(--fn)',
    iconColor: 'var(--str)',
    iconGlyph: '⌥',
    outlineTitle: 'Keys · skills.json',
    symbols: [
      { kind: 'k', name: 'frontend', line: 'L3' },
      { kind: 'k', name: 'backend', line: 'L5' },
      { kind: 'k', name: 'data', line: 'L7' },
      { kind: 'k', name: 'tools', line: 'L9' },
    ],
  },
  {
    id: 'contact',
    label: 'contact.md',
    crumb: 'contact.md',
    lang: 'Markdown',
    dotColor: 'var(--kw)',
    iconColor: 'var(--kw)',
    iconGlyph: '⌥',
    outlineTitle: 'Headings · contact.md',
    symbols: [
      { kind: 't', name: '# Let’s build…', line: 'L1' },
      { kind: 't', name: '## channels', line: 'L5' },
      { kind: 't', name: '## availability', line: 'L11' },
    ],
  },
];

export const FILES_BY_ID: Readonly<Record<FileId, FileEntry>> = keyBy(FILES);

// =============================================================================
// Projects (single source of truth — pill tone, palette colors, mapping to job)
// =============================================================================

export const PROJECTS: readonly Project[] = [
  {
    id: 'skillground',
    name: 'SkillGround',
    year: '2022→',
    tone: 'str',
    iconColor: 'var(--str)',
    jobId: 'skillground',
    paletteSub: '2022 → Now · Frontend lead',
    paletteIconBg: '#1f2e1a',
    paletteIconColor: '#b8e88a',
  },
  {
    id: 'medics',
    name: 'Medics',
    year: '2018',
    tone: 'fn',
    iconColor: 'var(--fn)',
    jobId: 'synapsys',
    paletteSub: 'Healthcare · Angular 13',
    paletteIconBg: '#1a2440',
    paletteIconColor: '#82aaff',
  },
  {
    id: 'smartah',
    name: 'SmartAH',
    year: '2021',
    tone: 'num',
    iconColor: 'var(--num)',
    jobId: 'edhirya',
    paletteSub: 'ERP/HRM · multi-tenant',
    paletteIconBg: '#3a2418',
    paletteIconColor: '#f78c6c',
  },
  {
    id: 'beautech',
    name: 'Beautech',
    year: '2021',
    tone: 'kw',
    iconColor: 'var(--kw)',
    jobId: 'edhirya',
    paletteSub: 'Salon platform · Angular 7',
    paletteIconBg: '#2a1f3d',
    paletteIconColor: '#c792ea',
  },
  {
    id: 'dentalpro',
    name: 'DentalPro',
    year: '2017',
    tone: 'default',
    iconColor: 'var(--type)',
    jobId: 'edhirya',
    paletteSub: 'Clinic management · Laravel',
    paletteIconBg: '#3a2418',
    paletteIconColor: '#ffd479',
  },
  {
    id: 'cherri',
    name: 'CHERRI',
    year: '2017',
    tone: 'str',
    iconColor: 'var(--tag)',
    jobId: 'sense',
    paletteSub: 'E-commerce · Facebook API',
    paletteIconBg: '#3a1818',
    paletteIconColor: '#f07178',
  },
  {
    id: 'galle',
    name: 'Galle Motors',
    year: '2017',
    tone: 'fn',
    iconColor: 'var(--prop)',
    jobId: 'sense',
    paletteSub: 'Stock & payments',
    paletteIconBg: '#1a2e2a',
    paletteIconColor: '#7fdbca',
  },
  {
    id: 'classroom',
    name: 'Classroom Salon',
    year: '2016',
    tone: 'num',
    iconColor: 'var(--str)',
    jobId: 'openarc',
    paletteSub: 'E-learning · .NET',
    paletteIconBg: '#1f2e1a',
    paletteIconColor: '#b8e88a',
  },
];

export const PROJECT_TO_JOB: Readonly<Record<ProjectId, JobId>> = Object.freeze(
  PROJECTS.reduce(
    (acc, p) => {
      acc[p.id] = p.jobId;
      return acc;
    },
    {} as Record<ProjectId, JobId>,
  ),
);

// =============================================================================
// Source control entries (sidebar)
// =============================================================================

export const SOURCE_CONTROL: readonly SourceControlEntry[] = [
  { file: 'profile.ts', status: 'M', diff: '+12 -3' },
  { file: 'skills.json', status: '+', diff: 'new' },
  { file: 'contact.md', status: '+', diff: 'new' },
];

// =============================================================================
// Jobs / experience timeline
// =============================================================================

export const JOBS: readonly JobMeta[] = [
  {
    id: 'skillground',
    company: 'SkillGround (Pvt) Ltd',
    years: '2022 — Now',
    role: 'Senior Frontend',
    fullRole: 'SkillGround — Senior Software Engineer · Frontend',
    metaChips: ['📅 Apr 2022 — Present', '🇱🇰 Sri Lanka', '📍 Lead role'],
    summary:
      'Lead frontend architecture for a modern skills assessment and learning platform — Angular 18+, RxJS, reusable component libraries, render performance, accessibility, and mentorship.',
    bullets: [
      'Engineered reusable UI component libraries; optimised render perf for measurable load-speed gains.',
      'Implemented responsive, accessible interfaces across browsers using SCSS best practices.',
      'Collaborated with Node.js backend teams for seamless end-to-end feature delivery.',
      'Mentored junior developers and ran code reviews to maintain quality standards.',
    ],
    stack: [
      { text: 'Angular 18+', tone: 'kw' },
      { text: 'RxJS', tone: 'kw' },
      { text: 'Node.js', tone: 'str' },
      { text: 'SCSS', tone: 'default' },
      { text: 'TypeScript', tone: 'default' },
    ],
  },
  {
    id: 'synapsys',
    company: 'Synapsys (Pvt) Ltd',
    years: '2021 — 2022',
    role: 'Senior Full Stack',
    fullRole: 'Synapsys — Senior Software Engineer · Full Stack',
    metaChips: ['📅 Nov 2021 — Apr 2022', '🏥 Healthcare', '🛠 Medics'],
    summary:
      'Developed Medics, a healthcare management platform enabling digital patient records, appointment booking, and clinical workflow automation.',
    bullets: [
      'Built Medics on Angular 13 + Node.js with full-stack ownership of features end to end.',
      'Integrated Firebase for real-time data sync and authentication, ensuring secure access to sensitive medical data.',
      'Designed and implemented RESTful APIs and DB schemas to support multi-tenant architectures.',
      'Collaborated with healthcare professionals to translate domain requirements into intuitive user interfaces.',
      'Delivered full-stack features independently, reducing dependency on external resources and accelerating sprint delivery.',
    ],
    stack: [
      { text: 'Angular 13', tone: 'kw' },
      { text: 'Node.js', tone: 'str' },
      { text: 'Firebase', tone: 'fn' },
      { text: 'REST', tone: 'default' },
    ],
  },
  {
    id: 'edhirya',
    company: 'Edhirya IT (Pvt) Ltd',
    years: '2018 — 2021',
    role: 'SE → Senior',
    fullRole: 'Edhirya IT — Software Engineer → Senior · Full Stack',
    metaChips: ['📅 Aug 2018 — Nov 2021', '🛠 DentalPro · Beautech · SmartAH'],
    summary:
      'Three full-stack products across dental clinic management, salon operations, and ERP/HRM. Promoted from Software Engineer to Senior.',
    bullets: [
      'Built DentalPro, a dental clinic management system handling patient records, treatment plans, and billing on PHP Laravel + AngularJS.',
      'Developed Beautech, a dynamic salon management platform — appointment scheduling, inventory tracking, and client management on Angular 7 + PHP.',
      'Built SmartAH, a comprehensive ERP & HRM solution with payroll, attendance, and resource-planning modules.',
      'Designed and implemented RESTful APIs and DB schemas to support multi-tenant architectures.',
      'Progressed from Software Engineer to Senior through consistent delivery and technical leadership.',
      'Delivered full-stack features independently, reducing dependency on external resources and accelerating sprint delivery.',
    ],
    stack: [
      { text: 'Angular 7', tone: 'kw' },
      { text: 'AngularJS', tone: 'kw' },
      { text: 'PHP', tone: 'str' },
      { text: 'Laravel', tone: 'str' },
      { text: 'MySQL', tone: 'num' },
    ],
  },
  {
    id: 'sense',
    company: 'Sense (Pvt) Ltd',
    years: '2017 — 2018',
    role: 'Full Stack',
    fullRole: 'Sense — Full Stack Developer',
    metaChips: ['📅 Aug 2017 — Aug 2018', '🛠 CHERRI · Galle Motors'],
    summary: 'Two full-stack products — an e-commerce platform and a stock control / payments system.',
    bullets: [
      'Developed CHERRI, an e-commerce platform with shopping-cart functionality, payment processing, and Facebook API integration.',
      'Created Galle Motors, a stock control and payment system streamlining inventory management and financial transactions.',
      'Built RESTful APIs and DB schemas to support transactional, high-availability workflows.',
    ],
    stack: [
      { text: 'AngularJS', tone: 'kw' },
      { text: 'Laravel', tone: 'str' },
      { text: 'MySQL', tone: 'num' },
    ],
  },
  {
    id: 'openarc',
    company: 'OpenArc (Pvt) Ltd',
    years: '2016 — 2017',
    role: 'Full Stack',
    fullRole: 'OpenArc — Full Stack Developer',
    metaChips: ['📅 Mar 2016 — Jul 2017', '🎓 E-Learning'],
    summary:
      'Classroom Salon — an e-learning platform supporting course delivery, student progress tracking, and content management.',
    bullets: [
      'Integrated Facebook and Google APIs for social login and third-party authentication.',
      'Designed and tuned SQL Server schema to support concurrent user sessions at scale.',
    ],
    stack: [
      { text: '.NET', tone: 'kw' },
      { text: 'AngularJS', tone: 'kw' },
      { text: 'SQL Server', tone: 'num' },
    ],
  },
];

export const JOBS_BY_ID: Readonly<Record<JobId, JobMeta>> = keyBy(JOBS);

// =============================================================================
// Skills bars (skills.json panel)
// =============================================================================

export const SKILLS: readonly SkillBar[] = [
  { name: 'Angular 7–18+', pct: 98, group: 'frontend' },
  { name: 'RxJS', pct: 92, group: 'frontend' },
  { name: 'TypeScript', pct: 94, group: 'frontend' },
  { name: 'SCSS / CSS3', pct: 90, group: 'frontend' },
  { name: 'React.js', pct: 72, group: 'frontend' },
  { name: 'Vue.js', pct: 60, group: 'frontend' },
  { name: 'Node.js', pct: 86, group: 'backend' },
  { name: 'PHP / Laravel', pct: 82, group: 'backend' },
  { name: '.NET', pct: 68, group: 'backend' },
  { name: 'Firebase', pct: 80, group: 'backend' },
  { name: 'REST APIs', pct: 92, group: 'backend' },
  { name: 'MySQL', pct: 86, group: 'data' },
  { name: 'SQL Server', pct: 78, group: 'data' },
  { name: 'Git', pct: 92, group: 'tools' },
  { name: 'SVN', pct: 70, group: 'tools' },
  { name: 'VS Code & WebStorm', pct: 96, group: 'tools' },
];

// =============================================================================
// Contact rows (contact.md panel)
// =============================================================================

export const CONTACT_ROWS: readonly ContactRow[] = [
  { label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { label: 'Phone', value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
  {
    label: 'LinkedIn',
    value: `/${CONTACT.linkedinHandle}`,
    href: CONTACT.linkedinUrl,
    external: true,
  },
  {
    label: 'GitHub',
    value: `/${CONTACT.githubHandle}`,
    href: CONTACT.githubUrl,
    external: true,
  },
  { label: 'Location', value: CONTACT.location, href: '#' },
];

// =============================================================================
// Problems pane
// =============================================================================

export const PROBLEMS: readonly ProblemEntry[] = [
  { severity: 'i', text: 'No blocking issues. Codebase is hire-ready.', file: 'profile.ts · status' },
  {
    severity: 'i',
    text: 'Suggestion: open contact.md to schedule a chat.',
    file: 'contact.md · ⌘K → "email"',
  },
  {
    severity: 'w',
    text: 'Recruiter timeout warning: 30s on this page already. Make a move.',
    file: 'linter · job-ready/eager-recruiter',
  },
];

// =============================================================================
// profile.ts panel — typed code lines
// =============================================================================

export const PROFILE_PANEL_LINES: readonly CodeLine[] = [
  { num: 1, tokens: [{ kind: 'comment', text: '// ~/profile.ts — Gayashan Perera' }] },
  {
    num: 2,
    tokens: [{ kind: 'comment', text: '// 8+ years frontend, full-stack curiosity, healthcare → ERP.' }],
  },
  { num: 3, tokens: [] },
  {
    num: 4,
    tokens: [
      { kind: 'kw', text: 'import' },
      { kind: 'text', text: ' { ' },
      { kind: 'type', text: 'Engineer' },
      { kind: 'text', text: ' } ' },
      { kind: 'kw', text: 'from' },
      { kind: 'text', text: ' ' },
      { kind: 'str', text: '"./types"' },
      { kind: 'text', text: ';' },
    ],
  },
  { num: 5, tokens: [] },
  {
    num: 6,
    tokens: [
      { kind: 'kw', text: 'export const' },
      { kind: 'text', text: ' ' },
      { kind: 'fn', text: 'gayashan' },
      { kind: 'text', text: ': ' },
      { kind: 'type', text: 'Engineer' },
      { kind: 'text', text: ' = {' },
    ],
  },
  {
    num: 7,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'name' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"Gayashan Perera"' },
      { kind: 'text', text: ',' },
    ],
  },
  {
    num: 8,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'role' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"Senior Software Engineer · Frontend"' },
      { kind: 'text', text: ',' },
    ],
  },
  {
    num: 9,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'years' },
      { kind: 'text', text: ': ' },
      { kind: 'num', text: '8' },
      { kind: 'text', text: ',' },
    ],
  },
  {
    num: 10,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'based' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"Pitipana North, Homagama, LK"' },
      { kind: 'text', text: ',' },
    ],
  },
  {
    num: 11,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'timezone' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"Asia/Colombo"' },
      { kind: 'text', text: ',' },
    ],
  },
  {
    num: 12,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'github' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: `"${CONTACT.githubUrl}"` },
      { kind: 'text', text: ',' },
    ],
  },
  {
    num: 13,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'linkedin' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: `"${CONTACT.linkedinUrl}"` },
      { kind: 'text', text: ',' },
    ],
  },
  {
    num: 14,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'available' },
      { kind: 'text', text: ': ' },
      { kind: 'kw', text: 'true' },
      { kind: 'text', text: ', ' },
      { kind: 'comment', text: '// open to senior frontend roles' },
    ],
  },
  { num: 15, tokens: [{ kind: 'text', text: '};' }] },
  { num: 16, tokens: [] },
  {
    num: 17,
    tokens: [
      {
        kind: 'hero',
        leadingText: 'Building ',
        accents: ['considered', '2016'],
        trailingText: ' web\napplications since ',
        sub:
          'Specialised in the Angular ecosystem — Angular 7→18+, RxJS, TypeScript — with full-stack range across Node.js, PHP/Laravel and .NET. Shipped products in healthcare, ERP, e-commerce, and learning. Mentors juniors, runs reviews, ships clean.',
      },
    ],
  },
  { num: 18, tokens: [] },
  { num: 19, tokens: [{ kind: 'comment', text: '// Open files in the explorer ← or hit ⌘K to search.' }] },
  { num: 20, tokens: [{ kind: 'comment', text: '// Hover any project pill below to see its case study.' }] },
  { num: 21, tokens: [] },
  {
    num: 22,
    tokens: [
      { kind: 'kw', text: 'export const' },
      { kind: 'text', text: ' ' },
      { kind: 'fn', text: 'at_a_glance' },
      { kind: 'text', text: ' = {' },
    ],
  },
  {
    num: 23,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'products' },
      { kind: 'text', text: ': [' },
      ...PROJECTS.map(
        (p) =>
          ({ kind: 'pill', text: p.name, tone: p.tone, projectId: p.id } as const),
      ),
      { kind: 'text', text: '],' },
    ],
  },
  {
    num: 24,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'industries' },
      { kind: 'text', text: ': [' },
      { kind: 'str', text: '"Healthcare"' },
      { kind: 'text', text: ', ' },
      { kind: 'str', text: '"E-Commerce"' },
      { kind: 'text', text: ', ' },
      { kind: 'str', text: '"ERP"' },
      { kind: 'text', text: ', ' },
      { kind: 'str', text: '"Learning"' },
      { kind: 'text', text: '],' },
    ],
  },
  {
    num: 25,
    tokens: [
      { kind: 'text', text: '  ' },
      { kind: 'prop', text: 'strengths' },
      { kind: 'text', text: ': [' },
      { kind: 'str', text: '"Angular architecture"' },
      { kind: 'text', text: ', ' },
      { kind: 'str', text: '"RxJS"' },
      { kind: 'text', text: ', ' },
      { kind: 'str', text: '"Component libraries"' },
      { kind: 'text', text: ', ' },
      { kind: 'str', text: '"Mentorship"' },
      { kind: 'text', text: ', ' },
      { kind: 'str', text: '"Render perf"' },
      { kind: 'text', text: '],' },
    ],
  },
  {
    num: 26,
    tokens: [
      { kind: 'text', text: '};' },
      { kind: 'cursor' },
    ],
  },
];

// =============================================================================
// experience.ts panel — head + dynamic job rows + tail
// =============================================================================

function jobLine(num: number, job: JobMeta): CodeLine {
  return {
    num,
    jobId: job.id,
    toggle: true,
    tokens: [
      { kind: 'text', text: '{ ' },
      { kind: 'prop', text: 'company' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: `"${job.company}"` },
      { kind: 'text', text: ', ' },
      { kind: 'prop', text: 'years' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: `"${job.years}"` },
      { kind: 'text', text: ', ' },
      { kind: 'prop', text: 'role' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: `"${job.role}"` },
      { kind: 'text', text: ' },' },
    ],
  };
}

const EXPERIENCE_HEAD_LINES = 3;
const FIRST_JOB_LINE = EXPERIENCE_HEAD_LINES + 1;
const POST_JOBS_LINE = FIRST_JOB_LINE + JOBS.length;

export const EXPERIENCE_PANEL_HEAD: readonly CodeLine[] = [
  {
    num: 1,
    tokens: [{ kind: 'comment', text: '// experience.ts — most recent first. Click any company to expand.' }],
  },
  { num: 2, tokens: [] },
  {
    num: 3,
    tokens: [
      { kind: 'kw', text: 'export const' },
      { kind: 'text', text: ' ' },
      { kind: 'fn', text: 'experience' },
      { kind: 'text', text: ' = [' },
    ],
  },
];

export const EXPERIENCE_PANEL_JOBS: readonly CodeLine[] = JOBS.map((j, i) =>
  jobLine(FIRST_JOB_LINE + i, j),
);

export const EXPERIENCE_PANEL_TAIL: readonly CodeLine[] = [
  { num: POST_JOBS_LINE, tokens: [{ kind: 'text', text: '];' }] },
  { num: POST_JOBS_LINE + 1, tokens: [] },
  { num: POST_JOBS_LINE + 2, tokens: [{ kind: 'comment', text: '// EDUCATION' }] },
  {
    num: POST_JOBS_LINE + 3,
    tokens: [
      { kind: 'kw', text: 'export const' },
      { kind: 'text', text: ' ' },
      { kind: 'fn', text: 'education' },
      { kind: 'text', text: ' = [' },
    ],
  },
  {
    num: POST_JOBS_LINE + 4,
    tokens: [
      { kind: 'text', text: '  { ' },
      { kind: 'prop', text: 'degree' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"Bachelor of Information Technology"' },
      { kind: 'text', text: ', ' },
      { kind: 'prop', text: 'at' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"University of Colombo · UCSC"' },
      { kind: 'text', text: ', ' },
      { kind: 'prop', text: 'years' },
      { kind: 'text', text: ': [' },
      { kind: 'num', text: '2013' },
      { kind: 'text', text: ', ' },
      { kind: 'num', text: '2017' },
      { kind: 'text', text: '] },' },
    ],
  },
  {
    num: POST_JOBS_LINE + 5,
    tokens: [
      { kind: 'text', text: '  { ' },
      { kind: 'prop', text: 'degree' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"Diploma in English"' },
      { kind: 'text', text: ', ' },
      { kind: 'prop', text: 'at' },
      { kind: 'text', text: ': ' },
      { kind: 'str', text: '"ESOFT Metro Campus"' },
      { kind: 'text', text: ', ' },
      { kind: 'prop', text: 'year' },
      { kind: 'text', text: ': ' },
      { kind: 'num', text: '2013' },
      { kind: 'text', text: ' },' },
    ],
  },
  {
    num: POST_JOBS_LINE + 6,
    tokens: [
      { kind: 'text', text: '];' },
      { kind: 'cursor' },
    ],
  },
];

// =============================================================================
// Command palette (⌘K)
// =============================================================================

const FILE_PALETTE_COMMANDS: readonly PaletteCommand[] = [
  {
    section: 'Files',
    id: 'open-profile',
    icon: 'TS',
    iconBg: '#1a2440',
    iconColor: '#82aaff',
    label: 'profile.ts',
    sub: 'Open profile overview',
    action: { kind: 'open-file', file: 'profile' },
  },
  {
    section: 'Files',
    id: 'open-experience',
    icon: 'TS',
    iconBg: '#1a2440',
    iconColor: '#82aaff',
    label: 'experience.ts',
    sub: 'Open career timeline',
    action: { kind: 'open-file', file: 'experience' },
  },
  {
    section: 'Files',
    id: 'open-skills',
    icon: '{}',
    iconBg: '#1f2e1a',
    iconColor: '#b8e88a',
    label: 'skills.json',
    sub: 'Open skills list',
    action: { kind: 'open-file', file: 'skills' },
  },
  {
    section: 'Files',
    id: 'open-contact',
    icon: 'MD',
    iconBg: '#2a1f3d',
    iconColor: '#c792ea',
    label: 'contact.md',
    sub: 'Open contact info',
    action: { kind: 'open-file', file: 'contact' },
  },
];

const ACTION_PALETTE_COMMANDS: readonly PaletteCommand[] = [
  {
    section: 'Actions',
    id: 'send-email',
    icon: '✉',
    iconBg: '#3a2418',
    iconColor: '#f78c6c',
    label: 'Send email',
    sub: CONTACT.email,
    action: { kind: 'mailto', to: CONTACT.email },
  },
  {
    section: 'Actions',
    id: 'call-phone',
    icon: '☎',
    iconBg: '#3a2418',
    iconColor: '#f78c6c',
    label: 'Call phone',
    sub: CONTACT.phoneDisplay,
    action: { kind: 'tel', number: CONTACT.phone },
  },
  {
    section: 'Actions',
    id: 'open-linkedin',
    icon: 'in',
    iconBg: '#1a2440',
    iconColor: '#82aaff',
    label: 'Open LinkedIn',
    sub: CONTACT.linkedinHandle,
    action: { kind: 'href', url: CONTACT.linkedinUrl },
  },
  {
    section: 'Actions',
    id: 'open-github',
    icon: 'gh',
    iconBg: '#1d2230',
    iconColor: '#7fdbca',
    label: 'Open GitHub',
    sub: CONTACT.githubHandle,
    action: { kind: 'href', url: CONTACT.githubUrl },
  },
];

const PROJECT_PALETTE_COMMANDS: readonly PaletteCommand[] = PROJECTS.map((p) => ({
  section: 'Projects',
  id: `open-project-${p.id}`,
  icon: '▸',
  iconBg: p.paletteIconBg,
  iconColor: p.paletteIconColor,
  label: p.name,
  sub: p.paletteSub,
  action: { kind: 'open-project', project: p.id },
}));

const PANEL_PALETTE_COMMANDS: readonly PaletteCommand[] = [
  {
    section: 'Panels',
    id: 'show-terminal',
    icon: '▣',
    iconBg: '#1d2230',
    iconColor: '#7fdbca',
    label: 'Show terminal',
    sub: 'Right panel → terminal',
    action: { kind: 'right-pane', pane: 'terminal' },
  },
  {
    section: 'Panels',
    id: 'show-outline',
    icon: '▣',
    iconBg: '#1d2230',
    iconColor: '#7fdbca',
    label: 'Show outline',
    sub: 'Right panel → outline',
    action: { kind: 'right-pane', pane: 'outline' },
  },
];

export const PALETTE_COMMANDS: readonly PaletteCommand[] = [
  ...FILE_PALETTE_COMMANDS,
  ...ACTION_PALETTE_COMMANDS,
  ...PROJECT_PALETTE_COMMANDS,
  ...PANEL_PALETTE_COMMANDS,
];

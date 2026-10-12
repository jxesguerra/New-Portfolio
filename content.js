const CONTENT = {
  name: 'Your Name',
  tagline: 'Building the future, rooted in home.',
  bio: "A Computer Science student turning curiosity into code. Inspired by the warmth of Filipino culture, I build thoughtful digital experiences with a little imagination and a lot of heart.",
  location: 'City, Philippines',
  school: 'Your University',
  email: '', // e.g. hello@yourdomain.com
  github: '', // full profile URL
  linkedin: '', // full profile URL
  images: { portrait: '', hero: '', stack: '', projects: '', contact: '' }, // portrait = your face photo in the introduction
  skills: [
    { category: 'Languages', items: [{name:'Python', mark:'Py', use:'Automation, algorithms, and turning data into useful answers.'},{name:'JavaScript',mark:'JS',use:'Interactive websites and playful browser experiences.'},{name:'Java',mark:'Ja',use:'Object-oriented applications and core CS coursework.'},{name:'HTML & CSS',mark:'</>',use:'Accessible structure and carefully crafted interfaces.'}] },
    { category: 'Frameworks', items: [{name:'React',mark:'⚛',use:'Reusable interfaces and state-driven web apps.'},{name:'Tailwind CSS',mark:'≈',use:'Consistent, responsive design systems.'}] },
    { category: 'Tools', items: [{name:'Git & GitHub',mark:'⑂',use:'Version control, collaboration, and documenting the journey.'},{name:'Figma',mark:'Fg',use:'Exploring ideas before writing the first line of code.'},{name:'VS Code',mark:'⌘',use:'My everyday workshop for making things.'}] },
    { category: 'Databases', items: [{name:'MySQL',mark:'My',use:'Structured data and relational database projects.'},{name:'Firebase',mark:'Fb',use:'Prototyping real-time student applications.'}] }
  ],
  projects: [
    { title:'Bayanihan Board', kind:'COMMUNITY · WEB APP', year:'01 / 2026', description:'A small space for big acts of kindness. Connecting neighbors through local initiatives.', details:'A sample community platform concept for sharing volunteer opportunities, local events, and neighborhood resources. Replace this entry with your own project, screenshots, and a description of your contribution.', tags:['React','Firebase','Tailwind'], art:'community', demo:'', repo:'', screenshot:'' },
    { title:'Palengke Planner', kind:'PRODUCTIVITY · MOBILE-FIRST', year:'02 / 2026', description:'From the market to your kitchen. A smarter way to plan groceries and everyday meals.', details:'A sample mobile-first grocery planner concept with shopping lists, meal categories, and budget summaries. Replace this entry with the real problem you solved, your approach, and what you learned.', tags:['JavaScript','MySQL','CSS'], art:'market', demo:'', repo:'', screenshot:'' },
    { title:'Lakbay Learning', kind:'EDUCATION · INTERACTIVE', year:'03 / 2026', description:'Learning is a journey. Making computer science a little more accessible, one lesson at a time.', details:'A sample interactive learning concept for visualizing algorithms and exploring Computer Science fundamentals. Replace this entry with a real project and its outcomes.', tags:['Python','React','Figma'], art:'learning', demo:'', repo:'', screenshot:'' }
  ],
  // CERTIFICATES — add one line per certificate.
  // image: filename next to this HTML file (e.g. 'cert-python.jpg') or a data:image URL. Leave '' for a placeholder.
  // link: optional verification URL (https://...). credential: optional ID shown on the card.
  certificates: [
    { title:'Your Certificate Title', issuer:'ISSUING ORGANIZATION', date:'2026', credential:'', image:'', link:'' },
    { title:'Another Certificate', issuer:'ISSUING ORGANIZATION', date:'2025', credential:'', image:'', link:'' },
    { title:'One More Milestone', issuer:'ISSUING ORGANIZATION', date:'2025', credential:'', image:'', link:'' }
  ]
};

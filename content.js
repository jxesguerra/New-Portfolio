/* EDIT YOUR CONTENT HERE — the only content configuration you need.
   Image values are filenames next to index.html (pfp.png, project1.png ...).
   If an image file is missing, an original illustration is shown instead.
   The contact form prepares an email in the visitor's mail app (no server needed). */
const CONTENT = {
  name: 'John Xairon V. Esguerra',
  shortName: 'Xairon', // shown in the navigation bar
  tagline: 'Building the future, rooted in home.',
  bio: "I am a fourth-year student of Bachelor of Science in Computer Science who loves to learn and excel academically. I always try to improve my abilities, enhance my knowledge base, and bring an upbeat approach to my studies and organizations. With hard work and dedication, I strive to maintain excellence and help my team grow and prosper.",
  location: 'Philippines',
  school: 'Philippine Christian University · BS Computer Science',
  portraitCaption: ['4TH YEAR / BSCS', 'GRADUATING 2027'],
  email: 'johnxaironesguerra@gmail.com',
  github: 'https://github.com/jxesguerra',
  linkedin: 'https://www.linkedin.com/in/john-xairon-esguerra-33416a422',
  images: { portrait: 'pfp.png', hero: '', stack: '', projects: '', contact: '' },
  skills: [
    { category: 'Languages', items: [
      {name:'C++', mark:'C++', use:'Core programming and problem solving.'},
      {name:'C#', mark:'C#', use:'Object-oriented programming and desktop development.'},
      {name:'Java', mark:'Ja', use:'Desktop apps such as my Library Management System.'},
      {name:'PHP', mark:'PHP', use:'Server-side logic for the attendance system and Laravel web apps.'},
      {name:'Kotlin', mark:'Kt', use:'Native Android development for the Mobile Data Terminal app.'},
      {name:'JavaScript', mark:'JS', use:'Interactive, dynamic front-ends.'},
      {name:'CSS', mark:'CSS', use:'Styling and responsive layouts.'},
      {name:'HTML', mark:'H5', use:'Semantic, accessible page structure.'},
      {name:'XML', mark:'XML', use:'Android layouts and structured data.'}
    ] },
    { category: 'Frameworks', items: [
      {name:'Laravel', mark:'Lv', use:'Web management system behind the Mobile Data Terminal.'},
      {name:'Bootstrap', mark:'Bs', use:'Fast, responsive interface design.'},
      {name:'Java Swing', mark:'Sw', use:'The desktop GUI of my Library Management System.'}
    ] },
    { category: 'Backend', items: [
      {name:'MySQL', mark:'My', use:'Relational databases for storing and querying records.'},
      {name:'AWS', mark:'AWS', use:'Cloud services and deployment.'}
    ] },
    { category: 'Tools', items: [
      {name:'GitHub', mark:'⑂', use:'Version control and team collaboration.'},
      {name:'Docker', mark:'Dk', use:'Containerized, repeatable environments.'},
      {name:'Visual Studio', mark:'VS', use:'Building and debugging C# and C++ projects.'},
      {name:'Android Studio', mark:'AS', use:'Building and testing mobile apps.'},
      {name:'Eclipse', mark:'Ec', use:'Java development and coursework.'},
      {name:'Figma', mark:'Fg', use:'Designing interfaces before writing code.'}
    ] }
  ],
  projects: [
    {
      title: 'Library Management System',
      kind: 'DESKTOP APP · JAVA SWING',
      year: 'PROJECT 01',
      description: 'A Java desktop app for managing books, tracking records, and handling everyday library operations through an interactive GUI.',
      details: 'A Java-based desktop application built with Java Swing, using a text file (.txt) as a lightweight database. It allows users to manage books, track records, and handle basic library operations through an interactive GUI.',
      role: 'Front-end Developer',
      contributions: ['Built the log-in interface.', 'Developed the borrower interface.'],
      tags: ['Java', 'Java Swing'],
      art: 'learning', demo: '', repo: '', screenshot: 'project1.png'
    },
    {
      title: 'Student Attendance Monitoring System',
      kind: 'WEB APP · ATTENDANCE',
      year: 'PROJECT 02',
      description: 'A simple web-based system that helps teachers and students manage and track attendance efficiently.',
      details: 'A simple web-based attendance system built with PHP, HTML, CSS, JavaScript and JSON. Developed during our second year to help manage and track student attendance efficiently.',
      role: 'Full Stack Developer',
      contributions: ['Built the login interface for both teachers and students.', 'Developed the user interfaces for teacher and student accounts.', 'Assisted in implementing the backend logic for retrieving data and displaying it on the front end.'],
      tags: ['PHP', 'HTML', 'CSS', 'JavaScript'],
      art: 'community', demo: '', repo: '', screenshot: 'project2.png'
    },
    {
      title: 'Mobile Data Terminal [App / Web]',
      kind: 'MOBILE + WEB · MDT',
      year: 'PROJECT 03',
      description: 'A mobile app with license and plate scanning, plus a web system that manages records to speed up civilian data retrieval.',
      details: 'A Mobile Data Terminal (MDT) mobile application with a web-based management system, designed to speed up civilian data retrieval. The mobile app features license and vehicle plate scanning, so users can quickly search and access relevant records. The web system manages and stores the information, making it easier to maintain and update data.',
      role: 'Front-end Developer',
      contributions: ['Built the front-end interface for the mobile app.', 'Redesigned the login page and admin interface for the web application.'],
      tags: ['HTML', 'PHP', 'Laravel', 'Bootstrap', 'Kotlin', 'JavaScript'],
      art: 'market', demo: '', repo: '', screenshot: 'project3.png'
    }
  ],
  // CERTIFICATES — leave empty to hide the section. To show it, add one line per certificate:
  // { title:'Certificate title', issuer:'ISSUING ORGANIZATION', date:'2026', credential:'', image:'cert-1.jpg', link:'https://...' }
  certificates: []
};
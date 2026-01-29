export const profile = {
  name: 'Arjun Deshmukh',
  role: 'Frontend Developer',
  tagline: 'Building elegant digital experiences.',
  bio: 'I craft clean, performant interfaces with React and modern web technologies. Focused on user experience and pixel-perfect design.',
  email: 'arjundeshmukh26@gmail.com',
  location: 'Pune, Maharashtra',
  resumeUrl: '/resume2026.pdf',
  experienceYears: 2,
  specializations: 'Web Development and Android Development',
  bioShort: 'With 2 years of experience, I have honed my skills in Web Development and Android Development, creating dynamic and responsive websites and apps.',
  githubUsername: 'deshmukharjun',
  social: {
    github: 'https://github.com/deshmukharjun',
    linkedin: 'https://www.linkedin.com/in/arjundeshmukh26/',
    instagram: 'https://instagram.com/arjundeshmukhh',
    instagramArt: 'https://instagram.com/arjun.3d',
    youtube: 'https://www.youtube.com/@arjundeshmukhh',
  },
}

/** Hero: audience tabs and copy that changes by viewer (Billy Sweeney style) */
export const heroAudiences = [
  { id: 'anyone', label: 'For anyone', copy: "Hello there, I'm a developer who cares about making useful things that look good and work well." },
  { id: 'recruiter', label: 'For Recruiters', copy: "I'm a Fullstack Web & Android developer with 3 years of experience. Open to roles in Pune and remote." },
  {
    id: 'video',
    label: 'For Video Editors',
    copy: "I cut and composite in Premiere Pro, After Effects, and Blender. Always happy to collaborate on edits and creative projects.",
    youtube: true,
  },
  {
    id: 'engineers',
    label: 'For Engineers',
    copy: "I'm {highly_creative} and while current_role != \"SDE\", I can definitely git checkout your vision;",
    repoThisApp: 'https://iphone-react-js.vercel.app/',
    repoThatOne: 'https://github.com/deshmukharjun/guess-the-flag',
  },
]

/** Bento grid copy — short for single-screen fit */
export const bentoIntro = {
  title: "Who am I?",
  heading: "I'm Arjun Deshmukh",
  body: "Fullstack Developer in Pune. 3 years building web & Android apps. Open to new challenges and collaborations. I am a quick learner and I am always looking to improve my skills.",
}
export const bentoRole = {
  text: "Fullstack Web & Android Developer",
}
export const bentoQuote = {
  text: '"The only way to do great work is to love what you do."',
}

export const bentoPassion = {
  heading: "My Passion for Coding",
  body: "I love solving problems through code. Programming is my profession and passion—exploring new tech and creating something special.",
}

export const bentoTechStack = {
  heading: "Tech Stack",
  items: [
    { name: 'React', color: '#61dafb' },
    { name: 'Three.js', color: '#fff' },
    { name: 'Tailwind', color: '#06b6d4' },
    { name: 'Android', color: '#3ddc84' },
    { name: 'Git', color: '#f97316' },
    { name: 'Firebase', color: '#f97316' },
    { name: 'Java', color: '#ef4444' },
    { name: 'Kotlin', color: '#a855f7' },
  ],
}

export const bentoContact = {
  heading: "Contact me",
  email: profile.email,
}

/** My Work section — list on left, device preview on hover (Seyit Yilmaz style) */
export const workItems = [
  { id: 1, title: 'Vibha Realties', year: '2026', device: 'laptop' },
  { id: 2, title: 'Vibha Mobile App', year: '2026', device: 'phone' },
  { id: 3, title: 'Swipeflix', year: '2025', device: 'phone' },
  { id: 4, title: 'Valorant Landing Page', year: '2024', device: 'Laptop' },
  { id: 5, title: 'Iphone 15 Webpage', year: '2024', device: 'laptop' },
  { id: 6, title: 'Manache 5 App', year: '2023', device: 'phone' },
]

export const projects = [
  {
    id: 1,
    title: 'Project One',
    description: 'A modern web application built with React and Node.js. Focus on performance and accessibility.',
    tags: ['React', 'Node.js', 'Tailwind'],
    image: null,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Project Two',
    description: 'Full-stack dashboard with real-time data and clean UI. Built for scalability.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    image: null,
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Project Three',
    description: 'Interactive 3D experience using Three.js. Pushing the boundaries of web graphics.',
    tags: ['Three.js', 'React', 'GSAP'],
    image: null,
    liveUrl: '#',
    githubUrl: '#',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

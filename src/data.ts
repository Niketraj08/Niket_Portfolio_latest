import { Project, EducationMilestone, SkillCategory, StatItem } from './types';

export const PERSONAL_INFO = {
  name: 'Niket Raj',
  title: 'Full-Stack Developer & DevOps Enthusiast',
  tagline: 'Building production-grade cloud architectures & visually stunning user experiences.',
  email: 'niketrajkvs@gmail.com',
  github: 'https://github.com/Niketraj08',
  linkedin: 'https://www.linkedin.com/in/niket-raj-aab9a5265/',
  college: 'Gandhi Engineering College',
  branch: 'Computer Science and Engineering (CSE)',
  batch: '2022 – 2026',
  bio: 'Final-year Computer Science student passionate about system design, web technology, and developer tooling. Experienced in building full-stack applications with high-fidelity frontend layouts and cloud-native integrations. Always optimizing for sub-second load times and intuitive user paths.',
  location: 'Bhubaneswar, India',
  resume: 'https://github.com/Niketraj08/AstraCognix-AI/blob/main/public/resume.pdf',
};

export const STATS: StatItem[] = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 16,
    suffix: '+',
    description: 'Full-stack applications, CLI utilities, & APIs built.',
  },
  {
    id: 'technologies',
    label: 'Technologies Mastered',
    value: 24,
    description: 'Languages, frameworks, libraries, & DevOps tools.',
  },
  {
    id: 'certifications',
    label: 'Certifications',
    value: 8,
    suffix: '',
    description: 'Cloud, DSA, and full-stack development achievements.',
  },
  {
    id: 'years_learning',
    label: 'Years of Dev Experience',
    value: 4,
    suffix: '',
    description: 'Active software engineering, testing, & architecture exploration.',
  },
];

export const TECH_STACK = [
  'React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Next.js', 
  'Framer Motion', 'Git', 'GitHub', 'Python', 'Java', 'C++', 'SQL'
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Core Languages',
    description: 'Syntaxes and environments utilized for systems and services.',
    skills: [
      { name: 'C++', level: 70, iconName: 'Code' },
      { name: 'JavaScript', level: 70, iconName: 'Cpu' },
      { name: 'TypeScript', level: 65, iconName: 'Code' },
      { name: 'Java', level: 60, iconName: 'Hash' },
      { name: 'SQL', level: 60, iconName: 'Database' },
      { name: 'Python', level: 50, iconName: 'Terminal' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    description: 'Tools used to structure client layers and backend APIs.',
    skills: [
      { name: 'React', level: 85, iconName: 'Layers' },
      { name: 'Framer Motion', level: 80, iconName: 'Wind' },
      { name: 'Tailwind CSS', level: 90, iconName: 'Palette' },
      { name: 'Node.js / Express', level: 75, iconName: 'Server' },
      { name: 'Next.js', level: 60, iconName: 'Wind' },
    ],
  },
  {
    id: 'devops',
    title: 'Cloud & Infrastructure',
    description: 'Deployment, orchestration, and continuous development tooling.',
    skills: [
      { name: 'Git', level: 90, iconName: 'GitBranch' },
      { name: 'GitHub', level: 88, iconName: 'Github' },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'AstraCognix-AI',
    title: 'AstraCognix AI Development Platform',
    description: 'An advanced, full-stack AI development platform and prompt optimizer supporting dynamic models, fine-tuned developer insights, and generative agent pipelines.',
    category: 'Full-Stack / Systems',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Gemini API'],
    githubUrl: 'https://github.com/Niketraj08/AstraCognix-AI',
    liveUrl: 'https://github.com/Niketraj08/AstraCognix-AI',
    metric: 'Active AI Agent Hub',
  },
  {
    id: 'AI-Prompt-Builder',
    title: 'AI Prompt Builder Core',
    description: 'A dynamic AI prompt engineering tool with customizable generation models, token counters, prompt template parameters, and local workspace storage.',
    category: 'Full-Stack / Systems',
    tech: ['React', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Niketraj08/AI-Prompt-Builder',
    liveUrl: 'https://github.com/Niketraj08/AI-Prompt-Builder',
    metric: 'Dynamic Prompt Engineering',
  },
  {
    id: 'ACS-DEMO-',
    title: 'ACS Professional Portal',
    description: 'ACS Community & Professional Development platform web application built with high-fidelity interactive modules, custom layouts, and real-time synchronization.',
    category: 'Full-Stack / Systems',
    tech: ['React', 'JavaScript', 'Node.js', 'Express', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Niketraj08/ACS-DEMO-',
    liveUrl: 'https://github.com/Niketraj08/ACS-DEMO-',
    metric: 'Professional Community Hub',
  },
  {
    id: '3js-pratical',
    title: '3JS Practical & WebGL Engine',
    description: 'An interactive collection of WebGL experiments, camera mappings, complex particle structures, and hardware-accelerated 3D mesh rendering prototypes using Three.js.',
    category: '3D / UI',
    tech: ['Three.js', 'WebGL', 'JavaScript', 'HTML5', 'Canvas API'],
    githubUrl: 'https://github.com/Niketraj08/3js-pratical',
    liveUrl: 'https://github.com/Niketraj08/3js-pratical',
    metric: 'Hardware Accelerated 3D',
  },
  {
    id: '3D-Coverflow',
    title: '3D Coverflow Perspective Slider',
    description: 'A stunning 3D Coverflow layout and image slider effect using pure CSS 3D transforms, fluid perspective mappings, and tactile transition physics.',
    category: '3D / UI',
    tech: ['CSS3', 'HTML5', 'JavaScript', '3D Transforms'],
    githubUrl: 'https://github.com/Niketraj08/3D-Coverflow',
    liveUrl: 'https://github.com/Niketraj08/3D-Coverflow',
    metric: '60FPS Fluid Animations',
  },
  {
    id: '3D-Animation-',
    title: '3D Animation & Keyframe Studio',
    description: 'Immersive interactive visual boards and animation triggers built using hardware-accelerated CSS properties, vector layers, and timing hooks.',
    category: '3D / UI',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Keyframe Animation'],
    githubUrl: 'https://github.com/Niketraj08/3D-Animation-',
    liveUrl: 'https://github.com/Niketraj08/3D-Animation-',
    metric: 'GPU-Accelerated Visuals',
  },
  {
    id: 'amber_folio',
    title: 'Amber Minimal Portfolio',
    description: 'An elegant and minimalist developer portfolio template featuring highly responsive grids, clean typography pairings, and optimized media rendering.',
    category: '3D / UI',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Layouts'],
    githubUrl: 'https://github.com/Niketraj08/amber_folio',
    liveUrl: 'https://github.com/Niketraj08/amber_folio',
    metric: 'Ultra-Lightweight PageSpeed',
  }
];

export const EDUCATION: EducationMilestone[] = [
  {
    id: 'year1',
    period: '2022 – 2023',
    title: 'Foundation & Algorithms',
    institution: 'Gandhi Engineering College (GEC)',
    description: 'Began Bachelor of Technology in Computer Science and Engineering. Mastered Object-Oriented Programming, Data Structures, and relational databases. Achieved top ranks in regional competitive programming.',
    badge: 'GPA: 8.9',
    achievements: [
      'Mastered core Java and Python algorithms',
      'Secured 1st Prize in GEC Code-Sprint hackathon',
      'Elected CSE branch representative',
    ],
  },
  {
    id: 'year2',
    period: '2023 – 2024',
    title: 'Full-Stack Core & Databases',
    institution: 'Gandhi Engineering College (GEC)',
    description: 'Ventured deeply into web architectures. Explored Express, Node, RESTful design principles, and client state orchestration. Designed multiple databases in PostgreSQL and MongoDB for class projects.',
    badge: 'Full-Stack Specialization',
    achievements: [
      'Built a custom campus newsletter app with 500+ users',
      'Completed database design & relational integrity blueprints',
      'Earned professional developer certifications in React',
    ],
  },
  {
    id: 'year3',
    period: '2024 – 2025',
    title: 'Cloud Architectures & DevOps',
    institution: 'Gandhi Engineering College (GEC)',
    description: 'Studied Advanced System Design and DevOps workflows. Implemented Docker containerization, Kubernetes local cluster scheduling, and continuous deployment pipelines.',
    badge: 'AWS Certified',
    achievements: [
      'Developed and deployed scalable API routing services',
      'Designed self-healing workflows using container hooks',
      'Led an engineering project team of 4 peers for final year outline',
    ],
  },
  {
    id: 'year4',
    period: '2025 – 2026',
    title: 'Final Year & Graduation',
    institution: 'Gandhi Engineering College (GEC)',
    description: 'Completing the engineering curriculum. Focusing on enterprise SaaS development, telemetry, artificial intelligence API orchestration, and real-time dashboard analytics. Seeking high-impact internship opportunities.',
    badge: 'Final-Year Capstone',
    achievements: [
      'Currently developing SaaS Pulse and GenAI Architect as major project',
      'Actively tutoring 50+ junior students in modern React and TypeScript',
      'On track to graduate with excellent cumulative academic honors',
    ],
  },
];

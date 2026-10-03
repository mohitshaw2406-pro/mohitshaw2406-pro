import { SkillItem, Flight, Booking } from '../types';

export const PROFILE_INFO = {
  name: 'MOHIT SHAW',
  handle: 'mohitshaw2406-pro',
  role: 'Computer Science Student & Aspiring Full-Stack Developer',
  email: 'mohitshaw.24.06@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohit-shaw-17007a345',
  linkedinDisplay: 'mohit-shaw-17007a345',
  github: 'https://github.com/mohitshaw2406-pro',
  typingLines: [
    'Computer Science Student',
    'Aspiring Full-Stack Developer',
    'Python | MySQL | Java | C',
    'HTML | CSS | JavaScript',
    'Building Projects Every Day!'
  ],
  bioBulletPoints: [
    { icon: '🎓', label: 'CSE Student', desc: 'Passionate about computer science foundations and software engineering.' },
    { icon: '🐍', label: 'Core Competencies', desc: 'Learning and building with Python, MySQL, and Data Structures & Algorithms.' },
    { icon: '🌐', label: 'Career Goal', desc: 'Aiming to become an exceptional Full-Stack Developer creating scalable software.' },
    { icon: '⚡', label: 'Philosophy', desc: 'Love building real-world applications that solve tangible problems.' },
    { icon: '🌱', label: 'Continuous Growth', desc: 'Improving step-by-step, every single day with consistent code commits.' }
  ],
  currentlyLearning: [
    { title: 'Data Structures & Algorithms', desc: 'Arrays, Linked Lists, Trees, Graphs, Sorting & Dynamic Programming', progress: 75, icon: '🌲' },
    { title: 'Database Management (DBMS)', desc: 'Relational Schema Design, Normalization, Complex Queries, Indexing & ACID transactions', progress: 85, icon: '🗄️' },
    { title: 'Git & GitHub Version Control', desc: 'Branching strategies, Merge conflicts, Collaborative workflows, Open Source', progress: 90, icon: '🐙' },
    { title: 'Frontend + Backend Full-Stack', desc: 'Connecting modern frontend architectures with secure REST APIs & persistent storage', progress: 80, icon: '⚡' }
  ]
};

export const SKILLS_DATA: SkillItem[] = [
  // Languages
  { name: 'Python', category: 'Languages', icon: 'python', highlight: true },
  { name: 'Java', category: 'Languages', icon: 'java' },
  { name: 'C', category: 'Languages', icon: 'c' },
  { name: 'JavaScript', category: 'Languages', icon: 'js', highlight: true },
  
  // Frontend
  { name: 'HTML5', category: 'Frontend', icon: 'html', highlight: true },
  { name: 'CSS3', category: 'Frontend', icon: 'css', highlight: true },
  { name: 'React', category: 'Frontend', icon: 'react', highlight: true },
  { name: 'Bootstrap', category: 'Frontend', icon: 'bootstrap' },

  // Backend & DB
  { name: 'MySQL', category: 'Backend & DB', icon: 'mysql', highlight: true },
  { name: 'Flask', category: 'Backend & DB', icon: 'flask' },

  // Tools & Workflow
  { name: 'Git', category: 'Tools & Workflow', icon: 'git', highlight: true },
  { name: 'GitHub', category: 'Tools & Workflow', icon: 'github', highlight: true },
  { name: 'VS Code', category: 'Tools & Workflow', icon: 'vscode' },
  { name: 'Figma', category: 'Tools & Workflow', icon: 'figma' }
];

export const INITIAL_FLIGHTS: Flight[] = [
  {
    id: 'fl-101',
    flightNumber: 'AI-204',
    origin: 'New Delhi (DEL)',
    destination: 'Mumbai (BOM)',
    departureTime: '08:30 AM',
    arrivalTime: '10:45 AM',
    price: 4500,
    totalSeats: 30,
    bookedSeats: [1, 2, 5, 8, 14, 21, 22],
    status: 'On Time'
  },
  {
    id: 'fl-102',
    flightNumber: '6E-481',
    origin: 'Kolkata (CCU)',
    destination: 'Bengaluru (BLR)',
    departureTime: '11:15 AM',
    arrivalTime: '01:50 PM',
    price: 5200,
    totalSeats: 30,
    bookedSeats: [3, 4, 10, 11, 12, 19],
    status: 'Boarding'
  },
  {
    id: 'fl-103',
    flightNumber: 'UK-819',
    origin: 'Mumbai (BOM)',
    destination: 'Goa (GOI)',
    departureTime: '02:00 PM',
    arrivalTime: '03:15 PM',
    price: 3800,
    totalSeats: 30,
    bookedSeats: [7, 8, 9, 25, 26],
    status: 'Scheduled'
  },
  {
    id: 'fl-104',
    flightNumber: 'SG-902',
    origin: 'Kolkata (CCU)',
    destination: 'New Delhi (DEL)',
    departureTime: '06:45 PM',
    arrivalTime: '09:10 PM',
    price: 4900,
    totalSeats: 30,
    bookedSeats: [1, 6, 15, 16, 29, 30],
    status: 'Scheduled'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    bookingId: 'BK-9821',
    flightNumber: 'AI-204',
    passengerName: 'Mohit Shaw',
    seatNumber: 14,
    bookingDate: '2026-10-02',
    status: 'Confirmed'
  },
  {
    bookingId: 'BK-9822',
    flightNumber: '6E-481',
    passengerName: 'Aarav Patel',
    seatNumber: 12,
    bookingDate: '2026-10-01',
    status: 'Confirmed'
  }
];

import { Event } from "../types/events";

export const mockEvents: Event[] = [
  {
    id: "1",
    name: "AI Research Symposium",
    description: "Join us for a day of cutting-edge AI research presentations from leading academics and industry professionals. Topics include machine learning, neural networks, and ethical AI development.",
    date: "2025-05-15",
    time: "09:00 AM",
    location: "Computer Science Building, Room 301",
    link: "https://example.com/ai-symposium",
    organizer: "Stanford University",
    type: "tech-talk",
    approved: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Blockchain Hackathon",
    description: "48-hour hackathon focused on building innovative blockchain applications. Open to all skill levels, with mentorship available throughout the event.",
    date: "2025-06-10",
    time: "10:00 AM",
    location: "Engineering Hall, Main Auditorium",
    link: "https://example.com/blockchain-hackathon",
    organizer: "MIT",
    type: "hackathon",
    approved: true,
    imageUrl: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Web Development Workshop",
    description: "Learn the basics of modern web development with React. This hands-on workshop will guide you through building a simple web application from scratch.",
    date: "2025-05-20",
    time: "03:00 PM",
    location: "Online (Zoom)",
    link: "https://example.com/webdev-workshop",
    organizer: "Berkeley",
    type: "workshop",
    approved: true,
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Cybersecurity Challenge",
    description: "Test your cybersecurity skills in this capture-the-flag style event. Participants will solve security puzzles and exploit vulnerabilities in a controlled environment.",
    date: "2025-07-05",
    time: "11:00 AM",
    location: "InfoSec Building, Lab 2",
    link: "https://example.com/cybersecurity-challenge",
    organizer: "Carnegie Mellon University",
    type: "workshop",
    approved: true,
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Product Design Showcase",
    description: "An exhibition of innovative product designs from this year's graduating Design students. See prototypes and learn about the design process directly from the creators.",
    date: "2025-06-15",
    time: "05:30 PM",
    location: "Design School, Exhibition Hall",
    link: "https://example.com/design-showcase",
    organizer: "Rhode Island School of Design",
    type: "other",
    approved: true,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Data Science in Healthcare",
    description: "A panel discussion on the applications of data science in modern healthcare. Industry experts will discuss real-world cases and future trends.",
    date: "2025-06-22",
    time: "02:00 PM",
    location: "Medical Sciences Building, Auditorium B",
    link: "https://example.com/data-healthcare",
    organizer: "Harvard University",
    type: "tech-talk",
    approved: true,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Mobile App Development Contest",
    description: "Create an innovative mobile app in just one weekend! Teams will compete to build the best solution for this year's theme: Sustainability.",
    date: "2025-07-15",
    time: "09:00 AM",
    location: "Student Union Building",
    link: "https://example.com/app-contest",
    organizer: "UCLA",
    type: "hackathon",
    approved: true,
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1674&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "Future of Quantum Computing",
    description: "An introductory lecture on quantum computing principles and their potential impact on technology and society over the next decade.",
    date: "2025-09-05",
    time: "04:00 PM",
    location: "Physics Building, Room 105",
    link: "https://example.com/quantum-future",
    organizer: "Caltech",
    type: "tech-talk",
    approved: true,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "9",
    name: "Robotics Workshop for Beginners",
    description: "A hands-on introduction to robotics using Arduino. Participants will build and program a simple robot during this full-day workshop.",
    date: "2025-08-12",
    time: "10:00 AM",
    location: "Engineering Lab, Room 201",
    link: "https://example.com/robotics-beginners",
    organizer: "University of Michigan",
    type: "workshop",
    approved: false,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: "10",
    name: "Startup Pitch Competition",
    description: "Student entrepreneurs will pitch their startup ideas to a panel of industry judges. Cash prizes and mentorship opportunities available for winners.",
    date: "2025-10-10",
    time: "06:00 PM",
    location: "Business School Auditorium",
    link: "https://example.com/startup-pitch",
    organizer: "University of Pennsylvania",
    type: "other",
    approved: true,
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2670&auto=format&fit=crop"
  }
];

export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getFeaturedEvents = (): Event[] => {
  return mockEvents.filter(event => event.featured && event.approved);
};

export const getApprovedEvents = (): Event[] => {
  return mockEvents.filter(event => event.approved);
};

export const getPendingEvents = (): Event[] => {
  return mockEvents.filter(event => !event.approved);
};

export const filterEvents = (filters: Record<string, any>): Event[] => {
  let filteredEvents = mockEvents.filter(event => event.approved);
  
  if (filters.search) {
    const searchTerms = filters.search.toLowerCase();
    filteredEvents = filteredEvents.filter(event => 
      event.name.toLowerCase().includes(searchTerms) || 
      event.description.toLowerCase().includes(searchTerms) ||
      event.organizer.toLowerCase().includes(searchTerms) ||
      event.location.toLowerCase().includes(searchTerms)
    );
  }
  
  if (filters.type && filters.type !== 'all') {
    filteredEvents = filteredEvents.filter(event => event.type === filters.type);
  }
  
  if (filters.date) {
    filteredEvents = filteredEvents.filter(event => event.date === filters.date);
  }
  
  if (filters.organizer) {
    filteredEvents = filteredEvents.filter(event => 
      event.organizer.toLowerCase().includes(filters.organizer.toLowerCase())
    );
  }
  
  if (filters.location) {
    filteredEvents = filteredEvents.filter(event => 
      event.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  return filteredEvents;
};
'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";
import { useState, useEffect } from "react";
import { 
  Loader2, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Users, 
  Star, 
  ChevronRight, 
  Search,
  Filter
} from "lucide-react";
import Link from "next/link";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import CategorySection from "@/components/events/CategorySection";

// Featured and upcoming events data (in a real app, this would come from API)
const featuredEvents = [
  {
    id: "1",
    title: "TechConnect Summit 2025",
    description: "Join industry leaders to explore emerging technologies and future innovations.",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Grand Central Convention, New York",
    image: "/tech1.png",
    category: "Technology",
    attendees: 1250,
    rating: 4.8
  },
  {
    id: "2",
    title: "Art & Culture Festival",
    description: "Immerse yourself in a celebration of contemporary art, music, and cultural expressions.",
    date: "June 3, 2025",
    time: "11:00 AM - 8:00 PM",
    location: "Metropolitan Gallery, San Francisco",
    image: "/tech2.png",
    category: "Arts & Culture",
    attendees: 850,
    rating: 4.7
  },
  {
    id: "3",
    title: "Global Business Forum",
    description: "Network with entrepreneurs and executives shaping the future of global commerce.",
    date: "May 28, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Financial District Center, Chicago",
    image: "/tech3.jpeg",
    category: "Business",
    attendees: 980,
    rating: 4.9
  },
  {
    id: "4",
    title: "Health & Wellness Expo",
    description: "Discover the latest trends in health, fitness, and wellness at this interactive expo.",
    date: "June 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Wellness Center, Los Angeles",
    image: "/tech4.jpeg",
    category: "Health & Wellness",
    attendees: 600,
    rating: 4.6
  }
];

// Categories data
const categories = [
  { name: "Technology", icon: "💻", count: 183 },
  { name: "Business", icon: "📊", count: 145 },
  { name: "Arts & Culture", icon: "🎨", count: 97 },
  { name: "Health & Wellness", icon: "🧘", count: 72 },
  { name: "Education", icon: "📚", count: 124 },
  { name: "Entertainment", icon: "🎭", count: 89 }
];

// Testimonials data
const testimonials = [
  {
    id: "1",
    name: "Alexandra Reeves",
    role: "Marketing Director",
    company: "InnovateTech",
    content: "Happndr completely transformed how we discover and manage event opportunities. The platform is intuitive and has connected us with exactly the right audience.",
    avatar: "/avatar-1.jpg"
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Community Manager",
    company: "CreativeHub",
    content: "As an event organizer, I've been able to increase attendance by 40% since using Happndr. The analytics and promotion tools are game-changers.",
    avatar: "/avatar-2.jpg"
  },
  {
    id: "3",
    name: "Sarah Johnson",
    role: "Event Coordinator",
    company: "TechMeet Inc.",
    content: "The seamless integration with our ticketing system and the personalized recommendations keep bringing users back to our events.",
    avatar: "/avatar-3.jpg"
  }
];

const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
  ];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
        <div className="animate-pulse scale-105 transition-transform">
          <div className="text-2xl font-bold tracking-tight text-primary">
            <span className="text-purple-600">Happ</span>ndr
          </div>
        </div>
        <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
        <p className="text-sm text-muted-foreground">Bringing sparks your way...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-100 px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0 z-10">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
                Discover · Connect · Experience
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Find Your Next <span className="text-purple-600 relative">
                  Experience
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,0 Q50,10 100,0" stroke="rgba(147, 51, 234, 0.3)" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                Discover and join events that match your interests. Happndr brings people together through extraordinary shared experiences.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/events">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all">
                  Explore Events
                </Button>
                </Link>
                <Link href="/events/submit">
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-6 rounded-full text-base font-medium">
                  Submit Event
                </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                 <AnimatedTooltip items={people} />
                </div>
                <p className="text-sm text-gray-600 px-2">
                  <span className="font-semibold text-gray-900">15,000+</span> people found events this month
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2 relative z-10">
              <div className="relative">
                <div className="absolute -top-4 -left-4 right-4 bottom-4 bg-purple-200 rounded-xl transform -rotate-2"></div>
                <Image
                  src="/event-banner.png"
                  alt="People enjoying an event"
                  width={600}
                  height={400}
                  className="relative rounded-xl shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300"
                  priority
                />
                
                <Card className="absolute -bottom-10 -right-6 max-w-xs bg-white shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tech Innovation Summit</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>San Francisco Convention Center</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 -mt-12 relative z-20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for events..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div className="flex gap-2 md:gap-4">
                <div className="relative min-w-[140px]">
                  <select className="w-full appearance-none pl-4 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option value="">All Categories</option>
                    <option value="tech">Technology</option>
                    <option value="business">Business</option>
                    <option value="art">Arts & Culture</option>
                    <option value="health">Health & Wellness</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90" />
                </div>
                
                <div className="relative min-w-[140px]">
                  <select className="w-full appearance-none pl-4 pr-10 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                    <option value="">Any Date</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 rotate-90" />
                </div>
                
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-lg px-6">
                  <Search className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <h2 className="text-sm font-medium text-purple-600 mb-2">CURATED FOR YOU</h2>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Events</h3>
            </div>
            <Link href="/events" className="mt-4 md:mt-0 text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center group">
              View all events
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium z-20">
                    {event.category}
                  </div>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    <span>{event.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    <span>{event.time}</span>
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs">
                      <Users className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                      <span className="text-gray-500">{event.attendees} attending</span>
                    </div>
                    
                    <div className="flex items-center text-xs font-medium">
                      <Star className="h-3.5 w-3.5 mr-1 text-yellow-400 fill-yellow-400" />
                      <span>{event.rating}</span>
                    </div>
                  </div>
                  
                  <Link href={`/events/${event.id}`} >
                  <Button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-purple-600">
                    View Details
                  </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
   
      <CategorySection/>
      {/* Brand Logos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-lg font-semibold text-gray-900 mb-8">Trusted by 15,000+ Organizations Worldwide</h2>
          <div className="py-2">
            <Marquee speed={35} direction="left" />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-sm font-medium text-purple-600 mb-2">TESTIMONIALS</h2>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">What Our Users Say</h3>
              <p className="text-gray-600 mb-10">
                Real stories from event organizers and attendees who've experienced the power of Happndr's platform.
              </p>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === activeTestimonial ? 'bg-purple-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md p-6 relative">
                <div className="absolute -top-3 -left-3 text-purple-600 text-5xl font-serif">"</div>
                <div className="pt-4">
                  <p className="text-gray-700 mb-6 italic">
                    {testimonials[activeTestimonial].content}
                  </p>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                      <Image 
                        src={testimonials[activeTestimonial].avatar} 
                        alt={testimonials[activeTestimonial].name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-white to-purple-500 text-black shadow-4xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Host Your Next Event?</h2>
              <p className="text-black max-w-xl">
                Join thousands of event organizers who use Happndr to reach their target audience and create unforgettable experiences.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-lg text-base font-medium">
                Get Started Free
              </Button>
              <Button variant="outline" className="border-gray-600 text-black hover:bg-black hover:text-white px-8 py-6 rounded-lg text-base font-medium">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and never miss out on exciting events in your area
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
              Subscribe
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
          </p>
        </div>
      </section>
    </main>
  );
}
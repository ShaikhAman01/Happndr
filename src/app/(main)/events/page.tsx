// pages/events/index.tsx
'use client';
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Download,
  XCircle,
  Grid,
  List,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
    id: string;
  name: string;
}

interface College {
  name: string;
}

interface User {
  name: string;
  avatarUrl?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  startTime?: string | Date;
  location: string;
  websiteUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  categories?: Category[];
  college?: College;
  user?: User;
}

// Sample event data for demonstration
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Innovate 2025: Unleashing the Power of Change",
    description: "Join industry leaders to explore cutting-edge innovations that are reshaping our future. Network with pioneers and visionaries driving technological advancement.",
    startTime: "2025-01-23T10:00:00",
    location: "Bathurst Extra Hotel",
    websiteUrl: "https://example.com/event1",
    imageUrl: "/tech1.png",
    featured: true,
    categories: [
      { id: "1", name: "Tech Talk" },
      { id: "2", name: "Innovation" }
    ],
    college: {
      name: "MIT"
    },
    user: {
      name: "Sarah Johnson",
      avatarUrl: "/api/placeholder/40/40"
    }
  },
  {
    id: "2",
    title: "GreenTech: Engineering Sustainable Futures",
    description: "Discover breakthrough sustainable technologies and discuss environmental engineering solutions for a greener tomorrow.",
    startTime: "2025-03-17T10:00:00",
    location: "Grand Central Hotel",
    websiteUrl: "https://example.com/event2",
    imageUrl: "/tech2.png",
    categories: [
      { id: "3", name: "Workshop" },
      { id: "4", name: "Sustainability" }
    ],
    college: {
      name: "Stanford University"
    },
    user: {
      name: "Michael Chen",
      avatarUrl: "/api/placeholder/40/40"
    }
  },
  {
    id: "3",
    title: "Pioneering New Frontiers in Medicine",
    description: "Explore revolutionary medical technologies and treatments that are transforming healthcare and patient outcomes worldwide.",
    startTime: "2025-04-11T10:00:00",
    location: "Bathurst Extra Hotel",
    websiteUrl: "https://example.com/event3",
    imageUrl: "/tech3.jpeg",
    categories: [
      { id: "5", name: "Conference" },
      { id: "6", name: "Healthcare" }
    ],
    college: {
      name: "Harvard University"
    },
    user: {
      name: "Dr. Emily Taylor",
      avatarUrl: "/api/placeholder/40/40"
    }
  },
  {
    id: "4",
    title: "AI Hackathon: Building the Future",
    description: "Join us for an exciting weekend of coding, collaboration, and innovation. Develop cutting-edge AI solutions to real-world problems and compete for amazing prizes.",
    startTime: "2025-05-15T09:00:00",
    location: "Tech Hub Downtown",
    websiteUrl: "https://example.com/event4",
    imageUrl: "/tech4.jpeg",
    categories: [
      { id: "7", name: "Hackathon" },
      { id: "8", name: "AI" }
    ],
    college: {
      name: "UC Berkeley"
    },
    user: {
      name: "Alex Rivera",
      avatarUrl: "/api/placeholder/40/40"
    }
  }
];

// Main EventsPage Component
export default function EventSchedule() {
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(sampleEvents);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  // Apply filters and sorting to events
  useEffect(() => {
    setLoading(true);

    // Simulate API call with timeout
    const timer = setTimeout(() => {
      try {
        let results = [...events];

        // Apply search filter
        if (activeFilters.search) {
          const searchTerm = activeFilters.search.toLowerCase();
          results = results.filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
          );
        }

        // Apply category filter
        if (activeFilters.category && activeFilters.category !== 'all') {
          results = results.filter(event =>
            event.categories?.some(cat =>
              cat.name.toLowerCase() === activeFilters.category.toLowerCase())
          );
        }

        // Apply date filter
        if (activeFilters.date) {
          const filterDate = new Date(activeFilters.date).setHours(0, 0, 0, 0);
          results = results.filter(event => {
            const eventDate = new Date(event.startTime as string).setHours(0, 0, 0, 0);
            return eventDate === filterDate;
          });
        }

        // Apply college filter
        if (activeFilters.college && activeFilters.college !== 'all') {
          results = results.filter(event =>
            event.college?.name.toLowerCase().includes(activeFilters.college.toLowerCase())
          );
        }

        // Apply location filter
        if (activeFilters.location) {
          const locationTerm = activeFilters.location.toLowerCase();
          results = results.filter(event =>
            event.location.toLowerCase().includes(locationTerm)
          );
        }

        // Apply sorting
        if (sortBy === 'date') {
          results.sort((a, b) => new Date(a.startTime as string).getTime() - new Date(b.startTime as string).getTime());
        } else if (sortBy === 'name') {
          results.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredEvents(results);
        setLoading(false);
      } catch (error) {
        console.error("Error filtering events:", error);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [events, activeFilters, sortBy]);

  // Handle filter changes
  const handleFilterChange = (filters: Record<string, string>) => {
    setActiveFilters(filters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="relative mb-12 bg-gradient-to-br from-purple-100 via-purple-50 to-white p-8 rounded-3xl">
        {/* Decorative elements */}
        <div className="absolute top-8 right-8">
          <div className="w-16 h-16 bg-purple-200 rounded-full opacity-50"></div>
        </div>
        <div className="absolute -bottom-4 left-20 transform -rotate-12">
          {/* <div className="w-8 h-8 border-2 border-purple-300 rounded-md opacity-60"></div> */}
        </div>

        {/* Header content */}
        <div className="relative z-10 max-w-3xl">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Events
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Discover hackathons, tech talks, workshops, and networking opportunities at top universities and tech organizations. Find your next opportunity to learn, collaborate, and innovate.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8">
        <EventFilters onFilterChange={handleFilterChange} initialFilters={activeFilters} />
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-700 mr-2">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
            </span>
            {Object.keys(activeFilters).length > 0 && (
              <button
                onClick={() => handleFilterChange({})}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
              >
                <XCircle className="h-4 w-4 mr-1" /> Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort controls */}
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm text-gray-500 mr-2">Sort by:</label>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as 'name' | 'date')}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View mode controls */}
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-500 hover:bg-gray-200'}`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                  ? 'bg-purple-100 text-purple-600'
                  : 'text-gray-500 hover:bg-gray-200'}`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any events matching your current filters. Try adjusting your search criteria or check back later.
          </p>
          <Button
            onClick={() => handleFilterChange({})}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-6'
        }>
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} viewMode={viewMode} />
          ))}
        </div>
      )}

      {/* Load More Button - Only show if there are events and potentially more to load */}
      {filteredEvents.length > 0 && filteredEvents.length >= 4 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="px-6 py-2 border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            Load More Events
          </Button>
        </div>
      )}

      {/* Decorative elements at the bottom */}
      <div className="relative h-16 mt-12">
        <div className="absolute bottom-0 right-12">
          <div className="w-12 h-12 border-2 border-purple-300 rounded-full opacity-60 transform rotate-45"></div>
        </div>
        <div className="absolute bottom-8 left-16">
          <div className="w-10 h-10 bg-purple-100 rounded-full opacity-70"></div>
        </div>
      </div>
    </div>
  );
}
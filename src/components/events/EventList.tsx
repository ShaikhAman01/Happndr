import { useState, useEffect, useMemo } from 'react';
import { EventCard } from './EventCard';
import { EventFilters } from './EventFilters';
import { Event, EventFilter } from '@/types/events';
import { filterEvents, getApprovedEvents } from '@/data/mockEvents';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Loader2, Grid, List, Calendar, XCircle } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface EventsListProps {
  initialFilter?: EventFilter;
}

export const EventsList = ({ initialFilter = {} }: EventsListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilter>(initialFilter);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  const [visibleCount, setVisibleCount] = useState(9); // For lazy loading
  
  // Ref for infinite scrolling
  const { ref: loadMoreRef, inView } = useInView();
  
  // Effect to load more events when scrolled to bottom
  useEffect(() => {
    if (inView && visibleCount < events.length) {
      setVisibleCount(prev => Math.min(prev + 6, events.length));
    }
  }, [inView, events.length, visibleCount]);
  
  // Effect to fetch events when filters change
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API call with a delay
        const timer = setTimeout(() => {
          try {
            let fetchedEvents;
            if (Object.keys(filters).length > 0) {
              fetchedEvents = filterEvents(filters);
            } else {
              fetchedEvents = getApprovedEvents();
            }
            
            // Reset visible count when filters change
            setVisibleCount(9);
            setEvents(fetchedEvents);
            setLoading(false);
          } catch {
            setError('Failed to filter events. Please try again.');
            setLoading(false);
          }
        }, 600);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError('Something went wrong. Please try again later.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: EventFilter) => {
    setFilters(newFilters);
    
    // Scroll to top when filters change
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Sort events based on current sortBy value
  const sortedEvents = useMemo(() => {
    if (sortBy === 'date') {
      return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      return [...events].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [events, sortBy]);

  // Visible events (for lazy loading)
  const visibleEvents = useMemo(() => {
    return sortedEvents.slice(0, visibleCount);
  }, [sortedEvents, visibleCount]);

  // Loading state UI
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EventFilters onFilterChange={handleFilterChange} initialFilters={filters} />
        <div className="mt-10 flex justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-uni-purple mx-auto" />
            <p className="mt-3 text-gray-600 text-lg">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EventFilters onFilterChange={handleFilterChange} initialFilters={filters} />
        <div className="mt-10 flex justify-center">
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto" />
            <p className="mt-3 text-gray-600 text-lg">{error}</p>
            <button 
              onClick={() => handleFilterChange({})}
              className="mt-4 px-4 py-2 bg-uni-purple text-white rounded-md hover:bg-uni-dark-purple transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
        <EventFilters onFilterChange={handleFilterChange} initialFilters={filters} />
      </div>
      
      {/* Control bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-700 mr-2">
              {events.length} {events.length === 1 ? 'Event' : 'Events'} Found
            </span>
            {Object.keys(filters).length > 0 && (
              <button 
                onClick={() => handleFilterChange({})}
                className="text-sm text-uni-purple hover:text-uni-dark-purple flex items-center"
              >
                <XCircle className="h-4 w-4 mr-1" /> Clear filters
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Sort controls */}
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm text-gray-500 mr-2">Sort by:</label>
              <select 
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'name')}
                className="text-sm border-gray-200 rounded-md focus:ring-uni-purple focus:border-uni-purple"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
              </select>
            </div>
            
            {/* View mode controls */}
            <div className="flex bg-gray-100 rounded-md p-1">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' 
                  ? 'bg-uni-soft-purple text-uni-purple' 
                  : 'text-gray-500 hover:bg-gray-200'}`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' 
                  ? 'bg-uni-soft-purple text-uni-purple' 
                  : 'text-gray-500 hover:bg-gray-200'}`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* No events found state */}
      {events.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-white rounded-xl shadow-sm"
        >
          <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any events matching your current filters. Try adjusting your search criteria or check back later.
          </p>
          <button 
            onClick={() => handleFilterChange({})} 
            className="px-4 py-2 bg-uni-purple text-white rounded-md hover:bg-uni-dark-purple transition-colors"
          >
            Clear All Filters
          </button>
        </motion.div>
      ) : (
        /* Events grid/list view */
        <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-6'
          }
        >
          {visibleEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <EventCard event={event} viewMode={viewMode} />
            </motion.div>
          ))}
        </motion.div>
        <div ref={loadMoreRef} className="h-10" />
      </AnimatePresence>
    )}
  </div>
);
};


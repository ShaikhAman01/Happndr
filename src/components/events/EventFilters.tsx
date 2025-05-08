// components/events/EventFilters.tsx
import React, { useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  School,
  MapPin,
  XCircle,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterCategory {
  id: string;
  name: string;
}

interface FilterCollege {
  id: string;
  name: string;
}

interface EventFiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
  initialFilters?: Record<string, string>;
}

const EventFilters: React.FC<EventFiltersProps> = ({ onFilterChange, initialFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  // Categories used in the filters
  const categories: FilterCategory[] = [
    { id: "all", name: "All Categories" },
    { id: "hackathon", name: "Hackathon" },
    { id: "tech-talk", name: "Tech Talk" },
    { id: "workshop", name: "Workshop" },
    { id: "networking", name: "Networking" },
    { id: "conference", name: "Conference" }
  ];

  const colleges: FilterCollege[] = [
    { id: "all", name: "All Colleges" },
    { id: "mit", name: "MIT" },
    { id: "stanford", name: "Stanford University" },
    { id: "harvard", name: "Harvard University" },
    { id: "berkeley", name: "UC Berkeley" },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    // If the value is "all" or empty, remove the filter
    if (value === "all" || !value) {
      delete newFilters[key];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', e.target.value);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Find Your Event</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-gray-700 md:self-end"
        >
          <Filter className="h-4 w-4 mr-1" />
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-400 h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Search for events by name, description or keywords..."
          className="pl-10 py-3 text-base"
          value={filters.search || ''}
          onChange={handleSearchChange}
        />
      </div>

      {isExpanded && (
        <div className="space-y-6 border-t border-gray-100 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 font-medium mb-1">
                <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                <label>Event Type</label>
              </div>
              <Select
                value={filters.category || 'all'}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-700 font-medium mb-1">
                <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                <label>Date</label>
              </div>
              <Input
                type="date"
                value={filters.date || ''}
                className="w-full"
                onChange={(e) => handleFilterChange('date', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-700 font-medium mb-1">
                <School className="h-4 w-4 mr-2 text-purple-600" />
                <label>College</label>
              </div>
              <Select
                value={filters.college || 'all'}
                onValueChange={(value) => handleFilterChange('college', value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Colleges" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map(college => (
                    <SelectItem key={college.id} value={college.id}>{college.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-gray-700 font-medium mb-1">
                <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                <label>Location</label>
              </div>
              <Input
                type="text"
                placeholder="Enter city or venue"
                value={filters.location || ''}
                className="w-full"
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {(filters.search || filters.category || filters.date || filters.college || filters.location) && (
        <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-purple-600 border-purple-600 hover:bg-purple-50"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventFilters;
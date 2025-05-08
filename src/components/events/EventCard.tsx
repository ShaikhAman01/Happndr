// components/events/EventCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  CalendarDays,
  MapPin,
  School,
  Link2,
  Clock,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface College {
  id: string;
  name: string;
  logoUrl?: string;
}

interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime?: string | Date;
  endTime?: string | Date;
  location: string;
  websiteUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  categories?: Category[];
  college?: College;
  user?: User;
}

interface EventCardProps {
  event: Event;
  viewMode?: "grid" | "list";
  onFavorite?: (eventId: string) => void;
  isFavorited?: boolean;
  className?: string;
}

/**
 * EventCard component displays event information in either grid or list view
 */
const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  viewMode = "grid",
  onFavorite,
  isFavorited = false,
  className 
}) => {
  // Format date and time only if valid
  const formatEventTime = (dateString?: string | Date) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    
    return format(date, "h:mm a");
  };

  const startTime = formatEventTime(event.startTime);
  const endTime = formatEventTime(event.endTime);
  
  // Create initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <Card 
      className={cn(
        "transition-all hover:shadow-md border rounded-2xl overflow-hidden group h-full",
        viewMode === "list" ? "flex flex-col md:flex-row" : "flex flex-col",
        className
      )}
    >
      {/* Image container */}
      {event.imageUrl && (
        <div 
          className={cn(
            "relative",
            viewMode === "list" ? "md:w-1/3 w-full" : "w-full h-48"
          )}
        >
          <div className="h-48 md:h-full w-full relative">
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={event.featured}
            />
          </div>
          
          {/* Featured badge */}
          {event.featured && (
            <div className="absolute top-4 left-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-r-full font-medium">
              Featured
            </div>
          )}
          
          {/* Favorite button */}
          {onFavorite && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 rounded-full opacity-90 hover:opacity-100"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onFavorite(event.id);
                    }}
                  >
                    <Heart 
                      className={cn(
                        "h-4 w-4", 
                        isFavorited ? "fill-red-500 text-red-500" : ""
                      )} 
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isFavorited ? "Remove from favorites" : "Add to favorites"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      {/* Content container */}
      <div 
        className={cn(
          "flex flex-col flex-grow",
          viewMode === "list" ? "md:w-2/3" : "w-full"
        )}
      >
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              <Link href={`/events/${event.id}`} className="hover:text-primary transition-colors">
                {event.title}
              </Link>
            </CardTitle>

            {/* External website link */}
            {event.websiteUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-fit shrink-0"
              >
                <Link href={event.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Link2 className="h-4 w-4 mr-2" />
                  Visit site
                </Link>
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3 text-sm flex-grow">
          {/* Description */}
          <p className="text-muted-foreground line-clamp-3">
            {event.description || "No description provided."}
          </p>

          {/* Categories */}
          {event.categories && event.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {event.categories.map((category) => (
                <Badge 
                  key={category.id || category.name} 
                  variant="secondary" 
                  className="rounded-full text-xs"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Event details */}
          <div className="space-y-2">
            {/* Date and time */}
            {event.startTime && !isNaN(new Date(event.startTime).getTime()) && (
              <>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span>{format(new Date(event.startTime), "EEEE, MMMM d, yyyy")}</span>
                </div>
                
                {/* Time display */}
                {(startTime || endTime) && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>
                      {startTime && endTime 
                        ? `${startTime} - ${endTime}`
                        : startTime || endTime}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>

            {/* College */}
            {event.college?.name && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <School className="h-4 w-4 shrink-0" />
                <span className="line-clamp-1">Hosted by {event.college.name}</span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Card footer with poster info */}
        {event.user?.name && (
          <CardFooter className="pt-2 pb-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={event.user.avatarUrl} alt={event.user.name} />
                  <AvatarFallback>
                    {getInitials(event.user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">Posted by {event.user.name}</span>
              </div>
              
              <Link 
                href={`/events/${event.id}`}
                className="text-xs text-primary flex items-center font-medium hover:underline"
              >
                View details
                <ChevronRight className="h-3 w-3 ml-0.5" />
              </Link>
            </div>
          </CardFooter>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
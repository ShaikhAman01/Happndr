'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Share2, Heart, ArrowLeft, MessageSquare } from 'lucide-react';
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Mock data for an example event
const eventData = {
  id: '123',
  title: 'Tech Conference 2025',
  description: 'Join us for the biggest tech conference of the year! Featuring keynote speakers, workshops, networking sessions, and the latest in technology innovations.',
  longDescription: `
    Our annual tech conference brings together industry leaders, innovators, and tech enthusiasts for three days of learning, networking, and inspiration.
    
    What to expect:
    • Keynote speeches from industry leaders
    • Hands-on workshops for all skill levels
    • Networking opportunities with peers and potential employers
    • Product showcases featuring the latest innovations
    • Career fair with top tech companies
    
    This year's theme focuses on sustainable technology and AI ethics. Come prepared with questions and be ready to engage in meaningful discussions about the future of tech.
  `,
  date: 'May 15-17, 2025',
  time: '9:00 AM - 6:00 PM',
  location: 'Tech Convention Center, San Francisco',
  organizer: 'Tech Events Co.',
  price: '$299',
  category: 'Technology',
  imageUrl: '/api/placeholder/1200/600',
  attendees: 342,
  capacity: 500,
  speakers: [
    { name: 'Jane Smith', role: 'CTO at TechGiant', avatar: '/api/placeholder/100/100' },
    { name: 'John Doe', role: 'AI Researcher', avatar: '/api/placeholder/100/100' },
    { name: 'Sarah Johnson', role: 'Startup Founder', avatar: '/api/placeholder/100/100' },
  ],
  agenda: [
    { day: 'Day 1', items: [
      { time: '9:00 AM', title: 'Registration & Coffee', description: 'Pick up your badges and enjoy complimentary breakfast' },
      { time: '10:00 AM', title: 'Opening Keynote', description: 'Welcome address and industry overview' },
      { time: '12:00 PM', title: 'Lunch Break', description: 'Networking lunch provided' },
      { time: '1:30 PM', title: 'Workshop Sessions', description: 'Choose from 5 parallel tracks' },
      { time: '5:00 PM', title: 'Evening Reception', description: 'Drinks and appetizers provided' }
    ]},
    { day: 'Day 2', items: [
      { time: '9:00 AM', title: 'Morning Sessions', description: 'Technical deep dives' },
      { time: '12:00 PM', title: 'Lunch Break', description: 'Networking lunch provided' },
      { time: '1:30 PM', title: 'Panel Discussion', description: 'Future of AI Ethics' },
      { time: '3:30 PM', title: 'Breakout Sessions', description: 'Small group discussions' },
      { time: '6:00 PM', title: 'Conference Dinner', description: 'Optional, requires separate ticket' }
    ]},
    { day: 'Day 3', items: [
      { time: '9:00 AM', title: 'Workshops', description: 'Hands-on learning experiences' },
      { time: '12:00 PM', title: 'Lunch Break', description: 'Networking lunch provided' },
      { time: '1:30 PM', title: 'Closing Keynote', description: 'Insights and future directions' },
      { time: '3:00 PM', title: 'Networking Event', description: 'Final opportunity to connect' },
      { time: '5:00 PM', title: 'Conference Close', description: 'Thank you and farewell' }
    ]}
  ],
  reviews: [
    { user: 'Alex M.', rating: 5, comment: 'Best tech conference I&aposve attended this year! Great speakers and networking opportunities.', avatar: '/api/placeholder/40/40' },
    { user: 'Jamie L.', rating: 4, comment: 'Very informative sessions. Would have liked more hands-on workshops.', avatar: '/api/placeholder/40/40' },
    { user: 'Taylor K.', rating: 5, comment: 'Excellent organization and venue. Looking forward to next year!', avatar: '/api/placeholder/40/40' }
  ],
  faqs: [
    { question: 'Is there parking available at the venue?', answer: 'Yes, paid parking is available at the convention center garage.' },
    { question: 'Are meals included in the ticket price?', answer: 'Breakfast and lunch are provided on all conference days. Dinner is available as a separate ticket option.' },
    { question: 'Is there a dress code?', answer: 'Business casual is recommended, but there is no strict dress code.' },
    { question: 'Can I get a refund if I can&apos;t attend?', answer: 'Refunds are available up to 14 days before the event. After that, you can transfer your ticket to someone else.' }
  ]
};

export default function EventDetailsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [ticketsAvailable, setTicketsAvailable] = useState(eventData.capacity - eventData.attendees);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handlePurchaseTicket = () => {
    if (ticketsAvailable > 0) {
      setTicketsAvailable(ticketsAvailable - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleLikeToggle}>
              <Heart size={20} className={isLiked ? "fill-purple-500 text-purple-500" : "text-gray-400"} />
            </Button>
            <Button variant="ghost">
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </header>

      <motion.div 
        className="container mx-auto px-4 py-8 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img 
                src={eventData.imageUrl} 
                alt={eventData.title} 
                className="w-full h-64 object-cover sm:h-80 md:h-96"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-500 hover:bg-purple-600">
                  {eventData.category}
                </Badge>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {eventData.title}
                  </h1>
                  <p className="text-gray-500 text-sm">Organized by {eventData.organizer}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={handlePurchaseTicket}
                    disabled={ticketsAvailable === 0}
                  >
                    {ticketsAvailable > 0 ? `Get Tickets - ${eventData.price}` : 'Sold Out'}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Calendar size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{eventData.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Clock size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{eventData.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <MapPin size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{eventData.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users size={20} className="text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Attendees</p>
                    <p className="font-medium">{eventData.attendees} / {eventData.capacity}</p>
                  </div>
                </div>
              </div>
              
              {ticketsAvailable < 50 && ticketsAvailable > 0 && (
                <Alert className="mb-6 bg-amber-50 border-amber-200">
                  <AlertTitle className="text-amber-800 flex items-center gap-2">
                    <span>Limited tickets available!</span>
                  </AlertTitle>
                  <AlertDescription className="text-amber-700">
                    Only {ticketsAvailable} tickets left. Secure yours before they&apos;re gone.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Tabs Section for Details */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="reviews">Reviews & FAQ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <div className="prose max-w-none">
                <p className="mb-6">{eventData.description}</p>
                <div className="whitespace-pre-line text-gray-700">
                  {eventData.longDescription}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Location</h3>
                <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                  {/* Map placeholder - in a real app, you would integrate with a maps API */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <MapPin size={48} className="text-gray-400" />
                    <span className="ml-2 text-gray-500">Map view of {eventData.location}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="agenda" className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-6">Event Agenda</h2>
              
              <div className="space-y-8">
                {eventData.agenda.map((day, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold mb-4 text-purple-500">{day.day}</h3>
                    <div className="space-y-4">
                      {day.items.map((item, itemIndex) => (
                        <motion.div 
                          key={itemIndex}
                          className="border-l-2 border-purple-200 pl-4 py-2"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="text-sm font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded">
                              {item.time}
                            </span>
                            <h4 className="font-medium">{item.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="speakers" className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-6">Featured Speakers</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventData.speakers.map((speaker, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={speaker.avatar} />
                        <AvatarFallback className="bg-purple-200 text-purple-800">
                          {speaker.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg">{speaker.name}</h3>
                      <p className="text-gray-500 text-sm">{speaker.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="bg-white rounded-xl p-6 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-6">Reviews</h2>
                  
                  <div className="space-y-6">
                    {eventData.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback className="bg-purple-200 text-purple-800">
                              {review.user[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="outline" className="flex items-center gap-2">
                      <MessageSquare size={16} />
                      <span>Write a Review</span>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
                  
                  <div className="space-y-4">
                    {eventData.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                        <h3 className="font-medium mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Related Events Section */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Similar Events You Might Like</h2>
            <Button variant="link" className="text-purple-500">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ y: -5 }}
              >
                <img 
                  src={`/api/placeholder/400/${200 + item * 10}`} 
                  alt="Related Event" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Badge className="mb-2 bg-purple-100 text-purple-800 hover:bg-purple-200">Technology</Badge>
                  <h3 className="font-semibold mb-2">Tech Workshop {item}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar size={14} />
                    <span>June {item + 5}, 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">$199</span>
                    <Button variant="outline" size="sm" className="text-purple-500 border-purple-500 hover:bg-purple-50">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Fixed CTA Button for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600"
            onClick={handlePurchaseTicket}
            disabled={ticketsAvailable === 0}
          >
            {ticketsAvailable > 0 ? `Get Tickets - ${eventData.price}` : 'Sold Out'}
          </Button>
        </div>
      </motion.div>
      
      
    </div>
  );
}
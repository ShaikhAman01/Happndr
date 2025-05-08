import Link from "next/link"
import { 
  Calendar,
  Code,
  GraduationCap,
  Laptop,
  Briefcase,
  PartyPopper,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { id: "1", name: "Conference", icon: <Calendar className="h-6 w-6" />, count: 124 },
  { id: "2", name: "Workshop", icon: <Code className="h-6 w-6" />, count: 89 },
  { id: "3", name: "Seminar", icon: <GraduationCap className="h-6 w-6" />, count: 76 },
  { id: "4", name: "Hackathon", icon: <Laptop className="h-6 w-6" />, count: 42 },
  { id: "5", name: "Career Fair", icon: <Briefcase className="h-6 w-6" />, count: 58 },
  { id: "6", name: "Social", icon: <PartyPopper className="h-6 w-6" />, count: 112 },
]

export default function CategoriesSection() {
  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/50"
      style={{
        '--primary': 'rgb(168 85 247)', // purple-500
        '--primary-foreground': 'white',
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium leading-5 text-primary">
            BROWSE BY INTEREST
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Popular <span className="text-primary">Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover events tailored to your interests from our curated selection
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={category.id}
              className="group"
            >
              <Card className="h-full transition-all hover:shadow-md group-hover:shadow-lg group-hover:border-primary/20">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 mb-4 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {category.count} events
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
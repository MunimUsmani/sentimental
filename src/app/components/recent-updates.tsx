import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Camera, BookOpen, Utensils, ArrowRight } from "lucide-react"

export default function RecentUpdates() {
  return (
    <section className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Recent Updates</h2>
          <p className="text-muted-foreground mt-2">
            Our community is actively sharing new memories every day. See what's happening!
          </p>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0">
          View All Updates <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UpdateCard
          icon={<Camera className="h-5 w-5" />}
          title="New Photos Added"
          description="5 new photos added to Family album"
          date="2 hours ago"
          link="/gallery"
          image="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          user="Sarah Johnson"
        />
        <UpdateCard
          icon={<BookOpen className="h-5 w-5" />}
          title="Our Trip to the Mountains"
          description="We had an amazing weekend getaway to the mountains. The views were breathtaking and the kids loved it!"
          date="Yesterday"
          link="/blog/1"
          image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          user="Michael Thompson"
        />
        <UpdateCard
          icon={<Utensils className="h-5 w-5" />}
          title="Grandma's Apple Pie Recipe"
          description="Finally sharing the secret family recipe that's been passed down for generations."
          date="3 days ago"
          link="/recipes/1"
          image="https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          user="Elizabeth Parker"
        />
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50">
          Load More Updates
        </Button>
      </div>
    </section>
  )
}

function UpdateCard({
  icon,
  title,
  description,
  date,
  link,
  image,
  user,
}: {
  icon: React.ReactNode
  title: string
  description: string
  date: string
  link: string
  image: string
  user: string
}) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full">{icon}</div>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm py-1 px-2 rounded-full text-xs flex items-center">
          <Calendar className="h-3 w-3 mr-1" /> {date}
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs">Posted by {user}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button asChild variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 p-0">
          <Link href={link}>
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Camera, BookOpen, Utensils } from "lucide-react"

export default function RecentUpdates() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Recent Updates</h2>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UpdateCard
              icon={<Camera className="h-5 w-5" />}
              title="New Photos Added"
              description="5 new photos added to Family album"
              date="2 hours ago"
              link="/gallery"
            />
            <UpdateCard
              icon={<BookOpen className="h-5 w-5" />}
              title="New Blog Post"
              description="Our Trip to the Mountains"
              date="Yesterday"
              link="/blog/1"
            />
            <UpdateCard
              icon={<Utensils className="h-5 w-5" />}
              title="New Recipe"
              description="Grandma's Apple Pie recipe added"
              date="3 days ago"
              link="/recipes/1"
            />
          </div>
        </TabsContent>

        <TabsContent value="photos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UpdateCard
              icon={<Camera className="h-5 w-5" />}
              title="New Photos Added"
              description="5 new photos added to Family album"
              date="2 hours ago"
              link="/gallery"
            />
            <UpdateCard
              icon={<Camera className="h-5 w-5" />}
              title="Photo Album Created"
              description="New 'Travel' album created"
              date="1 week ago"
              link="/gallery"
            />
            <UpdateCard
              icon={<Camera className="h-5 w-5" />}
              title="Photos Updated"
              description="Added descriptions to 10 photos"
              date="2 weeks ago"
              link="/gallery"
            />
          </div>
        </TabsContent>

        <TabsContent value="blog" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UpdateCard
              icon={<BookOpen className="h-5 w-5" />}
              title="New Blog Post"
              description="Our Trip to the Mountains"
              date="Yesterday"
              link="/blog/1"
            />
            <UpdateCard
              icon={<BookOpen className="h-5 w-5" />}
              title="New Blog Post"
              description="Grandchildren's Visit"
              date="1 week ago"
              link="/blog/2"
            />
            <UpdateCard
              icon={<BookOpen className="h-5 w-5" />}
              title="New Blog Post"
              description="Anniversary Celebration"
              date="2 weeks ago"
              link="/blog/3"
            />
          </div>
        </TabsContent>

        <TabsContent value="recipes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UpdateCard
              icon={<Utensils className="h-5 w-5" />}
              title="New Recipe"
              description="Grandma's Apple Pie recipe added"
              date="3 days ago"
              link="/recipes/1"
            />
            <UpdateCard
              icon={<Utensils className="h-5 w-5" />}
              title="New Recipe"
              description="Sunday Pot Roast recipe added"
              date="1 week ago"
              link="/recipes/2"
            />
            <UpdateCard
              icon={<Utensils className="h-5 w-5" />}
              title="Recipe Updated"
              description="Updated Homemade Bread recipe"
              date="2 weeks ago"
              link="/recipes/4"
            />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function UpdateCard({
  icon,
  title,
  description,
  date,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  date: string
  link: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="bg-primary/10 p-2 rounded-full">{icon}</div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs flex items-center mt-1">
            <Calendar className="h-3 w-3 mr-1" /> {date}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
        <Link href={link} className="text-sm text-primary hover:underline mt-2 inline-block">
          View Details
        </Link>
      </CardContent>
    </Card>
  )
}

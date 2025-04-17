import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Calendar, User, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - Memory Sharing",
  description: "Read our stories and journal entries",
}

const blogPosts = [
  {
    id: 1,
    title: "Our Trip to the Mountains",
    excerpt:
      "Last weekend, we decided to take a trip to the mountains. The weather was perfect and the views were breathtaking...",
    date: "April 10, 2023",
    author: "John Doe",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Grandchildren's Visit",
    excerpt:
      "We had such a wonderful time when our grandchildren came to visit us last month. They've grown so much since...",
    date: "March 15, 2023",
    author: "Jane Doe",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Anniversary Celebration",
    excerpt:
      "Yesterday marked our 45th wedding anniversary. We celebrated by revisiting the restaurant where we had our first date...",
    date: "February 22, 2023",
    author: "John Doe",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Garden Progress",
    excerpt:
      "The garden is coming along beautifully this year. The roses are in full bloom and the vegetable patch is thriving...",
    date: "April 5, 2023",
    author: "Jane Doe",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="text-muted-foreground">Our stories and journal entries</p>
        </div>
        <Button asChild>
          <Link href="/blog/add">
            <PlusCircle className="mr-2 h-4 w-4" /> New Entry
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <img src={post.imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> {post.date}
                </span>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" /> {post.author}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href={`/blog/${post.id}`}>
                  Read More <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

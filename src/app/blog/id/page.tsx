import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, MessageSquare, Download, Pencil } from "lucide-react"
import CommentSection from "@/app/components/comment-section"

export const metadata: Metadata = {
  title: "Blog Post - Memory Sharing",
  description: "Read our stories and journal entries",
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = params.id

  // Mock data for the blog post
  const post = {
    id: postId,
    title: "Our Trip to the Mountains",
    content: `
      <p>Last weekend, we decided to take a trip to the mountains. The weather was perfect and the views were breathtaking.</p>
      
      <p>We started our journey early in the morning, just as the sun was rising. The drive up the winding mountain roads was peaceful, with hardly any traffic. We stopped at several viewpoints along the way to take in the scenery and snap some photos.</p>
      
      <p>By midday, we reached our destination - a small cabin nestled among the trees with a stunning view of the valley below. After settling in, we went for a short hike on one of the nearby trails. The fresh mountain air was invigorating, and we spotted several deer and a variety of birds.</p>
      
      <p>In the evening, we sat on the porch, wrapped in blankets, watching the sunset paint the sky in hues of orange and pink. We reminisced about our previous trips to this spot and how much has changed over the years.</p>
      
      <p>The next day, we visited a local farmers' market in the nearby town and picked up some fresh produce and homemade jams. We spent the afternoon reading and relaxing before heading back home, already planning our next visit.</p>
      
      <p>These little getaways are what keep us young at heart. The memories we create during these trips are priceless, and we're grateful for every moment we get to spend together in such beautiful surroundings.</p>
    `,
    date: "April 10, 2023",
    author: "John Doe",
    imageUrl: "/placeholder.svg?height=400&width=800",
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button size="sm" asChild>
            <Link href={`/blog/edit/${postId}`}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden mb-8">
        <img src={post.imageUrl || "/placeholder.svg"} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> {post.date}
            </span>
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" /> {post.author}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" /> 5 Comments
            </span>
          </div>

          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </Card>

      <CommentSection postId={postId} />
    </div>
  )
}

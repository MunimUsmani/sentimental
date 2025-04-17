"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  PlusCircle,
  Calendar,
  ArrowRight,
  Star,
  Send,
  MessageCircle,
  MoreHorizontal,
  Edit,
  Trash,
  Share,
  Bookmark,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const blogPosts = [
  {
    id: 1,
    
    title: "Our Trip to the Mountains",
    excerpt:
      "Last weekend, we decided to take a trip to the mountains. The weather was perfect and the views were breathtaking. We hiked along several trails and enjoyed picnics with panoramic views. The children especially loved spotting wildlife and collecting interesting rocks along the way.",
    date: "April 10, 2023",
    author: "John Doe",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 4.8,
    comments: [
      {
        id: 1,
        author: "Sarah Johnson",
        text: "Beautiful photos! This brings back memories of our trip last year.",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      {
        id: 2,
        author: "Michael Brown",
        text: "The mountains look amazing! Which trail did you take?",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
    ],
  },
  {
    id: 2,
    title: "Grandchildren's Visit",
    excerpt:
      "We had such a wonderful time when our grandchildren came to visit us last month. They've grown so much since we last saw them. We spent days baking cookies, playing board games, and sharing stories. It's amazing how quickly they're growing up and developing their own unique personalities.",
    date: "March 15, 2023",
    author: "Jane Doe",
    authorAvatar: "https://i.pravatar.cc/150?img=2",
    imageUrl:
      "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
    rating: 4.9,
    comments: [
      {
        id: 1,
        author: "Elizabeth Parker",
        text: "They're growing up so fast! Lovely to see everyone together.",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
    ],
  },
  {
    id: 3,
    title: "Anniversary Celebration",
    excerpt:
      "Yesterday marked our 45th wedding anniversary. We celebrated by revisiting the restaurant where we had our first date. It's changed over the years, but the memories remain vivid. We shared a wonderful meal, reminisced about our journey together, and toasted to many more years of happiness.",
    date: "February 22, 2023",
    author: "John Doe",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    imageUrl:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    rating: 5.0,
    comments: [
      {
        id: 1,
        author: "Robert Wilson",
        text: "Congratulations on 45 years! That's truly inspiring.",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      {
        id: 2,
        author: "Jennifer Adams",
        text: "Happy anniversary! The restaurant looks so romantic.",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      {
        id: 3,
        author: "David Miller",
        text: "What a milestone! Here's to many more years together.",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
    ],
  },
  {
    id: 4,
    title: "Garden Progress",
    excerpt:
      "The garden is coming along beautifully this year. The roses are in full bloom and the vegetable patch is thriving. We've been harvesting fresh lettuce, tomatoes, and herbs daily. There's something deeply satisfying about growing your own food and watching the garden transform through the seasons.",
    date: "April 5, 2023",
    author: "Jane Doe",
    authorAvatar: "https://i.pravatar.cc/150?img=2",
    imageUrl:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
    rating: 4.7,
    comments: [
      {
        id: 1,
        author: "Thomas Clark",
        text: "Your garden looks amazing! Any tips for growing tomatoes?",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
    ],
  },
]

export default function BlogPage() {
  const [expandedComments, setExpandedComments] = useState<number | null>(null)
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({})
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      cardRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const elementTop = rect.top + scrollPosition
          const offset = (scrollPosition - elementTop) * 0.1

          // Apply parallax effect to the entire card
          if (elementTop < scrollPosition + window.innerHeight && elementTop + rect.height > scrollPosition) {
            ref.style.transform = `translateY(${offset}px)`
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleComments = (postId: number) => {
    setExpandedComments(expandedComments === postId ? null : postId)
  }

  const handleCommentChange = (postId: number, value: string) => {
    setNewComments({ ...newComments, [postId]: value })
  }

  const submitComment = (postId: number) => {
    if (newComments[postId]?.trim()) {
      // In a real app, you would submit this to your backend
      console.log(`New comment for post ${postId}: ${newComments[postId]}`)
      setNewComments({ ...newComments, [postId]: "" })
    }
  }

  const handleEdit = (postId: number) => {
    console.log(`Edit post ${postId}`)
    // Navigate to edit page or open edit modal
  }

  const handleDelete = (postId: number) => {
    console.log(`Delete post ${postId}`)
    // Show confirmation dialog and delete post
  }

  const handleShare = (postId: number) => {
    console.log(`Share post ${postId}`)
    // Open share dialog
  }

  const handleSave = (postId: number) => {
    console.log(`Save post ${postId}`)
    // Save/bookmark post
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="relative z-10 container mx-auto py-12 px-4 space-y-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <div>
            <h1 className="text-4xl font-bold text-amber-800">Our Family Blog</h1>
            <p className="text-muted-foreground text-lg">Stories and memories from our journey together</p>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700" asChild>
            <Link href="/blog/add">
              <PlusCircle className="mr-2 h-4 w-4" /> Share Your Story
            </Link>
          </Button>
        </div>

        <div className="space-y-24">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="transition-transform duration-300 ease-out"
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Action Menu */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-3 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(post.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(post.id)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleShare(post.id)}>
                        <Share className="mr-2 h-4 w-4" /> Share
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSave(post.id)}>
                        <Bookmark className="mr-2 h-4 w-4" /> Save
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Image */}
                <div className="relative h-80">
                  <img
                    src={post.imageUrl || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                  <div className="absolute bottom-4 left-4 flex items-center">
                    <Avatar className="border-2 border-white h-10 w-10">
                      <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2 text-white">
                      <p className="font-medium">{post.author}</p>
                      <p className="text-xs flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {post.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(post.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-medium">{post.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{post.excerpt}</p>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                      onClick={() => toggleComments(post.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments.length} Comments
                    </Button>

                    <Button variant="ghost" className="text-amber-700 hover:text-amber-800 hover:bg-amber-50" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read More <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  {/* Comments Section */}
                  {expandedComments === post.id && (
                    <div className="mt-6 pt-4 border-t">
                      <h3 className="font-medium mb-3">Comments</h3>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-50 rounded-lg p-3 flex-1">
                              <p className="font-medium text-sm">{comment.author}</p>
                              <p className="text-sm text-gray-600">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Input
                          placeholder="Add a comment..."
                          value={newComments[post.id] || ""}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          size="icon"
                          className="bg-amber-600 hover:bg-amber-700"
                          onClick={() => submitComment(post.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

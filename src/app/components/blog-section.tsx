"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Our Summer Vacation at Lake Tahoe",
    excerpt: "The most memorable moments from our family trip to the mountains last summer.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "August 15, 2023",
    author: "Sarah Johnson",
    slug: "summer-vacation-lake-tahoe"
  },
  {
    id: 2,
    title: "Grandma's 80th Birthday Celebration",
    excerpt: "A beautiful gathering of four generations to celebrate our beloved grandmother.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
    date: "June 22, 2023",
    author: "Michael Thompson",
    slug: "grandmas-80th-birthday"
  },
  {
    id: 3,
    title: "Our Family Cookbook Project",
    excerpt: "How we collected and preserved recipes from five generations of our family.",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "May 10, 2023",
    author: "Elizabeth Parker",
    slug: "family-cookbook-project"
  },
  {
    id: 4,
    title: "The Family Reunion in Colorado",
    excerpt: "Highlights from our annual family reunion with relatives from across the country.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
    date: "July 4, 2023",
    author: "Robert Wilson",
    slug: "family-reunion-colorado"
  },
  {
    id: 5,
    title: "Our Heritage: Tracing Our Family Roots",
    excerpt: "Discovering our ancestors and the journey that brought our family to where we are today.",
    image: "https://images.unsplash.com/photo-1503516459261-40c66117780a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80",
    date: "April 18, 2023",
    author: "Jennifer Adams",
    slug: "tracing-family-roots"
  }
]

export default function BlogSection() {
  const [focusedPost, setFocusedPost] = useState<number | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('blog-scroll-container')
    if (container) {
      const scrollAmount = 300
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setScrollPosition(newPosition)
    }
  }

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Community Blogs</h2>
        <Button variant="outline" asChild>
          <Link href="/blog" className="flex items-center">
            View All Posts <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Stories, memories, and reflections from our family journey. Explore our shared experiences.
      </p>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <button 
          onClick={() => scrollContainer('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-amber-700" />
        </button>
        
        <button 
          onClick={() => scrollContainer('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-amber-700" />
        </button>
        
        {/* Scrollable Container */}
        <div 
          id="blog-scroll-container"
          className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="snap-center px-3 min-w-[280px] md:min-w-[350px]"
            >
              <div 
                className={cn(
                  "relative rounded-xl overflow-hidden transition-all duration-300",
                  focusedPost === post.id ? "scale-105 z-10 shadow-xl" : "hover:scale-102",
                  focusedPost !== null && focusedPost !== post.id ? "blur-sm" : ""
                )}
                onMouseEnter={() => setFocusedPost(post.id)}
                onMouseLeave={() => setFocusedPost(null)}
              >
                <div className="relative h-52 md:h-64">
                  <img 
                    src={post.image || "/placeholder.svg"} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <p className="text-sm font-medium">{post.date}</p>
                    <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
                  </div>
                </div>
                
                <div className="bg-white p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">By {post.author}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 p-0"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

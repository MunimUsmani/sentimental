import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import RecentUpdates from "./components/recent-updates"
import BlogSection from "@/app/components/blog-section"

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image with Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Family sharing memories"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-amber-800/70 to-amber-700/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-md">
            Cherish Every Moment, <span className="text-amber-200">Together</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-50 max-w-2xl mx-auto mb-8 drop-shadow">
            Preserve your family's legacy through photos, stories, and traditions that connect generations.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white" asChild>
              <Link href="/gallery">Browse Memories</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-200 text-amber-100 hover:bg-amber-800/30"
              asChild
            >
              <Link href="/login">Join Our Family</Link>
            </Button>
          </div>
        </div>
      </section>

      

      <BlogSection />

      <RecentUpdates />
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Camera, Book, Utensils, Mail } from 'lucide-react'
import RecentUpdates from "./components/recent-updates"

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
            <Button size="lg" variant="outline" className="border-amber-200 text-amber-100 hover:bg-amber-800/30" asChild>
              <Link href="/login">Join Our Family</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Explore Our Memories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Camera className="h-10 w-10 text-amber-600 mb-2" />
              <CardTitle>Photo Gallery</CardTitle>
              <CardDescription>Browse through our collection of photos</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-amber-700 hover:text-amber-800 hover:bg-amber-50" asChild>
                <Link href="/gallery">
                  View Gallery <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Book className="h-10 w-10 text-amber-600 mb-2" />
              <CardTitle>Blog</CardTitle>
              <CardDescription>Read our stories and journal entries</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-amber-700 hover:text-amber-800 hover:bg-amber-50" asChild>
                <Link href="/blog">
                  Read Blog <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Utensils className="h-10 w-10 text-amber-600 mb-2" />
              <CardTitle>Recipe Book</CardTitle>
              <CardDescription>Discover our favorite family recipes</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-amber-700 hover:text-amber-800 hover:bg-amber-50" asChild>
                <Link href="/recipes">
                  View Recipes <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-10 w-10 text-amber-600 mb-2" />
              <CardTitle>Contact</CardTitle>
              <CardDescription>Get in touch with us</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between text-amber-700 hover:text-amber-800 hover:bg-amber-50" asChild>
                <Link href="/contact">
                  Contact Us <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <RecentUpdates />
    </div>
  )
}

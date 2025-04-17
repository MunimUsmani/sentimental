import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Camera, Book, Utensils, Mail } from "lucide-react"
import RecentUpdates from "./components/recent-updates"

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Memory Sharing Space</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A place to preserve and share our precious memories with family and friends.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/gallery">Browse Photos</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Explore Our Memories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Camera className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Photo Gallery</CardTitle>
              <CardDescription>Browse through our collection of photos</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/gallery">
                  View Gallery <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Book className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Blog</CardTitle>
              <CardDescription>Read our stories and journal entries</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/blog">
                  Read Blog <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Utensils className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Recipe Book</CardTitle>
              <CardDescription>Discover our favorite family recipes</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href="/recipes">
                  View Recipes <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Contact</CardTitle>
              <CardDescription>Get in touch with us</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
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

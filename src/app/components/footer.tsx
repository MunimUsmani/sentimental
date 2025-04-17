import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left: Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-xl font-bold text-amber-700">
              Memory Sharing
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs text-center md:text-left">
              Preserving moments, connecting generations, and sharing the stories that make us who we are.
            </p>
          </div>

          {/* Center: Copyright and Links */}
          <div className="flex flex-col items-center">
            <nav className="flex flex-wrap justify-center gap-6 mb-4">
              <Link
                href="/gallery"
                className="text-sm font-medium text-muted-foreground hover:text-amber-600 transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-amber-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/recipes"
                className="text-sm font-medium text-muted-foreground hover:text-amber-600 transition-colors"
              >
                Recipes
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-amber-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Memory Sharing. All rights reserved.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-medium mb-3 text-sm">Connect With Us</h3>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Follow us for updates and new memories</p>
          </div>
        </div>
      </div>

      {/* Bottom border with warm gradient */}
      <div className="h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
    </footer>
  )
}

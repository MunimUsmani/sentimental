import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:justify-between md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/" className="text-lg font-bold">
            Memory Sharing
          </Link>
          <nav className="flex gap-4 md:gap-6">
            <Link href="/gallery" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Gallery
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="/recipes" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Recipes
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} Memory Sharing. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

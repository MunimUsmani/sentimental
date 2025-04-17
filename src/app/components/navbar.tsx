"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Camera, BookOpen, Utensils, Mail, Home, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Photo Gallery",
    path: "/gallery",
    icon: Camera,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: BookOpen,
  },
  {
    name: "Recipe Book",
    path: "/recipes",
    icon: Utensils,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: Mail,
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Memory Sharing</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {route.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden md:flex">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 pt-6">
                {routes.map((route) => {
                  const Icon = route.icon
                  return (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center text-lg font-medium transition-colors hover:text-primary",
                        pathname === route.path ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      <Icon className="mr-2 h-5 w-5" />
                      {route.name}
                    </Link>
                  )
                })}
                <Button asChild className="mt-4">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

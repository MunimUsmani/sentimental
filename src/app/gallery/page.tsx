import type { Metadata } from "next"
import PhotoGallery from "@/app/components/photo-gallery"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Photo Gallery - Memory Sharing",
  description: "Browse through our collection of photos and memories",
}

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Photo Gallery</h1>
          <p className="text-muted-foreground">Browse through our collection of memories</p>
        </div>
        <Button asChild>
          <Link href="/gallery/add">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Photo
          </Link>
        </Button>
      </div>

      <PhotoGallery />
    </div>
  )
}

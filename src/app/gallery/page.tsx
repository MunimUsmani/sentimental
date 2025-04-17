'use client'
import type { Metadata } from "next"
import PhotoGallery from "@/app/components/photo-gallery"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/app/components/protected-route"
import { useEffect, useState } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Use the base URL from the environment variables

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const response = await fetch(`${BASE_URL}/api/gallery`); // Use the base URL
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data);
      } else {
        console.error("Failed to fetch gallery items");
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <ProtectedRoute>
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

        <PhotoGallery items={galleryItems} />
      </div>
    </ProtectedRoute>
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image" 
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface GalleryItem {
  _id: string
  title: string
  category: string
  imageUrl: string
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/gallery")
      if (!response.ok) {
        throw new Error("Failed to fetch photos")
      }
      const data = await response.json()
      setPhotos(data)
    } catch (error) {
      console.error("Error fetching photos:", error)
      toast.error("Failed to load photos")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const response = await fetch(`/api/gallery/${deleteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete photo")
      }

      setPhotos(photos.filter((photo) => photo._id !== deleteId))
      toast.success("Photo deleted successfully")
    } catch (error) {
      console.error("Error deleting photo:", error)
      toast.error("Failed to delete photo")
    } finally {
      setIsDeleteDialogOpen(false)
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-muted rounded-lg h-64"></div>
        ))}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No photos found</h3>
        <p className="text-muted-foreground mt-1">Add your first photo to get started.</p>
        <Button className="mt-4" asChild>
          <Link href="/gallery/add">Add New Photo</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo._id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={photo.imageUrl || "/placeholder.svg"}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 flex flex-col items-start gap-2">
              <div className="w-full">
                <h3 className="font-medium truncate">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.category}</p>
              </div>
              <div className="flex justify-between w-full mt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/gallery/edit/${photo._id}`}>
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(photo._id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the photo from the gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

"use client"

import React from "react"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Heart, MessageSquare, Share2 } from "lucide-react"

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface PhotoGalleryProps {
  items: GalleryItem[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ items }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openPhotoDialog = (photo: GalleryItem) => {
    setSelectedPhoto(photo)
    setIsDialogOpen(true)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item._id} className="border rounded-lg overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function PhotoCard({ photo, onClick }: { photo: GalleryItem; onClick: () => void }) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative aspect-square">
        <Image src={photo.imageUrl || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-medium truncate">{photo.title}</h3>
        <p className="text-xs text-muted-foreground">{photo.category}</p>
      </div>
    </Card>
  )
}

export default PhotoGallery
  
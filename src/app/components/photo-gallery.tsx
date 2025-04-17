"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Heart, MessageSquare, Share2 } from "lucide-react"

// Mock data for photos
const photos = [
  {
    id: 1,
    title: "Family Reunion",
    description: "Summer family reunion at the lake house",
    date: "July 15, 2023",
    album: "family",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Garden in Bloom",
    description: "Our garden in full bloom this spring",
    date: "April 22, 2023",
    album: "home",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Anniversary Dinner",
    description: "Our 45th anniversary celebration",
    date: "February 14, 2023",
    album: "events",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Mountain Trip",
    description: "Our weekend getaway to the mountains",
    date: "March 10, 2023",
    album: "travel",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Grandchildren Visit",
    description: "When the grandchildren came to visit",
    date: "June 5, 2023",
    album: "family",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    title: "New Puppy",
    description: "Our neighbor's new puppy came to visit",
    date: "May 20, 2023",
    album: "home",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 7,
    title: "Beach Day",
    description: "Day trip to the beach",
    date: "August 8, 2023",
    album: "travel",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 8,
    title: "Birthday Party",
    description: "John's 70th birthday celebration",
    date: "September 12, 2023",
    album: "events",
    imageUrl: "/placeholder.svg?height=300&width=400",
  },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openPhotoDialog = (photo: any) => {
    setSelectedPhoto(photo)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Photos</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="travel">Travel</TabsTrigger>
          <TabsTrigger value="home">Home</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} onClick={() => openPhotoDialog(photo)} />
            ))}
          </div>
        </TabsContent>

        {["family", "events", "travel", "home"].map((album) => (
          <TabsContent key={album} value={album} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos
                .filter((photo) => photo.album === album)
                .map((photo) => (
                  <PhotoCard key={photo.id} photo={photo} onClick={() => openPhotoDialog(photo)} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedPhoto && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedPhoto.title}</DialogTitle>
                <DialogDescription>{selectedPhoto.description}</DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={selectedPhoto.imageUrl || "/placeholder.svg"}
                  alt={selectedPhoto.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{selectedPhoto.date}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function PhotoCard({ photo, onClick }: { photo: any; onClick: () => void }) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative aspect-square">
        <Image src={photo.imageUrl || "/placeholder.svg"} alt={photo.title} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h3 className="font-medium truncate">{photo.title}</h3>
        <p className="text-xs text-muted-foreground">{photo.date}</p>
      </div>
    </Card>
  )
}

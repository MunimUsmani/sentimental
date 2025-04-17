"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/app/components/protected-route"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Use the base URL from the environment variables

interface GalleryItem {
  _id: string
  title: string
  category: string
  imageUrl: string
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

export default function EditPhotoPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Uncategorized")
  const [imageUrl, setImageUrl] = useState("")
  const [uploadedBy, setUploadedBy] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setIsFetching(true)
        const response = await fetch(`${BASE_URL}/api/gallery/${id}`); // Use the base URL

        if (!response.ok) {
          throw new Error("Failed to fetch photo")
        }

        const data: GalleryItem = await response.json()

        setTitle(data.title)
        setCategory(data.category)
        setImageUrl(data.imageUrl)
        setUploadedBy(data.uploadedBy)
      } catch (error) {
        console.error("Error fetching photo:", error)
        toast.error("Failed to load photo details")
        router.push("/gallery")
      } finally {
        setIsFetching(false)
      }
    }

    if (id) {
      fetchPhoto()
    }
  }, [id, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("category", category)
      formData.append("uploadedBy", uploadedBy)

      // Only append image if a new one is selected
      if (selectedFile) {
        formData.append("image", selectedFile)
      }

      const response = await fetch(`${BASE_URL}/api/gallery/${id}`, { // Use the base URL
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || "Failed to update photo")
      }

      toast.success("Photo updated successfully.")
      router.push("/gallery")
    } catch (error) {
      console.error("Error updating photo:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update photo. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-32 bg-muted rounded"></div>
            <div className="h-[400px] bg-muted rounded-lg"></div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/gallery">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Edit Photo</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                    <SelectItem value="Nature">Nature</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Photo</Label>
                <div className="border rounded-lg p-2">
                  <img
                    src={preview || imageUrl || "/placeholder.svg"}
                    alt={title}
                    className="max-h-[300px] mx-auto object-contain rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPhoto">Upload New Photo (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop a new photo here or click to browse
                  </p>
                  <Input
                    id="newPhoto"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Select New Photo
                  </Button>
                  {preview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setPreview(null)
                        setSelectedFile(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ""
                        }
                      }}
                      className="mt-2"
                    >
                      Remove New Photo
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                  </>
                ) : (
                  "Update Photo"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

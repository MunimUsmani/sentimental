"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Upload, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/app/components/protected-route"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Use the base URL from the environment variables

export default function AddPhotoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Uncategorized")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

    if (!selectedFile) {
      toast.error("Please select an image to upload")
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("category", category)
      formData.append("image", selectedFile)

      const response = await fetch(`${BASE_URL}/api/gallery/upload`, { // Use the base URL
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || "Failed to upload photo")
      }

      toast.success("Your photo has been uploaded successfully.")
      router.push("/gallery")
    } catch (error) {
      console.error("Error uploading photo:", error)
      toast.error(error instanceof Error ? error.message : "Failed to upload photo. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            <CardTitle>Add New Photo</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Summer Vacation 2023"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
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
                <Label htmlFor="photo">Upload Photo</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  {preview ? (
                    <div className="space-y-4 w-full">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-[300px] mx-auto object-contain rounded-lg"
                      />
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
                        className="w-full"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your photo here or click to browse
                      </p>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        required
                      />
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        Select Photo
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  "Upload Photo"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </ProtectedRoute>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddPhotoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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

    // Simulate upload process
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Your photo has been uploaded successfully.")
      router.push("/gallery")
    }, 1500)
  }

  return (
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
              <Input id="title" placeholder="Summer Vacation 2023" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write a description about this photo..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date Taken</Label>
              <Input id="date" type="date" required />
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
                    <Button type="button" variant="outline" onClick={() => setPreview(null)} className="w-full">
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
                      onChange={handleImageChange}
                      required
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("photo")?.click()}>
                      Select Photo
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Uploading..." : "Upload Photo"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

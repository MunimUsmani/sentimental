"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

// Define initial comments
const initialComments: { id: number; author: string; avatar: string; content: string; date: string }[] = [];

// ...existing code...

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const comment = {
        id: comments.length + 1,
        author: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        date: "Just now",
      }

      setComments([...comments, comment])
      setNewComment("")
      setIsSubmitting(false)

      toast("Your comment has been added successfully.")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{comment.author}</h4>
                <span className="text-xs text-muted-foreground">{comment.date}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add a Comment</h3>
        <Textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSubmitComment} disabled={isSubmitting || !newComment.trim()}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </div>
    </div>
  )
}

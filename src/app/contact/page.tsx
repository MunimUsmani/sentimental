import type { Metadata } from "next"
import ContactPageClient from "./contactpage"

export const metadata: Metadata = {
  title: "Contact Us - Memory Sharing",
  description: "Get in touch with us",
}

export default function ContactPage() {
  return <ContactPageClient />
}

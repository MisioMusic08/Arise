"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, MessageCircle, Heart, Share2, Calendar, Award, TrendingUp, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"

const communityStats = [
  { label: "Active Members", value: "2,500+", icon: Users, color: "text-blue-600" },
  { label: "Success Stories", value: "150+", icon: Award, color: "text-green-600" },
  { label: "Monthly Events", value: "25+", icon: Calendar, color: "text-purple-600" },
  { label: "Growth Rate", value: "45%", icon: TrendingUp, color: "text-orange-600" },
]

const communityPosts = [
  {
    id: 1,
    author: "Arjun Sharma",
    role: "Final Year Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content:
      "Just launched my e-commerce startup thanks to the skills learned at CPS Commerce Expo! The mentorship and resources provided were invaluable. Looking forward to sharing my journey with fellow students.",
    timestamp: "2 hours ago",
    likes: 45,
    comments: 12,
    shares: 8,
    category: "Success Story",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
  },
  {
    id: 2,
    author: "Priya Patel",
    role: "Alumni - Class of 2020",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    content:
      "Excited to announce that I'll be speaking at the upcoming Digital Marketing Workshop! Can't wait to share insights from my 4 years in the industry with current students. #CPSAlumni #DigitalMarketing",
    timestamp: "5 hours ago",
    likes: 67,
    comments: 23,
    shares: 15,
    category: "Announcement",
  },
  {
    id: 3,
    author: "Rahul Kumar",
    role: "Third Year Student",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    content:
      "Working on an innovative blockchain project for supply chain management. Looking for team members with coding experience. This could be our ticket to the Innovation Showcase! DM if interested.",
    timestamp: "1 day ago",
    likes: 34,
    comments: 18,
    shares: 6,
    category: "Collaboration",
  },
  {
    id: 4,
    author: "Sneha Reddy",
    role: "Secon Year Student",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content:
      "The mentorship program has been a game-changer! My mentor helped me understand market analysis and now I'm confident about my business plan. Thank you CPS for this amazing opportunity! 🙏",
    timestamp: "2 days ago",
    likes: 89,
    comments: 31,
    shares: 22,
    category: "Appreciation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
  },
]

const upcomingEvents = [
  {
    title: "Weekly Study Group",
    date: "Today, 6:00 PM",
    location: "Library Hall",
    attendees: 25,
  },
  {
    title: "Alumni Networking",
    date: "Tomorrow, 4:00 PM",
    location: "Conference Room",
    attendees: 45,
  },
  {
    title: "Project Showcase",
    date: "Friday, 2:00 PM",
    location: "Innovation Lab",
    attendees: 80,
  },
]

export default function CommunityPage() {
  const router = useRouter()
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  const handleBack = () => {
    router.push("/")
  }

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const handleJoinCommunity = () => {
    alert("Join Community feature coming soon! Please contact admin for access.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button onClick={handleBack} variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="flex items-center gap-3">
            <Image src="/cps-logo.png" alt="Chennai Public School Logo" width={32} height={32} className="rounded" />
            <span className="font-bold text-gray-900">Community Hub</span>
          </div>

          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart ({items.length})
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Community Hub
              <span className="block text-2xl md:text-3xl text-blue-300 font-normal mt-2">
                Connect • Collaborate • Grow
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our vibrant community of students, alumni, and industry professionals
            </p>
            <Button
              onClick={handleJoinCommunity}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg"
            >
              Join Community
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Feed</h2>

              <div className="space-y-6">
                {communityPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6">
                      {/* Post Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={post.avatar || "/placeholder.svg"}
                          alt={post.author}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{post.author}</div>
                          <div className="text-sm text-gray-500">{post.role}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-gray-500">{post.timestamp}</span>
                        </div>
                      </div>

                      {/* Post Content */}
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                      {/* Post Image */}
                      {post.image && (
                        <div className="mb-4 rounded-xl overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            width={600}
                            height={300}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      {/* Post Actions */}
                      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            likedPosts.includes(post.id) ? "text-red-500" : "text-gray-500 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                          {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          {post.shares}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="font-semibold text-gray-900 mb-1">{event.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{event.date}</div>
                    <div className="text-sm text-gray-500">{event.location}</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Users className="h-3 w-3" />
                      {event.attendees} attending
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Be respectful and professional in all interactions</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Share knowledge and help fellow community members</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Keep discussions relevant to commerce and education</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No spam or self-promotion without permission</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Create Post</Button>
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 bg-transparent">
                  Find Study Groups
                </Button>
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50 bg-transparent">
                  Browse Projects
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

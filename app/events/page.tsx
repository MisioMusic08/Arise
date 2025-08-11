"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Users, Clock, Star, Filter, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"

const events = [
  {
    id: 1,
    title: "Commerce Expo 2025 - Grand Opening",
    description:
      "The flagship event showcasing innovative student projects, industry partnerships, and cutting-edge business solutions.",
    date: "2025-03-15",
    time: "09:00 AM - 06:00 PM",
    location: "CPS Main Auditorium",
    category: "Main Event",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    attendees: 500,
    featured: true,
    status: "upcoming",
    price: "Free",
  },
  {
    id: 2,
    title: "Student Innovation Showcase",
    description:
      "Students present their groundbreaking commerce and technology projects to industry experts and peers.",
    date: "2025-03-16",
    time: "10:00 AM - 04:00 PM",
    location: "Innovation Hub",
    category: "Student Event",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    attendees: 200,
    featured: true,
    status: "upcoming",
    price: "Free",
  },
  {
    id: 3,
    title: "Industry Leaders Panel Discussion",
    description: "Leading business professionals share insights on modern commerce trends and future opportunities.",
    date: "2025-03-17",
    time: "02:00 PM - 05:00 PM",
    location: "Conference Hall A",
    category: "Professional",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    attendees: 150,
    featured: false,
    status: "upcoming",
    price: "₹500",
  },
  {
    id: 4,
    title: "Digital Marketing Workshop",
    description: "Hands-on workshop covering modern digital marketing strategies and tools for business growth.",
    date: "2025-03-18",
    time: "11:00 AM - 03:00 PM",
    location: "Workshop Room 1",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    attendees: 80,
    featured: false,
    status: "upcoming",
    price: "₹300",
  },
  {
    id: 5,
    title: "Entrepreneurship Bootcamp",
    description: "Intensive bootcamp for aspiring entrepreneurs covering business planning, funding, and execution.",
    date: "2025-03-20",
    time: "09:00 AM - 05:00 PM",
    location: "Startup Incubator",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    attendees: 60,
    featured: true,
    status: "upcoming",
    price: "₹1000",
  },
  {
    id: 6,
    title: "Alumni Success Stories",
    description: "Inspiring stories from successful CPS alumni who have made their mark in the business world.",
    date: "2025-03-22",
    time: "04:00 PM - 06:00 PM",
    location: "Alumni Hall",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
    attendees: 120,
    featured: false,
    status: "upcoming",
    price: "Free",
  },
]

export default function EventsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  const categories = ["All", "Main Event", "Student Event", "Professional", "Workshop", "Networking"]

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleBack = () => {
    router.push("/")
  }

  const handleEventRegister = (eventId: number) => {
    alert(`Registration for event ${eventId} - Feature coming soon!`)
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
            <span className="font-bold text-gray-900">Events & Exhibitions</span>
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
              Events & Exhibitions
              <span className="block text-2xl md:text-3xl text-blue-300 font-normal mt-2">Commerce Expo 2025</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join us for an incredible journey through innovation, learning, and networking opportunities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-gray-300 hover:bg-gray-50 text-gray-700"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">🌟 Featured Events</h2>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 text-lg font-bold">
              MUST ATTEND
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents
              .filter((e) => e.featured)
              .map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`font-bold ${event.price === "Free" ? "bg-green-500" : "bg-orange-500"} text-white`}
                        >
                          {event.price}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs border-blue-300 text-blue-600">
                          {event.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Users className="h-3 w-3" />
                          {event.attendees}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-3">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>

                      <Button
                        onClick={() => handleEventRegister(event.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                      >
                        Register Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Events */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Events</h2>
            <span className="text-gray-500">{filteredEvents.length} events found</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {event.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`text-xs font-bold ${event.price === "Free" ? "bg-green-500" : "bg-orange-500"} text-white`}
                      >
                        {event.price}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {event.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Users className="h-3 w-3" />
                        {event.attendees}
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleEventRegister(event.id)}
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No events found</div>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </motion.div>
      </section>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Calendar, MapPin, Clock, Users, Star, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"

export default function EventDetailsPage() {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()

  const handleBack = () => {
    router.push("/")
  }

  const handleContinue = () => {
    router.push("/expo") // Changed from /products to /expo
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 border-b border-gray-100"
      >
        <Button
          onClick={handleBack}
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="flex items-center gap-3">
          <Image src="/cps-logo.png" alt="Chennai Public School Logo" width={40} height={40} />
          <span className="font-semibold text-gray-900">Chennai Public School</span>
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
      </motion.header>

      {/* Event Advertisement */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-12 shadow-lg">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Commerce Expo 2025
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                The Ultimate Showcase of Business Innovation, Student Excellence, and Future Commerce Solutions
              </p>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>March 15-17, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>CPS Main Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>9:00 AM - 6:00 PM</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
                <span className="text-gray-600 ml-2">Rated 5/5 by Industry Experts</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Event Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Student Innovation Hub</h3>
            <p className="text-gray-600 mb-4">
              Witness groundbreaking projects from our commerce students, featuring AI-powered business solutions,
              sustainable commerce models, and innovative startup ideas.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• 50+ Student Projects</li>
              <li>• Live Demonstrations</li>
              <li>• Interactive Workshops</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Industry Excellence</h3>
            <p className="text-gray-600 mb-4">
              Connect with leading industry professionals, successful alumni, and business leaders who will share
              insights on modern commerce trends and career opportunities.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• 25+ Industry Speakers</li>
              <li>• Networking Sessions</li>
              <li>• Career Guidance</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Exclusive Marketplace</h3>
            <p className="text-gray-600 mb-4">
              Shop from our curated collection of educational materials, school merchandise, and student-created
              products. All proceeds support our educational programs.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Premium School Merchandise</li>
              <li>• Educational Resources</li>
              <li>• Student Creations</li>
            </ul>
          </div>
        </motion.div>

        {/* Event Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 rounded-3xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Event Schedule</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">Day 1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">March 15, 2025</h3>
              <p className="text-gray-600 mb-4">Opening Ceremony & Innovation Showcase</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>9:00 AM - Welcome Address</li>
                <li>10:00 AM - Student Project Presentations</li>
                <li>2:00 PM - Industry Panel Discussion</li>
                <li>4:00 PM - Networking Session</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">Day 2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">March 16, 2025</h3>
              <p className="text-gray-600 mb-4">Workshops & Marketplace Launch</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>9:00 AM - Interactive Workshops</li>
                <li>11:00 AM - Marketplace Opening</li>
                <li>1:00 PM - Alumni Meet & Greet</li>
                <li>3:00 PM - Career Guidance Sessions</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">Day 3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">March 17, 2025</h3>
              <p className="text-gray-600 mb-4">Awards & Closing Ceremony</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>9:00 AM - Final Presentations</li>
                <li>11:00 AM - Award Ceremony</li>
                <li>2:00 PM - Cultural Program</li>
                <li>4:00 PM - Closing Address</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore Our Marketplace?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Discover exclusive products, educational materials, and unique items created by our talented students.
              Every purchase supports our educational programs.
            </p>

            <Button
              onClick={handleContinue}
              className="group bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-3">
                Explore Products
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </motion.div>
      </section>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

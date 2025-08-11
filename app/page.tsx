"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Menu, X, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import GlowButton from "@/components/glow-button"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"

export default function HomePage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()
  const [showReview, setShowReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const handleGetStarted = () => {
    router.push("/expo")
  }

  const handleSignIn = () => {
    router.push("/login")
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false) // Close mobile menu on navigation
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-950"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <Image src="/cps-logo.png" alt="Chennai Public School" width={48} height={48} className="rounded-lg" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Chennai Public School</span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <button
              onClick={() => handleNavigation("/events")}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Events
            </button>
            <button
              onClick={() => handleNavigation("/expo")}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Products
            </button>
            <button
              onClick={() => handleNavigation("/sales")}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Sales
            </button>
            <button
              onClick={() => handleNavigation("/community")}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Community
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              About
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
            <GlowButton
              variant="secondary"
              onClick={() => setShowReview(true)}
              className="text-sm px-4 py-2"
            >
              <Star className="h-4 w-4 mr-2" />
              Star Us
            </GlowButton>
            <Button
              onClick={handleSignIn}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white hover:bg-white/10 border border-gray-700 hover:border-gray-600"
            >
              SIGN IN
            </Button>
            <Button onClick={() => router.push("/results")} size="sm" className="bg-white text-black hover:bg-gray-100 font-medium">
              RESULTS
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-gray-800 z-40"
        >
          <div className="px-6 py-6 space-y-4">
            <button
              onClick={() => handleNavigation("/events")}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Events
            </button>
            <button
              onClick={() => handleNavigation("/expo")}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => handleNavigation("/sales")}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Sales
            </button>
            <button
              onClick={() => handleNavigation("/community")}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Community
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="block text-gray-300 hover:text-white transition-colors"
            >
              About
            </button>
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleSignIn}
                variant="outline"
                className="w-full border-gray-700 text-white hover:bg-white/10 bg-transparent"
              >
                Sign In
              </Button>
              <Button onClick={() => router.push("/results")} className="w-full bg-white text-black hover:bg-gray-100">
                Results
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Everything Platform
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  for your commerce
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-400 leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                CPS Commerce Expo, an innovative platform, serves as an all-in-one solution for student projects,
                marketplace, and business education.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GlowButton
                onClick={handleGetStarted}
                className="px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  EXPLORE EXPO
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </GlowButton>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>

            {/* Main Preview Container */}
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-1 shadow-2xl">
              <div className="bg-slate-800/80 rounded-2xl overflow-hidden">
                {/* Header Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-700/50 border-b border-slate-600/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm text-gray-400">CPS Commerce Expo Dashboard</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Sales", value: "₹45K", color: "bg-green-500" },
                      { label: "Products", value: "127", color: "bg-blue-500" },
                      { label: "Students", value: "89", color: "bg-purple-500" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50"
                      >
                        <div className={`w-2 h-2 ${stat.color} rounded-full mb-2`}></div>
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart Area */}
                  <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-300">Revenue Trends</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-20 flex items-end gap-1">
                      {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm opacity-80"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Activity List */}
                  <div className="space-y-2">
                    {[
                      { action: "New sale: CPS T-Shirt", time: "2m ago", color: "bg-green-500" },
                      { action: "Student registered", time: "5m ago", color: "bg-blue-500" },
                      { action: "Product viewed", time: "8m ago", color: "bg-gray-500" },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        className="flex items-center gap-3 p-2 bg-slate-700/20 rounded-lg border border-slate-600/20"
                      >
                        <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                        <div className="flex-1">
                          <div className="text-sm text-white">{activity.action}</div>
                          <div className="text-xs text-gray-400">{activity.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3 shadow-lg"
            >
              <div className="text-white text-sm font-semibold">Live Analytics</div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3 shadow-lg"
            >
              <div className="text-white text-sm font-semibold">Real-time Sales</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Star Us Review Pop-up */}
      {showReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Rate Us</h2>
            <div className="flex gap-2 justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                >
                  <Star
                    className={`h-8 w-8 ${star <= (hoveredStar || rating) ? "text-yellow-500" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
            {reviewSubmitted ? (
              <div className="text-green-600 font-semibold mb-2">Thank you for your rating!</div>
            ) : (
              <Button onClick={() => { setReviewSubmitted(true); setTimeout(() => { setShowReview(false); setReviewSubmitted(false); setRating(0); }, 1500); }} disabled={rating === 0} className="bg-blue-600 text-white">Submit</Button>
            )}
            <div className="mt-4">
              <Button variant="ghost" onClick={() => setShowReview(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

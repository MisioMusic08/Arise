"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  User,
  Lock,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Target,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"

// Sample account credentials
const SAMPLE_ACCOUNT = {
  email: "Bhargava",
  password: "Blake@1908",
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()
  const [realStats, setRealStats] = useState({
    totalSales: 0,
    productsSold: 0,
    activeCustomers: 0,
  })

  useEffect(() => {
    // Calculate real stats from localStorage
    const products = JSON.parse(localStorage.getItem("expo_products") || "[]")
    const salesData = JSON.parse(localStorage.getItem("expo_results_data") || "{}")
    const sales = salesData.sales || []
    setRealStats({
      totalSales: sales.reduce((sum, s) => sum + (s.sold || 0) * (products.find((p) => p.name === s.item)?.price || 0), 0),
      productsSold: sales.reduce((sum, s) => sum + (s.sold || 0), 0),
      activeCustomers: new Set(sales.map((s) => s.student)).size,
    })
  }, [isLoggedIn])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (email === SAMPLE_ACCOUNT.email && password === SAMPLE_ACCOUNT.password) {
      setIsLoggedIn(true)
    } else {
      setLoginError("Invalid credentials. Please try again.")
    }
  }

  const handleBack = () => {
    router.push("/")
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Button
              onClick={handleBack}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <Image src="/cps-logo.png" alt="Chennai Public School Logo" width={32} height={32} className="rounded" />
              <span className="font-bold text-gray-900">Student Dashboard</span>
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

        {/* Dashboard */}
        <div className="max-w-7xl mx-auto p-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Bhargava!</h1>
            <p className="text-gray-600">Here are your real-time stats from the Commerce Expo.</p>
          </motion.div>

          {/* Real Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-2xl font-bold text-green-700">₹{realStats.totalSales}</span>
                  </div>
                  <div className="text-gray-700 font-medium">Total Sales</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-blue-700">{realStats.productsSold}</span>
                  </div>
                  <div className="text-gray-700 font-medium">Products Sold</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }}>
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-2xl font-bold text-orange-700">{realStats.activeCustomers}</span>
                  </div>
                  <div className="text-gray-700 font-medium">Active Customers</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Inventory Status",
                value: "234",
                subtitle: "Items in stock",
                icon: Package,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
              },
              {
                title: "Events Participated",
                value: "12",
                subtitle: "This semester",
                icon: Calendar,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
              },
              {
                title: "Success Rate",
                value: "94.2%",
                subtitle: "Order completion",
                icon: Target,
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${metric.bgColor} flex items-center justify-center`}>
                        <metric.icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                        <div className="text-gray-600 text-sm font-medium">{metric.title}</div>
                        <div className="text-gray-500 text-xs">{metric.subtitle}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Detailed Reports */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Sales Performance Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        product: "CPS Premium T-Shirts",
                        sold: 89,
                        revenue: "₹52,750",
                        progress: 89,
                        color: "bg-blue-500",
                      },
                      {
                        product: "Commerce Study Guides",
                        sold: 67,
                        revenue: "₹87,030",
                        progress: 78,
                        color: "bg-green-500",
                      },
                      {
                        product: "Designer School Bags",
                        sold: 45,
                        revenue: "₹98,955",
                        progress: 65,
                        color: "bg-purple-500",
                      },
                      {
                        product: "Scientific Calculators",
                        sold: 78,
                        revenue: "₹70,122",
                        progress: 82,
                        color: "bg-orange-500",
                      },
                      {
                        product: "Premium Stationery",
                        sold: 68,
                        revenue: "₹20,340",
                        progress: 71,
                        color: "bg-pink-500",
                      },
                    ].map((item, index) => (
                      <div key={item.product} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700 font-medium">{item.product}</span>
                          <div className="text-right">
                            <div className="text-gray-900 font-semibold">{item.revenue}</div>
                            <div className="text-gray-500 text-xs">{item.sold} units sold</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`${item.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Recent Activity & Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Sold CPS Premium T-Shirt (Navy)",
                        amount: "+₹599",
                        time: "2 min ago",
                        type: "sale",
                        customer: "Arjun S.",
                      },
                      {
                        action: "New customer registration",
                        amount: "",
                        time: "5 min ago",
                        type: "user",
                        customer: "Priya M.",
                      },
                      {
                        action: "Sold Commerce Study Guide Set",
                        amount: "+₹1,299",
                        time: "12 min ago",
                        type: "sale",
                        customer: "Rahul K.",
                      },
                      {
                        action: "Product inquiry: School Bag",
                        amount: "",
                        time: "18 min ago",
                        type: "view",
                        customer: "Sneha R.",
                      },
                      {
                        action: "Sold School Bag",
                        amount: "+₹2,199",
                        time: "25 min ago",
                        type: "sale",
                        customer: "Karthik N.",
                      },
                      {
                        action: "Bulk order: Stationery Set",
                        amount: "+₹2,990",
                        time: "32 min ago",
                        type: "sale",
                        customer: "Ananya S.",
                      },
                      {
                        action: "Customer review received",
                        amount: "",
                        time: "45 min ago",
                        type: "review",
                        customer: "Vikram P.",
                      },
                      {
                        action: "Inventory restocked",
                        amount: "",
                        time: "1 hr ago",
                        type: "inventory",
                        customer: "Admin",
                      },
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activity.type === "sale"
                                ? "bg-green-500"
                                : activity.type === "user"
                                  ? "bg-blue-500"
                                  : activity.type === "review"
                                    ? "bg-yellow-500"
                                    : activity.type === "inventory"
                                      ? "bg-purple-500"
                                      : "bg-gray-400"
                            }`}
                          />
                          <div>
                            <div className="text-gray-900 text-sm font-medium">{activity.action}</div>
                            <div className="text-gray-500 text-xs">
                              {activity.customer} • {activity.time}
                            </div>
                          </div>
                        </div>
                        {activity.amount && (
                          <div className="text-green-600 font-semibold text-sm">{activity.amount}</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Summary Report */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Monthly Summary Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹1,25,430</div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                    <div className="text-xs text-green-600">+18.5% from last month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">347</div>
                    <div className="text-sm text-gray-600">Units Sold</div>
                    <div className="text-xs text-green-600">+12.8% from last month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-gray-600">Active Customers</div>
                    <div className="text-xs text-green-600">+22.3% from last month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">94.2%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                    <div className="text-xs text-green-600">+2.1% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <Card className="bg-white border border-gray-200 shadow-xl">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Image
                src="/cps-logo.png"
                alt="Chennai Public School Logo"
                width={64}
                height={64}
                className="rounded-lg"
              />
              <div>
                <div className="text-xl font-bold text-gray-900">Chennai Public School</div>
                <div className="text-sm text-gray-600">Commerce Expo Portal</div>
              </div>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Student Login</CardTitle>
            <p className="text-gray-600">Access your commerce expo dashboard</p>
            {/* Removed sample account credentials display */}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{loginError}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300"
              >
                Login to Dashboard
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button onClick={handleBack} variant="ghost" className="w-full text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

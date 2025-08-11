"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign, Package, Calculator, Percent } from "lucide-react"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import ParticleBackground from "@/components/particle-background"
import GlassCard from "@/components/glass-card"

const salesData = [
  { month: "Jan", revenue: 12000, orders: 45 },
  { month: "Feb", revenue: 15000, orders: 52 },
  { month: "Mar", revenue: 18000, orders: 61 },
  { month: "Apr", revenue: 22000, orders: 73 },
  { month: "May", revenue: 25000, orders: 84 },
  { month: "Jun", revenue: 28000, orders: 92 },
]

const productData = [
  { name: "T-Shirts", value: 35, color: "#00D4FF" },
  { name: "Notebooks", value: 25, color: "#7C3AED" },
  { name: "Bags", value: 20, color: "#F59E0B" },
  { name: "Stickers", value: 12, color: "#10B981" },
  { name: "Others", value: 8, color: "#EF4444" },
]

const products = [
  { id: 1, name: "CPS T-Shirt", price: 299, category: "Apparel" },
  { id: 2, name: "Notebook Set", price: 150, category: "Stationery" },
  { id: 3, name: "School Bag", price: 899, category: "Accessories" },
  { id: 4, name: "Pen Set", price: 99, category: "Stationery" },
  { id: 5, name: "Water Bottle", price: 199, category: "Accessories" },
]

export default function AnalyticsPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [quantity, setQuantity] = useState(1)
  const [discountCode, setDiscountCode] = useState("")
  const [appliedDiscount, setAppliedDiscount] = useState(0)

  const calculateTotal = () => {
    const subtotal = selectedProduct.price * quantity
    const discountAmount = (subtotal * appliedDiscount) / 100
    return subtotal - discountAmount
  }

  const applyDiscount = () => {
    const discounts = {
      STUDENT20: 20,
      EXPO25: 25,
      WELCOME10: 10,
    }

    if (discounts[discountCode.toUpperCase()]) {
      setAppliedDiscount(discounts[discountCode.toUpperCase()])
    } else {
      setAppliedDiscount(0)
    }
  }

  const handlePurchase = () => {
    // In a real app, this would make an API call
    alert(`Purchase successful! Total: ₹${calculateTotal()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <ParticleBackground />

      {/* Header */}
      <div className="relative z-10 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Live Analytics & Store
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Real-time insights and intelligent commerce solutions
          </motion.p>
        </div>
      </div>

      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">₹1,20,000</p>
                    <div className="flex items-center text-green-400 text-sm mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +12.5%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-white">407</p>
                    <div className="flex items-center text-green-400 text-sm mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +8.2%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-white">1,234</p>
                    <div className="flex items-center text-red-400 text-sm mt-1">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      -2.1%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Products Sold</p>
                    <p className="text-2xl font-bold text-white">892</p>
                    <div className="flex items-center text-green-400 text-sm mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +15.3%
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Revenue Chart */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Revenue Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          border: "1px solid rgba(59, 130, 246, 0.3)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#00D4FF"
                        strokeWidth={3}
                        dot={{ fill: "#00D4FF", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </GlassCard>
              </motion.div>

              {/* Orders Chart */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Monthly Orders</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          border: "1px solid rgba(59, 130, 246, 0.3)",
                          borderRadius: "8px",
                          color: "white",
                        }}
                      />
                      <Bar dataKey="orders" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7C3AED" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </GlassCard>
              </motion.div>

              {/* Product Distribution */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Product Sales Distribution</h3>
                  <div className="flex flex-col md:flex-row items-center">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {productData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(15, 23, 42, 0.9)",
                            border: "1px solid rgba(59, 130, 246, 0.3)",
                            borderRadius: "8px",
                            color: "white",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 md:ml-6">
                      {productData.map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-white/80">{item.name}</span>
                          <span className="text-white font-semibold">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Price Calculator */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Calculator className="h-6 w-6 text-cyan-400" />
                    <h3 className="text-xl font-semibold text-white">Price Calculator</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Select Product</label>
                      <Select
                        value={selectedProduct.id.toString()}
                        onValueChange={(value) => {
                          const product = products.find((p) => p.id === Number.parseInt(value))
                          setSelectedProduct(product)
                        }}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                              {product.name} - ₹{product.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Discount Code</label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        <Button
                          onClick={applyDiscount}
                          variant="outline"
                          className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 bg-transparent"
                        >
                          Apply
                        </Button>
                      </div>
                      {appliedDiscount > 0 && (
                        <div className="flex items-center gap-1 mt-2 text-green-400 text-sm">
                          <Percent className="h-4 w-4" />
                          {appliedDiscount}% discount applied!
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/20 pt-4 space-y-2">
                      <div className="flex justify-between text-white/80">
                        <span>Subtotal:</span>
                        <span>₹{selectedProduct.price * quantity}</span>
                      </div>
                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount ({appliedDiscount}%):</span>
                          <span>-₹{((selectedProduct.price * quantity * appliedDiscount) / 100).toFixed(0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xl font-bold text-white border-t border-white/20 pt-2">
                        <span>Total:</span>
                        <span>₹{calculateTotal()}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handlePurchase}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3"
                    >
                      Purchase Now
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Quick Stats */}
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                <GlassCard className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Best Seller</span>
                      <Badge className="bg-cyan-500 text-white">T-Shirts</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Avg. Order Value</span>
                      <span className="text-white font-semibold">₹295</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Conversion Rate</span>
                      <span className="text-green-400 font-semibold">3.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Customer Satisfaction</span>
                      <span className="text-yellow-400 font-semibold">4.8/5</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

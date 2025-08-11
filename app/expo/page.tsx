"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"
import React from "react"
import axios from "axios"

interface Product {
  id: number
  owner: string
  name: string
  price: number
  image: string // base64 or url
}

export default function ExpoPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ owner: "", name: "", price: "", image: "" })
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items, addItem } = useCart()
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const PASSWORD = "Blake@1908"

  // Fetch products from API on mount
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data)
      })
  }, [])

  // Add product via API
  const handleAddProduct = async () => {
    if (!form.owner || !form.name || !form.price || !form.image) return
    if (password !== PASSWORD) {
      setPasswordError("Incorrect password. Please try again.")
      return
    }
    const newProduct = {
      id: Date.now(),
      owner: form.owner,
      name: form.name,
      price: Number(form.price),
      image: form.image,
    }
    await axios.post("/api/products", newProduct)
    setProducts(prev => [...prev, newProduct])
    setForm({ owner: "", name: "", price: "", image: "" })
    setImagePreview("")
    setShowForm(false)
    setPassword("")
    setPasswordError("")
  }

  const handleBack = () => {
    router.push("/")
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
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <Image src="/cps-logo.png" alt="Chennai Public School Logo" width={32} height={32} className="rounded" />
            <span className="font-bold text-gray-900">Commerce Expo</span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Commerce Expo
              <span className="block text-2xl md:text-3xl text-blue-300 font-normal mt-2">Premium Collection 2025</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Discover exclusive products, educational materials, and innovative student creations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Add New Product Button and Form */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <div className="flex gap-2">
            <Button onClick={() => {
              fetch("/api/products")
                .then(res => res.json())
                .then(data => {
                  if (Array.isArray(data)) setProducts(data)
                })
            }} variant="outline">Refresh</Button>
            <Button onClick={() => setShowForm(true)} className="bg-blue-600 text-white font-semibold">Add New</Button>
          </div>
        </div>
        {showForm && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Your Name</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={form.owner}
                  onChange={e => setForm(f => ({ ...f, owner: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Photo</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = (ev) => {
                      setForm((f) => ({ ...f, image: ev.target?.result as string }))
                      setImagePreview(ev.target?.result as string)
                    }
                    reader.readAsDataURL(file)
                  }}
                />
                {imagePreview && (
                  <Image src={imagePreview} alt="Preview" width={100} height={100} className="mt-2 rounded" />
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password to add product"
                />
                {passwordError && <div className="text-red-600 text-sm mt-1">{passwordError}</div>}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddProduct} className="bg-green-600 text-white">Add Product</Button>
              <Button variant="ghost" onClick={() => { setShowForm(false); setImagePreview(""); setPassword(""); setPasswordError(""); }}>Cancel</Button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 && <p className="text-gray-500">No products yet. Click 'Add New' to create one.</p>}
          {products.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} width={200} height={200} className="rounded mb-2" />
              <div className="font-bold text-lg mb-1">{product.name}</div>
              <div className="text-gray-600 mb-1">By: {product.owner}</div>
              <div className="text-blue-700 font-semibold mb-2">₹{product.price}</div>
              <Button size="sm" className="bg-blue-600 text-white mt-2" onClick={() => {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
                setIsCartOpen(true)
              }}>
                Buy
              </Button>
            </div>
          ))}
        </div>
      </section>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

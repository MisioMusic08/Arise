"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  owner: string
  name: string
  price: number
  image: string // base64 or url
}

const LOCAL_KEY = "expo_products"

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ owner: "", name: "", price: "", image: "" })
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY)
    if (stored) setProducts(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(products))
  }, [products])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, image: ev.target?.result as string }))
      setImagePreview(ev.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAddProduct = () => {
    if (!form.owner || !form.name || !form.price || !form.image) return
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        owner: form.owner,
        name: form.name,
        price: Number(form.price),
        image: form.image,
      },
    ])
    setForm({ owner: "", name: "", price: "", image: "" })
    setImagePreview("")
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 text-white font-semibold">Add New</Button>
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
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <Image src={imagePreview} alt="Preview" width={100} height={100} className="mt-2 rounded" />
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddProduct} className="bg-green-600 text-white">Add Product</Button>
              <Button variant="ghost" onClick={() => { setShowForm(false); setImagePreview(""); }}>Cancel</Button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.length === 0 && <p className="text-gray-500">No products yet. Click 'Add New' to create one.</p>}
          {products.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} width={200} height={200} className="rounded mb-2" />
              <div className="font-bold text-lg mb-1">{product.name}</div>
              <div className="text-gray-600 mb-1">By: {product.owner}</div>
              <div className="text-blue-700 font-semibold mb-2">₹{product.price}</div>
              <Button size="sm" onClick={() => router.push(`/product/${product.id}`)} className="bg-blue-500 text-white">View</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Minus, Plus, Truck, Shield, RotateCcw, CreditCard } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import CartSidebar from "@/components/cart-sidebar"
import { useCart } from "@/components/cart-context"
import { PaymentForm } from "@/components/payment-form"
import { toast } from "sonner"

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { addItem, items } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products')
      if (response.ok) {
        const products = await response.json()
        const found = products.find((p: any) => p.id === productId)
        setProduct(found || null)
      } else {
        toast.error('Failed to fetch product details')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to fetch product details')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Button onClick={() => router.push("/expo")} className="mt-4">Back to Products</Button>
        </div>
      </div>
    )
  }

  const handleBack = () => { router.push("/expo") }
  const handleQuantityChange = (change: number) => { setQuantity(Math.max(1, quantity + change)) }
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl || product.images?.[0],
      selectedSize: product.sizes ? selectedSize : undefined,
      selectedColor: product.colors ? selectedColor : undefined,
    }, quantity)
    setIsCartOpen(true)
    toast.success('Product added to cart!')
  }
  
  const handleBuyNow = () => {
    setShowPayment(true)
  }
  
  const handlePaymentSuccess = (transactionId: string, saleId: string) => {
    console.log('🎉 Payment successful:', { transactionId, saleId })
    toast.success(`Payment successful! Transaction ID: ${transactionId}`)
    setShowPayment(false)
    
    // Refresh product data to show updated money earned
    setTimeout(() => {
      fetchProduct()
    }, 1000)
  }
  
  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error)
    toast.error(`Payment failed: ${error}`)
  }

  const totalPrice = product.price * quantity

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={handleBack} variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={product.imageUrl || product.images?.[0] || "/placeholder.jpg"} 
                alt={product.name} 
                width={600} 
                height={600} 
                className="w-full h-full object-cover" 
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Product Number */}
            {product.productNumber && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm text-blue-600 font-medium">Product Number</p>
                <p className="text-lg font-mono font-bold text-blue-800">{product.productNumber}</p>
                <p className="text-xs text-blue-600">Use this number for BBPAY payments</p>
              </div>
            )}

            {/* Product Name & Owner */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">by {product.owner || 'Unknown Owner'}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">(4.8 • 128 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">₹{product.price?.toLocaleString()}</span>
              {product.moneyEarned > 0 && (
                <span className="text-sm text-green-600">
                  Money Earned: ₹{product.moneyEarned?.toLocaleString()}
                </span>
              )}
            </div>

            {/* Sales Stats */}
            {(product.moneyEarned > 0 || product.totalSales > 0) && (
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Sales Performance</p>
                    <p className="text-lg font-bold text-green-800">
                      ₹{product.moneyEarned?.toLocaleString() || 0} earned
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600">Total Sales</p>
                    <p className="text-lg font-bold text-green-800">
                      {product.totalSales || 0} units
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description || 'No description available.'}</p>
            </div>

            {/* Category */}
            {product.category && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Category</h3>
                <Badge variant="secondary">{product.category}</Badge>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-600">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" 
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> 
                Add to Cart
              </Button>
              <Button 
                onClick={handleBuyNow} 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white" 
                size="lg"
              >
                <CreditCard className="h-5 w-5 mr-2" /> 
                Buy Now
              </Button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over ₹500</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-gray-600">100% secure checkout</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <h4 className="font-semibold">Easy Returns</h4>
                <p className="text-sm text-gray-600">30 day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Complete Purchase</h2>
                <Button onClick={() => setShowPayment(false)} variant="ghost" size="sm">×</Button>
              </div>
              <PaymentForm
                productId={product.id}
                productName={product.name}
                productOwner={product.owner}
                productNumber={product.productNumber}
                productCategory={product.category}
                amount={product.price}
                quantity={quantity}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

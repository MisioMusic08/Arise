"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  X,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  CheckCircle,
  Loader2,
  XCircle,
  CreditCard,
  Smartphone,
  Wallet,
  ArrowLeft,
} from "lucide-react"
import { useCart } from "./cart-context"
import Image from "next/image"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, applyPromoCode, calculateTotal, clearCart, appliedPromoCode } = useCart()
  const [promoCodeInput, setPromoCodeInput] = useState("")
  const [promoMessage, setPromoMessage] = useState("")
  const [paymentStep, setPaymentStep] = useState<
    "cart" | "payment-method" | "upi-details" | "processing" | "success" | "failure"
  >("cart")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [upiPinInput, setUpiPinInput] = useState("")
  const [selectedUpiApp, setSelectedUpiApp] = useState("")

  const { subtotal, discountAmount, total } = calculateTotal()

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: Smartphone, description: "Pay using UPI apps" },
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
    { id: "wallet", name: "Digital Wallet", icon: Wallet, description: "Paytm, PhonePe, Amazon Pay" },
  ]

  const upiApps = [
    { id: "gpay", name: "Google Pay", logo: "🟢", color: "bg-green-100 border-green-300" },
    { id: "phonepe", name: "PhonePe", logo: "🟣", color: "bg-purple-100 border-purple-300" },
    { id: "paytm", name: "Paytm", logo: "🔵", color: "bg-blue-100 border-blue-300" },
    { id: "bhim", name: "BHIM UPI", logo: "🟠", color: "bg-orange-100 border-orange-300" },
    { id: "bpay", name: "BPAY", logo: "💳", color: "bg-indigo-100 border-indigo-300" },
  ]

  const handleApplyPromo = () => {
    const message = applyPromoCode(promoCodeInput)
    setPromoMessage(message)
  }

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      setPromoMessage("Your cart is empty!")
      return
    }
    setPaymentStep("payment-method")
  }

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId)
    if (methodId === "upi") {
      setPaymentStep("upi-details")
    } else {
      setPromoMessage("This payment method will be available soon. Please use UPI for now.")
      setTimeout(() => setPromoMessage(""), 3000)
    }
  }

  const handleUpiAppSelect = (appId: string) => {
    setSelectedUpiApp(appId)
  }

  const handlePayNow = async () => {
    if (!selectedUpiApp) {
      setPromoMessage("Please select a UPI app.")
      return
    }
    if (upiPinInput === "") {
      setPromoMessage("Please enter your UPI PIN.")
      return
    }

    setPaymentStep("processing")
    setPromoMessage("")

    setTimeout(async () => {
      if (upiPinInput === "1908") {
        // Record sales for each item in cart
        try {
          const transactionId = `TXN${Date.now().toString().slice(-8)}`
          
          for (const item of items) {
            const saleData = {
              productId: item.id,
              productName: item.name,
              productOwner: item.owner || 'Unknown',
              quantity: item.quantity,
              unitPrice: item.price,
              paymentMethod: `${selectedUpiApp.toUpperCase()} UPI`,
              transactionId: transactionId,
              customerEmail: '', // You can add customer email collection later
              customerName: '' // You can add customer name collection later
            }

            await fetch('/api/sales', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(saleData),
            })
          }
        } catch (error) {
          console.error('Error recording sales:', error)
        }

        setPaymentStep("success")
        setTimeout(() => {
          clearCart()
          setPaymentStep("cart")
          setPromoCodeInput("")
          setUpiPinInput("")
          setSelectedPaymentMethod("")
          setSelectedUpiApp("")
          setPromoMessage("")
          onClose()
        }, 3000)
      } else {
        setPaymentStep("failure")
        setTimeout(() => {
          setPaymentStep("upi-details")
          setUpiPinInput("")
          setPromoMessage("Incorrect UPI PIN. Please try again.")
        }, 2000)
      }
    }, 2000)
  }

  const handleBackToCart = () => {
    setPaymentStep("cart")
    setSelectedPaymentMethod("")
    setSelectedUpiApp("")
    setUpiPinInput("")
    setPromoMessage("")
  }

  const handleBackToPaymentMethod = () => {
    setPaymentStep("payment-method")
    setSelectedUpiApp("")
    setUpiPinInput("")
    setPromoMessage("")
  }

  const handleRetryPayment = () => {
    setPaymentStep("upi-details")
    setUpiPinInput("")
    setPromoMessage("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] flex justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {paymentStep !== "cart" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={paymentStep === "upi-details" ? handleBackToPaymentMethod : handleBackToCart}
                    className="mr-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {paymentStep === "cart" && "Your Cart"}
                  {paymentStep === "payment-method" && "Payment Method"}
                  {paymentStep === "upi-details" && "UPI Payment"}
                  {paymentStep === "processing" && "Processing..."}
                  {paymentStep === "success" && "Payment Successful!"}
                  {paymentStep === "failure" && "Payment Failed"}
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {paymentStep === "cart" && (
                <div className="p-6 space-y-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <ShoppingCart className="h-16 w-16 mb-4" />
                      <p className="text-lg font-medium">Your cart is empty</p>
                      <p className="text-sm">Start shopping to add items!</p>
                    </div>
                  ) : (
                    <>
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                          className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100"
                        >
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">₹{item.price}</p>
                            {item.selectedSize && <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>}
                            {item.selectedColor && <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>}
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7 bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto text-red-500 hover:bg-red-50"
                                onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="space-y-3 mt-6">
                        <h3 className="text-lg font-semibold text-gray-900">Promo Code</h3>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCodeInput}
                            onChange={(e) => setPromoCodeInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={handleApplyPromo} disabled={!promoCodeInput}>
                            Apply
                          </Button>
                        </div>
                        {promoMessage && (
                          <div
                            className={`text-sm ${appliedPromoCode ? "text-green-600" : "text-red-600"} flex items-center gap-1`}
                          >
                            {appliedPromoCode ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            {promoMessage}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {paymentStep === "payment-method" && (
                <div className="p-6 space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Order Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{subtotal.toFixed(0)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount:</span>
                          <span>-₹{discountAmount.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg border-t border-blue-200 pt-2">
                        <span>Total:</span>
                        <span>₹{total.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon
                      return (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedPaymentMethod === method.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handlePaymentMethodSelect(method.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{method.name}</h4>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                            {method.id === "upi" && (
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Recommended</div>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}

              {paymentStep === "upi-details" && (
                <div className="p-6 space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">UPI Payment - ₹{total.toFixed(0)}</h3>
                    <p className="text-sm text-green-700">Secure and instant payment via UPI</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select UPI App</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {upiApps.map((app) => (
                        <motion.div
                          key={app.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedUpiApp === app.id
                              ? "border-blue-500 bg-blue-50"
                              : `border-gray-200 hover:border-gray-300 ${app.color}`
                          }`}
                          onClick={() => handleUpiAppSelect(app.id)}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">{app.logo}</div>
                            <div className="text-sm font-medium text-gray-900">{app.name}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {selectedUpiApp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Enter UPI PIN</h3>
                        <Input
                          type="password"
                          placeholder="Enter 4-digit UPI PIN"
                          maxLength={4}
                          value={upiPinInput}
                          onChange={(e) => setUpiPinInput(e.target.value.replace(/\D/g, ""))}
                          className="w-full text-center text-xl tracking-widest font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-2 text-center">{/* Removed hint for PIN */}</p>
                      </div>

                      <Button
                        onClick={handlePayNow}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                        disabled={upiPinInput.length !== 4}
                      >
                        Pay ₹{total.toFixed(0)} via {upiApps.find((app) => app.id === selectedUpiApp)?.name}
                      </Button>
                    </motion.div>
                  )}
                </div>
              )}

              {paymentStep === "processing" && (
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mb-6"
                  >
                    <Loader2 className="h-16 w-16 text-blue-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment...</h3>
                  <p className="text-gray-600 text-center">Please wait while we process your UPI payment</p>
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
                    <div className="text-sm text-blue-800">
                      <div className="flex justify-between mb-1">
                        <span>Amount:</span>
                        <span className="font-semibold">₹{total.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UPI App:</span>
                        <span className="font-semibold">{upiApps.find((app) => app.id === selectedUpiApp)?.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 text-center mb-6">
                    Your order has been confirmed and will be processed shortly.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
                    <div className="text-sm text-green-800">
                      <div className="flex justify-between mb-1">
                        <span>Transaction ID:</span>
                        <span className="font-mono">TXN{Date.now().toString().slice(-8)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Amount Paid:</span>
                        <span className="font-semibold">₹{total.toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span>{upiApps.find((app) => app.id === selectedUpiApp)?.name} UPI</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentStep === "failure" && (
                <div className="flex flex-col items-center justify-center h-full p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="h-12 w-12 text-red-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">Payment Failed!</h3>
                  <p className="text-gray-600 text-center mb-6">
                    The UPI PIN you entered is incorrect. Please try again.
                  </p>
                  <div className="space-y-3 w-full">
                    <Button onClick={handleRetryPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Retry Payment
                    </Button>
                    <Button onClick={handleBackToCart} variant="outline" className="w-full bg-transparent">
                      Back to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {paymentStep === "cart" && items.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-₹{discountAmount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-3">
                    <span>Total:</span>
                    <span>₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

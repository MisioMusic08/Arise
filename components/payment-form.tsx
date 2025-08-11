'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface PaymentFormProps {
  productId: string
  productName: string
  productOwner?: string
  productNumber?: string
  productCategory?: string
  amount: number
  quantity?: number
  onSuccess?: (transactionId: string, saleId: string) => void
  onError?: (error: string) => void
}

export function PaymentForm({ 
  productId, 
  productName, 
  productOwner, 
  productNumber, 
  productCategory,
  amount, 
  quantity = 1, 
  onSuccess, 
  onError 
}: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('bbpay')
  const [formData, setFormData] = useState({
    cardNumber: '', expiryDate: '', cvv: '',
    bbpayId: '',
    walletId: '',
    name: '', email: '', phone: ''
  })

  const total = amount * quantity

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.email) {
        toast.error('Please fill in your name and email')
        return
      }

      if (paymentMethod === 'bbpay' && !formData.bbpayId) {
        toast.error('Please enter your BBPAY ID')
        return
      }

      if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
        toast.error('Please fill in all card details')
        return
      }

      if (paymentMethod === 'wallet' && !formData.walletId) {
        toast.error('Please enter your wallet ID')
        return
      }

      // Prepare payment data
      const paymentData: any = {
        productId,
        productName,
        productOwner,
        productNumber,
        productCategory,
        amount,
        quantity,
        currency: 'INR',
        paymentMethod: paymentMethod,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }
      }

      // Add payment method specific data
      if (paymentMethod === 'bbpay') {
        paymentData.bbpayId = formData.bbpayId
      } else if (paymentMethod === 'wallet') {
        paymentData.walletId = formData.walletId
      } else if (paymentMethod === 'card') {
        paymentData.cardInfo = {
          number: formData.cardNumber,
          expiry: formData.expiryDate,
          cvv: formData.cvv
        }
      }

      console.log('🚀 Sending BBPAY payment request:', paymentData)

      // Send payment request
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      })

      const result = await response.json()

      if (result.success) {
        console.log('✅ BBPAY payment successful:', result)
        
        // Show success message
        toast.success(`BBPAY payment successful! Transaction ID: ${result.transactionId}`)
        
        // Call success callback
        if (onSuccess) {
          onSuccess(result.transactionId, result.saleId)
        }

        // Auto-refresh sales data after 2 seconds
        setTimeout(() => {
          window.location.reload()
        }, 2000)

      } else {
        console.error('❌ BBPAY payment failed:', result.error)
        toast.error(result.error || 'BBPAY payment failed')
        
        if (onError) {
          onError(result.error || 'BBPAY payment failed')
        }
      }

    } catch (error) {
      console.error('💥 BBPAY payment error:', error)
      toast.error('BBPAY payment processing failed. Please try again.')
      
      if (onError) {
        onError('BBPAY payment processing failed')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case 'bbpay':
        return (
          <div className="space-y-2">
            <Label htmlFor="bbpayId">BBPAY ID</Label>
            <Input 
              id="bbpayId" 
              type="text" 
              placeholder="BBPAY123456789" 
              value={formData.bbpayId} 
              onChange={(e) => setFormData({ ...formData, bbpayId: e.target.value })} 
              required 
            />
            <p className="text-xs text-gray-500">
              Enter your BBPAY ID (format: BBPAY followed by 9 digits)
            </p>
            {productNumber && (
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <p className="text-xs text-blue-600 font-medium">Product Number for BBPAY</p>
                <p className="text-sm font-mono font-bold text-blue-800">{productNumber}</p>
                <p className="text-xs text-blue-600">Use this number when making BBPAY payment</p>
              </div>
            )}
          </div>
        )
      case 'card':
        return (
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input 
              id="cardNumber" 
              type="text" 
              placeholder="1234 5678 9012 3456" 
              value={formData.cardNumber} 
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} 
              required 
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  type="text" 
                  placeholder="MM/YY" 
                  value={formData.expiryDate} 
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  type="text" 
                  placeholder="123" 
                  value={formData.cvv} 
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} 
                  required 
                />
              </div>
            </div>
          </div>
        )
      case 'wallet':
        return (
          <div className="space-y-2">
            <Label htmlFor="walletId">Wallet ID</Label>
            <Input 
              id="walletId" 
              type="text" 
              placeholder="your-wallet-id" 
              value={formData.walletId} 
              onChange={(e) => setFormData({ ...formData, walletId: e.target.value })} 
              required 
            />
            <p className="text-xs text-gray-500">
              Enter your wallet ID (Paytm, PhonePe, etc.)
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BBPAY Payment Details</CardTitle>
        <CardDescription>
          Complete your purchase for {productName}
          {productOwner && <span className="block text-sm">by {productOwner}</span>}
          {productNumber && (
            <span className="block text-sm font-mono text-blue-600">
              Product: {productNumber}
            </span>
          )}
          {productCategory && (
            <span className="block text-sm text-gray-600">
              Category: {productCategory}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Summary */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Product:</span>
              <span className="font-medium">{productName}</span>
            </div>
            {productNumber && (
              <div className="flex justify-between text-sm">
                <span>Product Number:</span>
                <span className="font-mono font-bold text-blue-600">{productNumber}</span>
              </div>
            )}
            {productCategory && (
              <div className="flex justify-between text-sm">
                <span>Category:</span>
                <span className="font-medium">{productCategory}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total Amount:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john@example.com" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+91 98765 43210" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            />
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bbpay">BBPAY</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="wallet">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method Specific Fields */}
          {renderPaymentFields()}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing BBPAY Payment...
              </>
            ) : (
              `Pay ₹${total.toFixed(2)} with BBPAY`
            )}
          </Button>

          {isProcessing && (
            <p className="text-xs text-center text-gray-500">
              Please wait while we process your BBPAY payment...
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

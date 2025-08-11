"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useMemo } from "react"

interface ProductInCart {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface PromoCode {
  code: string
  discountPercentage: number
}

interface CartContextType {
  items: ProductInCart[]
  addItem: (product: Omit<ProductInCart, "quantity">, quantity?: number) => void
  removeItem: (productId: number, size?: string, color?: string) => void
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void
  applyPromoCode: (code: string) => string
  clearCart: () => void
  calculateTotal: () => { subtotal: number; discountAmount: number; total: number; appliedPromoCode: PromoCode | null }
  appliedPromoCode: PromoCode | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const PROMO_CODES: { [key: string]: PromoCode } = {
  EXPO10: { code: "EXPO10", discountPercentage: 10 },
  STUDENT15: { code: "STUDENT15", discountPercentage: 15 },
  WELCOME20: { code: "WELCOME20", discountPercentage: 20 },
  BHARGAVA: { code: "BHARGAVA", discountPercentage: 90 }, // Added BHARGAVA promo code
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProductInCart[]>([])
  const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(null)

  const addItem = useCallback((product: Omit<ProductInCart, "quantity">, quantityToAdd = 1) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor,
      )

      if (existingItemIndex > -1) {
        const newItems = [...prevItems]
        newItems[existingItemIndex].quantity += quantityToAdd
        return newItems
      } else {
        return [...prevItems, { ...product, quantity: quantityToAdd }]
      }
    })
  }, [])

  const removeItem = useCallback((productId: number, size?: string, color?: string) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color),
      ),
    )
  }, [])

  const updateQuantity = useCallback((productId: number, newQuantity: number, size?: string, color?: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: newQuantity }
          : item,
      )
      return newItems.filter((item) => item.quantity > 0)
    })
  }, [])

  const applyPromoCode = useCallback((code: string): string => {
    const promo = PROMO_CODES[code.toUpperCase()]
    if (promo) {
      setAppliedPromoCode(promo)
      if (promo.code === "BHARGAVA") {
        return `🎉 Amazing! Promo code '${promo.code}' applied! You get ${promo.discountPercentage}% off - Special discount!`
      }
      return `Promo code '${promo.code}' applied! You get ${promo.discountPercentage}% off.`
    } else {
      setAppliedPromoCode(null)
      return "Invalid promo code."
    }
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setAppliedPromoCode(null)
  }, [])

  const calculateTotal = useCallback(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discountAmount = appliedPromoCode ? (subtotal * appliedPromoCode.discountPercentage) / 100 : 0
    const total = subtotal - discountAmount
    return { subtotal, discountAmount, total, appliedPromoCode }
  }, [items, appliedPromoCode])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      applyPromoCode,
      clearCart,
      calculateTotal,
      appliedPromoCode,
    }),
    [items, addItem, removeItem, updateQuantity, applyPromoCode, clearCart, calculateTotal, appliedPromoCode],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

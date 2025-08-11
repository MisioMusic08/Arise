"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GlowButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary"
}

export default function GlowButton({ children, onClick, className = "", variant = "primary" }: GlowButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && isHovered) {
        const rect = buttonRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovered])

  const baseClasses =
    variant === "primary"
      ? "relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold border-0"
      : "relative overflow-hidden bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 hover:border-white/40"

  return (
    <Button
      ref={buttonRef}
      onClick={onClick}
      className={`${baseClasses} transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect that follows mouse */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div
            className={`w-32 h-32 rounded-full blur-xl ${
              variant === "primary" ? "bg-gradient-to-r from-yellow-400/30 to-orange-400/30" : "bg-white/20"
            }`}
          />
        </motion.div>
      )}

      {/* Button content */}
      <span className="relative z-10">{children}</span>

      {/* Base glow */}
      <div
        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          variant === "primary" ? "bg-gradient-to-r from-orange-400/20 to-red-400/20 blur-sm" : "bg-white/10 blur-sm"
        }`}
      />
    </Button>
  )
}

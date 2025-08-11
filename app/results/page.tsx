"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Sale {
  id: number
  student: string
  item: string
  sold: number
}

interface Review {
  rating: number
  comment: string
}

interface ResultsData {
  sales: Sale[]
  reviews: Review[]
}

const LOCAL_KEY = "expo_results_data"

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white p-12 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Results</h1>
        <p className="text-2xl text-blue-700 font-semibold mb-2">Coming Soon</p>
        <p className="text-gray-500">The results will be revealed after the event is over. Stay tuned!</p>
      </div>
    </div>
  )
} 
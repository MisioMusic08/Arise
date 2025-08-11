'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Trophy, TrendingUp, Users, DollarSign, Download } from 'lucide-react'
import { toast } from 'sonner'

interface Winner {
  rank: number
  rankText: string
  owner: string
  totalSales: number
  totalRevenue: number
  totalQuantity: number
  avgOrderValue: number
  upiTransactions: number
  cardTransactions: number
  walletTransactions: number
  uniqueProducts: number
  paymentMethods: string[]
  firstSale: string
  lastSale: string
}

interface WinnersData {
  totalParticipants: number
  totalSales: number
  totalRevenue: number
  totalUPITransactions: number
  criteria: string
  dateRange: {
    start: string | null
    end: string | null
  }
  winners: Winner[]
}

export default function WinnersPage() {
  const [winnersData, setWinnersData] = useState<WinnersData | null>(null)
  const [loading, setLoading] = useState(true)
  const [criteria, setCriteria] = useState('revenue')
  const [limit, setLimit] = useState(10)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const fetchWinners = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        criteria,
        limit: limit.toString(),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      })

      const response = await fetch(`/api/winners?${params}`)
      if (response.ok) {
        const data = await response.json()
        setWinnersData(data)
      } else {
        toast.error('Failed to fetch winners data')
      }
    } catch (error) {
      console.error('Error fetching winners:', error)
      toast.error('Failed to fetch winners data')
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    const params = new URLSearchParams({
      criteria,
      limit: limit.toString(),
      format: 'csv',
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    })

    window.open(`/api/winners?${params}`, '_blank')
  }

  useEffect(() => {
    fetchWinners()
  }, [criteria, limit, startDate, endDate])

  const getCriteriaLabel = (criteria: string) => {
    switch (criteria) {
      case 'revenue': return 'Total Revenue'
      case 'sales_count': return 'Number of Sales'
      case 'avg_order_value': return 'Average Order Value'
      case 'upi_transactions': return 'UPI Transactions'
      case 'total_quantity': return 'Total Quantity Sold'
      default: return 'Total Revenue'
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `${rank}`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading winners data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">🏆 Winners Dashboard</h1>
        <p className="text-center text-gray-600">Track performance and determine winners</p>
      </div>

      {/* Summary Cards */}
      {winnersData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Participants</p>
                  <p className="text-2xl font-bold">{winnersData.totalParticipants}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold">{winnersData.totalSales}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{winnersData.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">UPI Transactions</p>
                  <p className="text-2xl font-bold">{winnersData.totalUPITransactions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filters & Criteria</CardTitle>
          <CardDescription>Customize the winners ranking criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="criteria">Ranking Criteria</Label>
              <Select value={criteria} onValueChange={setCriteria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Total Revenue</SelectItem>
                  <SelectItem value="sales_count">Number of Sales</SelectItem>
                  <SelectItem value="avg_order_value">Average Order Value</SelectItem>
                  <SelectItem value="upi_transactions">UPI Transactions</SelectItem>
                  <SelectItem value="total_quantity">Total Quantity Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="limit">Top Results</Label>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Top 5</SelectItem>
                  <SelectItem value="10">Top 10</SelectItem>
                  <SelectItem value="20">Top 20</SelectItem>
                  <SelectItem value="50">Top 50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start date"
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End date"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button onClick={fetchWinners} variant="outline">
              Apply Filters
            </Button>
            <Button onClick={downloadCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Winners List */}
      {winnersData && winnersData.winners.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">🏅 Winners by {getCriteriaLabel(criteria)}</h2>
          
          {winnersData.winners.map((winner) => (
            <Card key={winner.owner} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getRankIcon(winner.rank)}</div>
                    <div>
                      <h3 className="text-xl font-bold">{winner.owner}</h3>
                      <p className="text-sm text-gray-600">{winner.rankText}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {criteria === 'revenue' && `₹${winner.totalRevenue.toLocaleString()}`}
                      {criteria === 'sales_count' && winner.totalSales}
                      {criteria === 'avg_order_value' && `₹${winner.avgOrderValue.toFixed(2)}`}
                      {criteria === 'upi_transactions' && winner.upiTransactions}
                      {criteria === 'total_quantity' && winner.totalQuantity}
                    </p>
                    <p className="text-sm text-gray-600">{getCriteriaLabel(criteria)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Total Sales</p>
                    <p className="font-semibold">{winner.totalSales}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="font-semibold">₹{winner.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">UPI Transactions</p>
                    <p className="font-semibold">{winner.upiTransactions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Products</p>
                    <p className="font-semibold">{winner.uniqueProducts}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {winner.paymentMethods.map((method) => (
                    <Badge key={method} variant="secondary">
                      {method.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Winners Yet</h3>
            <p className="text-gray-600">Start making sales to see the winners!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

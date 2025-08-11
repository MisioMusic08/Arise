'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, Search, Filter, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react'
import { toast } from 'sonner'

interface SaleRecord {
  id: string
  productId: string
  productNumber: string
  productName: string
  productOwner: string
  quantity: number
  price: number
  total: number
  customer: string
  customerEmail: string
  customerPhone: string
  paymentMethod: string
  upiId: string
  transactionId: string
  date: string
  purchaseDate: string
  status: string
  paymentStatus: string
  currency: string
  buyerName: string
  buyerEmail: string
  buyerPhone: string
  productCategory: string
  paymentGateway: string
}

export default function SalesReportPage() {
  const [sales, setSales] = useState<SaleRecord[]>([])
  const [filteredSales, setFilteredSales] = useState<SaleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  // Summary stats
  const [totalSales, setTotalSales] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalUPITransactions, setTotalUPITransactions] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)

  useEffect(() => {
    fetchSalesData()
  }, [])

  useEffect(() => {
    filterSales()
  }, [sales, searchTerm, paymentFilter, dateFilter])

  const fetchSalesData = async () => {
    try {
      const response = await fetch('/api/sales')
      if (response.ok) {
        const data = await response.json()
        setSales(data)
        
        // Calculate summary stats
        const total = data.length
        const revenue = data.reduce((sum: number, sale: SaleRecord) => sum + (sale.total || 0), 0)
        const upiTransactions = data.filter((sale: SaleRecord) => sale.paymentMethod === 'upi').length
        const uniqueCustomers = new Set(data.map((sale: SaleRecord) => sale.buyerEmail || sale.customerEmail)).size
        
        setTotalSales(total)
        setTotalRevenue(revenue)
        setTotalUPITransactions(upiTransactions)
        setTotalCustomers(uniqueCustomers)
      } else {
        toast.error('Failed to fetch sales data')
      }
    } catch (error) {
      console.error('Error fetching sales:', error)
      toast.error('Failed to fetch sales data')
    } finally {
      setLoading(false)
    }
  }

  const filterSales = () => {
    let filtered = [...sales]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(sale => 
        sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.productOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.productNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Payment method filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(sale => sale.paymentMethod === paymentFilter)
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date()
      const filterDate = new Date()
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          filtered = filtered.filter(sale => new Date(sale.purchaseDate || sale.date) >= filterDate)
          break
        case 'week':
          filterDate.setDate(today.getDate() - 7)
          filtered = filtered.filter(sale => new Date(sale.purchaseDate || sale.date) >= filterDate)
          break
        case 'month':
          filterDate.setMonth(today.getMonth() - 1)
          filtered = filtered.filter(sale => new Date(sale.purchaseDate || sale.date) >= filterDate)
          break
      }
    }

    setFilteredSales(filtered)
  }

  const downloadCSV = () => {
    const params = new URLSearchParams({
      format: 'csv',
      ...(paymentFilter !== 'all' && { paymentMethod: paymentFilter })
    })
    window.open(`/api/sales?${params}`, '_blank')
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'upi': return 'bg-green-100 text-green-800'
      case 'card': return 'bg-blue-100 text-blue-800'
      case 'wallet': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading sales report...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">📊 Sales Report</h1>
        <p className="text-center text-gray-600">Complete overview of all product purchases and transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Purchases</p>
                <p className="text-2xl font-bold">{totalSales}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">UPI Transactions</p>
                <p className="text-2xl font-bold">{totalUPITransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Filter and search through sales data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search products, owners, buyers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="paymentFilter">Payment Method</Label>
              <select
                id="paymentFilter"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Methods</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>

            <div>
              <Label htmlFor="dateFilter">Date Range</Label>
              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={downloadCSV} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Records</CardTitle>
          <CardDescription>
            Showing {filteredSales.length} of {totalSales} purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No purchases found matching your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Product Number</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(sale.purchaseDate || sale.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(sale.purchaseDate || sale.date).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{sale.productName}</div>
                        <div className="text-sm text-gray-500">Qty: {sale.quantity}</div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {sale.productNumber}
                        </code>
                      </TableCell>
                      <TableCell>{sale.productOwner}</TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{sale.buyerName || sale.customer}</div>
                        <div className="text-xs text-gray-500">{sale.buyerEmail || sale.customerEmail}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-green-600">₹{sale.total?.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">@₹{sale.price?.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentMethodColor(sale.paymentMethod)}>
                          {sale.paymentMethod.toUpperCase()}
                        </Badge>
                        {sale.upiId && (
                          <div className="text-xs text-gray-500 mt-1">{sale.upiId}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(sale.status)}>
                          {sale.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {sale.transactionId}
                        </code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}



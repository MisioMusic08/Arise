'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, DollarSign, ShoppingCart, Users, Activity, RefreshCw } from 'lucide-react'
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
  paymentMethod: string
  bbpayId: string
  transactionId: string
  date: string
  purchaseDate: string
  status: string
  paymentStatus: string
  buyerName: string
  buyerEmail: string
}

interface SalesAPIResponse {
  totalSales: number
  totalRevenue: number
  bbpayTransactions: number
  uniqueProducts: number
  uniqueCustomers: number
  sales: SaleRecord[]
}

export default function DashboardPage() {
  const [sales, setSales] = useState<SaleRecord[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Summary stats
  const [totalSales, setTotalSales] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalBBPAYTransactions, setTotalBBPAYTransactions] = useState(0)
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [recentTransactions, setRecentTransactions] = useState<SaleRecord[]>([])

  useEffect(() => {
    fetchDashboardData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch sales data with new API format
      const salesResponse = await fetch('/api/sales')
      if (salesResponse.ok) {
        const salesData: SalesAPIResponse = await salesResponse.json()
        setSales(salesData.sales)
        
        // Use API-provided summary stats
        setTotalSales(salesData.totalSales)
        setTotalRevenue(salesData.totalRevenue)
        setTotalBBPAYTransactions(salesData.bbpayTransactions)
        setTotalCustomers(salesData.uniqueCustomers)
        
        // Get recent transactions (last 10)
        const recent = salesData.sales
          .sort((a: SaleRecord, b: SaleRecord) => 
            new Date(b.purchaseDate || b.date).getTime() - new Date(a.purchaseDate || a.date).getTime()
          )
          .slice(0, 10)
        setRecentTransactions(recent)
      }

      // Fetch products data
      const productsResponse = await fetch('/api/products')
      if (productsResponse.ok) {
        const productsData = await productsResponse.json()
        setProducts(productsData)
      }

      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchDashboardData()
    toast.success('Dashboard refreshed!')
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'bbpay': return 'bg-blue-100 text-blue-800'
      case 'card': return 'bg-green-100 text-green-800'
      case 'wallet': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '₹0.00'
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">📊 Live Dashboard</h1>
            <p className="text-gray-600">Real-time sales and transaction monitoring</p>
          </div>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {lastUpdate.toLocaleString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
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
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">BBPAY Transactions</p>
                <p className="text-2xl font-bold">{totalBBPAYTransactions}</p>
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

      {/* Recent Transactions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
          <CardDescription>
            Latest {recentTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(sale.purchaseDate || sale.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{sale.productName}</div>
                        <div className="text-xs text-gray-500">
                          {sale.productNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {sale.buyerName || sale.customer}
                        </div>
                        <div className="text-xs text-gray-500">
                          {sale.buyerEmail || sale.customerEmail}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-green-600">
                          {formatCurrency(sale.total)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Qty: {sale.quantity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentMethodColor(sale.paymentMethod)}>
                          {sale.paymentMethod.toUpperCase()}
                        </Badge>
                        {sale.bbpayId && (
                          <div className="text-xs text-gray-500 mt-1">
                            {sale.bbpayId}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {sale.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Products by Revenue</CardTitle>
          <CardDescription>Products with highest earnings</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Product Number</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Money Earned</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .sort((a, b) => (b.moneyEarned || 0) - (a.moneyEarned || 0))
                    .slice(0, 10)
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            {product.category}
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {product.productNumber}
                          </code>
                        </TableCell>
                        <TableCell>{product.owner}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>
                          <div className="font-bold text-green-600">
                            {formatCurrency(product.moneyEarned || 0)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            product.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }>
                            {product.status}
                          </Badge>
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


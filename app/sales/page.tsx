'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Download, TrendingUp, DollarSign, ShoppingCart, Activity } from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  owner: string
  price: number
  category: string
  productNumber: string
  moneyEarned: number
  totalSales: number
  status: string
}

interface SaleRecord {
  id: string
  productId: string
  productNumber: string
  productName: string
  productOwner: string
  productCategory: string
  quantity: number
  price: number
  total: number
  buyerName: string
  buyerEmail: string
  paymentMethod: string
  bbpayId: string
  transactionId: string
  purchaseDate: string
  status: string
}

interface SalesAPIResponse {
  totalSales: number
  totalRevenue: number
  bbpayTransactions: number
  uniqueProducts: number
  uniqueCustomers: number
  sales: SaleRecord[]
}

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [sales, setSales] = useState<SaleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Summary stats from API
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [bbpayTransactions, setBBPAYTransactions] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch products
      const productsResponse = await fetch('/api/products')
      if (productsResponse.ok) {
        const productsData = await productsResponse.json()
        setProducts(productsData)
        setTotalProducts(productsData.length)
      }

      // Fetch sales with new API format
      const salesResponse = await fetch('/api/sales')
      if (salesResponse.ok) {
        const salesData: SalesAPIResponse = await salesResponse.json()
        setSales(salesData.sales)
        setTotalRevenue(salesData.totalRevenue)
        setTotalSales(salesData.totalSales)
        setBBPAYTransactions(salesData.bbpayTransactions)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to fetch sales data')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCSV = async (type: 'products' | 'sales') => {
    try {
      const response = await fetch(`/api/${type}?format=csv`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${type}_report.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success(`${type} CSV downloaded successfully!`)
      }
    } catch (error) {
      toast.error(`Failed to download ${type} CSV`)
    }
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

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading sales data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">📊 Sales & Products Dashboard</h1>
        <p className="text-gray-600">Track your products, sales performance, and BBPAY transactions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold">{totalSales}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">BBPAY Transactions</p>
                <p className="text-2xl font-bold">{bbpayTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter by Category:</span>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products with Sales Performance</CardTitle>
              <CardDescription>
                {filteredProducts.length} products showing money earned and total sales
              </CardDescription>
            </div>
            <Button onClick={() => handleDownloadCSV('products')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
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
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Money Earned</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts
                    .sort((a, b) => (b.moneyEarned || 0) - (a.moneyEarned || 0))
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="font-medium">{product.name}</div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {product.productNumber}
                          </code>
                        </TableCell>
                        <TableCell>{product.owner}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{product.category}</Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>
                          <div className="font-bold text-green-600">
                            {formatCurrency(product.moneyEarned || 0)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-blue-600">
                            {product.totalSales || 0} units
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

      {/* Recent Sales Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent BBPAY Transactions</CardTitle>
              <CardDescription>
                Latest {Math.min(sales.length, 10)} sales transactions
              </CardDescription>
            </div>
            <Button onClick={() => handleDownloadCSV('sales')} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Sales CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No sales transactions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales
                    .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
                    .slice(0, 10)
                    .map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(sale.purchaseDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{sale.productName}</div>
                          <div className="text-xs text-gray-500">
                            {sale.productNumber}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{sale.productCategory}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">
                            {sale.buyerName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {sale.buyerEmail}
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
    </div>
  )
} 
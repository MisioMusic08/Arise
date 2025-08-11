import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SALES_DIR = path.join(process.cwd(), 'sales')

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const criteria = searchParams.get('criteria') || 'revenue'
    const limit = parseInt(searchParams.get('limit') || '10')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const format = searchParams.get('format')

    console.log('🏆 Winners API Request:', { criteria, limit, dateFrom, dateTo, format })

    // Read all sales files
    const files = fs.readdirSync(SALES_DIR).filter(f => f.endsWith('.json'))
    console.log(`📁 Found ${files.length} sale files`)

    const sales = files.map(file => {
      const content = fs.readFileSync(path.join(SALES_DIR, file), 'utf-8')
      return JSON.parse(content)
    })

    // Filter by date range if provided
    let filteredSales = sales
    if (dateFrom || dateTo) {
      filteredSales = sales.filter(sale => {
        const saleDate = new Date(sale.purchaseDate || sale.date)
        const fromDate = dateFrom ? new Date(dateFrom) : null
        const toDate = dateTo ? new Date(dateTo) : null
        
        if (fromDate && saleDate < fromDate) return false
        if (toDate && saleDate > toDate) return false
        return true
      })
      console.log(`📅 Filtered to ${filteredSales.length} sales in date range`)
    }

    // Group sales by product owner
    const ownerStats = {}
    const uniqueOwners = new Set()

    filteredSales.forEach(sale => {
      const owner = sale.productOwner || 'Unknown Owner'
      uniqueOwners.add(owner)
      
      if (!ownerStats[owner]) {
        ownerStats[owner] = {
          owner,
          totalSales: 0,
          totalRevenue: 0,
          bbpayTransactions: 0,
          totalQuantity: 0,
          avgOrderValue: 0,
          categories: new Set(),
          products: new Set()
        }
      }

      ownerStats[owner].totalSales += 1
      ownerStats[owner].totalRevenue += sale.total || 0
      ownerStats[owner].totalQuantity += sale.quantity || 1
      ownerStats[owner].categories.add(sale.productCategory || 'Uncategorized')
      ownerStats[owner].products.add(sale.productName || 'Unknown Product')

      if (sale.paymentMethod === 'bbpay') {
        ownerStats[owner].bbpayTransactions += 1
      }
    })

    // Calculate averages and convert sets to arrays
    Object.values(ownerStats).forEach(stat => {
      stat.avgOrderValue = stat.totalSales > 0 ? stat.totalRevenue / stat.totalSales : 0
      stat.categories = Array.from(stat.categories)
      stat.products = Array.from(stat.products)
    })

    console.log(`👥 Found ${uniqueOwners.size} unique owners`)

    // Sort by criteria
    const sortedOwners = Object.values(ownerStats).sort((a, b) => {
      switch (criteria) {
        case 'revenue':
          return b.totalRevenue - a.totalRevenue
        case 'sales_count':
          return b.totalSales - a.totalSales
        case 'avg_order_value':
          return b.avgOrderValue - a.avgOrderValue
        case 'bbpay_transactions':
          return b.bbpayTransactions - a.bbpayTransactions
        case 'total_quantity':
          return b.totalQuantity - a.totalQuantity
        default:
          return b.totalRevenue - a.totalRevenue
      }
    })

    // Apply limit
    const winners = sortedOwners.slice(0, limit).map((owner, index) => ({
      ...owner,
      rank: index + 1
    }))

    // Calculate summary statistics
    const totalParticipants = uniqueOwners.size
    const totalRevenue = Object.values(ownerStats).reduce((sum, owner) => sum + owner.totalRevenue, 0)
    const totalSales = Object.values(ownerStats).reduce((sum, owner) => sum + owner.totalSales, 0)
    const totalBBPAYTransactions = Object.values(ownerStats).reduce((sum, owner) => sum + owner.bbpayTransactions, 0)

    console.log('📊 Summary:', {
      totalParticipants,
      totalRevenue,
      totalSales,
      totalBBPAYTransactions
    })

    const result = {
      totalParticipants,
      totalRevenue,
      totalSales,
      totalBBPAYTransactions,
      criteria,
      dateRange: { dateFrom, dateTo },
      winners
    }

    // Return CSV if requested
    if (format === 'csv') {
      const csvHeaders = [
        'Rank',
        'Owner',
        'Total Sales',
        'Total Revenue',
        'BBPAY Transactions',
        'Total Quantity',
        'Average Order Value',
        'Categories',
        'Products'
      ]

      const csvRows = winners.map(winner => [
        winner.rank,
        `"${winner.owner}"`,
        winner.totalSales,
        winner.totalRevenue,
        winner.bbpayTransactions,
        winner.totalQuantity,
        winner.avgOrderValue.toFixed(2),
        `"${winner.categories.join(', ')}"`,
        `"${winner.products.join(', ')}"`
      ])

      const csvContent = [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n')
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="winners_report.csv"'
        }
      })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating winners report:', error)
    return NextResponse.json({ error: 'Failed to generate winners report' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SALES_DIR = path.join(process.cwd(), 'sales')

// Ensure directories exist
if (!fs.existsSync(SALES_DIR)) {
  fs.mkdirSync(SALES_DIR, { recursive: true })
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const paymentMethod = searchParams.get('paymentMethod')
    const format = searchParams.get('format')

    console.log('📊 Sales API Request:', { status, paymentMethod, format })

    // Read all sales files
    const files = fs.readdirSync(SALES_DIR).filter(f => f.endsWith('.json'))
    console.log(`📁 Found ${files.length} sale files`)

    let sales = files.map(file => {
      const content = fs.readFileSync(path.join(SALES_DIR, file), 'utf-8')
      const sale = JSON.parse(content)
      
      // Fix legacy data - ensure total amount is properly calculated
      if (sale.total === undefined || sale.total === null || isNaN(sale.total)) {
        const price = parseFloat(sale.price) || 0
        const quantity = parseInt(sale.quantity) || 1
        sale.total = price * quantity
      }
      
      // Ensure all numeric fields are numbers
      sale.price = parseFloat(sale.price) || 0
      sale.quantity = parseInt(sale.quantity) || 1
      sale.total = parseFloat(sale.total) || 0
      
      // Fix payment method display for legacy data
      if (sale.paymentMethod && sale.paymentMethod.toLowerCase().includes('upi')) {
        sale.paymentMethod = 'bbpay' // Convert legacy UPI to BBPAY
      }
      
      return sale
    })

    // Filter by status if provided
    if (status) {
      sales = sales.filter(sale => sale.status === status)
      console.log(`📊 Filtered by status '${status}': ${sales.length} sales`)
    }

    // Filter by payment method if provided
    if (paymentMethod) {
      sales = sales.filter(sale => sale.paymentMethod === paymentMethod)
      console.log(`📊 Filtered by payment method '${paymentMethod}': ${sales.length} sales`)
    }

    // Sort by purchase date (newest first)
    sales.sort((a, b) => {
      const dateA = new Date(a.purchaseDate || a.date || 0)
      const dateB = new Date(b.purchaseDate || b.date || 0)
      return dateB.getTime() - dateA.getTime()
    })

    // Calculate summary statistics
    const totalSales = sales.length
    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.total || 0), 0)
    const bbpayTransactions = sales.filter(sale => sale.paymentMethod === 'bbpay').length
    const uniqueProducts = new Set(sales.map(sale => sale.productId)).size
    const uniqueCustomers = new Set(sales.map(sale => sale.buyerEmail || sale.customerEmail).filter(Boolean)).size

    console.log('📊 Sales Summary:', {
      totalSales,
      totalRevenue: `₹${totalRevenue.toLocaleString()}`,
      bbpayTransactions,
      uniqueProducts,
      uniqueCustomers
    })

    // Return CSV if requested
    if (format === 'csv') {
      const csvHeaders = [
        'Sale ID',
        'Product ID',
        'Product Number',
        'Product Name',
        'Product Owner',
        'Product Category',
        'Quantity',
        'Price',
        'Total Amount',
        'Buyer Name',
        'Buyer Email',
        'Buyer Phone',
        'Payment Method',
        'BBPAY ID',
        'Transaction ID',
        'Purchase Date',
        'Currency',
        'Payment Status',
        'Status'
      ]

      const csvRows = sales.map(sale => [
        sale.id,
        sale.productId,
        sale.productNumber || '',
        `"${sale.productName || ''}"`,
        `"${sale.productOwner || ''}"`,
        sale.productCategory || '',
        sale.quantity,
        sale.price,
        sale.total,
        `"${sale.buyerName || sale.customer || ''}"`,
        `"${sale.buyerEmail || sale.customerEmail || ''}"`,
        `"${sale.buyerPhone || sale.customerPhone || ''}"`,
        sale.paymentMethod || '',
        sale.bbpayId || sale.upiId || '',
        sale.transactionId || '',
        sale.purchaseDate || sale.date || '',
        sale.currency || 'INR',
        sale.paymentStatus || 'success',
        sale.status || 'completed'
      ])

      const csvContent = [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n')
      
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="sales_report.csv"'
        }
      })
    }

    // Return JSON with summary
    const result = {
      totalSales,
      totalRevenue,
      bbpayTransactions,
      uniqueProducts,
      uniqueCustomers,
      sales: sales
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error reading sales:', error)
    return NextResponse.json({ error: 'Failed to read sales' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const saleData = await req.json()
    
    console.log('📝 Creating new sale record:', {
      productName: saleData.productName,
      amount: saleData.total,
      paymentMethod: saleData.paymentMethod
    })
    
    // Generate sale ID if not provided
    if (!saleData.id) {
      saleData.id = `sale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    // Set default values
    if (!saleData.purchaseDate) {
      saleData.purchaseDate = new Date().toISOString()
    }
    if (!saleData.paymentStatus) {
      saleData.paymentStatus = 'success'
    }
    if (!saleData.status) {
      saleData.status = 'completed'
    }
    if (!saleData.currency) {
      saleData.currency = 'INR'
    }
    
    // Ensure proper amount calculations
    saleData.price = parseFloat(saleData.price) || 0
    saleData.quantity = parseInt(saleData.quantity) || 1
    saleData.total = parseFloat(saleData.total) || (saleData.price * saleData.quantity)
    
    // Fix payment method for legacy data
    if (saleData.paymentMethod && saleData.paymentMethod.toLowerCase().includes('upi')) {
      saleData.paymentMethod = 'bbpay'
    }

    const filePath = path.join(SALES_DIR, `sale-${saleData.id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(saleData, null, 2))
    
    console.log('✅ Sale record created successfully:', filePath)
    
    return NextResponse.json({ success: true, sale: saleData }, { status: 201 })
  } catch (error) {
    console.error('Error creating sale:', error)
    return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 })
  }
}

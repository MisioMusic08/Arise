import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const PRODUCTS_DIR = path.join(process.cwd(), 'products')
const PRODUCTS_CSV_DIR = path.join(process.cwd(), 'products-csv')
const SALES_DIR = path.join(process.cwd(), 'sales')

// Predefined product categories
const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports & Outdoors',
  'Beauty & Health',
  'Toys & Games',
  'Automotive',
  'Food & Beverages',
  'Art & Crafts',
  'Jewelry',
  'Furniture',
  'Music',
  'Movies',
  'Tools & Hardware',
  'Pet Supplies',
  'Baby Products',
  'Office Supplies',
  'Garden & Outdoor',
  'Other'
]

// Ensure directories exist
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true })
}
if (!fs.existsSync(PRODUCTS_CSV_DIR)) {
  fs.mkdirSync(PRODUCTS_CSV_DIR, { recursive: true })
}

// Generate unique product number
function generateProductNumber(): string {
  const timestamp = Date.now().toString().slice(-8)
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `PROD${timestamp}${random}`
}

// Calculate money earned for a product
function calculateMoneyEarned(productId: string): number {
  try {
    if (!fs.existsSync(SALES_DIR)) return 0
    
    const files = fs.readdirSync(SALES_DIR).filter(f => f.endsWith('.json'))
    let totalEarned = 0
    
    files.forEach(file => {
      const content = fs.readFileSync(path.join(SALES_DIR, file), 'utf-8')
      const sale = JSON.parse(content)
      if (sale.productId === productId && sale.paymentStatus === 'success') {
        totalEarned += sale.total || 0
      }
    })
    
    return totalEarned
  } catch (error) {
    console.error('Error calculating money earned:', error)
    return 0
  }
}

// Calculate total sales count for a product
function calculateTotalSales(productId: string): number {
  try {
    if (!fs.existsSync(SALES_DIR)) return 0
    
    const files = fs.readdirSync(SALES_DIR).filter(f => f.endsWith('.json'))
    let totalSales = 0
    
    files.forEach(file => {
      const content = fs.readFileSync(path.join(SALES_DIR, file), 'utf-8')
      const sale = JSON.parse(content)
      if (sale.productId === productId && sale.paymentStatus === 'success') {
        totalSales += sale.quantity || 1
      }
    })
    
    return totalSales
  } catch (error) {
    console.error('Error calculating total sales:', error)
    return 0
  }
}

export async function GET() {
  try {
    const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json'))
    const products = files.map(file => {
      const content = fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf-8')
      const product = JSON.parse(content)
      
      // Calculate money earned and total sales for each product
      const moneyEarned = calculateMoneyEarned(product.id)
      const totalSales = calculateTotalSales(product.id)
      
      return {
        ...product,
        moneyEarned: moneyEarned,
        totalSales: totalSales
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error reading products:', error)
    return NextResponse.json({ error: 'Failed to read products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const product = await req.json()
    
    // Validate category
    if (product.category && !PRODUCT_CATEGORIES.includes(product.category)) {
      return NextResponse.json({ 
        error: 'Invalid category. Please choose from predefined categories.',
        categories: PRODUCT_CATEGORIES 
      }, { status: 400 })
    }
    
    // Generate unique product number if not provided
    if (!product.productNumber) {
      product.productNumber = generateProductNumber()
    }
    
    // Set default values
    if (!product.id) {
      product.id = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    if (!product.createdAt) {
      product.createdAt = new Date().toISOString()
    }
    if (!product.status) {
      product.status = 'active'
    }
    if (!product.moneyEarned) {
      product.moneyEarned = 0
    }
    if (!product.totalSales) {
      product.totalSales = 0
    }
    if (!product.category) {
      product.category = 'Other'
    }

    const filePath = path.join(PRODUCTS_DIR, `product-${product.id}.json`)
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2))
    
    await updateProductsCSV()
    
    return NextResponse.json({ 
      success: true, 
      product,
      categories: PRODUCT_CATEGORIES 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

async function updateProductsCSV() {
  try {
    const files = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json'))
    const products = files.map(file => {
      const content = fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf-8')
      const product = JSON.parse(content)
      
      // Calculate money earned and total sales
      const moneyEarned = calculateMoneyEarned(product.id)
      const totalSales = calculateTotalSales(product.id)
      
      return {
        ...product,
        moneyEarned: moneyEarned,
        totalSales: totalSales
      }
    })

    const csvContent = [
      'Product ID,Product Number,Product Name,Owner,Price,Description,Category,Created Date,Status,Image URL,Tags,Money Earned,Total Sales',
      ...products.map(p => [
        p.id,
        p.productNumber,
        `"${p.name}"`,
        `"${p.owner}"`,
        p.price,
        `"${p.description || ''}"`,
        p.category,
        p.createdAt,
        p.status,
        p.imageUrl || '',
        p.tags ? `"${p.tags.join(',')}"` : '',
        p.moneyEarned || 0,
        p.totalSales || 0
      ].join(','))
    ].join('\n')

    const csvPath = path.join(PRODUCTS_CSV_DIR, 'products_master.csv')
    fs.writeFileSync(csvPath, csvContent)
    
    console.log('✅ Products CSV updated successfully')
  } catch (error) {
    console.error('Error updating products CSV:', error)
  }
}

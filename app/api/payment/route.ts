import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SALES_DIR = path.join(process.cwd(), 'sales')
const PRODUCTS_DIR = path.join(process.cwd(), 'products')

// Ensure directories exist
if (!fs.existsSync(SALES_DIR)) {
  fs.mkdirSync(SALES_DIR, { recursive: true })
}

// BBPAY Payment Processing
async function processBBPAYPayment(paymentData: any) {
  console.log('🔵 Processing BBPAY payment...')
  
  const { bbpayId, amount, currency, quantity = 1 } = paymentData
  
  // Validate BBPAY ID format (e.g., BBPAY123456789, BBPAY987654321)
  if (!bbpayId || !bbpayId.match(/^BBPAY\d{9}$/)) {
    throw new Error('Invalid BBPAY ID format. Must be BBPAY followed by 9 digits.')
  }
  
  // Calculate total amount properly
  const totalAmount = parseFloat(amount) * parseInt(quantity)
  
  if (isNaN(totalAmount) || totalAmount <= 0) {
    throw new Error('Invalid amount or quantity provided.')
  }
  
  // Simulate BBPAY payment processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate BBPAY transaction ID
  const transactionId = `BBPAY_${Date.now()}_${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  
  console.log(`✅ BBPAY payment processed successfully!`)
  console.log(`   Transaction ID: ${transactionId}`)
  console.log(`   BBPAY ID: ${bbpayId}`)
  console.log(`   Unit Price: ${currency} ${amount}`)
  console.log(`   Quantity: ${quantity}`)
  console.log(`   Total Amount: ${currency} ${totalAmount}`)
  
  return {
    success: true,
    transactionId,
    bbpayId,
    amount: parseFloat(amount),
    quantity: parseInt(quantity),
    totalAmount,
    currency,
    timestamp: new Date().toISOString()
  }
}

// Update product money earned and sales count
async function updateProductMoneyEarned(productId: string, totalAmount: number, quantity: number) {
  try {
    const productFile = path.join(PRODUCTS_DIR, `product-${productId}.json`)
    
    if (fs.existsSync(productFile)) {
      const productData = JSON.parse(fs.readFileSync(productFile, 'utf-8'))
      
      // Update money earned and sales count
      productData.moneyEarned = (productData.moneyEarned || 0) + totalAmount
      productData.totalSales = (productData.totalSales || 0) + quantity
      productData.lastSaleDate = new Date().toISOString()
      
      fs.writeFileSync(productFile, JSON.stringify(productData, null, 2))
      
      console.log(`💰 Product ${productId} updated:`)
      console.log(`   Money Earned: ₹${productData.moneyEarned}`)
      console.log(`   Total Sales: ${productData.totalSales}`)
    }
  } catch (error) {
    console.error('Error updating product money earned:', error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const paymentData = await req.json()
    console.log('🚀 BBPAY Payment Request:', paymentData)
    
    // Validate required fields
    if (!paymentData.productId || !paymentData.amount || !paymentData.bbpayId) {
      return NextResponse.json({ 
        error: 'Missing required fields: productId, amount, bbpayId' 
      }, { status: 400 })
    }
    
    // Ensure amount and quantity are numbers
    const amount = parseFloat(paymentData.amount)
    const quantity = parseInt(paymentData.quantity) || 1
    
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ 
        error: 'Invalid amount provided' 
      }, { status: 400 })
    }
    
    if (isNaN(quantity) || quantity <= 0) {
      return NextResponse.json({ 
        error: 'Invalid quantity provided' 
      }, { status: 400 })
    }
    
    // Process BBPAY payment
    const paymentResult = await processBBPAYPayment({
      ...paymentData,
      amount,
      quantity
    })
    
    if (!paymentResult.success) {
      return NextResponse.json({ 
        error: 'BBPAY payment failed' 
      }, { status: 400 })
    }
    
    // Create sale record with proper calculations
    const saleRecord = {
      id: `sale_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      productId: paymentData.productId,
      productNumber: paymentData.productNumber,
      productName: paymentData.productName,
      productOwner: paymentData.productOwner,
      productCategory: paymentData.productCategory,
      quantity: quantity,
      price: amount,
      total: paymentResult.totalAmount,
      currency: paymentData.currency || 'INR',
      paymentMethod: 'bbpay',
      bbpayId: paymentData.bbpayId,
      transactionId: paymentResult.transactionId,
      buyerName: paymentData.customerInfo?.name,
      buyerEmail: paymentData.customerInfo?.email,
      buyerPhone: paymentData.customerInfo?.phone,
      purchaseDate: new Date().toISOString(),
      paymentStatus: 'success',
      status: 'completed'
    }
    
    console.log('📝 Creating sale record:', {
      saleId: saleRecord.id,
      productName: saleRecord.productName,
      quantity: saleRecord.quantity,
      price: saleRecord.price,
      total: saleRecord.total,
      bbpayId: saleRecord.bbpayId
    })
    
    // Save sale record
    const saleFile = path.join(SALES_DIR, `sale-${saleRecord.id}.json`)
    fs.writeFileSync(saleFile, JSON.stringify(saleRecord, null, 2))
    
    // Update product money earned
    await updateProductMoneyEarned(
      paymentData.productId, 
      paymentResult.totalAmount, 
      quantity
    )
    
    // Update sales CSV
    await updateSalesCSV()
    
    console.log('✅ BBPAY payment and sale recording completed successfully!')
    
    return NextResponse.json({
      success: true,
      transactionId: paymentResult.transactionId,
      saleId: saleRecord.id,
      saleRecord: saleRecord,
      message: 'BBPAY payment processed successfully!'
    })
    
  } catch (error) {
    console.error('❌ BBPAY payment error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'BBPAY payment failed' 
    }, { status: 500 })
  }
}

async function updateSalesCSV() {
  try {
    const files = fs.readdirSync(SALES_DIR).filter(f => f.endsWith('.json'))
    const sales = files.map(file => {
      const content = fs.readFileSync(path.join(SALES_DIR, file), 'utf-8')
      return JSON.parse(content)
    })
    
    const csvContent = [
      'Sale ID,Product ID,Product Number,Product Name,Product Owner,Product Category,Quantity,Price,Total Amount,Buyer Name,Buyer Email,Buyer Phone,Payment Method,BBPAY ID,Transaction ID,Purchase Date,Currency,Payment Status,Status',
      ...sales.map(sale => [
        sale.id,
        sale.productId,
        sale.productNumber,
        `"${sale.productName}"`,
        `"${sale.productOwner}"`,
        sale.productCategory,
        sale.quantity,
        sale.price,
        sale.total,
        `"${sale.buyerName || ''}"`,
        `"${sale.buyerEmail || ''}"`,
        `"${sale.buyerPhone || ''}"`,
        sale.paymentMethod,
        sale.bbpayId,
        sale.transactionId,
        sale.purchaseDate,
        sale.currency,
        sale.paymentStatus,
        sale.status
      ].join(','))
    ].join('\n')
    
    const csvPath = path.join(SALES_DIR, 'sales_master.csv')
    fs.writeFileSync(csvPath, csvContent)
    
    console.log('✅ Sales CSV updated successfully')
  } catch (error) {
    console.error('Error updating sales CSV:', error)
  }
}

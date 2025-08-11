const fs = require('fs');
const path = require('path');

// Test real UPI payment processing
async function testRealUPIPayment() {
  console.log('🧪 Testing REAL UPI Payment System...\n');

  const paymentData = {
    productId: 'test_prod_001',
    productName: 'Test Product',
    productOwner: 'Test Owner',
    productNumber: 'PROD12345678ABCD',
    amount: 500,
    quantity: 2,
    paymentMethod: 'upi',
    upiId: 'test@okicici',
    currency: 'INR',
    customerInfo: {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+91 98765 43210'
    }
  };

  try {
    console.log('📤 Sending REAL UPI payment request...');
    console.log('Payment Data:', JSON.stringify(paymentData, null, 2));

    const response = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });

    const result = await response.json();
    console.log('\n📥 Payment Response:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('✅ REAL UPI Payment successful!');
      console.log(`Transaction ID: ${result.transactionId}`);
      console.log(`Sale ID: ${result.saleId}`);
      
      // Check if sale was recorded
      await checkSaleRecord(result.saleId);
      
      // Check if product money earned was updated
      await checkProductMoneyEarned(paymentData.productId);
      
      // Test sales report
      await testSalesReport();
    } else {
      console.log('❌ Payment failed:', result.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

async function checkSaleRecord(saleId) {
  console.log('\n🔍 Checking sale record...');
  
  const salesDir = path.join(process.cwd(), 'sales');
  const saleFile = path.join(salesDir, `sale-${saleId}.json`);
  
  if (fs.existsSync(saleFile)) {
    const saleData = JSON.parse(fs.readFileSync(saleFile, 'utf-8'));
    console.log('✅ Sale record found:');
    console.log(JSON.stringify(saleData, null, 2));
  } else {
    console.log('❌ Sale record not found!');
  }
}

async function checkProductMoneyEarned(productId) {
  console.log('\n💰 Checking product money earned...');
  
  const productsDir = path.join(process.cwd(), 'products');
  const productFile = path.join(productsDir, `product-${productId}.json`);
  
  if (fs.existsSync(productFile)) {
    const productData = JSON.parse(fs.readFileSync(productFile, 'utf-8'));
    console.log('✅ Product money earned updated:');
    console.log(`Product: ${productData.name}`);
    console.log(`Money Earned: ₹${productData.moneyEarned || 0}`);
    console.log(`Total Sales: ${productData.totalSales || 0}`);
  } else {
    console.log('❌ Product file not found!');
  }
}

async function testSalesReport() {
  console.log('\n📊 Testing Sales Report...');
  
  try {
    const response = await fetch('http://localhost:3000/api/sales');
    const salesData = await response.json();
    
    console.log('✅ Sales Report Data:');
    console.log(`Total Sales: ${salesData.length}`);
    
    if (salesData.length > 0) {
      const latestSale = salesData[0];
      console.log('Latest Sale:', {
        productName: latestSale.productName,
        productNumber: latestSale.productNumber,
        buyerName: latestSale.buyerName,
        amount: latestSale.total,
        paymentMethod: latestSale.paymentMethod,
        transactionId: latestSale.transactionId
      });
    }
  } catch (error) {
    console.error('❌ Sales report test failed:', error);
  }
}

// Run test
async function runTest() {
  console.log('🚀 Starting REAL UPI Payment Test...\n');
  await testRealUPIPayment();
  console.log('\n✨ Test completed!');
}

// Run if this file is executed directly
if (require.main === module) {
  runTest().catch(console.error);
}

module.exports = { testRealUPIPayment };



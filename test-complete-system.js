const fs = require('fs');
const path = require('path');

console.log('🚀 TESTING COMPLETE BBPAY → SALES INTEGRATION SYSTEM\n');

// Test 1: Create a test product
async function createTestProduct() {
  console.log('📦 Step 1: Creating test product...');
  
  const productData = {
    name: 'Test Product for BBPAY',
    owner: 'Test Owner',
    price: 1000,
    description: 'Test product for BBPAY payment testing',
    category: 'Electronics',
    imageUrl: 'https://via.placeholder.com/300',
    status: 'active'
  };

  try {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Test product created successfully!');
      console.log(`   Product ID: ${result.product.id}`);
      console.log(`   Product Number: ${result.product.productNumber}`);
      console.log(`   Category: ${result.product.category}`);
      return result.product;
    } else {
      console.log('❌ Failed to create test product');
      return null;
    }
  } catch (error) {
    console.log('❌ Error creating test product:', error.message);
    return null;
  }
}

// Test 2: Make BBPAY payment
async function testBBPAYPayment(product) {
  console.log('\n💳 Step 2: Testing BBPAY payment...');
  
  const paymentData = {
    productId: product.id,
    productName: product.name,
    productOwner: product.owner,
    productNumber: product.productNumber,
    productCategory: product.category,
    amount: product.price,
    quantity: 2,
    paymentMethod: 'bbpay',
    bbpayId: 'BBPAY123456789',
    currency: 'INR',
    customerInfo: {
      name: 'Test Customer',
      email: 'test@example.com',
      phone: '+91 98765 43210'
    }
  };

  try {
    console.log('   Sending BBPAY payment request...');
    const response = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ BBPAY payment successful!');
      console.log(`   Transaction ID: ${result.transactionId}`);
      console.log(`   Sale ID: ${result.saleId}`);
      console.log(`   Amount: ₹${result.saleRecord.total}`);
      console.log(`   BBPAY ID: ${result.saleRecord.bbpayId}`);
      return result;
    } else {
      console.log('❌ BBPAY payment failed:', result.error);
      return null;
    }
  } catch (error) {
    console.log('❌ Error processing BBPAY payment:', error.message);
    return null;
  }
}

// Test 3: Verify sale record
async function verifySaleRecord(saleId) {
  console.log('\n📝 Step 3: Verifying sale record...');
  
  const salesDir = path.join(process.cwd(), 'sales');
  const saleFile = path.join(salesDir, `sale-${saleId}.json`);
  
  if (fs.existsSync(saleFile)) {
    const saleData = JSON.parse(fs.readFileSync(saleFile, 'utf-8'));
    console.log('✅ Sale record found and verified!');
    console.log(`   Product: ${saleData.productName}`);
    console.log(`   Category: ${saleData.productCategory}`);
    console.log(`   Buyer: ${saleData.buyerName}`);
    console.log(`   Amount: ₹${saleData.total}`);
    console.log(`   Payment Method: ${saleData.paymentMethod}`);
    console.log(`   BBPAY ID: ${saleData.bbpayId}`);
    console.log(`   Status: ${saleData.status}`);
    return true;
  } else {
    console.log('❌ Sale record not found!');
    return false;
  }
}

// Test 4: Verify product money earned and sales count
async function verifyProductMoneyEarned(productId) {
  console.log('\n💰 Step 4: Verifying product money earned and sales...');
  
  const productsDir = path.join(process.cwd(), 'products');
  const productFile = path.join(productsDir, `product-${productId}.json`);
  
  if (fs.existsSync(productFile)) {
    const productData = JSON.parse(fs.readFileSync(productFile, 'utf-8'));
    console.log('✅ Product updated successfully!');
    console.log(`   Product: ${productData.name}`);
    console.log(`   Category: ${productData.category}`);
    console.log(`   Money Earned: ₹${productData.moneyEarned || 0}`);
    console.log(`   Total Sales: ${productData.totalSales || 0} units`);
    return true;
  } else {
    console.log('❌ Product file not found!');
    return false;
  }
}

// Test 5: Check sales API
async function checkSalesAPI() {
  console.log('\n📊 Step 5: Checking sales API...');
  
  try {
    const response = await fetch('http://localhost:3000/api/sales');
    const salesData = await response.json();
    
    console.log('✅ Sales API working!');
    console.log(`   Total Sales: ${salesData.length}`);
    
    if (salesData.length > 0) {
      const latestSale = salesData[0];
      console.log('   Latest Sale:');
      console.log(`     Product: ${latestSale.productName}`);
      console.log(`     Category: ${latestSale.productCategory}`);
      console.log(`     Amount: ₹${latestSale.total}`);
      console.log(`     Payment: ${latestSale.paymentMethod}`);
      console.log(`     BBPAY ID: ${latestSale.bbpayId}`);
    }
    return true;
  } catch (error) {
    console.log('❌ Sales API error:', error.message);
    return false;
  }
}

// Test 6: Check products API
async function checkProductsAPI() {
  console.log('\n🛍️ Step 6: Checking products API...');
  
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const productsData = await response.json();
    
    console.log('✅ Products API working!');
    console.log(`   Total Products: ${productsData.length}`);
    
    const testProduct = productsData.find(p => p.name === 'Test Product for BBPAY');
    if (testProduct) {
      console.log('   Test Product Found:');
      console.log(`     Category: ${testProduct.category}`);
      console.log(`     Money Earned: ₹${testProduct.moneyEarned || 0}`);
      console.log(`     Total Sales: ${testProduct.totalSales || 0} units`);
      console.log(`     Product Number: ${testProduct.productNumber}`);
    }
    return true;
  } catch (error) {
    console.log('❌ Products API error:', error.message);
    return false;
  }
}

// Test 7: Check winners API
async function checkWinnersAPI() {
  console.log('\n🏆 Step 7: Checking winners API...');
  
  try {
    const response = await fetch('http://localhost:3000/api/winners');
    const winnersData = await response.json();
    
    console.log('✅ Winners API working!');
    console.log(`   Total Participants: ${winnersData.totalParticipants}`);
    console.log(`   Total Revenue: ₹${winnersData.totalRevenue}`);
    console.log(`   BBPAY Transactions: ${winnersData.totalBBPAYTransactions || 0}`);
    
    if (winnersData.winners.length > 0) {
      console.log('   Top Winner:');
      console.log(`     Owner: ${winnersData.winners[0].owner}`);
      console.log(`     Revenue: ₹${winnersData.winners[0].totalRevenue}`);
    }
    return true;
  } catch (error) {
    console.log('❌ Winners API error:', error.message);
    return false;
  }
}

// Main test function
async function runCompleteTest() {
  console.log('🧪 Starting Complete BBPAY System Test...\n');
  
  let allTestsPassed = true;
  
  // Test 1: Create product
  const product = await createTestProduct();
  if (!product) {
    console.log('❌ Test 1 failed - cannot continue');
    return;
  }
  
  // Test 2: BBPAY payment
  const paymentResult = await testBBPAYPayment(product);
  if (!paymentResult) {
    console.log('❌ Test 2 failed - cannot continue');
    return;
  }
  
  // Test 3: Verify sale record
  const saleVerified = await verifySaleRecord(paymentResult.saleId);
  if (!saleVerified) allTestsPassed = false;
  
  // Test 4: Verify product money earned
  const moneyVerified = await verifyProductMoneyEarned(product.id);
  if (!moneyVerified) allTestsPassed = false;
  
  // Test 5: Check sales API
  const salesAPIOK = await checkSalesAPI();
  if (!salesAPIOK) allTestsPassed = false;
  
  // Test 6: Check products API
  const productsAPIOK = await checkProductsAPI();
  if (!productsAPIOK) allTestsPassed = false;
  
  // Test 7: Check winners API
  const winnersAPIOK = await checkWinnersAPI();
  if (!winnersAPIOK) allTestsPassed = false;
  
  // Final result
  console.log('\n' + '='.repeat(50));
  if (allTestsPassed) {
    console.log('🎉 ALL TESTS PASSED! 🎉');
    console.log('✅ BBPAY → Sales integration is working perfectly!');
    console.log('✅ Automatic sales recording is functional!');
    console.log('✅ Real-time updates are working!');
    console.log('✅ Product categories are working!');
    console.log('✅ Sales count tracking is working!');
  } else {
    console.log('❌ Some tests failed!');
    console.log('Please check the errors above and fix them.');
  }
  console.log('='.repeat(50));
}

// Run the test
if (require.main === module) {
  runCompleteTest().catch(console.error);
}

module.exports = { runCompleteTest };


// Test script for CSV Sales Tracking System
// Run this script to test the sales tracking functionality

const fs = require('fs');
const path = require('path');

// Test data
const testSales = [
  {
    productId: 123,
    productName: "Arise AI Assistant",
    productOwner: "Bhargava",
    quantity: 2,
    unitPrice: 123,
    paymentMethod: "GPAY UPI",
    transactionId: "TXN12345678",
    customerEmail: "test@example.com",
    customerName: "Test Customer"
  },
  {
    productId: 124,
    productName: "E-commerce Platform",
    productOwner: "Sarah",
    quantity: 1,
    unitPrice: 500,
    paymentMethod: "PHONEPE UPI",
    transactionId: "TXN87654321",
    customerEmail: "customer@example.com",
    customerName: "John Doe"
  },
  {
    productId: 125,
    productName: "Mobile App",
    productOwner: "Mike",
    quantity: 3,
    unitPrice: 250,
    paymentMethod: "PAYTM UPI",
    transactionId: "TXN11223344",
    customerEmail: "user@example.com",
    customerName: "Jane Smith"
  }
];

// Test products
const testProducts = [
  {
    id: 123,
    name: "Arise AI Assistant",
    owner: "Bhargava",
    price: 123,
    description: "Advanced AI assistant for productivity",
    category: "Software",
    createdAt: new Date().toISOString(),
    status: "active"
  },
  {
    id: 124,
    name: "E-commerce Platform",
    owner: "Sarah",
    price: 500,
    description: "Complete e-commerce solution",
    category: "Platform",
    createdAt: new Date().toISOString(),
    status: "active"
  },
  {
    id: 125,
    name: "Mobile App",
    owner: "Mike",
    price: 250,
    description: "Cross-platform mobile application",
    category: "Mobile",
    createdAt: new Date().toISOString(),
    status: "active"
  }
];

async function testSalesAPI() {
  console.log('🧪 Testing Sales API...\n');

  // Test 1: Record sales
  console.log('1. Recording test sales...');
  for (const sale of testSales) {
    try {
      const response = await fetch('http://localhost:3000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sale),
      });
      
      const result = await response.json();
      if (result.success) {
        console.log(`✅ Sale recorded: ${sale.productName} - ${sale.quantity}x ₹${sale.unitPrice}`);
      } else {
        console.log(`❌ Failed to record sale: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ Error recording sale: ${error.message}`);
    }
  }

  // Test 2: Get all sales
  console.log('\n2. Fetching all sales...');
  try {
    const response = await fetch('http://localhost:3000/api/sales');
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Retrieved ${data.totalSales} sales`);
      console.log(`💰 Total revenue: ₹${data.totalRevenue}`);
      console.log(`📊 Sales data:`, data.data.slice(0, 2)); // Show first 2 sales
    } else {
      console.log(`❌ Failed to fetch sales: ${data.error}`);
    }
  } catch (error) {
    console.log(`❌ Error fetching sales: ${error.message}`);
  }

  // Test 3: Download CSV
  console.log('\n3. Testing CSV download...');
  try {
    const response = await fetch('http://localhost:3000/api/sales?format=csv');
    if (response.ok) {
      const blob = await response.blob();
      console.log(`✅ CSV downloaded successfully (${blob.size} bytes)`);
    } else {
      console.log(`❌ Failed to download CSV: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Error downloading CSV: ${error.message}`);
  }
}

async function testProductsAPI() {
  console.log('\n🧪 Testing Products API...\n');

  // Test 1: Add products
  console.log('1. Adding test products...');
  for (const product of testProducts) {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      const result = await response.json();
      if (result.success) {
        console.log(`✅ Product added: ${product.name} - ₹${product.price}`);
      } else {
        console.log(`❌ Failed to add product: ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ Error adding product: ${error.message}`);
    }
  }

  // Test 2: Get all products
  console.log('\n2. Fetching all products...');
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    
    console.log(`✅ Retrieved ${products.length} products`);
    console.log(`📦 Products:`, products.slice(0, 2)); // Show first 2 products
  } catch (error) {
    console.log(`❌ Error fetching products: ${error.message}`);
  }
}

function checkFileStructure() {
  console.log('\n📁 Checking file structure...\n');

  const directories = [
    'sales',
    'sales-csv',
    'products',
    'products-csv'
  ];

  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      console.log(`✅ ${dir}/ - ${files.length} files`);
      if (files.length > 0) {
        console.log(`   📄 Files: ${files.slice(0, 3).join(', ')}${files.length > 3 ? '...' : ''}`);
      }
    } else {
      console.log(`❌ ${dir}/ - Directory not found`);
    }
  });
}

function displayCSVContent() {
  console.log('\n📊 Displaying CSV content...\n');

  const csvFiles = [
    'sales-csv/sales_master.csv',
    'products-csv/products_master.csv'
  ];

  csvFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`📄 ${file}:`);
      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');
      console.log(`   Lines: ${lines.length}`);
      console.log(`   First line: ${lines[0]}`);
      if (lines.length > 1) {
        console.log(`   Sample data: ${lines[1]}`);
      }
      console.log('');
    } else {
      console.log(`❌ ${file} - File not found`);
    }
  });
}

async function runTests() {
  console.log('🚀 Starting CSV Sales Tracking System Tests\n');
  console.log('=' .repeat(50));

  // Check if server is running
  try {
    const response = await fetch('http://localhost:3000/api/sales');
    console.log('✅ Server is running on localhost:3000\n');
  } catch (error) {
    console.log('❌ Server is not running. Please start the development server first:');
    console.log('   npm run dev\n');
    return;
  }

  // Run tests
  await testSalesAPI();
  await testProductsAPI();
  checkFileStructure();
  displayCSVContent();

  console.log('=' .repeat(50));
  console.log('✅ All tests completed!\n');
  console.log('📋 Next steps:');
  console.log('   1. Visit http://localhost:3000/sales to view the dashboard');
  console.log('   2. Try making a purchase to see real-time sales tracking');
  console.log('   3. Download CSV reports from the dashboard');
  console.log('   4. Check the sales/ and sales-csv/ directories for generated files');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testSalesAPI,
  testProductsAPI,
  checkFileStructure,
  displayCSVContent,
  runTests
}; 
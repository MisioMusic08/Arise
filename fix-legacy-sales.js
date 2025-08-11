const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING LEGACY SALES DATA\n');

const SALES_DIR = path.join(process.cwd(), 'sales');

function fixLegacySalesData() {
  try {
    console.log('📁 Reading sales directory...');
    
    if (!fs.existsSync(SALES_DIR)) {
      console.log('❌ Sales directory not found');
      return;
    }

    const files = fs.readdirSync(SALES_DIR).filter(f => f.endsWith('.json'));
    console.log(`📊 Found ${files.length} sale files to process`);

    let fixedCount = 0;
    let totalRevenue = 0;
    let bbpayTransactions = 0;

    files.forEach(file => {
      const filePath = path.join(SALES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const sale = JSON.parse(content);
      
      let needsUpdate = false;
      
      // Fix total amount if it's NaN or missing
      if (sale.total === undefined || sale.total === null || isNaN(sale.total)) {
        const price = parseFloat(sale.price) || 0;
        const quantity = parseInt(sale.quantity) || 1;
        sale.total = price * quantity;
        needsUpdate = true;
        console.log(`💰 Fixed total for ${sale.productName}: ₹${sale.total}`);
      }
      
      // Ensure all numeric fields are numbers
      if (typeof sale.price !== 'number' || isNaN(sale.price)) {
        sale.price = parseFloat(sale.price) || 0;
        needsUpdate = true;
      }
      
      if (typeof sale.quantity !== 'number' || isNaN(sale.quantity)) {
        sale.quantity = parseInt(sale.quantity) || 1;
        needsUpdate = true;
      }
      
      if (typeof sale.total !== 'number' || isNaN(sale.total)) {
        sale.total = parseFloat(sale.total) || 0;
        needsUpdate = true;
      }
      
      // Fix payment method for legacy UPI data
      if (sale.paymentMethod && sale.paymentMethod.toLowerCase().includes('upi')) {
        sale.paymentMethod = 'bbpay';
        needsUpdate = true;
        console.log(`🔄 Converted payment method to BBPAY for ${sale.productName}`);
      }
      
      // Ensure BBPAY ID field exists
      if (!sale.bbpayId && sale.upiId) {
        sale.bbpayId = sale.upiId;
        needsUpdate = true;
      }
      
      // Update the file if changes were made
      if (needsUpdate) {
        fs.writeFileSync(filePath, JSON.stringify(sale, null, 2));
        fixedCount++;
      }
      
      // Calculate totals
      totalRevenue += sale.total || 0;
      if (sale.paymentMethod === 'bbpay') {
        bbpayTransactions++;
      }
    });

    console.log('\n✅ LEGACY DATA FIX COMPLETE!');
    console.log(`📊 Files processed: ${files.length}`);
    console.log(`🔧 Files fixed: ${fixedCount}`);
    console.log(`💰 Total Revenue: ₹${totalRevenue.toLocaleString()}`);
    console.log(`💳 BBPAY Transactions: ${bbpayTransactions}`);
    
    // Update products with correct money earned
    updateProductsMoneyEarned();
    
  } catch (error) {
    console.error('❌ Error fixing legacy data:', error);
  }
}

function updateProductsMoneyEarned() {
  try {
    console.log('\n💰 Updating products money earned...');
    
    const PRODUCTS_DIR = path.join(process.cwd(), 'products');
    
    if (!fs.existsSync(PRODUCTS_DIR)) {
      console.log('❌ Products directory not found');
      return;
    }

    const productFiles = fs.readdirSync(PRODUCTS_DIR).filter(f => f.endsWith('.json'));
    const salesFiles = fs.readdirSync(SALES_DIR).filter(f => f.endsWith('.json'));
    
    // Read all sales data
    const sales = salesFiles.map(file => {
      const content = fs.readFileSync(path.join(SALES_DIR, file), 'utf-8');
      return JSON.parse(content);
    });
    
    productFiles.forEach(file => {
      const productPath = path.join(PRODUCTS_DIR, file);
      const product = JSON.parse(fs.readFileSync(productPath, 'utf-8'));
      
      // Calculate money earned from sales
      const productSales = sales.filter(sale => sale.productId === product.id);
      const moneyEarned = productSales.reduce((sum, sale) => sum + (sale.total || 0), 0);
      const totalSales = productSales.reduce((sum, sale) => sum + (sale.quantity || 1), 0);
      
      // Update product
      product.moneyEarned = moneyEarned;
      product.totalSales = totalSales;
      
      fs.writeFileSync(productPath, JSON.stringify(product, null, 2));
      
      console.log(`📦 Updated ${product.name}: ₹${moneyEarned} earned, ${totalSales} units sold`);
    });
    
    console.log('✅ Products updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating products:', error);
  }
}

// Run the fix
if (require.main === module) {
  fixLegacySalesData();
}

module.exports = { fixLegacySalesData };



# Commerce Expo - CSV Tracking & Winner Determination System

This application now maintains comprehensive CSV files for both products and sales tracking, with a real payment processing system that records all successful transactions including UPI payments, and a sophisticated winner determination system.

## 🏆 Winner Determination System

### Features
- **Multiple Ranking Criteria**: Rank participants by revenue, sales count, UPI transactions, average order value, or total quantity
- **Real-time Analytics**: Live dashboard showing participant performance
- **Date Range Filtering**: Analyze performance for specific time periods
- **CSV Export**: Download winner reports for analysis
- **Visual Rankings**: Beautiful UI with medals and rankings

### Ranking Criteria
1. **Total Revenue** - Highest total sales amount
2. **Number of Sales** - Most transactions completed
3. **UPI Transactions** - Most UPI payments received
4. **Average Order Value** - Highest average transaction value
5. **Total Quantity Sold** - Most items sold

## 💳 Payment System

### Supported Payment Methods
- **UPI** - Unified Payment Interface (95% success rate)
- **Credit/Debit Cards** - Traditional card payments (90% success rate)
- **Digital Wallets** - Mobile wallet payments (88% success rate)

### UPI Payment Features
- **UPI ID Tracking** - Records UPI IDs for each transaction
- **Transaction IDs** - Unique UPI transaction identifiers
- **Success Rate** - Higher success rate for UPI transactions
- **Real-time Processing** - Instant payment confirmation

## 📊 CSV Files Structure

### Products CSV (`products-csv/products_master.csv`)
The products CSV file contains all product information with the following columns:
- **Product ID**: Unique identifier for each product
- **Product Name**: Name of the product
- **Owner**: Product owner/seller
- **Price**: Product price
- **Description**: Product description
- **Category**: Product category
- **Created Date**: When the product was created
- **Status**: Product status (active/inactive)
- **Image URL**: Product image URL
- **Tags**: Product tags (comma-separated)

### Sales CSV (`sales-csv/sales_master.csv`)
The sales CSV file contains all successful sales transactions with the following columns:
- **Sale ID**: Unique identifier for each sale
- **Product ID**: ID of the sold product
- **Product Name**: Name of the sold product
- **Product Owner**: Owner of the product
- **Quantity**: Quantity sold
- **Price**: Unit price
- **Total**: Total amount (price × quantity)
- **Customer**: Customer name
- **Customer Email**: Customer email address
- **Customer Phone**: Customer phone number
- **Payment Method**: Payment method used (upi, card, wallet)
- **UPI ID**: UPI identifier (for UPI transactions)
- **Transaction ID**: Payment gateway transaction ID
- **Date**: Sale date and time
- **Status**: Sale status (completed, pending, etc.)
- **Payment Status**: Payment processing status (success, failed, etc.)
- **Currency**: Transaction currency (INR)

## 🚀 API Endpoints

### Products API (`/api/products`)
- **GET**: Retrieve all products
- **POST**: Create a new product (automatically updates CSV)

### Sales API (`/api/sales`)
- **GET**: Retrieve all sales
- **GET /api/sales?format=csv**: Download sales data as CSV
- **GET /api/sales?status=completed**: Filter sales by status
- **POST**: Create a new sale record (automatically updates CSV)

### Payment API (`/api/payment`)
- **POST**: Process payment and record successful transactions
  - Supports UPI, card, and wallet payments
  - Automatically creates sale records for successful payments
  - Updates the sales CSV file
  - Returns transaction ID and sale ID

### Winners API (`/api/winners`)
- **GET**: Get winner rankings based on various criteria
- **GET /api/winners?criteria=revenue&limit=10**: Top 10 by revenue
- **GET /api/winners?criteria=upi_transactions&format=csv**: Download UPI winners as CSV
- **GET /api/winners?startDate=2024-01-01&endDate=2024-12-31**: Filter by date range

## 🎯 Usage Examples

### Creating a Product
```javascript
const response = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'prod_123',
    name: 'Sample Product',
    price: 299.99,
    description: 'A sample product',
    category: 'Electronics',
    owner: 'John Doe'
  })
})
```

### Processing UPI Payment
```javascript
const response = await fetch('/api/payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: 'prod_123',
    productName: 'Sample Product',
    productOwner: 'John Doe',
    amount: 299.99,
    quantity: 1,
    paymentMethod: 'upi',
    upiId: 'john@okicici',
    customerInfo: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 98765 43210'
    }
  })
})
```

### Getting Winner Rankings
```javascript
// Get top 10 by revenue
const response = await fetch('/api/winners?criteria=revenue&limit=10')

// Get top 5 by UPI transactions
const response = await fetch('/api/winners?criteria=upi_transactions&limit=5')

// Download winners CSV
window.open('/api/winners?criteria=revenue&format=csv')
```

## 🏅 Winner Dashboard

Access the winner dashboard at `/winners` to see:
- **Real-time Rankings**: Live updates of participant performance
- **Multiple Criteria**: Switch between different ranking methods
- **Date Filtering**: Analyze performance for specific periods
- **Summary Statistics**: Total participants, sales, revenue, and UPI transactions
- **Detailed Analytics**: Individual participant breakdowns
- **CSV Export**: Download reports for external analysis

## 📱 Payment Form Component

The enhanced `PaymentForm` component supports:
- **Multiple Payment Methods**: UPI, card, and wallet options
- **Dynamic Fields**: Different input fields based on payment method
- **Real-time Validation**: Form validation for each payment type
- **Success/Error Handling**: Toast notifications for payment status
- **Currency Support**: Indian Rupees (₹) display

```jsx
import { PaymentForm } from '@/components/payment-form'

<PaymentForm
  productId="prod_123"
  productName="Sample Product"
  productOwner="John Doe"
  amount={299.99}
  quantity={1}
  onSuccess={(transactionId, saleId) => {
    console.log('Payment successful:', { transactionId, saleId })
  }}
  onError={(error) => {
    console.error('Payment failed:', error)
  }}
/>
```

## 📈 Business Analytics

The system provides comprehensive analytics:
- **Sales Performance**: Track individual and overall sales metrics
- **Payment Method Analysis**: Understand payment preferences
- **UPI Transaction Tracking**: Monitor UPI payment success rates
- **Winner Determination**: Identify top performers across multiple criteria
- **Revenue Analysis**: Track total revenue and average order values
- **Customer Insights**: Analyze customer behavior and preferences

## 🔧 Configuration

### Payment Success Rates
- **UPI**: 95% success rate (highest)
- **Credit/Debit Cards**: 90% success rate
- **Digital Wallets**: 88% success rate

### Currency
- Default currency: Indian Rupees (₹)
- All amounts displayed in INR
- CSV exports include currency information

## 📁 File Locations

- **Products JSON**: `products/product-{id}.json`
- **Products CSV**: `products-csv/products_master.csv`
- **Sales JSON**: `sales/sale-{id}.json`
- **Sales CSV**: `sales-csv/sales_master.csv`
- **Winner Reports**: Generated on-demand via API

## 🎉 Features Summary

1. **Comprehensive Payment Tracking**: All payment methods including UPI
2. **Real-time Winner Determination**: Multiple ranking criteria
3. **Automatic CSV Maintenance**: Both products and sales CSVs
4. **Enhanced Payment Processing**: Simulated payment gateway with realistic success rates
5. **Beautiful Dashboard**: Visual winner rankings and analytics
6. **Date Range Filtering**: Analyze performance for specific periods
7. **CSV Export**: Download reports for external analysis
8. **Transaction IDs**: Unique identifiers for all payment types
9. **Customer Information**: Complete customer data tracking
10. **Business Intelligence**: Comprehensive analytics and reporting

## 🚀 Getting Started

1. **Create Products**: Use the products API to add products with owner information
2. **Process Payments**: Use the payment form or API to process transactions
3. **View Winners**: Access `/winners` to see real-time rankings
4. **Download Reports**: Use CSV export for external analysis
5. **Monitor Performance**: Track UPI transactions and overall sales performance

## 📝 Notes

- The payment system is currently simulated for demo purposes
- Replace the `processPayment` function in `/api/payment/route.ts` with real payment gateway integration
- All CSV files are automatically created and maintained
- The winner determination system provides comprehensive business analytics
- UPI transactions are tracked separately for detailed analysis
- The system supports multiple currencies but defaults to INR 
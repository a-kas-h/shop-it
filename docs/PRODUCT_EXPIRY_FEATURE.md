# 📅 Product Expiry Feature Documentation

## Overview

The Product Expiry feature tracks manufacturing and expiry dates for products, helping users identify fresh products and avoid expired items. This feature includes visual indicators, status badges, and automatic expiry calculations.

## Features

✅ **Manufacturing Date Tracking** - Records when products were manufactured
✅ **Expiry Date Tracking** - Records when products expire
✅ **Automatic Expiry Detection** - Calculates if products are expired
✅ **Days Until Expiry** - Shows remaining shelf life
✅ **Visual Status Indicators** - Color-coded badges and borders
✅ **Expiry Warnings** - Highlights products expiring soon
✅ **Category-Specific Shelf Life** - Different expiry periods for different product types

## Database Schema Changes

### Products Table Updates

```sql
ALTER TABLE products 
ADD COLUMN manufacturing_date DATE,
ADD COLUMN expiry_date DATE;
```

### New Columns

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `manufacturing_date` | DATE | When product was manufactured | `2024-01-15` |
| `expiry_date` | DATE | When product expires | `2025-01-15` |

## Backend Implementation

### Product Entity Updates

```java
@Column(name = "manufacturing_date")
private java.time.LocalDate manufacturingDate;

@Column(name = "expiry_date")
private java.time.LocalDate expiryDate;

// Helper methods
public boolean isExpired() {
    return expiryDate != null && expiryDate.isBefore(java.time.LocalDate.now());
}

public long getDaysUntilExpiry() {
    if (expiryDate == null) return -1;
    return java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), expiryDate);
}
```

### InventoryDto Updates

```java
private java.time.LocalDate manufacturingDate;
private java.time.LocalDate expiryDate;
private boolean isExpired;
private long daysUntilExpiry;
```

## Frontend Implementation

### ProductExpiryBadge Component

A reusable component that displays expiry status with appropriate colors and icons:

```jsx
<ProductExpiryBadge 
  expiryDate={item.expiryDate}
  isExpired={isExpired}
  daysUntilExpiry={daysUntilExpiry}
/>
```

### Status Categories

| Status | Condition | Color | Icon | Description |
|--------|-----------|-------|------|-------------|
| **Expired** | Past expiry date | Red | ⚠️ | Product has expired |
| **Expires Today** | 0 days left | Yellow | ⏰ | Expires today |
| **Expires Tomorrow** | 1 day left | Yellow | ⏰ | Expires tomorrow |
| **Expiring Soon** | 2-7 days left | Yellow | ⏰ | Expires within a week |
| **Limited Time** | 8-30 days left | Orange | ⏰ | Expires within a month |
| **Fresh** | 30+ days left | Green | ✅ | Fresh product |

## Visual Indicators

### Product Cards

Products are displayed with:
- **Border colors** indicating expiry status
- **Background colors** for expired/expiring products
- **Manufacturing and expiry dates**
- **Status badges** with icons and text

### Color Coding

```css
/* Expired products */
border-red-300 bg-red-50

/* Expiring soon (≤7 days) */
border-yellow-300 bg-yellow-50

/* Normal products */
border-gray-200 bg-white
```

## Sample Data

### Realistic Expiry Periods by Category

| Category | Typical Shelf Life | Example |
|----------|-------------------|---------|
| **Dairy** | 3-7 days | Milk, Yogurt |
| **Bakery** | 5-10 days | Bread, Pastries |
| **Grains/Flour** | 12-18 months | Atta, Rice |
| **Oils** | 6-12 months | Cooking Oil |
| **Personal Care** | 2-3 years | Shampoo, Toothpaste |
| **Household** | 2-3 years | Detergent, Cleaners |
| **Electronics** | 1-2 years warranty | Phones, Earbuds |

### Sample Data Examples

```sql
-- Short shelf life (dairy)
('Amul Fresh Milk 1L', '2024-08-06', '2024-08-09')

-- Medium shelf life (grains)
('Aashirvaad Atta 5kg', '2024-01-15', '2025-01-15')

-- Long shelf life (personal care)
('Colgate Toothpaste', '2024-02-15', '2027-02-15')
```

## Migration Guide

### For Existing Databases

1. **Run the migration script:**
   ```bash
   psql -d shopit -f database/migrations/001_add_product_dates.sql
   ```

2. **Update existing products:**
   ```sql
   UPDATE products SET 
       manufacturing_date = '2024-01-01',
       expiry_date = '2025-01-01'
   WHERE manufacturing_date IS NULL;
   ```

3. **Restart the application** to load new schema

### For New Installations

Use the updated `complete-sample-data.sql` which includes all date information.

## API Response Format

### Store Details Response

```json
{
  "inventory": [
    {
      "id": 1,
      "name": "Aashirvaad Atta 5kg",
      "category": "Groceries",
      "quantity": 50,
      "price": 285.00,
      "manufacturingDate": "2024-01-15",
      "expiryDate": "2025-01-15",
      "isExpired": false,
      "daysUntilExpiry": 162
    }
  ]
}
```

## User Experience

### Store Details Page

1. **Product cards** show manufacturing and expiry dates
2. **Color-coded borders** indicate expiry status
3. **Status badges** provide quick visual feedback
4. **Date formatting** uses local date format

### Visual Hierarchy

1. **Expired products** - Red borders, warning icons
2. **Expiring soon** - Yellow borders, clock icons
3. **Fresh products** - Green badges, check icons

## Business Benefits

### For Customers

- **Avoid expired products** - Clear visual indicators
- **Make informed decisions** - See exact expiry dates
- **Find fresh products** - Identify recently manufactured items
- **Plan purchases** - Know how long products will last

### For Store Owners

- **Inventory management** - Track product freshness
- **Reduce waste** - Identify products nearing expiry
- **Customer trust** - Transparent expiry information
- **Compliance** - Meet food safety regulations

## Future Enhancements

### Potential Features

1. **Expiry Notifications** - Alert users about expiring products
2. **Discount Integration** - Automatic discounts for near-expiry items
3. **Batch Tracking** - Track multiple batches of same product
4. **Supplier Integration** - Automatic date updates from suppliers
5. **Analytics Dashboard** - Expiry trends and waste reduction metrics
6. **Mobile Notifications** - Push notifications for expiring items
7. **Barcode Scanning** - Scan products to check expiry dates

### Advanced Features

1. **Temperature Tracking** - Adjust expiry based on storage conditions
2. **Quality Scoring** - Rate product freshness beyond just dates
3. **Predictive Analytics** - Predict optimal purchase timing
4. **Waste Reduction** - Suggest recipes for near-expiry items

This feature significantly enhances the shopping experience by providing transparency about product freshness and helping users make informed purchasing decisions! 🛒✨
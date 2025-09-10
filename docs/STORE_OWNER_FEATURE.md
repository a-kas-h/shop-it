# 🏪 Store Owner Management Feature

## Overview

The Store Owner Management feature allows store owners to register their stores, manage inventory, and update store information through a dedicated dashboard. This feature includes authentication, role-based access control, and comprehensive store management capabilities.

## Features

✅ **Store Registration** - New store owners can register their stores
✅ **Store Owner Authentication** - Firebase-based authentication with role management
✅ **Store Dashboard** - Centralized management interface for store owners
✅ **Inventory Management** - Add, update, and delete inventory items
✅ **Store Information Updates** - Modify store details, hours, contact info
✅ **Multi-Store Support** - Owners can manage multiple stores
✅ **Role-Based Access** - Owner, Manager, and Staff roles with different permissions
✅ **Product Date Management** - Update manufacturing and expiry dates

## Database Schema

### Users Table Updates
```sql
ALTER TABLE users 
ADD COLUMN user_type VARCHAR(20) DEFAULT 'customer' 
CHECK (user_type IN ('customer', 'store_owner', 'admin'));
```

### Store Owners Table
```sql
CREATE TABLE store_owners (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'owner' CHECK (role IN ('owner', 'manager', 'staff')),
    permissions JSONB DEFAULT '{"manage_inventory": true, "manage_store": true, "view_analytics": true}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, store_id)
);
```

## Backend Implementation

### New Entities

#### User Entity
- Enhanced with `userType` field
- Supports CUSTOMER, STORE_OWNER, ADMIN types
- Links to store ownerships

#### StoreOwner Entity
- Links users to stores
- Defines roles (OWNER, MANAGER, STAFF)
- JSON permissions for fine-grained access control
- Active/inactive status management

### API Endpoints

#### Store Registration
```
POST /api/store-management/register
```
**Request Body:**
```json
{
  "storeName": "My Store",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postalCode": "400001",
  "phone": "+91-9876543210",
  "email": "store@example.com",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "ownerName": "John Doe",
  "ownerEmail": "john@example.com",
  "firebaseUid": "firebase_uid_here"
}
```

#### Get My Stores
```
GET /api/store-management/my-stores
Headers: Firebase-UID: {user_firebase_uid}
```

#### Store Management
```
GET /api/store-management/store/{storeId}
PUT /api/store-management/store/{storeId}
Headers: Firebase-UID: {user_firebase_uid}
```

#### Inventory Management
```
GET /api/store-management/store/{storeId}/inventory
POST /api/store-management/store/{storeId}/inventory
PUT /api/store-management/store/{storeId}/inventory
DELETE /api/store-management/store/{storeId}/inventory/{productId}
Headers: Firebase-UID: {user_firebase_uid}
```

### Security & Authorization

- **Firebase Authentication** - All requests require valid Firebase token
- **Role-Based Access Control** - Different permissions for owners, managers, staff
- **Store Ownership Verification** - Users can only access stores they own/manage
- **Permission Checks** - JSON-based permissions for granular control

## Frontend Implementation

### New Pages

#### Store Owner Dashboard (`/store-dashboard`)
- Lists all stores owned by the user
- Shows store cards with basic information
- Quick access to store management and inventory
- "Register New Store" button for adding stores

#### Store Registration (`/store-registration`)
- Comprehensive form for store registration
- Address and location input with GPS support
- Store information (name, contact, hours)
- Owner information auto-filled from Firebase

### Navigation Updates
- Added "My Stores" link in navbar for authenticated users
- Accessible from both desktop and mobile navigation

### Key Components

#### StoreOwnerDashboard
- Fetches and displays user's stores
- Role-based display (Owner, Manager, Staff)
- Quick action buttons for management
- Empty state for new users

#### StoreRegistration
- Multi-section form with validation
- GPS location detection
- Real-time form validation
- Success/error handling

## User Roles & Permissions

### Owner
```json
{
  "manage_inventory": true,
  "manage_store": true,
  "view_analytics": true,
  "manage_staff": true
}
```

### Manager
```json
{
  "manage_inventory": true,
  "manage_store": false,
  "view_analytics": true,
  "manage_staff": false
}
```

### Staff
```json
{
  "manage_inventory": true,
  "manage_store": false,
  "view_analytics": false,
  "manage_staff": false
}
```

## Sample Data

### Store Owners
```sql
INSERT INTO users (firebase_uid, email, display_name, user_type) VALUES
('store_owner_1', 'owner@bigbazaar.com', 'Rajesh Kumar', 'store_owner'),
('store_owner_2', 'manager@reliancefresh.com', 'Priya Sharma', 'store_owner');

INSERT INTO store_owners (user_id, store_id, role, permissions) VALUES
(1, 1, 'owner', '{"manage_inventory": true, "manage_store": true, "view_analytics": true, "manage_staff": true}'),
(2, 2, 'manager', '{"manage_inventory": true, "manage_store": false, "view_analytics": true, "manage_staff": false}');
```

## User Journey

### New Store Owner Registration

1. **Sign Up** - User creates Firebase account
2. **Store Registration** - Fills out store registration form
3. **Account Creation** - System creates user and store records
4. **Dashboard Access** - User can access store management dashboard
5. **Inventory Setup** - Add products and set initial inventory

### Existing Store Owner

1. **Login** - Authenticate with Firebase
2. **Dashboard** - View all owned/managed stores
3. **Store Management** - Update store information
4. **Inventory Management** - Manage product inventory
5. **Analytics** - View store performance (future feature)

## API Usage Examples

### Register a New Store
```javascript
const registerStore = async (storeData) => {
  const token = await currentUser.getIdToken();
  
  const response = await fetch('/api/store-management/register', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Firebase-UID': currentUser.uid,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(storeData)
  });
  
  return response.json();
};
```

### Update Inventory
```javascript
const updateInventory = async (storeId, inventoryData) => {
  const token = await currentUser.getIdToken();
  
  const response = await fetch(`/api/store-management/store/${storeId}/inventory`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Firebase-UID': currentUser.uid,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inventoryData)
  });
  
  return response.json();
};
```

## Error Handling

### Common Error Responses

#### Access Denied
```json
{
  "error": "Access denied. You don't own this store."
}
```

#### Validation Error
```json
{
  "error": "Store name is required"
}
```

#### Not Found
```json
{
  "error": "Store not found"
}
```

## Future Enhancements

### Planned Features

1. **Staff Management** - Add/remove staff members
2. **Analytics Dashboard** - Sales, inventory, and customer analytics
3. **Bulk Inventory Updates** - CSV import/export
4. **Notification System** - Low stock alerts, expiry warnings
5. **Multi-location Management** - Chain store management
6. **Mobile App** - Dedicated mobile app for store owners
7. **Integration APIs** - Connect with POS systems, suppliers
8. **Advanced Permissions** - Custom permission sets
9. **Audit Logs** - Track all inventory and store changes
10. **Reporting** - Generate business reports

### Technical Improvements

1. **Real-time Updates** - WebSocket integration for live inventory
2. **Offline Support** - PWA capabilities for offline management
3. **Image Upload** - Store and product image management
4. **Barcode Scanning** - Quick product identification
5. **Location Services** - Advanced geolocation features

## Security Considerations

### Data Protection
- All sensitive data encrypted in transit and at rest
- Firebase authentication provides secure user management
- Role-based access prevents unauthorized access
- Input validation prevents injection attacks

### Best Practices
- Regular security audits
- Principle of least privilege
- Secure API endpoints
- Data backup and recovery procedures

This comprehensive store owner management system provides a solid foundation for multi-tenant store management while maintaining security and scalability! 🏪✨
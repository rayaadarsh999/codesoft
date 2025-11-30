# Magadh Pharmacy Management System

A comprehensive web application for managing pharmacy operations, built with Next.js, TypeScript, and Prisma.

## Features

### 🌐 Public Website
- Professional home page with company branding
- About page with company information
- Contact page with location and contact form
- Doctor registration and login

### 👨‍⚕️ Doctor Portal
- Secure registration and login
- Dashboard with order/payment overview
- Medicine catalogue with search and filtering
- Order placement with cart functionality
- Order history and status tracking
- Payment management with dues tracking

### 👨‍💼 Admin Panel
- System dashboard with key metrics
- Medicine inventory management (add/edit medicines)
- Order processing and delivery assignment
- User management for doctors and delivery personnel
- Reports with sales analytics and charts
- Export reports to PDF/Excel

### 🚚 Delivery Portal
- View assigned orders
- Customer and order details
- OTP-based delivery confirmation

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **UI Components**: Radix UI

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Public site: http://localhost:3000
   - Register as a doctor or login with existing credentials

## Default Credentials

- **Admin**: admin@magadhpharmacy.com / admin123

## Database Schema

The application uses the following main entities:
- Users (Doctors, Admin, Delivery personnel)
- Medicines (Inventory with batch, expiry tracking)
- Orders (Order management with status tracking)
- Payments (Payment tracking with dues)
- Chats (Communication between admin and doctors)

## Key Features Implemented

✅ Role-based authentication and authorization
✅ Medicine inventory management with stock alerts
✅ Order processing workflow (Pending → Packed → Shipped → Delivered)
✅ Payment tracking with multiple methods
✅ Real-time dashboard analytics
✅ Responsive mobile-friendly design
✅ Professional UI with modern design patterns

## API Endpoints

- `/api/auth/*` - Authentication routes
- `/api/medicines` - Medicine CRUD operations
- `/api/orders` - Order management
- `/api/payments` - Payment tracking
- `/api/admin/*` - Admin-specific operations
- `/api/delivery/*` - Delivery operations

## Deployment

The application is ready for deployment on Vercel, Netlify, or any Node.js hosting platform.

## License

This project is licensed under the MIT License.
# BankKit - Full-Stack Fintech Starter Kit

A modern, production-ready banking platform built with NestJS, React, TypeScript, and PostgreSQL. BankKit provides core banking features including account management, money transfers, transaction history, and an admin dashboard.

## Features

### User Features
- **Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Dashboard**: Overview of accounts, total balance, and recent transactions
- **Account Management**: Create and manage checking and savings accounts
- **Money Transfers**: Transfer funds between accounts with validation
- **Transaction History**: View all transactions with filtering options
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

### Admin Features
- **System Statistics**: Overview of users, accounts, and transaction volumes
- **User Management**: View all users with account and balance information
- **Account Management**: Monitor all accounts across the platform

### Security Features
- JWT authentication with 24-hour token expiry
- Password hashing with bcrypt (10 rounds)
- Input validation using class-validator
- SQL injection prevention with TypeORM
- CORS configuration
- Rate limiting with Throttler

## Tech Stack

### Backend
- **Framework**: NestJS (Node.js + TypeScript)
- **ORM**: TypeORM
- **Database**: PostgreSQL 15
- **Authentication**: Passport.js + JWT
- **Validation**: class-validator
- **Security**: bcrypt, helmet, CORS

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API

### DevOps
- **Containerization**: Docker + Docker Compose
- **Database**: PostgreSQL with persistent volumes
- **Web Server**: Nginx (for frontend in production)

## Project Structure

```
bankkit/
├── backend/                    # NestJS backend application
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── users/             # User management module
│   │   ├── accounts/          # Account management module
│   │   ├── transactions/      # Transaction module
│   │   ├── dashboard/         # Dashboard module
│   │   ├── admin/             # Admin module
│   │   ├── entities/          # TypeORM entities
│   │   ├── database/          # Database configuration
│   │   └── main.ts            # Application entry point
│   ├── migrations/            # Database migrations
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── layout/       # Layout components
│   │   │   └── ui/           # UI component library
│   │   ├── pages/            # Page components
│   │   │   └── admin/        # Admin pages
│   │   ├── services/         # API service layer
│   │   ├── context/          # React context providers
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml         # Multi-container Docker setup
└── README.md
```

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (Unique)
- `password_hash`
- `first_name`, `last_name`
- `role` (user, admin)
- `status` (active, inactive, suspended)
- `created_at`, `updated_at`

### Accounts Table
- `id` (UUID, Primary Key)
- `user_id` (Foreign Key to users)
- `account_number` (Unique, 16 digits)
- `account_type` (checking, savings)
- `balance` (Decimal 15,2)
- `currency` (Default: USD)
- `status` (active, inactive, closed)
- `created_at`, `updated_at`

### Transactions Table
- `id` (UUID, Primary Key)
- `from_account_id` (Foreign Key to accounts)
- `to_account_id` (Foreign Key to accounts)
- `amount` (Decimal 15,2)
- `transaction_type` (transfer, deposit, withdrawal)
- `status` (pending, completed, failed, cancelled)
- `description`
- `created_at`

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 15+
- Docker and Docker Compose (optional)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd bankkit
```

2. **Start all services**
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 3000
- Frontend application on port 80

3. **Run database migrations and seed data**
```bash
docker exec -it bankkit-backend npm run migration:run
docker exec -it bankkit-backend npm run seed
```

4. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost:3000

### Option 2: Local Development Setup

#### Backend Setup

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

Example `.env` file:
```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=password
DB_DATABASE=bankkit

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:5173
```

3. **Create database**
```bash
createdb bankkit
```

4. **Run migrations and seed**
```bash
npm run migration:run
npm run seed
```

5. **Start the backend**
```bash
npm run start:dev
```

Backend will be available at http://localhost:3000

#### Frontend Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env
```

Example `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
```

3. **Start the frontend**
```bash
npm run dev
```

Frontend will be available at http://localhost:5173

## Demo Credentials

### Admin Account
- **Email**: admin@bankkit.com
- **Password**: password123
- **Role**: Admin (access to admin panel)

### User Accounts
- **Email**: john.doe@example.com
- **Password**: password123

- **Email**: jane.smith@example.com
- **Password**: password123

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Account Endpoints
- `GET /api/accounts` - Get user's accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts/:id` - Get account details

### Transaction Endpoints
- `GET /api/transactions` - Get user's transactions
- `POST /api/transactions/transfer` - Create transfer
- `GET /api/transactions/:id` - Get transaction details

### Dashboard Endpoints
- `GET /api/dashboard` - Get dashboard data

### Admin Endpoints (Admin only)
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/accounts` - Get all accounts

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Development Commands

### Backend
```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run start:prod     # Start production server
npm run migration:generate  # Generate migration
npm run migration:run       # Run migrations
npm run migration:revert    # Revert last migration
npm run seed           # Seed database
```

### Frontend
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

## Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild images
docker-compose build

# Remove volumes (caution: deletes database data)
docker-compose down -v
```

## Key Implementation Details

### Money Transfer Flow
1. User selects source and destination accounts
2. Frontend validates input (amount > 0, different accounts)
3. Backend creates database transaction for atomicity
4. Accounts are locked using pessimistic locking to prevent race conditions
5. Balance validation ensures sufficient funds
6. Debit from source account, credit to destination account
7. Transaction record created with status
8. Database transaction committed or rolled back on error

### Security Measures
- Passwords hashed with bcrypt before storage
- JWT tokens expire after 24 hours
- All DTOs validated using class-validator
- CORS configured to allow only specified origins
- Rate limiting on authentication endpoints
- SQL injection prevented by TypeORM parameterized queries
- Input sanitization and validation on all endpoints

## Future Enhancements
- Email notifications for transactions
- Two-factor authentication (2FA)
- Transaction dispute system
- Recurring transfers
- Account statements (PDF export)
- Mobile app with React Native
- Webhook support for external integrations
- Advanced analytics and reporting
- Multi-currency support
- Credit/debit card management

## Testing

### Backend Testing
```bash
cd backend
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
npm run test:cov       # Test coverage
```

### Frontend Testing
```bash
cd frontend
npm run test          # Run tests
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in .env
- Verify database exists: `psql -l`
- Check port 5432 is not in use

### Frontend Cannot Connect to Backend
- Verify backend is running on port 3000
- Check VITE_API_URL in frontend/.env
- Ensure CORS_ORIGIN is set correctly in backend/.env

### Docker Issues
- Ensure Docker daemon is running
- Check ports 80, 3000, 5432 are available
- View logs: `docker-compose logs -f`
- Rebuild images: `docker-compose build --no-cache`

## License

MIT License - feel free to use this project for learning or as a starter kit for your own fintech applications.

## Contributing

This is a starter kit project. Feel free to fork and customize for your needs.

## Support

For issues and questions, please open an issue on the repository.

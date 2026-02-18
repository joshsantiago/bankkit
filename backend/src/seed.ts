import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { Card } from './entities/card.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'bankkit',
  entities: [User, Account, Transaction, Card],
  synchronize: false,
});

// Helper functions for card generation (matching auth.service)
function generateVirtualCardNumber(): string {
  const prefix = '4242';
  const randomDigits = Math.floor(Math.random() * 100000000000000)
    .toString()
    .padStart(12, '0');
  return prefix + randomDigits;
}

function generateExpiryDate(): string {
  const now = new Date();
  const year = (now.getFullYear() + 4) % 100;
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${month}/${year}`;
}

function generateCVV(): string {
  return String(Math.floor(100 + Math.random() * 900));
}

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const cardRepository = AppDataSource.getRepository(Card);

  // Clear existing data
  await transactionRepository.delete({});
  await cardRepository.delete({});
  await accountRepository.delete({});
  await userRepository.delete({});

  console.log('🗑️  Cleared existing data');

  // Create users
  const password = await bcrypt.hash('password123', 10);

  const admin = await userRepository.save(
    userRepository.create({
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'admin@bankkit.com',
      passwordHash: password,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1 (555) 000-0001',
      dateOfBirth: new Date('1990-01-01'),
      role: 'admin',
      status: 'active',
    }),
  );

  const john = await userRepository.save(
    userRepository.create({
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'john.doe@example.com',
      passwordHash: password,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 123-4567',
      dateOfBirth: new Date('1995-05-15'),
      role: 'user',
      status: 'active',
    }),
  );

  const jane = await userRepository.save(
    userRepository.create({
      id: '550e8400-e29b-41d4-a716-446655440003',
      email: 'jane.smith@example.com',
      passwordHash: password,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1 (555) 987-6543',
      dateOfBirth: new Date('1993-08-22'),
      role: 'user',
      status: 'active',
    }),
  );

  console.log('✅ Created users with personal info');

  // Create accounts
  const johnChecking = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440001',
      userId: john.id,
      accountNumber: 'CHK1001234567',
      accountType: 'checking',
      balance: 5000.0,
      status: 'active',
    }),
  );

  const johnSavings = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440002',
      userId: john.id,
      accountNumber: 'SAV1001234567',
      accountType: 'savings',
      balance: 15000.0,
      status: 'active',
    }),
  );

  const janeChecking = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440003',
      userId: jane.id,
      accountNumber: 'CHK1007654321',
      accountType: 'checking',
      balance: 3200.5,
      status: 'active',
    }),
  );

  const janeSavings = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440004',
      userId: jane.id,
      accountNumber: 'SAV1007654321',
      accountType: 'savings',
      balance: 22500.75,
      status: 'active',
    }),
  );

  const adminChecking = await accountRepository.save(
    accountRepository.create({
      id: '650e8400-e29b-41d4-a716-446655440005',
      userId: admin.id,
      accountNumber: 'CHK1009999999',
      accountType: 'checking',
      balance: 10000.0,
      status: 'active',
    }),
  );

  console.log('✅ Created accounts');

  // Create debit cards for checking accounts
  const adminCard = await cardRepository.save(
    cardRepository.create({
      userId: admin.id,
      accountId: adminChecking.id,
      name: 'BankKit Debit Card',
      cardNumber: generateVirtualCardNumber(),
      expiry: generateExpiryDate(),
      cvv: generateCVV(),
      brand: 'Visa',
      cardType: 'Debit',
      isVirtual: false,
      status: 'Active',
      dailyLimit: 5000,
      monthlyLimit: 20000,
      currentSpending: 0,
    }),
  );

  const johnCard = await cardRepository.save(
    cardRepository.create({
      userId: john.id,
      accountId: johnChecking.id,
      name: 'BankKit Debit Card',
      cardNumber: generateVirtualCardNumber(),
      expiry: generateExpiryDate(),
      cvv: generateCVV(),
      brand: 'Visa',
      cardType: 'Debit',
      isVirtual: false,
      status: 'Active',
      dailyLimit: 5000,
      monthlyLimit: 20000,
      currentSpending: 0,
    }),
  );

  const janeCard = await cardRepository.save(
    cardRepository.create({
      userId: jane.id,
      accountId: janeChecking.id,
      name: 'BankKit Debit Card',
      cardNumber: generateVirtualCardNumber(),
      expiry: generateExpiryDate(),
      cvv: generateCVV(),
      brand: 'Visa',
      cardType: 'Debit',
      isVirtual: false,
      status: 'Active',
      dailyLimit: 5000,
      monthlyLimit: 20000,
      currentSpending: 0,
    }),
  );

  console.log('✅ Created debit cards');

  // Create transactions
  await transactionRepository.save([
    transactionRepository.create({
      fromAccountId: johnSavings.id,
      toAccountId: johnChecking.id,
      amount: 500.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Transfer to checking account',
      createdAt: new Date('2024-01-15'),
    }),
    transactionRepository.create({
      fromAccountId: johnChecking.id,
      toAccountId: janeChecking.id,
      amount: 250.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Payment for dinner',
      createdAt: new Date('2024-01-16'),
    }),
    transactionRepository.create({
      fromAccountId: janeChecking.id,
      toAccountId: janeSavings.id,
      amount: 1000.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Monthly savings',
      createdAt: new Date('2024-01-17'),
    }),
    transactionRepository.create({
      fromAccountId: janeChecking.id,
      toAccountId: johnChecking.id,
      amount: 150.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Repayment',
      createdAt: new Date('2024-01-18'),
    }),
    transactionRepository.create({
      fromAccountId: johnChecking.id,
      toAccountId: johnSavings.id,
      amount: 300.0,
      transactionType: 'transfer',
      status: 'completed',
      description: 'Savings deposit',
      createdAt: new Date('2024-01-20'),
    }),
  ]);

  console.log('✅ Created transactions');
  console.log('\n📋 Demo accounts:');
  console.log('   Admin: admin@bankkit.com / password123');
  console.log('   User 1: john.doe@example.com / password123');
  console.log('   User 2: jane.smith@example.com / password123');

  await AppDataSource.destroy();
}

seed()
  .then(() => {
    console.log('\n🎉 Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
